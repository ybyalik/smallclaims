-- Store a pre-rendered HTML copy of the report body alongside the markdown
-- source. body_md remains the canonical source for new generations; body_html
-- is what the customer view and the admin TipTap editor read so we don't
-- re-render markdown on every page load and so hand-edits round-trip cleanly.

ALTER TABLE collection_plans
  ADD COLUMN IF NOT EXISTS body_html TEXT;
