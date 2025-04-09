/*
  # Fix authentication tables
  
  1. Changes
    - Drop and recreate tables with proper constraints
    - Remove unique constraint on business_profiles.cnpj
    - Add proper foreign key relationships
*/

-- Drop existing tables
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS business_profiles CASCADE;

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email text,
  created_at timestamptz DEFAULT now()
);

-- Create business_profiles table
CREATE TABLE business_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name text NOT NULL,
  trading_name text,
  cnpj text NOT NULL,
  phone text,
  address text,
  city text,
  state text,
  zip_code text,
  business_type text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_business_profiles_user_id ON business_profiles(user_id);