-- Optional saved default for the plaintiff side of a case.
--
-- A user can set their typical filer identity once in /dashboard/settings
-- (individual or business, plus a US postal address). At case creation
-- time the plaintiff step shows a "Use my saved address" button that
-- populates the form from these fields. The fields are all optional — the
-- user can leave them empty and nothing changes.

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS default_entity_type TEXT,         -- 'individual' | 'business' | null
  ADD COLUMN IF NOT EXISTS default_business_name TEXT,        -- only meaningful when default_entity_type = 'business'
  ADD COLUMN IF NOT EXISTS default_address JSONB,             -- { line1, city, state, zip } matching PostalAddress
  ADD COLUMN IF NOT EXISTS default_county TEXT;
