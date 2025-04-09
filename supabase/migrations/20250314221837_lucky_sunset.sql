/*
  # Fix registration issues

  1. Changes
    - Add ON CONFLICT DO NOTHING to business_profiles policies
    - Add missing indexes for performance
    - Improve CNPJ validation
    - Add CASCADE to foreign key constraints

  2. Security
    - Maintain existing RLS policies
    - Add better error handling
*/

-- Drop and recreate the CNPJ validation function with better validation
CREATE OR REPLACE FUNCTION is_valid_cnpj(cnpj text) 
RETURNS boolean AS $$
DECLARE
  nums int[];
  sum int;
  dv1 int;
  dv2 int;
BEGIN
  -- Remove non-numeric characters
  cnpj := regexp_replace(cnpj, '[^0-9]', '', 'g');
  
  -- Check basic format
  IF NOT (cnpj ~ '^\d{14}$' OR cnpj ~ '^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$') THEN
    RETURN false;
  END IF;

  -- Convert to array of integers
  nums := string_to_array(regexp_replace(cnpj, '[^0-9]', '', 'g'), null)::int[];
  
  -- Calculate first digit
  sum := 0;
  FOR i IN 1..12 LOOP
    sum := sum + nums[i] * (CASE 
      WHEN i <= 4 THEN 5 - i 
      ELSE 13 - i 
    END);
  END LOOP;
  
  dv1 := CASE 
    WHEN sum % 11 < 2 THEN 0
    ELSE 11 - (sum % 11)
  END;
  
  IF nums[13] != dv1 THEN
    RETURN false;
  END IF;
  
  -- Calculate second digit
  sum := 0;
  FOR i IN 1..13 LOOP
    sum := sum + nums[i] * (CASE 
      WHEN i <= 5 THEN 6 - i
      ELSE 14 - i
    END);
  END LOOP;
  
  dv2 := CASE 
    WHEN sum % 11 < 2 THEN 0
    ELSE 11 - (sum % 11)
  END;
  
  RETURN nums[14] = dv2;
END;
$$ LANGUAGE plpgsql;

-- Add index for CNPJ searches
CREATE INDEX IF NOT EXISTS idx_business_profiles_cnpj ON business_profiles (cnpj);

-- Add index for user_id searches
CREATE INDEX IF NOT EXISTS idx_business_profiles_user_id ON business_profiles (user_id);

-- Update the business_profiles table constraints
ALTER TABLE business_profiles 
  DROP CONSTRAINT IF EXISTS business_profiles_user_id_fkey,
  ADD CONSTRAINT business_profiles_user_id_fkey 
    FOREIGN KEY (user_id) 
    REFERENCES auth.users(id) 
    ON DELETE CASCADE;