-- Add state_findings_md column to case_research_reports.
--
-- Replaces the per-case deep_research_findings_a / deep_research_findings_b
-- pair. The case pipeline no longer submits its own o3-deep-research calls;
-- it loads the pre-baked state_research row for the case's state and
-- concatenates the four call markdowns into this single field.
--
-- The old _a / _b columns are kept (not dropped) so historical job rows
-- remain readable. They can be dropped in a later migration once we no
-- longer need to look at any pre-cutover job.

ALTER TABLE case_research_reports
  ADD COLUMN IF NOT EXISTS state_findings_md TEXT;
