/*
  # Fix authentication permissions

  1. Changes
    - Grant proper permissions to auth schema
    - Ensure service_role has necessary permissions
    - Fix auth schema access for authenticated users
*/

-- Revoke problematic permissions
REVOKE ALL ON ALL TABLES IN SCHEMA auth FROM anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA auth FROM anon, authenticated;
REVOKE ALL ON SCHEMA auth FROM anon, authenticated;

-- Grant minimal required permissions
GRANT USAGE ON SCHEMA auth TO authenticated, anon;
GRANT SELECT ON TABLE auth.users TO authenticated, anon;

-- Ensure service_role has full access
GRANT ALL ON ALL TABLES IN SCHEMA auth TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO service_role;

-- Grant specific table permissions
GRANT SELECT, INSERT, UPDATE ON TABLE public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.business_profiles TO authenticated;

-- Ensure sequences are accessible
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;