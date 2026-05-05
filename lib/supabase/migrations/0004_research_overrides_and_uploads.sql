-- 0004_research_overrides_and_uploads.sql
--
-- 1. research_overrides: lets admins edit the state-research markdown
--    persistently (the on-disk reports/*.md files are bundled at deploy
--    time and Vercel's runtime filesystem is read-only). Edits made in
--    the admin UI are saved here; lib/research.ts checks this table
--    first, falls back to the bundled file.
--
-- 2. uploads bucket: holds blog cover images and inline editor images
--    (and anything else the admin uploads). Public-read so the URLs
--    work directly in <img src>; writes gated behind service-role
--    (used only from authenticated admin endpoints).

-- ============================================================================
-- 1. Research overrides
-- ============================================================================

CREATE TABLE IF NOT EXISTS research_overrides (
  slug TEXT PRIMARY KEY,
  markdown TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE research_overrides ENABLE ROW LEVEL SECURITY;

-- Admins can read/write. RLS check uses the profiles.is_admin flag.
DROP POLICY IF EXISTS "research_overrides admin all" ON research_overrides;
CREATE POLICY "research_overrides admin all"
ON research_overrides
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid() AND profiles.is_admin = true
  )
);

-- ============================================================================
-- 2. Uploads storage bucket
-- ============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Anyone can read (public bucket). Writes happen via service-role only.
DROP POLICY IF EXISTS "uploads public read" ON storage.objects;
CREATE POLICY "uploads public read"
ON storage.objects
FOR SELECT
USING (bucket_id = 'uploads');
