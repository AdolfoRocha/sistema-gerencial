/*
  # Fix authentication schema and permissions
  
  1. Changes
    - Enable auth schema access
    - Set up proper RLS policies
    - Fix schema permissions
*/

-- Enable RLS on the tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Enable read access for own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update access for own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for business_profiles
CREATE POLICY "Enable read access for own business profile"
  ON business_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for own business profile"
  ON business_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update access for own business profile"
  ON business_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Ensure auth schema is accessible
GRANT USAGE ON SCHEMA auth TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA auth TO anon, authenticated;