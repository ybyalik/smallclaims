-- Cache the AI-generated court-prep content (opening statement + likely
-- judge questions + key facts + things-not-to-say) so we don't regenerate
-- on every page view. Stored on cases as JSONB to avoid a child table for
-- what is effectively a 1:1 relationship.
--
-- Shape: see lib/court-prep/types.ts.
--
-- Idempotent.

ALTER TABLE cases ADD COLUMN IF NOT EXISTS court_prep_content JSONB;
