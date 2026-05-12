-- Batch-API mode for state research.
--
-- Adds two columns per call to track whether it was submitted via
-- background mode (~30 min, full price) or batch mode (up to 24h, 50% off
-- input/output tokens). Each call is independent: a single state can have
-- some calls in background and others in batch.
--
-- call_N_via:       'background' | 'batch' — which mode this call used.
--                   Defaults to 'background' to match the existing flow.
-- call_N_batch_id:  OpenAI batch ID (e.g., batch_abc123). Populated only
--                   when call_N_via = 'batch'. The cron polls this ID when
--                   present; otherwise it polls call_N_response_id.

ALTER TABLE state_research
  ADD COLUMN IF NOT EXISTS call_1_via TEXT DEFAULT 'background',
  ADD COLUMN IF NOT EXISTS call_1_batch_id TEXT,
  ADD COLUMN IF NOT EXISTS call_2_via TEXT DEFAULT 'background',
  ADD COLUMN IF NOT EXISTS call_2_batch_id TEXT,
  ADD COLUMN IF NOT EXISTS call_3_via TEXT DEFAULT 'background',
  ADD COLUMN IF NOT EXISTS call_3_batch_id TEXT,
  ADD COLUMN IF NOT EXISTS call_4_via TEXT DEFAULT 'background',
  ADD COLUMN IF NOT EXISTS call_4_batch_id TEXT;
