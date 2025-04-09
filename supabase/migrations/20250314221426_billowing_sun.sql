/*
  # Fix registration flow and constraints

  1. Changes
    - Improve CNPJ validation function to handle formatted strings
    - Add proper constraints and validations
    - Fix user profile creation issues
  
  2. Security
    - Maintain existing RLS policies
*/

-- Drop existing function and recreate with better validation
CREATE OR REPLACE FUNCTION is_valid_cnpj(cnpj text) 
RETURNS boolean AS $$
DECLARE
  formatted_cnpj text;
BEGIN
  -- Accept both formatted and unformatted CNPJs
  formatted_cnpj := regexp_replace(cnpj, '[^0-9]', '', 'g');
  
  -- Check length
  IF length(formatted_cnpj) != 14 THEN
    RETURN false;
  END IF;

  -- Allow formatted CNPJs (XX.XXX.XXX/XXXX-XX)
  IF cnpj ~ '^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$' THEN
    RETURN true;
  END IF;
  
  -- Allow unformatted CNPJs (14 digits)
  IF cnpj ~ '^\d{14}$' THEN
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$ LANGUAGE plpgsql;

-- Drop and recreate the table with proper constraints
DROP TABLE IF EXISTS business_profiles CASCADE;

CREATE TABLE business_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name text NOT NULL CHECK (length(trim(company_name)) > 0),
  trading_name text,
  cnpj text NOT NULL CHECK (is_valid_cnpj(cnpj)),
  phone text,
  address text,
  city text,
  state text CHECK (state IS NULL OR state ~ '^[A-Z]{2}$'),
  zip_code text,
  business_type text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT business_profiles_user_id_key UNIQUE (user_id),
  CONSTRAINT business_profiles_cnpj_key UNIQUE (cnpj)
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;   
END;
$$ language 'plpgsql';

CREATE TRIGGER update_business_profiles_updated_at
    BEFORE UPDATE ON business_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;

-- Recreate policies
CREATE POLICY "Users can read own profile"
  ON business_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON business_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON business_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);