/*
  # Create admin user

  1. Changes
    - Create admin user with email "admin@admin.com" and password "1234"
    - Add admin's business profile
*/

-- Create admin user (using Supabase's built-in auth.users table)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  'c9b06aec-3e9e-4d34-8e1d-0802c2c33826',  -- Fixed UUID for admin
  '00000000-0000-0000-0000-000000000000',
  'admin@admin.com',
  crypt('1234', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Create admin's business profile
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
);