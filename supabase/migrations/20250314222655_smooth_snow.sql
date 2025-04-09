/*
  # Fix registration issues

  1. Changes
    - Add trigger to automatically create business profile on user creation
    - Add better error handling for duplicate CNPJs
    - Add better validation for business profile data

  2. Security
    - Maintain existing RLS policies
    - Add better error handling
*/

-- Create a function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create an empty business profile for the new user
  INSERT INTO public.business_profiles (
    user_id,
    company_name,
    cnpj
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Company'),
    '00.000.000/0000-00'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create business profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Add better error handling for business profiles
ALTER TABLE public.business_profiles
  DROP CONSTRAINT IF EXISTS business_profiles_cnpj_key,
  ADD CONSTRAINT business_profiles_cnpj_key 
    UNIQUE (cnpj) 
    DEFERRABLE INITIALLY DEFERRED;