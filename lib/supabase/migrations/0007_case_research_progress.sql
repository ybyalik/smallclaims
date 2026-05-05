-- Per-branch live progress for the case research pipeline. The pipeline runs
-- shallow + deep + forms in parallel/sequence, and the admin panel needs
-- finer-grained visibility than the single-row job status while a job is
-- in flight. We persist progress as JSONB updated incrementally so the UI
-- can poll the same row.

ALTER TABLE case_research_jobs
  ADD COLUMN IF NOT EXISTS progress JSONB NOT NULL DEFAULT '{}'::jsonb;
