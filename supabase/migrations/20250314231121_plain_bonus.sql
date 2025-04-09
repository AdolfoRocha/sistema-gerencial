/*
  # Create admin user and profile
  
  1. Changes
    - Create admin user with proper error handling
    - Create business profile for admin
*/

DO $$
BEGIN
  -- Create admin user if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@expert.com'
  ) THEN
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      aud,
      role,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token
    ) VALUES (
      gen_random_uuid(),
      '00000000-0000-0000-0000-000000000000',
      'admin@expert.com',
      crypt('expert1234', gen_salt('bf')),
      now(),
      'authenticated',
      'authenticated',
      '{"provider":"email","providers":["email"]}',
      '{}',
      now(),
      now(),
      '',
      ''
    );
  END IF;

  -- Create business profile for admin if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM business_profiles bp
    INNER JOIN auth.users u ON u.id = bp.user_id
    WHERE u.email = 'admin@expert.com'
  ) THEN
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
    ) 
    SELECT
      'Expert Contábil',
      'Expert',
      '00.000.000/0001-00',
      '(00) 0000-0000',
      'Rua Principal, 123',
      'São Paulo',
      'SP',
      '00000-000',
      'Contabilidade',
      id
    FROM auth.users
    WHERE email = 'admin@expert.com';
  END IF;
END $$;