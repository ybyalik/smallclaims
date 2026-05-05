-- Store the full long-form Deep Research narrative (typically 10-50 pages of
-- markdown) in addition to the structured JSON pack. Until now we were forcing
-- Deep Research into JSON-only output, which threw away ~95% of what it
-- produces. The new prompt asks for both: a long narrative AND a JSON appendix.

ALTER TABLE case_research_reports
  ADD COLUMN IF NOT EXISTS deep_research_report_md TEXT;
