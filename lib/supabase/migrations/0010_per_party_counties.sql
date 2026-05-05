-- Capture county for each of the three relevant locations:
--   plaintiff_county   — where the plaintiff lives
--   defendant_county   — where the defendant lives or does business
--   incident_county    — where the incident / contract performance occurred
--
-- Venue rules vary by state and claim type, so we capture all three at intake
-- time (auto-derived via Census Bureau geocoder, user-confirmable in the
-- wizard) and let the research pipeline apply the correct rule per case.
--
-- The pre-existing `cases.county` column stays for backwards compatibility;
-- it gets populated with the defendant_county as the default single-county
-- field used by older code paths.

ALTER TABLE cases
  ADD COLUMN IF NOT EXISTS plaintiff_county TEXT,
  ADD COLUMN IF NOT EXISTS defendant_county TEXT,
  ADD COLUMN IF NOT EXISTS incident_county TEXT;

CREATE INDEX IF NOT EXISTS cases_defendant_county_idx
  ON cases (state, defendant_county)
  WHERE defendant_county IS NOT NULL;
