-- Pre-baked structured extraction over the four state_research call
-- markdowns. Saved once per state via the admin "Extract structured data"
-- button so per-case research reports don't need to re-run gpt-5-mini
-- extraction against the same source dossier every time.
--
-- Shape mirrors case_research_reports.deep_research_pack — same
-- EvidencePack JSON contract — so consumers can read either column
-- with the same code path.

ALTER TABLE state_research
  ADD COLUMN IF NOT EXISTS structured_pack JSONB,
  ADD COLUMN IF NOT EXISTS structured_pack_extracted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS structured_pack_model TEXT,
  ADD COLUMN IF NOT EXISTS structured_pack_cost_cents INTEGER;
