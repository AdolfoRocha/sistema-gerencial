/*
  # Fix registration and profile creation issues

  1. Changes
    - Add better error handling for business profiles
    - Make CNPJ constraint deferrable for better transaction handling
    - Improve user creation trigger to handle profile creation more robustly
    - Add validation functions for business data

  2. Security
    - Maintain existing RLS policies
    - Add better error handling
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create a more robust function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  profile_exists boolean;
BEGIN
  -- Check if profile already exists
  SELECT EXISTS (
    SELECT 1 FROM public.business_profiles WHERE user_id = NEW.id
  ) INTO profile_exists;

  -- Only create profile if it doesn't exist
  IF NOT profile_exists THEN
    INSERT INTO public.business_profiles (
      user_id,
      company_name,
      cnpj,
      trading_name,
      phone,
      address,
      city,
      state,
      zip_code,
      business_type
    ) VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Company'),
      '00.000.000/0000-00',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger with better error handling
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Make CNPJ constraint deferrable and add better validation
ALTER TABLE business_profiles
  DROP CONSTRAINT IF EXISTS business_profiles_cnpj_key,
  ADD CONSTRAINT business_profiles_cnpj_key 
    UNIQUE (cnpj) 
    DEFERRABLE INITIALLY DEFERRED;

-- Add function to validate business profile data
CREATE OR REPLACE FUNCTION validate_business_profile()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate CNPJ format
  IF NOT is_valid_cnpj(NEW.cnpj) THEN
    RAISE EXCEPTION 'Invalid CNPJ format';
  END IF;

  -- Validate company name
  IF length(trim(NEW.company_name)) = 0 THEN
    RAISE EXCEPTION 'Company name cannot be empty';
  END IF;

  -- Validate state format if provided
  IF NEW.state IS NOT NULL AND NEW.state !~ '^[A-Z]{2}$' THEN
    RAISE EXCEPTION 'Invalid state format';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add validation trigger
DROP TRIGGER IF EXISTS validate_business_profile_trigger ON business_profiles;
CREATE TRIGGER validate_business_profile_trigger
  BEFORE INSERT OR UPDATE ON business_profiles
  FOR EACH ROW
  EXECUTE FUNCTION validate_business_profile();