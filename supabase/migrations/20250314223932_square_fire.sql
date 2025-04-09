/*
  # Fix registration flow
  
  1. Changes
    - Drop triggers before functions
    - Recreate business_profiles table with simpler structure
    - Add basic RLS policies
    - Make registration process more straightforward
*/

-- Drop triggers first
DROP TRIGGER IF EXISTS update_business_profiles_updated_at ON business_profiles;
DROP TRIGGER IF EXISTS validate_business_profile_trigger ON business_profiles;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Then drop functions
DROP FUNCTION IF EXISTS handle_new_user();
DROP FUNCTION IF EXISTS validate_business_profile();
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Recreate business_profiles table with simpler structure
DROP TABLE IF EXISTS business_profiles;
CREATE TABLE business_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  company_name text NOT NULL,
  trading_name text,
  cnpj text UNIQUE NOT NULL,
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

-- Create simple RLS policies
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