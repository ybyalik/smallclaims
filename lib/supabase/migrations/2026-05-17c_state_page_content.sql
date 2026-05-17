-- Plain-language explainer content for the public state pages,
-- keyed per (state, section). Generated from state_research.structured_pack
-- via scripts/generate-state-page-content.ts using gpt-5-mini.
--
-- One row per section. The page template renders the structured pack
-- data directly (fee tiers, SOL entries, etc.) and pulls the matching
-- plain-language explainer from this table.
--
-- pack_version is a cheap mtime-like marker: bump the source pack ->
-- the generated content is "stale" and the admin tool can re-run for
-- that state.

CREATE TABLE IF NOT EXISTS state_page_content (
  state_slug    TEXT NOT NULL,
  section_key   TEXT NOT NULL,
  body_md       TEXT NOT NULL,
  generated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  pack_version  INTEGER NOT NULL DEFAULT 0,
  model         TEXT,
  PRIMARY KEY (state_slug, section_key)
);

CREATE INDEX IF NOT EXISTS state_page_content_slug_idx
  ON state_page_content (state_slug);

ALTER TABLE state_page_content ENABLE ROW LEVEL SECURITY;

-- Only the service role reads/writes. The public site uses the service
-- role on the server to render pages; end users never hit this table
-- directly.
