# Supabase migrations

One SQL file per schema or data change against the production Supabase
database. The canonical full schema still lives at `../schema.sql`; files in
this folder are the diff log of what changed and when.

## Convention

- **Filename:** `YYYY-MM-DD_short_description.sql` (e.g.
  `2026-05-10_drop_sms_consent.sql`). Date first so the folder sorts
  chronologically.
- **Header comment:** what changed, why, and whether the migration is safe to
  re-run (idempotent or not).
- **One purpose per file.** Don't bundle unrelated changes.

## Running a migration

The project doesn't use the Supabase CLI's migrations system. Migrations are
applied by running the SQL against the production database via either:

1. **Supabase dashboard SQL editor** (preferred for ad-hoc / first-time runs —
   you see the result before committing).
2. **Supabase Management API** (for automated runs):

   ```bash
   # SUPABASE_ACCESS_TOKEN and SUPABASE_PROJECT_REF live in Vercel prod env.
   # Pull them with: vercel env pull /tmp/v.env --environment=production
   curl -X POST "https://api.supabase.com/v1/projects/$REF/database/query" \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d "$(jq -Rs '{query: .}' < path/to/migration.sql)"
   ```

After running, mark the file as applied by appending the run date and result
to its header (or commit a follow-up note). No state table tracks applied
migrations — the audit lives in this folder + git history.

## Why not the Supabase CLI

The CLI's local-shadow-database flow doesn't fit the way this project edits
schema (direct against prod, infrequent, hand-reviewed). Adding it later is
fine; this convention keeps the door open.
