/*
  # Remove security restrictions
  
  1. Changes
    - Disable RLS on all tables
    - Remove all security policies
*/

-- Disable RLS on profiles table
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Drop policies from profiles table
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Disable RLS on business_profiles table
ALTER TABLE business_profiles DISABLE ROW LEVEL SECURITY;

-- Drop policies from business_profiles table
DROP POLICY IF EXISTS "Users can read own business profile" ON business_profiles;
DROP POLICY IF EXISTS "Users can update own business profile" ON business_profiles;
DROP POLICY IF EXISTS "Users can insert own business profile" ON business_profiles;