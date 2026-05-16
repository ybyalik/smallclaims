#!/usr/bin/env node
// Reset a single state_research call back to empty (status null) so it can
// be re-submitted from the admin UI. Use when a call ended up "failed" for
// a transient reason and you don't want the failed row blocking a re-run.
//
// Usage:
//   node scripts/reset-state-research-call.mjs <slug> <call>
//   node scripts/reset-state-research-call.mjs delaware 2

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const envPath = resolve(ROOT, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) {
      // Strip surrounding quotes if present (matches dotenv behavior).
      let v = m[2];
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      process.env[m[1]] = v;
    }
  }
}

const slug = process.argv[2];
const call = Number(process.argv[3]);
if (!slug || !Number.isInteger(call) || call < 1 || call > 4) {
  console.error("Usage: node scripts/reset-state-research-call.mjs <slug> <call 1-4>");
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const prefix = `call_${call}`;
const patch = {
  [`${prefix}_status`]: null,
  [`${prefix}_error`]: null,
  [`${prefix}_response_id`]: null,
  [`${prefix}_batch_id`]: null,
  [`${prefix}_via`]: null,
  [`${prefix}_model`]: null,
  [`${prefix}_input_tokens`]: null,
  [`${prefix}_output_tokens`]: null,
  [`${prefix}_cost_cents`]: null,
  [`${prefix}_markdown`]: null,
  [`${prefix}_started_at`]: null,
  [`${prefix}_completed_at`]: null,
  updated_at: new Date().toISOString(),
};

const res = await fetch(`${url}/rest/v1/state_research?slug=eq.${encodeURIComponent(slug)}`, {
  method: "PATCH",
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  },
  body: JSON.stringify(patch),
});

if (!res.ok) {
  const txt = await res.text();
  console.error(`PATCH failed (${res.status}): ${txt}`);
  process.exit(1);
}

const rows = await res.json();
if (!Array.isArray(rows) || rows.length === 0) {
  console.error(`No row matched slug "${slug}"`);
  process.exit(1);
}

console.log(`Reset slug=${slug} call=${call}. Row now reports:`);
const row = rows[0];
for (const k of [
  `${prefix}_status`,
  `${prefix}_error`,
  `${prefix}_response_id`,
  `${prefix}_markdown`,
]) {
  console.log(`  ${k}: ${row[k] === null ? "null" : `(${String(row[k]).slice(0, 40)}...)`}`);
}
