/**
 * Build-time snapshot: fetches state_research from Supabase once and
 * writes it to lib/state-data/snapshot.json. The wizard's per-claim
 * tables (getClaimStateTable / getAllStateCaps) read from this snapshot
 * during static page generation, so each of the ~80 issue pages no
 * longer needs its own Supabase round-trip.
 *
 * Run automatically as part of `npm run build` (see package.json
 * `prebuild` hook). The script is safe to skip if the Supabase env
 * vars aren't set — by-claim.ts falls back to live fetches in that
 * case.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const outPath = resolve(__dirname, "../lib/state-data/snapshot.json");

// How many rows already exist in a snapshot on disk (0 if none / unreadable).
function existingSnapshotCount(): number {
  try {
    if (!existsSync(outPath)) return 0;
    const parsed = JSON.parse(readFileSync(outPath, "utf8"));
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

// The issue/state pages render legal data (filing deadlines, damage caps) from
// this snapshot. Shipping ~80 pages with EMPTY legal data is worse than a
// blocked deploy, so when we can't produce good data and have no usable
// snapshot to fall back on, fail the build loudly instead of silently
// publishing broken pages.
function bailOrKeepStale(reason: string): never {
  const existing = existingSnapshotCount();
  if (existing > 0) {
    console.warn(
      `[snapshot] ${reason} — keeping existing snapshot of ${existing} rows (stale).`,
    );
    process.exit(0);
  }
  console.error(
    `[snapshot] ${reason} — and no existing snapshot to fall back on. ` +
      `Failing the build rather than shipping legal pages with missing data.`,
  );
  process.exit(1);
}

if (!url || !key) {
  bailOrKeepStale("SUPABASE env vars not set");
}

const supabase: any = createClient(url as string, key as string, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function run() {
  const t0 = Date.now();
  const { data, error } = await supabase
    .from("state_research")
    .select("slug, state_name, structured_pack");

  if (error) {
    console.error("[snapshot] Supabase error:", error);
    bailOrKeepStale("Supabase query failed");
  }

  const rows = Array.isArray(data) ? data : [];
  if (rows.length === 0) {
    // Never overwrite a good snapshot with an empty one, and never ship empty.
    bailOrKeepStale("query returned zero state rows");
  }

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(rows, null, 0));
  console.log(
    `[snapshot] wrote ${rows.length} state rows in ${Date.now() - t0}ms -> ${outPath}`
  );
}

run().catch((err) => {
  console.error("[snapshot] failed:", err);
  bailOrKeepStale("snapshot script threw");
});
