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

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.warn("[snapshot] SUPABASE env vars not set; skipping snapshot");
  process.exit(0);
}

const supabase: any = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function run() {
  const t0 = Date.now();
  const { data, error } = await supabase
    .from("state_research")
    .select("slug, state_name, structured_pack");

  if (error) {
    console.error("[snapshot] Supabase error:", error);
    process.exit(0); // don't fail the build, just leave the snapshot stale
  }

  const rows = Array.isArray(data) ? data : [];
  const outPath = resolve(__dirname, "../lib/state-data/snapshot.json");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(rows, null, 0));
  console.log(
    `[snapshot] wrote ${rows.length} state rows in ${Date.now() - t0}ms -> ${outPath}`
  );
}

run().catch((err) => {
  console.error("[snapshot] failed:", err);
  process.exit(0); // never block the build
});
