-- Case-specific filing research pipeline (Stage 1).
-- Stores per-case research jobs, the structured evidence pack, the rendered
-- markdown report, and a cache of fetched official sources.
--
-- Retention: permanent. Nothing here is auto-pruned.
-- All access via service-role client; no end-user RLS for now (admin-only UI).

DO $$ BEGIN
  CREATE TYPE case_research_status AS ENUM (
    'queued',
    'running',
    'succeeded',
    'failed',
    'canceled'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE case_research_visibility AS ENUM ('admin', 'customer');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE case_research_tier AS ENUM ('basic', 'comprehensive');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS case_research_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  status case_research_status NOT NULL DEFAULT 'queued',
  visibility case_research_visibility NOT NULL DEFAULT 'admin',
  tier case_research_tier NOT NULL DEFAULT 'comprehensive',
  idempotency_key TEXT NOT NULL UNIQUE,
  inngest_event_id TEXT,
  started_at TIMESTAMPTZ,
  finished_at TIMESTAMPTZ,
  error_message TEXT,
  attempt INTEGER NOT NULL DEFAULT 0,
  model_versions JSONB NOT NULL DEFAULT '{}'::jsonb,
  cost_cents INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (case_id, version)
);

CREATE INDEX IF NOT EXISTS case_research_jobs_case_idx ON case_research_jobs (case_id);
CREATE INDEX IF NOT EXISTS case_research_jobs_status_idx ON case_research_jobs (status);

CREATE TABLE IF NOT EXISTS case_research_reports (
  job_id UUID PRIMARY KEY REFERENCES case_research_jobs(id) ON DELETE CASCADE,
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  evidence_pack JSONB NOT NULL,
  report_markdown TEXT NOT NULL,
  qa_passed BOOLEAN NOT NULL DEFAULT false,
  qa_notes JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS case_research_reports_case_idx ON case_research_reports (case_id);

CREATE TABLE IF NOT EXISTS case_research_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  url_hash TEXT NOT NULL UNIQUE,
  domain TEXT NOT NULL,
  is_official BOOLEAN NOT NULL DEFAULT false,
  title TEXT,
  mime_type TEXT,
  byte_size INTEGER,
  content_text TEXT,
  content_markdown TEXT,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS case_research_sources_domain_idx ON case_research_sources (domain);

CREATE TABLE IF NOT EXISTS case_research_job_sources (
  job_id UUID NOT NULL REFERENCES case_research_jobs(id) ON DELETE CASCADE,
  source_id UUID NOT NULL REFERENCES case_research_sources(id) ON DELETE CASCADE,
  cite_role TEXT NOT NULL DEFAULT 'supporting',
  PRIMARY KEY (job_id, source_id)
);

ALTER TABLE case_research_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_research_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_research_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_research_job_sources ENABLE ROW LEVEL SECURITY;

-- No end-user policies for now: all reads/writes go through the service-role
-- client from server routes and Inngest functions. When we expose to customers
-- (visibility = 'customer'), add a SELECT policy keyed off cases.owner_user_id.
