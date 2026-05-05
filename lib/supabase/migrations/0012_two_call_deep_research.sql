-- Two-call deep research:
--   The single 21-section deep research call ran out of token budget before it
--   could finish writing (reasoning + 33 web searches consumed the 80k cap).
--   Splitting it into two parallel calls (A: pre-filing/filing sections 1-11,
--   B: hearing-through-collection sections 12-21), each in findings/bullets
--   format, and merging the results with an AI agent.
--
--   New columns mirror the existing single-call columns but per call.
--   The legacy deep_research_response_id / deep_research_pack /
--   deep_research_report_md columns are kept for now as a fallback during
--   rollout; new jobs populate the _a / _b columns instead.

ALTER TABLE case_research_reports
  ADD COLUMN IF NOT EXISTS deep_research_response_id_a TEXT,
  ADD COLUMN IF NOT EXISTS deep_research_response_id_b TEXT,
  ADD COLUMN IF NOT EXISTS deep_research_findings_a TEXT,
  ADD COLUMN IF NOT EXISTS deep_research_findings_b TEXT,
  ADD COLUMN IF NOT EXISTS deep_research_pack_a JSONB,
  ADD COLUMN IF NOT EXISTS deep_research_pack_b JSONB;
