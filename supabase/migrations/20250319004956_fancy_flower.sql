/*
  # Add Financial Module Tables

  1. New Tables
    - `chart_of_accounts`
      - Account structure for financial classification
    - `accounts_payable`
      - Manage financial obligations
    - `accounts_receivable`
      - Track receivables and collections
    - `cash_flow`
      - Track financial movements
    - `financial_statements`
      - Store DRE and balance sheet data

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Chart of Accounts
CREATE TABLE chart_of_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  code text NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  parent_id uuid REFERENCES chart_of_accounts(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, code)
);

-- Accounts Payable
CREATE TABLE accounts_payable (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  description text NOT NULL,
  amount numeric NOT NULL,
  due_date date NOT NULL,
  paid_date date,
  status text NOT NULL DEFAULT 'pending',
  account_id uuid REFERENCES chart_of_accounts(id),
  created_at timestamptz DEFAULT now()
);

-- Accounts Receivable
CREATE TABLE accounts_receivable (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  description text NOT NULL,
  amount numeric NOT NULL,
  due_date date NOT NULL,
  received_date date,
  status text NOT NULL DEFAULT 'pending',
  account_id uuid REFERENCES chart_of_accounts(id),
  created_at timestamptz DEFAULT now()
);

-- Cash Flow
CREATE TABLE cash_flow (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  amount numeric NOT NULL,
  date date NOT NULL,
  description text NOT NULL,
  account_id uuid REFERENCES chart_of_accounts(id),
  created_at timestamptz DEFAULT now()
);

-- Financial Statements
CREATE TABLE financial_statements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  period date NOT NULL,
  data jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE chart_of_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts_payable ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts_receivable ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_flow ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_statements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage own chart of accounts"
  ON chart_of_accounts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own accounts payable"
  ON accounts_payable
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own accounts receivable"
  ON accounts_receivable
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own cash flow"
  ON cash_flow
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own financial statements"
  ON financial_statements
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);