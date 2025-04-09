/*
  # Add unique constraint to business_profiles

  1. Changes
    - Add unique constraint on user_id column to enable ON CONFLICT handling
*/

-- Add unique constraint on user_id
ALTER TABLE business_profiles ADD CONSTRAINT business_profiles_user_id_key UNIQUE (user_id);

-- Re-insert admin profile with conflict handling
INSERT INTO business_profiles (
  company_name,
  trading_name,
  cnpj,
  phone,
  address,
  city,
  state,
  zip_code,
  business_type,
  user_id
) VALUES (
  'Admin Company',
  'Admin',
  '00.000.000/0000-00',
  '(00) 0000-0000',
  'Admin Address',
  'Admin City',
  'ST',
  '00000-000',
  'Administration',
  'c9b06aec-3e9e-4d34-8e1d-0802c2c33826'
) ON CONFLICT (user_id) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  trading_name = EXCLUDED.trading_name,
  cnpj = EXCLUDED.cnpj,
  phone = EXCLUDED.phone,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  state = EXCLUDED.state,
  zip_code = EXCLUDED.zip_code,
  business_type = EXCLUDED.business_type;