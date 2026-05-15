-- Post-Judgment Collection Plan product.
--
-- One row per (case_id, version). On purchase a row is inserted in
-- status='pending' and the background generator progresses through
-- county_researching → sequencing → generating_report → ready. A failure at
-- any stage stamps status='failed' with error_message and leaves the row
-- intact for admin retry / inspection.
--
-- intake     : { judgment_amount_cents, knows_employer, knows_real_property,
--                knows_bank, notes }
-- county_pack: CountyPack JSON (forms / fees / sheriff contact for THIS
--              user's county, fetched once at purchase via Tavily + Firecrawl)
-- sequence   : CollectionSequence JSON (LLM-ranked plan)
-- body_md    : final markdown report rendered to the user

CREATE TABLE IF NOT EXISTS collection_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  intake JSONB NOT NULL,
  county_pack JSONB,
  sequence JSONB,
  body_md TEXT,
  pdf_storage_path TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  error_message TEXT,
  generated_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (case_id, version)
);

CREATE INDEX IF NOT EXISTS collection_plans_case_idx ON collection_plans(case_id);
CREATE INDEX IF NOT EXISTS collection_plans_status_idx ON collection_plans(status);
