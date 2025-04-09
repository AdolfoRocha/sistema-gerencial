/*
  # Simplify registration flow
  
  1. Changes
    - Drop all existing tables and constraints
    - Create simplified business_profiles table
    - Remove all triggers and validations
    - Keep only basic structure
*/

-- Drop everything
DROP TABLE IF EXISTS business_profiles CASCADE;

-- Create simplified business_profiles table
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

-- Basic index for performance
CREATE INDEX business_profiles_user_id_idx ON business_profiles(user_id);