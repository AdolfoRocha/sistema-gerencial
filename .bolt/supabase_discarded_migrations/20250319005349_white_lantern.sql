/*
  # Fix financial module policies
  
  1. Changes
    - Drop existing policies
    - Recreate policies with proper names
    - Ensure unique policy names
  
  2. Security
    - Maintain same security model
    - Keep RLS enabled
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage own chart of accounts" ON chart_of_accounts;
DROP POLICY IF EXISTS "Users can manage own accounts payable" ON accounts_payable;
DROP POLICY IF EXISTS "Users can manage own accounts receivable" ON accounts_receivable;
DROP POLICY IF EXISTS "Users can manage own cash flow" ON cash_flow;
DROP POLICY IF EXISTS "Users can manage own financial statements" ON financial_statements;

-- Create policies with unique names
CREATE POLICY "manage_own_chart_of_accounts"
  ON chart_of_accounts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "manage_own_accounts_payable"
  ON accounts_payable
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "manage_own_accounts_receivable"
  ON accounts_receivable
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "manage_own_cash_flow"
  ON cash_flow
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "manage_own_financial_statements"
  ON financial_statements
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);