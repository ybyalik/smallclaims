-- Drop the per-call extracted deep-research packs.
--   We're moving from "extract once per call (pack_a + pack_b)" to "wait for
--   both calls, concatenate the findings dossiers, extract once into a single
--   deep_research_pack". The single column already exists on the table from
--   migration 0006; we just repurpose it. The raw findings markdown stays
--   split (deep_research_findings_a / _b) since the dossiers themselves are
--   still useful as separate inputs to the merge agent.
--
--   Old jobs lose their pack_a/_b data. The findings markdown stays.

ALTER TABLE case_research_reports
  DROP COLUMN IF EXISTS deep_research_pack_a,
  DROP COLUMN IF EXISTS deep_research_pack_b;
