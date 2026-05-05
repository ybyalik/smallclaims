#!/usr/bin/env node
// Harvest: scan reports/*-openai.id, query OpenAI for each, save .md/.json/.raw.json
// for any that have status=completed. Leave in_progress alone. Delete .id for failed.
//
// Usage: node scripts/harvest-completed.mjs

import { readFileSync, writeFileSync, existsSync, readdirSync, unlinkSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const envPath = resolve(ROOT, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Missing OPENAI_API_KEY");
  process.exit(1);
}

const MODEL = "o3-deep-research";
const reportsDir = resolve(ROOT, "reports");
const headers = { Authorization: `Bearer ${API_KEY}` };

const titleCase = (slug) =>
  slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

function paths(slug) {
  return {
    md: resolve(reportsDir, `${slug}-openai.md`),
    raw: resolve(reportsDir, `${slug}-openai.raw.json`),
    meta: resolve(reportsDir, `${slug}-openai.json`),
    id: resolve(reportsDir, `${slug}-openai.id`),
  };
}

function extractText(result) {
  const parts = [];
  for (const o of result.output || []) {
    if (o.type === "message" && Array.isArray(o.content)) {
      for (const c of o.content) {
        if ((c.type === "output_text" || c.type === "text") && c.text) {
          parts.push(c.text);
        }
      }
    }
  }
  return parts.length ? parts.join("\n\n") : null;
}

// Detect partial reports. See run-states-sequential.mjs for full discussion of
// the failure modes (low tokens, missing sections, restart pattern, duplication).
function checkCompleteness(result, text) {
  const outTokens = result.usage?.output_tokens ?? 0;
  if (outTokens < 30000) {
    return { ok: false, reason: `only ${outTokens} output tokens (full reports are 30K+)` };
  }
  const seq = [];
  const re = /^## (\d+)\./gm;
  let m;
  while ((m = re.exec(text)) !== null) seq.push(parseInt(m[1], 10));
  const uniqueSections = new Set(seq);
  if (uniqueSections.size < 17) {
    return { ok: false, reason: `only ${uniqueSections.size} of 19 sections found (${[...uniqueSections].sort((a,b)=>a-b).join(",")})` };
  }
  let maxSeen = 0;
  for (const n of seq) {
    if (n < maxSeen - 1) {
      return { ok: false, reason: `section restart detected: section ${n} appears after section ${maxSeen}` };
    }
    if (n > maxSeen) maxSeen = n;
  }
  const counts = {};
  for (const n of seq) counts[n] = (counts[n] || 0) + 1;
  for (const [n, count] of Object.entries(counts)) {
    if (count >= 3) {
      return { ok: false, reason: `section ${n} appears ${count} times (heavy duplication)` };
    }
  }
  if (!/^## Sources/m.test(text)) {
    return { ok: false, reason: "missing Sources section" };
  }
  return { ok: true };
}

function saveResult(slug, result) {
  const stateTitle = titleCase(slug);
  const text = extractText(result);
  if (!text) throw new Error("no text in response");
  const completeness = checkCompleteness(result, text);
  if (!completeness.ok) {
    throw new Error(`PARTIAL: ${completeness.reason}`);
  }
  const p = paths(slug);
  writeFileSync(p.raw, JSON.stringify(result, null, 2));
  const header = `# Small Claims in ${stateTitle} (${MODEL})\n\n_Harvested on ${new Date().toISOString()}_\n\n---\n\n`;
  writeFileSync(p.md, header + text);
  writeFileSync(
    p.meta,
    JSON.stringify(
      {
        id: result.id,
        state: stateTitle,
        model: MODEL,
        usage: result.usage || null,
        completedAt: new Date().toISOString(),
      },
      null,
      2
    )
  );
}

const idFiles = readdirSync(reportsDir).filter((f) => f.endsWith("-openai.id"));
console.log(`Scanning ${idFiles.length} .id files...\n`);

const summary = { completed: [], in_progress: [], failed: [], already_saved: [], partial: [] };

for (const f of idFiles) {
  const slug = f.replace(/-openai\.id$/, "");
  const p = paths(slug);
  if (existsSync(p.md)) {
    summary.already_saved.push(slug);
    continue;
  }
  const id = readFileSync(p.id, "utf8").trim();
  let r;
  try {
    const res = await fetch(`https://api.openai.com/v1/responses/${id}`, { headers });
    if (!res.ok) {
      console.log(`  ${slug.padEnd(22)} HTTP ${res.status}`);
      continue;
    }
    r = await res.json();
  } catch (e) {
    console.log(`  ${slug.padEnd(22)} fetch error: ${e.message}`);
    continue;
  }
  if (r.status === "completed") {
    try {
      saveResult(slug, r);
      console.log(`  ${slug.padEnd(22)} ✅ saved (${(extractText(r) || "").length} chars)`);
      summary.completed.push(slug);
    } catch (e) {
      // Partial output — model returned status=completed but report is truncated.
      // Delete .id so the runner resubmits.
      console.log(`  ${slug.padEnd(22)} ⚠ partial — ${e.message} (id removed for resubmit)`);
      summary.partial.push(slug);
      unlinkSync(p.id);
    }
  } else if (r.status === "in_progress" || r.status === "queued") {
    console.log(`  ${slug.padEnd(22)} ⏳ ${r.status}`);
    summary.in_progress.push(slug);
  } else if (r.status === "failed" || r.status === "cancelled" || r.status === "expired" || r.status === "incomplete") {
    const reason = (r.error?.message || r.incomplete_details?.reason || "").slice(0, 100);
    console.log(`  ${slug.padEnd(22)} ❌ ${r.status}${reason ? ": " + reason : ""}`);
    summary.failed.push(slug);
    // delete .id so the runner will resubmit
    unlinkSync(p.id);
  } else {
    console.log(`  ${slug.padEnd(22)} ? ${r.status}`);
  }
}

console.log("\n=== Summary ===");
console.log(`Already saved: ${summary.already_saved.length}`);
console.log(`Newly saved:   ${summary.completed.length}  ${summary.completed.join(", ")}`);
console.log(`Still running: ${summary.in_progress.length}  ${summary.in_progress.join(", ")}`);
console.log(`Failed (id removed for resubmit): ${summary.failed.length}  ${summary.failed.join(", ")}`);
if (summary.partial.length) console.log(`Partial (id removed for resubmit): ${summary.partial.length}  ${summary.partial.join(", ")}`);
