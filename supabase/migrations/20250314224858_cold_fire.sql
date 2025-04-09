/*
  # Fix business profiles table

  1. Changes
    - Simplify table structure
    - Remove complex constraints
    - Add basic RLS policies
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
CREATE POLICY "Enable all operations for authenticated users"
  ON business_profiles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);