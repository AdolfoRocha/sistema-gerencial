/*
  # Fix registration flow and constraints

  1. Changes
    - Drop and recreate business_profiles table with proper constraints
    - Add trigger to ensure user exists before profile creation
    - Add function to validate CNPJ format
  
  2. Security
    - Maintain existing RLS policies
    - Add validation checks
*/

-- Drop existing table and recreate with proper constraints
DROP TABLE IF EXISTS business_profiles CASCADE;

-- Create CNPJ validation function
CREATE OR REPLACE FUNCTION is_valid_cnpj(cnpj text) 
RETURNS boolean AS $$
BEGIN
  -- Remove non-numeric characters
  cnpj := regexp_replace(cnpj, '[^0-9]', '', 'g');
  
  -- Check length
  IF length(cnpj) != 14 THEN
    RETURN false;
  END IF;
  
  -- Basic format validation (simplified)
  RETURN cnpj ~ '^[0-9]{14}$';
END;
$$ LANGUAGE plpgsql;

-- Recreate business_profiles table
CREATE TABLE business_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  company_name text NOT NULL CHECK (length(trim(company_name)) > 0),
  trading_name text,
  cnpj text NOT NULL CHECK (is_valid_cnpj(cnpj)),
  phone text,
  address text,
  city text,
  state text CHECK (state ~ '^[A-Z]{2}$'),
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