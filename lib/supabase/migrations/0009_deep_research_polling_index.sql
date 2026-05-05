-- Decoupled deep research lookup. The webhook and the safety-net cron both
-- need to find jobs where progress.deep.status = 'polling'. A partial index on
-- the JSONB path makes this cheap regardless of how many succeeded jobs we
-- accumulate.

CREATE INDEX IF NOT EXISTS case_research_jobs_deep_polling_idx
  ON case_research_jobs ((progress -> 'deep' ->> 'status'))
  WHERE progress -> 'deep' ->> 'status' = 'polling';
