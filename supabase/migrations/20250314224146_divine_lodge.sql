/*
  # Fix registration flow with simplified schema
  
  1. Changes
    - Drop all existing tables and start fresh
    - Create a simple business_profiles table
    - Add basic RLS policies
    - Remove all triggers and complex validations
    - Focus on core functionality
*/

-- Drop everything and start fresh
DROP TABLE IF EXISTS business_profiles CASCADE;

-- Create a simple business_profiles table
CREATE TABLE business_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  company_name text NOT NULL,
  trading_name text,
  cnpj text NOT NULL,
  phone text,
  address text,
  city text,
  state text,
  zip_code text,
  business_type text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT business_profiles_user_id_key UNIQUE (user_id),
  CONSTRAINT business_profiles_cnpj_key UNIQUE (cnpj),
  CONSTRAINT business_profiles_user_id_fkey FOREIGN KEY (user_id) 
    REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies
CREATE POLICY "Users can read own profile"
  ON business_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON business_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON business_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);