-- Migration 0002: profiles table + is_admin() + auto-create trigger
-- Backwards compatible: existing app keeps working, RLS policies on cases/etc.
-- get an `OR is_admin()` clause appended so admin reads cross all customers.

-- ============================================================================
-- profiles table (one row per auth.users, auto-created on signup)
-- ============================================================================

CREATE TABLE IF NOT EXISTS profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  stripe_customer_id TEXT UNIQUE,
  notification_preferences JSONB NOT NULL DEFAULT '{"email": true}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS profiles_is_admin_idx ON profiles (is_admin) WHERE is_admin = true;
CREATE INDEX IF NOT EXISTS profiles_stripe_customer_idx ON profiles (stripe_customer_id);

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- is_admin() helper for RLS policies
-- ============================================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT p.is_admin FROM profiles p WHERE p.user_id = auth.uid()),
    false
  );
$$;

-- ============================================================================
-- Profile RLS
-- ============================================================================

DROP POLICY IF EXISTS profiles_self_select ON profiles;
CREATE POLICY profiles_self_select ON profiles
  FOR SELECT USING (user_id = auth.uid() OR is_admin());

DROP POLICY IF EXISTS profiles_self_update ON profiles;
CREATE POLICY profiles_self_update ON profiles
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid() AND is_admin = (SELECT is_admin FROM profiles WHERE user_id = auth.uid()));
-- Note: WITH CHECK prevents users from elevating themselves to admin.
-- is_admin column flips only via service-role.

-- ============================================================================
-- Auto-create profile when a new auth.users row is inserted
-- ============================================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (user_id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- Backfill profiles for any existing auth.users
-- ============================================================================

INSERT INTO profiles (user_id, full_name)
SELECT
  u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name')
FROM auth.users u
LEFT JOIN profiles p ON p.user_id = u.id
WHERE p.user_id IS NULL;

-- ============================================================================
-- Add `OR is_admin()` to existing RLS policies so admins read across users.
-- We DROP and recreate each policy. Strict scoping is preserved for
-- non-admin users.
-- ============================================================================

-- cases
DROP POLICY IF EXISTS cases_owner_select ON cases;
CREATE POLICY cases_owner_select ON cases
  FOR SELECT USING (owner_user_id = auth.uid() OR is_admin());

DROP POLICY IF EXISTS cases_owner_insert ON cases;
CREATE POLICY cases_owner_insert ON cases
  FOR INSERT WITH CHECK (owner_user_id = auth.uid() OR is_admin());

DROP POLICY IF EXISTS cases_owner_update ON cases;
CREATE POLICY cases_owner_update ON cases
  FOR UPDATE USING (owner_user_id = auth.uid() OR is_admin());

DROP POLICY IF EXISTS cases_admin_delete ON cases;
CREATE POLICY cases_admin_delete ON cases
  FOR DELETE USING (is_admin());

-- demand_letters
DROP POLICY IF EXISTS demand_letters_owner_select ON demand_letters;
CREATE POLICY demand_letters_owner_select ON demand_letters
  FOR SELECT USING (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
    OR is_admin()
  );

DROP POLICY IF EXISTS demand_letters_owner_modify ON demand_letters;
CREATE POLICY demand_letters_owner_modify ON demand_letters
  FOR ALL USING (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
    OR is_admin()
  ) WITH CHECK (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
    OR is_admin()
  );

-- documents
DROP POLICY IF EXISTS documents_owner_select ON documents;
CREATE POLICY documents_owner_select ON documents
  FOR SELECT USING (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
    OR is_admin()
  );

DROP POLICY IF EXISTS documents_owner_insert ON documents;
CREATE POLICY documents_owner_insert ON documents
  FOR INSERT WITH CHECK (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
    OR is_admin()
  );

-- payments
DROP POLICY IF EXISTS payments_user_select ON payments;
CREATE POLICY payments_user_select ON payments
  FOR SELECT USING (user_id = auth.uid() OR is_admin());

-- audit_log
DROP POLICY IF EXISTS audit_log_user_select ON audit_log;
CREATE POLICY audit_log_user_select ON audit_log
  FOR SELECT USING (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
    OR is_admin()
  );

-- court_forms / service_attempts / attorney_review_requests (stub tables)
DROP POLICY IF EXISTS court_forms_owner_select ON court_forms;
CREATE POLICY court_forms_owner_select ON court_forms
  FOR SELECT USING (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
    OR is_admin()
  );

DROP POLICY IF EXISTS service_attempts_owner_select ON service_attempts;
CREATE POLICY service_attempts_owner_select ON service_attempts
  FOR SELECT USING (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
    OR is_admin()
  );

DROP POLICY IF EXISTS attorney_reviews_owner_select ON attorney_review_requests;
CREATE POLICY attorney_reviews_owner_select ON attorney_review_requests
  FOR SELECT USING (requester_user_id = auth.uid() OR is_admin());
