-- One row per state, holding the full plain-language guide as a single
-- markdown blob plus the prompt + pack inputs that produced it.
--
-- We keep the inputs (brief_version + pack_version) so we can detect
-- when a state needs a re-generate (e.g. after the brief changes or the
-- underlying structured_pack is re-extracted).
--
-- Storage shape is intentionally simple: one body_md TEXT per state.
-- Tables, FAQ, key-facts grid, etc. live inline in the markdown and are
-- parsed at render time by the page template. If we later need to surface
-- structured pieces (e.g. JSON-LD FAQPage), we extract them from the
-- markdown rather than splitting storage.

CREATE TABLE IF NOT EXISTS state_guide_v2 (
  state_slug    TEXT PRIMARY KEY,
  body_md       TEXT NOT NULL,
  model         TEXT NOT NULL,
  brief_version TEXT NOT NULL,
  pack_version  TEXT,
  generated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  input_tokens  INTEGER,
  output_tokens INTEGER,
  cost_cents    INTEGER
);

ALTER TABLE state_guide_v2 ENABLE ROW LEVEL SECURITY;

-- Only the service role reads / writes. The public state page renders
-- via the service-role client on the server, so end users never hit this
-- table directly.
