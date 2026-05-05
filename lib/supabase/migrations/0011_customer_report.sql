-- Customer-facing report layer.
--
-- After both the shallow pipeline AND deep research finish, a merge agent
-- reconciles the two packs and a writer produces:
--   * a personalized action checklist (numbered, sequenced)
--   * a comprehensive guide (natural prose mix, no length cap)
--
-- The result is stored as DRAFT until an admin reviews/edits it in a tiptap
-- editor and clicks Publish. Publishing freezes the HTML so subsequent
-- regenerations don't overwrite what the customer is reading.

DO $$ BEGIN
  CREATE TYPE customer_report_status AS ENUM ('pending', 'draft', 'published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE customer_report_confidence AS ENUM ('low', 'medium', 'high');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE case_research_reports
  ADD COLUMN IF NOT EXISTS customer_report_status customer_report_status NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS customer_report_checklist_md TEXT,
  ADD COLUMN IF NOT EXISTS customer_report_guide_md TEXT,
  ADD COLUMN IF NOT EXISTS customer_report_html TEXT,
  ADD COLUMN IF NOT EXISTS customer_report_published_html TEXT,
  ADD COLUMN IF NOT EXISTS customer_report_published_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS customer_report_published_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS merge_summary JSONB,
  ADD COLUMN IF NOT EXISTS overall_confidence customer_report_confidence,
  ADD COLUMN IF NOT EXISTS critical_conflict_detected BOOLEAN NOT NULL DEFAULT false,
  -- The merged pack (post-reconciliation) — same shape as evidence_pack but
  -- combines shallow + deep with conflict resolution applied.
  ADD COLUMN IF NOT EXISTS merged_pack JSONB;

CREATE INDEX IF NOT EXISTS case_research_reports_customer_status_idx
  ON case_research_reports (customer_report_status);
