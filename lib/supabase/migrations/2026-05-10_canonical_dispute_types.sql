-- Add 9 canonical dispute-type enum values that match the SEO hub pages.
-- These replace the older mishmash (tenant_landlord, poor_construction,
-- unpaid_debt, defective_product_or_service, auto_accident_or_repair, etc.)
-- as the source of truth for new code. The old values stay in the enum for
-- now so any reference doesn't error; new code emits only the canonical 9.
--
-- Idempotent: ADD VALUE IF NOT EXISTS.

ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'landlord';
ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'contractor';
ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'employer';
ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'auto';
ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'neighbor';
ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'personal_loan';
ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'roommate';
ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'online_seller';
ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'refund';
