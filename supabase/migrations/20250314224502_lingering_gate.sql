/*
  # Simplify database structure
  
  1. Changes
    - Drop existing table
    - Create new simplified table without constraints
    - Remove all triggers and validations
    - Keep only basic structure
*/

-- Drop existing table
DROP TABLE IF EXISTS business_profiles CASCADE;

-- Create simplified table
CREATE TABLE business_profiles (
  id uuid DEFAULT gen_random_uuid(),
  user_id uuid,
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

-- Create basic policy
CREATE POLICY "Allow all" ON business_profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);