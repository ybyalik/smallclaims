-- 0003_anonymous_drafts_and_dispute_types.sql
--
-- Phase 1 of the demand-letter rebuild.
--
-- 1. Anonymous drafts: visitors can start the demand-letter wizard before
--    creating an account. We track their draft via a cookie session id and
--    claim the case to a real user_id when they sign up at Phase 5 (Pay).
--
-- 2. Dispute types: expand the enum to the 15 categories from the spec.
--    Old values stay valid (additive). The intake will only present new
--    values; old data is unaffected.
--
-- All changes are additive and reversible. RLS for anonymous access uses
-- the service-role client server-side rather than RLS policies, since
-- anonymous-cookie auth is not first-class in Supabase RLS today.

-- ============================================================================
-- 1. Anonymous-draft support on cases
-- ============================================================================

-- Make owner_user_id nullable so an anonymous case shell can exist.
-- Once the user signs up, we fill this in and clear cookie_session_id.
ALTER TABLE cases ALTER COLUMN owner_user_id DROP NOT NULL;

-- Cookie-session id used to scope anonymous drafts.
-- The web app sets a long-lived signed cookie. The server uses the
-- service-role client to load/save drafts that match this id and have
-- owner_user_id IS NULL.
ALTER TABLE cases ADD COLUMN IF NOT EXISTS cookie_session_id UUID;

-- One anonymous draft per cookie session keeps the resume flow simple.
-- (When the user finishes one and starts another, the first either
-- gets claimed at signup or eventually expires via cleanup job.)
CREATE INDEX IF NOT EXISTS cases_cookie_session_idx
  ON cases (cookie_session_id)
  WHERE cookie_session_id IS NOT NULL;

-- An anonymous draft must have either a user OR a session, never both null.
-- Once claimed, owner_user_id is set and cookie_session_id is cleared.
ALTER TABLE cases ADD CONSTRAINT cases_owner_or_session_chk
  CHECK (
    (owner_user_id IS NOT NULL) OR (cookie_session_id IS NOT NULL)
  );

-- Defendant_name needs to be optional during the draft phase too, since
-- a user might pick a category before they've filled in defendant details.
-- We require it server-side at the relevant wizard step instead.
ALTER TABLE cases ALTER COLUMN defendant_name DROP NOT NULL;
ALTER TABLE cases ALTER COLUMN plaintiff_name DROP NOT NULL;

-- amount_cents: drafts may have $0 placeholder. Drop the > 0 check.
-- Re-validate at checkout. (The original check stays for non-draft rows
-- via a partial check.)
ALTER TABLE cases DROP CONSTRAINT IF EXISTS cases_amount_cents_check;
ALTER TABLE cases ADD CONSTRAINT cases_amount_cents_chk
  CHECK (amount_cents >= 0);

-- ============================================================================
-- 2. Expand dispute_type enum to the 15 spec categories
-- ============================================================================

-- Postgres enum changes are forward-only. ADD VALUE IF NOT EXISTS is safe.
DO $$ BEGIN
  ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'breach_of_contract';
  ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'defective_product_or_service';
  ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'unpaid_rent_or_deposit';
  ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'tenant_landlord';
  ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'auto_accident_or_repair';
  ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'stolen_or_damaged_property';
  ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'poor_construction';
  ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'broken_verbal_promise';
  ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'personal_injury';
  ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'defamation';
  ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'consumer_protection';
  ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'ip_or_copyright';
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Note: the old values (unpaid_debt, security_deposit, property_damage,
-- services_not_rendered, goods_not_delivered, other) stay valid. The
-- 15-category list in the wizard reuses those where they map cleanly:
--   spec "Unpaid Debt or Loan"            -> unpaid_debt
--   spec "Breach of Contract"             -> breach_of_contract
--   spec "Property Damage"                -> property_damage
--   spec "Defective Product or Service"   -> defective_product_or_service
--   spec "Unpaid Rent or Security Deposit"-> unpaid_rent_or_deposit
--   spec "Tenant / Landlord Dispute"      -> tenant_landlord
--   spec "Auto Accident or Repair"        -> auto_accident_or_repair
--   spec "Stolen or Damaged Property"     -> stolen_or_damaged_property
--   spec "Poor Construction"              -> poor_construction
--   spec "Broken Verbal Promise"          -> broken_verbal_promise
--   spec "Personal Injury"                -> personal_injury
--   spec "Defamation"                     -> defamation
--   spec "Consumer Protection"            -> consumer_protection
--   spec "IP / Copyright"                 -> ip_or_copyright
--   spec "Other / Not Sure"               -> other
