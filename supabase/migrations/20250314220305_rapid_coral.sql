/*
  # Create business profiles schema

  1. New Tables
    - `business_profiles`
      - `id` (uuid, primary key)
      - `company_name` (text) - Business name
      - `trading_name` (text) - Trading/Fantasy name
      - `cnpj` (text) - Brazilian company ID
      - `phone` (text) - Contact phone
      - `address` (text) - Full address
      - `city` (text) - City
      - `state` (text) - State
      - `zip_code` (text) - ZIP code
      - `business_type` (text) - Type of business
      - `created_at` (timestamp)
      - `user_id` (uuid) - Reference to auth.users

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read/update their own data
*/

-- Create business_profiles table
CREATE TABLE IF NOT EXISTS business_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  trading_name text,
  cnpj text UNIQUE NOT NULL,
  phone text,
  address text,
  city text,
  state text,
  zip_code text,
  business_type text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

-- Enable RLS
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
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