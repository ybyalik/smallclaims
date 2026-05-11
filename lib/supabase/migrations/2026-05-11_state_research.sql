-- State-level deep research: one row per US state.
--
-- Replaces the per-case deep research model for the state-law layer. Four
-- independent OpenAI deep-research calls populate this row over ~30 minutes
-- (background mode). Each call has its own status, response_id, markdown,
-- and metadata so we can retry individual calls without redoing the whole
-- state.
--
-- The four calls:
--   1. Court structure, venue, jurisdiction, and scope
--   2. Deadlines and pre-filing requirements
--   3. Defendant identification, forms, fees, filing methods, service
--   4. Hearing process, settlement, appeals, post-judgment collection

CREATE TABLE IF NOT EXISTS state_research (
  slug         TEXT PRIMARY KEY,
  state_name   TEXT NOT NULL,

  -- Call 1 ----------------------------------------------------------------
  call_1_markdown      TEXT,
  call_1_response_id   TEXT,
  call_1_model         TEXT,
  call_1_input_tokens  INT,
  call_1_output_tokens INT,
  call_1_cost_cents    INT,
  call_1_status        TEXT, -- 'pending' | 'running' | 'done' | 'failed'
  call_1_error         TEXT,
  call_1_started_at    TIMESTAMPTZ,
  call_1_completed_at  TIMESTAMPTZ,

  -- Call 2 ----------------------------------------------------------------
  call_2_markdown      TEXT,
  call_2_response_id   TEXT,
  call_2_model         TEXT,
  call_2_input_tokens  INT,
  call_2_output_tokens INT,
  call_2_cost_cents    INT,
  call_2_status        TEXT,
  call_2_error         TEXT,
  call_2_started_at    TIMESTAMPTZ,
  call_2_completed_at  TIMESTAMPTZ,

  -- Call 3 ----------------------------------------------------------------
  call_3_markdown      TEXT,
  call_3_response_id   TEXT,
  call_3_model         TEXT,
  call_3_input_tokens  INT,
  call_3_output_tokens INT,
  call_3_cost_cents    INT,
  call_3_status        TEXT,
  call_3_error         TEXT,
  call_3_started_at    TIMESTAMPTZ,
  call_3_completed_at  TIMESTAMPTZ,

  -- Call 4 ----------------------------------------------------------------
  call_4_markdown      TEXT,
  call_4_response_id   TEXT,
  call_4_model         TEXT,
  call_4_input_tokens  INT,
  call_4_output_tokens INT,
  call_4_cost_cents    INT,
  call_4_status        TEXT,
  call_4_error         TEXT,
  call_4_started_at    TIMESTAMPTZ,
  call_4_completed_at  TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index to find rows that have any call currently running (used by the
-- polling cron to know what to check on OpenAI).
CREATE INDEX IF NOT EXISTS state_research_running_idx
  ON state_research (slug)
  WHERE call_1_status = 'running'
     OR call_2_status = 'running'
     OR call_3_status = 'running'
     OR call_4_status = 'running';

-- RLS: admin-only via service-role. Block all anon/authenticated access.
ALTER TABLE state_research ENABLE ROW LEVEL SECURITY;
