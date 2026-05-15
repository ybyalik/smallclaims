-- Editable overrides for the four state-research deep-research prompts.
-- One row per call (1-4). When a row is missing for a call, the runner
-- falls back to the in-code default in lib/state-research/prompts.ts.
--
-- The stored text uses the literal placeholder [STATE NAME] which the
-- runner substitutes with the real state name at submit time.

CREATE TABLE IF NOT EXISTS state_research_prompts (
  call_id SMALLINT PRIMARY KEY CHECK (call_id IN (1, 2, 3, 4)),
  prompt_text TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID
);
