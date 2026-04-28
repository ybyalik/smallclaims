-- CivilCase: transactional schema (Day 1)
-- Tables for the demand-letter MVP plus stub tables for filing/service/attorney
-- review so future features bolt on without migrations.
--
-- Run via Supabase Management API or psql against the project.
-- All tables use Row-Level Security with policies scoped to auth.uid().

-- ============================================================================
-- ENUMS
-- ============================================================================

DO $$ BEGIN
  CREATE TYPE case_status AS ENUM (
    'draft',                 -- intake started, not yet paid
    'demand_drafted',        -- letter generated, awaiting checkout
    'demand_paid',           -- payment captured, ready to mail or download
    'demand_sent',           -- mail dispatched (Lob accepted)
    'demand_delivered',      -- USPS delivery event
    'demand_returned',       -- USPS return-to-sender or refused
    'demand_responded',      -- defendant responded (manual mark)
    'filing_prepared',       -- court forms generated (Phase 2)
    'filed',                 -- filed with court (Phase 2)
    'service_arranged',      -- process server engaged (Phase 3)
    'served',                -- proof of service in hand (Phase 3)
    'hearing_scheduled',     -- (Phase 3)
    'judgment_entered',      -- (Phase 3)
    'collection',            -- post-judgment collection active (Phase 4)
    'closed',                -- case resolved, dismissed, or abandoned
    'settled'                -- defendant paid before/after judgment
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE dispute_type AS ENUM (
    'unpaid_debt',           -- personal loan, unpaid invoice, IOU
    'security_deposit',      -- landlord won't return deposit
    'property_damage',       -- car accident, neighbor damage, etc.
    'services_not_rendered', -- paid for service that wasn't delivered
    'goods_not_delivered',   -- paid for product never received
    'other'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE mail_status AS ENUM (
    'draft',
    'queued',
    'in_transit',
    'delivered',
    'returned',
    'failed'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'succeeded', 'failed', 'refunded');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE document_kind AS ENUM (
    'evidence',
    'generated_letter',
    'generated_form',
    'court_stamped',
    'receipt',
    'correspondence',
    'proof_of_service'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE service_attempt_status AS ENUM ('queued', 'attempted', 'succeeded', 'failed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE review_status AS ENUM ('queued', 'in_review', 'completed', 'declined');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================================
-- CORE TABLES (used in MVP)
-- ============================================================================

CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status case_status NOT NULL DEFAULT 'draft',
  state CHAR(2) NOT NULL,           -- USPS code (CA, TX, etc.) or DC
  county TEXT,
  dispute_type dispute_type NOT NULL,
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
  currency CHAR(3) NOT NULL DEFAULT 'USD',
  -- plaintiff (the user)
  plaintiff_name TEXT NOT NULL,
  plaintiff_address JSONB,          -- { line1, line2, city, state, zip }
  plaintiff_email TEXT,
  plaintiff_phone TEXT,
  -- defendant
  defendant_name TEXT NOT NULL,
  defendant_address JSONB,
  defendant_email TEXT,
  defendant_phone TEXT,
  -- intake
  intake_answers JSONB,             -- raw form answers (versioned by intake_version)
  intake_version INTEGER NOT NULL DEFAULT 1,
  facts_narrative TEXT,             -- user's free-text description
  -- timeline anchors (post Phase 0)
  case_number TEXT,                 -- court-assigned, post-filing
  filing_court_id UUID,
  hearing_at TIMESTAMPTZ,
  -- bookkeeping
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS cases_owner_idx ON cases (owner_user_id);
CREATE INDEX IF NOT EXISTS cases_status_idx ON cases (status);
CREATE INDEX IF NOT EXISTS cases_state_county_idx ON cases (state, county);

CREATE TABLE IF NOT EXISTS demand_letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  -- generation
  template_key TEXT NOT NULL,       -- e.g. 'unpaid_debt_v1', 'security_deposit_v1'
  body_md TEXT NOT NULL,            -- markdown, what user edits
  body_html TEXT,                   -- rendered for PDF + email
  cure_period_days INTEGER NOT NULL DEFAULT 14,
  generated_by TEXT,                -- 'claude-3.5-sonnet' or 'manual'
  -- delivery
  pdf_storage_path TEXT,
  mail_status mail_status NOT NULL DEFAULT 'draft',
  lob_letter_id TEXT UNIQUE,
  tracking_number TEXT,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  returned_at TIMESTAMPTZ,
  -- bookkeeping
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS demand_letters_case_idx ON demand_letters (case_id);
CREATE INDEX IF NOT EXISTS demand_letters_lob_idx ON demand_letters (lob_letter_id);

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  uploader_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  kind document_kind NOT NULL,
  storage_path TEXT NOT NULL,       -- supabase storage path
  filename TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  sha256 CHAR(64),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS documents_case_idx ON documents (case_id, kind);

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- Stripe
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_checkout_session_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  -- amounts
  amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
  currency CHAR(3) NOT NULL DEFAULT 'USD',
  status payment_status NOT NULL DEFAULT 'pending',
  -- what they bought
  product_key TEXT NOT NULL,        -- 'demand_letter_download', 'demand_letter_mail', etc.
  line_items JSONB,                 -- breakdown for receipts
  -- bookkeeping
  paid_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS payments_case_idx ON payments (case_id);
CREATE INDEX IF NOT EXISTS payments_user_idx ON payments (user_id);

CREATE TABLE IF NOT EXISTS audit_log (
  id BIGSERIAL PRIMARY KEY,
  case_id UUID REFERENCES cases(id) ON DELETE SET NULL,
  actor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,         -- e.g. 'case.transition', 'demand.generated', 'payment.succeeded'
  entity_type TEXT,                 -- e.g. 'case', 'demand_letter'
  entity_id UUID,
  ip INET,
  user_agent TEXT,
  request_id TEXT,
  payload JSONB,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS audit_log_case_idx ON audit_log (case_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS audit_log_event_idx ON audit_log (event_type, occurred_at DESC);

-- ============================================================================
-- STUB TABLES (schema only — empty until later phases)
-- ============================================================================

CREATE TABLE IF NOT EXISTS court_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  form_code TEXT NOT NULL,          -- e.g. 'CA_SC100', 'TX_JP_PETITION'
  schema_version INTEGER NOT NULL DEFAULT 1,
  field_values JSONB,
  rendered_pdf_path TEXT,
  filed_at TIMESTAMPTZ,
  efm_envelope_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS court_forms_case_idx ON court_forms (case_id, form_code);

CREATE TABLE IF NOT EXISTS service_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  vendor TEXT NOT NULL,             -- 'lob', 'servenow', 'sheriff', 'self', 'other'
  vendor_ref TEXT,
  status service_attempt_status NOT NULL DEFAULT 'queued',
  attempted_at TIMESTAMPTZ,
  succeeded_at TIMESTAMPTZ,
  proof_doc_id UUID REFERENCES documents(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS service_attempts_case_idx ON service_attempts (case_id);

CREATE TABLE IF NOT EXISTS attorney_review_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  requester_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_attorney_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status review_status NOT NULL DEFAULT 'queued',
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  decision TEXT,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS attorney_reviews_case_idx ON attorney_review_requests (case_id);

-- ============================================================================
-- TRIGGERS — auto-update updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS cases_updated_at ON cases;
CREATE TRIGGER cases_updated_at BEFORE UPDATE ON cases
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS demand_letters_updated_at ON demand_letters;
CREATE TRIGGER demand_letters_updated_at BEFORE UPDATE ON demand_letters
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================================
-- ROW-LEVEL SECURITY
-- ============================================================================

ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE demand_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE court_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE attorney_review_requests ENABLE ROW LEVEL SECURITY;

-- cases: owner can CRUD own; service role bypasses
DROP POLICY IF EXISTS cases_owner_select ON cases;
CREATE POLICY cases_owner_select ON cases
  FOR SELECT USING (owner_user_id = auth.uid());

DROP POLICY IF EXISTS cases_owner_insert ON cases;
CREATE POLICY cases_owner_insert ON cases
  FOR INSERT WITH CHECK (owner_user_id = auth.uid());

DROP POLICY IF EXISTS cases_owner_update ON cases;
CREATE POLICY cases_owner_update ON cases
  FOR UPDATE USING (owner_user_id = auth.uid());

-- demand_letters: scoped through cases
DROP POLICY IF EXISTS demand_letters_owner_select ON demand_letters;
CREATE POLICY demand_letters_owner_select ON demand_letters
  FOR SELECT USING (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
  );

DROP POLICY IF EXISTS demand_letters_owner_modify ON demand_letters;
CREATE POLICY demand_letters_owner_modify ON demand_letters
  FOR ALL USING (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
  ) WITH CHECK (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
  );

-- documents: scoped through cases
DROP POLICY IF EXISTS documents_owner_select ON documents;
CREATE POLICY documents_owner_select ON documents
  FOR SELECT USING (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
  );

DROP POLICY IF EXISTS documents_owner_insert ON documents;
CREATE POLICY documents_owner_insert ON documents
  FOR INSERT WITH CHECK (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
  );

-- payments: user can see their own
DROP POLICY IF EXISTS payments_user_select ON payments;
CREATE POLICY payments_user_select ON payments
  FOR SELECT USING (user_id = auth.uid());

-- audit_log: users can see their own case events; revoked write
DROP POLICY IF EXISTS audit_log_user_select ON audit_log;
CREATE POLICY audit_log_user_select ON audit_log
  FOR SELECT USING (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
  );

-- audit_log is append-only via service role; revoke direct write from authenticated/anon
REVOKE INSERT, UPDATE, DELETE ON audit_log FROM authenticated, anon;
REVOKE UPDATE, DELETE ON audit_log FROM postgres;

-- stub tables: scoped through cases
DROP POLICY IF EXISTS court_forms_owner_select ON court_forms;
CREATE POLICY court_forms_owner_select ON court_forms
  FOR SELECT USING (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
  );

DROP POLICY IF EXISTS service_attempts_owner_select ON service_attempts;
CREATE POLICY service_attempts_owner_select ON service_attempts
  FOR SELECT USING (
    case_id IN (SELECT id FROM cases WHERE owner_user_id = auth.uid())
  );

DROP POLICY IF EXISTS attorney_reviews_owner_select ON attorney_review_requests;
CREATE POLICY attorney_reviews_owner_select ON attorney_review_requests
  FOR SELECT USING (requester_user_id = auth.uid());
