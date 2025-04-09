/*
  # Create reports tables

  1. New Tables
    - `reports`
      - `id` (uuid, primary key)
      - `type` (text) - Type of report (billing_declaration, dre)
      - `period` (date) - Report period
      - `data` (jsonb) - Report data
      - `created_at` (timestamp)
      - `user_id` (uuid) - Reference to auth.users
    
    - `billing_declarations`
      - `id` (uuid, primary key)
      - `month` (date) - Month of billing
      - `amount` (numeric) - Billing amount
      - `created_at` (timestamp)
      - `user_id` (uuid) - Reference to auth.users

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read their own data
*/

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  period date NOT NULL,
  data jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Create billing_declarations table
CREATE TABLE IF NOT EXISTS billing_declarations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  month date NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_declarations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own reports"
  ON reports
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own billing declarations"
  ON billing_declarations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);