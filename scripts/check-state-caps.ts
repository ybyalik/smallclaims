// Quick audit: list which states return a usable claim_limit_dollars from
// state_research, and which don't.
//
// Usage: npx tsx scripts/check-state-caps.ts
//
// Reads .env.local for Supabase credentials.

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { STATES } from "../lib/states";

// Tiny .env.local parser so we don't depend on the dotenv package.
function loadDotenv(path: string) {
  try {
    const raw = readFileSync(path, "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!m) continue;
      const key = m[1];
      let val = m[2];
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // file missing → fall through, will fail loudly below
  }
}
loadDotenv(".env.local");

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE ||
    process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    console.error(
      "Missing SUPABASE creds. Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
    process.exit(1);
  }
  const db = createClient(url, key, { auth: { persistSession: false } });

  const { data, error } = await db
    .from("state_research")
    .select("slug, state_name, structured_pack");
  if (error) {
    console.error("Supabase error:", error.message);
    process.exit(1);
  }

  const caps = new Map<string, { state: string; cap: unknown }>();
  for (const row of data || []) {
    const slug = (row as { slug: string }).slug;
    const name = (row as { state_name?: string }).state_name || slug;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pack: any = (row as { structured_pack?: unknown }).structured_pack;
    const cap = pack?.claim_limit_dollars;
    caps.set(slug, { state: name, cap });
  }

  const withCap: Array<{ state: string; slug: string; cap: number }> = [];
  const zeroOrNonNumeric: Array<{ state: string; slug: string; cap: unknown }> = [];
  const missingFromDb: Array<{ state: string; slug: string }> = [];

  for (const s of STATES) {
    const entry = caps.get(s.slug);
    if (!entry) {
      missingFromDb.push({ state: s.name, slug: s.slug });
      continue;
    }
    if (typeof entry.cap === "number" && entry.cap > 0) {
      withCap.push({ state: s.name, slug: s.slug, cap: entry.cap });
    } else {
      zeroOrNonNumeric.push({ state: s.name, slug: s.slug, cap: entry.cap });
    }
  }

  // Sort with caps ascending
  withCap.sort((a, b) => a.cap - b.cap);

  console.log(`\n=== State cap audit ===`);
  console.log(`Canonical states: ${STATES.length}`);
  console.log(`In state_research: ${caps.size}`);
  console.log(`With usable cap: ${withCap.length}`);
  console.log(`Zero / non-numeric cap: ${zeroOrNonNumeric.length}`);
  console.log(`Missing from DB entirely: ${missingFromDb.length}`);

  if (withCap.length) {
    console.log(`\nMin cap: $${withCap[0].cap.toLocaleString("en-US")} (${withCap[0].state})`);
    console.log(
      `Max cap: $${withCap[withCap.length - 1].cap.toLocaleString("en-US")} (${
        withCap[withCap.length - 1].state
      })`
    );
  }

  if (zeroOrNonNumeric.length) {
    console.log(`\n--- States with zero / non-numeric cap (${zeroOrNonNumeric.length}) ---`);
    for (const r of zeroOrNonNumeric) {
      console.log(`  ${r.state.padEnd(24)}  cap = ${JSON.stringify(r.cap)}`);
    }
  }

  if (missingFromDb.length) {
    console.log(`\n--- States with no state_research row (${missingFromDb.length}) ---`);
    for (const r of missingFromDb) {
      console.log(`  ${r.state.padEnd(24)}  (slug: ${r.slug})`);
    }
  }

  console.log("");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
