-- Prompt templates for AI-generated content (demand letter, court prep, etc.).
-- Editable from /admin/prompts. Versioned: each save inserts a new row with
-- is_active flipped on the new row and off on the previous one for that key.

CREATE TABLE IF NOT EXISTS prompt_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('system', 'user_template')),
  body TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS prompt_templates_key_active_idx
  ON prompt_templates (key, role) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS prompt_templates_key_version_idx
  ON prompt_templates (key, version DESC);

ALTER TABLE prompt_templates ENABLE ROW LEVEL SECURITY;

-- Only service role reads / writes. Admin UI uses the service role under
-- a server-side admin gate; no direct end-user access.
DROP POLICY IF EXISTS prompt_templates_no_user_access ON prompt_templates;
CREATE POLICY prompt_templates_no_user_access ON prompt_templates
  FOR ALL USING (false);
