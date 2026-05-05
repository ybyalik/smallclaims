-- Case research v2:
--   - Track provenance on every fetched source so the admin UI can separate
--     Tavily/Firecrawl results from Deep Research findings and parsed form PDFs.
--   - Store the Deep Research evidence pack and OpenAI response id alongside
--     the regular evidence pack (they're produced in parallel).
--   - Store parsed form specs (fillable fields per form PDF).

DO $$ BEGIN
  CREATE TYPE case_research_provenance AS ENUM (
    'tavily',
    'firecrawl',
    'bright_data',
    'deep_research',
    'form_pdf'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE case_research_sources
  ADD COLUMN IF NOT EXISTS provenance case_research_provenance NOT NULL DEFAULT 'firecrawl';

CREATE INDEX IF NOT EXISTS case_research_sources_provenance_idx
  ON case_research_sources (provenance);

ALTER TABLE case_research_reports
  ADD COLUMN IF NOT EXISTS deep_research_pack JSONB,
  ADD COLUMN IF NOT EXISTS deep_research_response_id TEXT,
  ADD COLUMN IF NOT EXISTS form_specs JSONB;
