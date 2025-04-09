/*
  # Fix authentication permissions

  1. Changes
    - Reset and grant minimal required permissions
    - Ensure proper access to auth schema and tables
    - Set up correct public schema permissions
*/

-- Reset permissions
REVOKE ALL ON ALL TABLES IN SCHEMA auth FROM anon, authenticated;
REVOKE ALL ON SCHEMA auth FROM anon, authenticated;

-- Grant minimal required permissions
GRANT USAGE ON SCHEMA auth TO authenticated, anon;
GRANT SELECT ON TABLE auth.users TO authenticated, anon;

-- Ensure service_role has full access
GRANT ALL ON ALL TABLES IN SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO service_role;

-- Reset and grant public schema permissions
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant specific table permissions
GRANT SELECT, INSERT, UPDATE ON TABLE public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.business_profiles TO authenticated;

-- Grant sequence permissions for public schema only
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;