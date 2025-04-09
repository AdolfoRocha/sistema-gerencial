/*
  # Fix registration issues

  1. Changes
    - Simplify business_profiles table
    - Remove complex constraints
    - Add basic RLS policies
    - Allow null fields for initial registration
*/

-- Drop existing table
DROP TABLE IF EXISTS business_profiles CASCADE;

-- Create simplified table
CREATE TABLE business_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name text,
  trading_name text,
  cnpj text,
  phone text,
  address text,
  city text,
  state text,
  zip_code text,
  business_type text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for authenticated users only"
  ON business_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable select for users based on user_id"
  ON business_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id"
  ON business_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);