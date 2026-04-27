#!/usr/bin/env node
// Batch runner: submits OpenAI Deep Research (o3) for every state and polls until done.
//
// Idempotent: skips any state whose report already exists.
// Resilient: saves interaction id immediately so a crash doesn't lose work.
// Resume:    if interrupted, re-running picks up in-flight runs by id.
//
// Usage:
//   node scripts/run-all-states.mjs                    (all states, skipping completed)
//   node scripts/run-all-states.mjs --skip california  (additional skips)
//   node scripts/run-all-states.mjs --limit 5          (cap how many to start)

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
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
  console.error("Missing OPENAI_API_KEY (.env.local)");
  process.exit(1);
}

const MODEL = "o3-deep-research-2025-06-26";
const API = "https://api.openai.com/v1";
const headers = { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` };

const args = process.argv.slice(2);
const skipFlagIdx = args.indexOf("--skip");
const extraSkips =
  skipFlagIdx >= 0 && args[skipFlagIdx + 1] ? args[skipFlagIdx + 1].split(",") : [];
const limitArg = args.find((a) => a.startsWith("--limit="));
const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : Infinity;

// Hard-coded slug list mirroring lib/states.ts (so we don't need TS at runtime)
const ALL_SLUGS = [
  "alabama","alaska","arizona","arkansas","california","colorado","connecticut",
  "delaware","district-of-columbia","florida","georgia","hawaii","idaho","illinois",
  "indiana","iowa","kansas","kentucky","louisiana","maine","maryland","massachusetts",
  "michigan","minnesota","mississippi","missouri","montana","nebraska","nevada",
  "new-hampshire","new-jersey","new-mexico","new-york","north-carolina","north-dakota",
  "ohio","oklahoma","oregon","pennsylvania","rhode-island","south-carolina",
  "south-dakota","tennessee","texas","utah","vermont","virginia","washington",
  "west-virginia","wisconsin","wyoming",
];

const titleCase = (slug) =>
  slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

const reportsDir = resolve(ROOT, "reports");
mkdirSync(reportsDir, { recursive: true });
const progressPath = resolve(reportsDir, "_progress.json");

function paths(slug) {
  return {
    md: resolve(reportsDir, `${slug}-openai.md`),
    raw: resolve(reportsDir, `${slug}-openai.raw.json`),
    meta: resolve(reportsDir, `${slug}-openai.json`),
    id: resolve(reportsDir, `${slug}-openai.id`),
  };
}

const promptTemplate = readFileSync(resolve(ROOT, "scripts/prompts/state-research.md"), "utf8");
const developerPrompt = `You are a professional legal research analyst producing a comprehensive, citation-rich, plain-English guide for non-lawyers. Use the web_search_preview tool extensively to verify every dollar amount, deadline, statute citation, and form number against authoritative .gov sources (state courts, statutes, judicial council). Cite specific code sections inline. Where authoritative sources conflict or are silent, flag it explicitly. Do not summarize away detail — the goal is exhaustiveness, not brevity. Produce well-structured Markdown with H2 sections matching the requested numbered outline.`;

async function api(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} ${method} ${path}\n${text}`);
    err.status = res.status;
    throw err;
  }
  return JSON.parse(text);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function extractText(result) {
  // Deep Research can produce MULTIPLE message outputs when the response runs
  // long (model hits a per-response cap and continues itself). We need ALL of
  // them concatenated in order, not just the last one.
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

async function submitState(slug) {
  const stateTitle = titleCase(slug);
  const userPrompt = promptTemplate.replaceAll("{STATE}", stateTitle);
  const body = {
    model: MODEL,
    input: [
      { role: "developer", content: [{ type: "input_text", text: developerPrompt }] },
      { role: "user", content: [{ type: "input_text", text: userPrompt }] },
    ],
    reasoning: { summary: "detailed" },
    tools: [
      { type: "web_search_preview" },
      { type: "code_interpreter", container: { type: "auto" } },
    ],
    background: true,
    store: true,
  };
  // Retry on transient errors / rate limit
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const r = await api("POST", "/responses", body);
      writeFileSync(paths(slug).id, r.id);
      return r.id;
    } catch (e) {
      if (e.status === 429 || (e.status >= 500 && e.status < 600)) {
        const wait = 5000 * attempt;
        console.log(`  ${slug}: ${e.status}, retry in ${wait / 1000}s (attempt ${attempt}/5)`);
        await sleep(wait);
        continue;
      }
      throw e;
    }
  }
  throw new Error(`failed to submit ${slug} after 5 attempts`);
}

async function fetchStatus(id) {
  return api("GET", `/responses/${id}`);
}

function saveResult(slug, result) {
  const stateTitle = titleCase(slug);
  const text = extractText(result);
  if (!text) {
    console.error(`  ${slug}: no text in response, skipping save`);
    return false;
  }
  const p = paths(slug);
  writeFileSync(p.raw, JSON.stringify(result, null, 2));
  const header = `# Small Claims in ${stateTitle} (${MODEL})\n\n_Generated on ${new Date().toISOString()}_\n\n---\n\n`;
  writeFileSync(p.md, header + text);
  writeFileSync(
    p.meta,
    JSON.stringify(
      {
        id: result.id,
        state: stateTitle,
        model: MODEL,
        usage: result.usage || null,
        outputSteps: (result.output || []).length,
        completedAt: new Date().toISOString(),
      },
      null,
      2
    )
  );
  return true;
}

function writeProgress(states) {
  const summary = {
    updatedAt: new Date().toISOString(),
    counts: states.reduce(
      (acc, s) => ({ ...acc, [s.status]: (acc[s.status] || 0) + 1 }),
      {}
    ),
    states: states.reduce((acc, s) => ({ ...acc, [s.slug]: s.status }), {}),
  };
  writeFileSync(progressPath, JSON.stringify(summary, null, 2));
}

(async () => {
  // Decide which slugs to run
  const skips = new Set(["california", ...extraSkips]);
  const todo = ALL_SLUGS.filter((slug) => {
    if (skips.has(slug)) return false;
    if (existsSync(paths(slug).md)) return false; // already done
    return true;
  }).slice(0, limit);

  console.log(
    `Batch starting. ${todo.length} states to process (skipping california + ${
      todo.length === ALL_SLUGS.length - 1 ? "none" : ALL_SLUGS.length - 1 - todo.length + " others"
    }).`
  );

  const states = todo.map((slug) => ({ slug, status: "pending", id: null }));

  // Submit all (with small spacing to avoid burst)
  for (const s of states) {
    // If we already have an id from a previous run, reuse it
    if (existsSync(paths(s.slug).id)) {
      s.id = readFileSync(paths(s.slug).id, "utf8").trim();
      s.status = "submitted";
      console.log(`  ${s.slug}: resuming with existing id ${s.id.slice(0, 16)}...`);
      continue;
    }
    try {
      console.log(`  ${s.slug}: submitting...`);
      s.id = await submitState(s.slug);
      s.status = "submitted";
      console.log(`  ${s.slug}: submitted ${s.id.slice(0, 16)}...`);
      writeProgress(states);
    } catch (e) {
      s.status = "submit-failed";
      s.error = String(e).slice(0, 300);
      console.error(`  ${s.slug}: SUBMIT FAILED: ${e.message}`);
    }
    // Small spacing, 500ms
    await sleep(500);
  }

  console.log(
    `\nAll submissions done. Polling ${states.filter((s) => s.status === "submitted").length} in-flight states...\n`
  );

  // Polling loop
  const POLL_INTERVAL_MS = 60_000;
  const POLL_TIMEOUT_MS = 4 * 60 * 60 * 1000; // 4 hours hard ceiling
  const startedAt = Date.now();

  while (true) {
    const inFlight = states.filter((s) => s.status === "submitted");
    if (inFlight.length === 0) break;
    if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
      console.error("Hit 4-hour ceiling. Exiting; rerun to resume.");
      break;
    }

    // Poll each in flight (in parallel, but not all at once to be polite)
    const batchSize = 10;
    for (let i = 0; i < inFlight.length; i += batchSize) {
      const batch = inFlight.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (s) => {
          try {
            const r = await fetchStatus(s.id);
            if (r.status === "completed") {
              const ok = saveResult(s.slug, r);
              s.status = ok ? "completed" : "no-text";
              const elapsed = ((Date.now() - startedAt) / 60000).toFixed(1);
              console.log(`✅ ${s.slug} completed (${elapsed}m elapsed). saved.`);
            } else if (r.status === "failed" || r.status === "cancelled" || r.status === "expired") {
              s.status = r.status;
              console.log(`❌ ${s.slug} ${r.status}: ${JSON.stringify(r.error || r.incomplete_details || {}).slice(0, 200)}`);
            }
          } catch (e) {
            // Transient poll error: ignore and retry next cycle
          }
        })
      );
    }

    writeProgress(states);

    const done = states.filter((s) => s.status === "completed").length;
    const failed = states.filter((s) => ["submit-failed", "failed", "cancelled", "expired", "no-text"].includes(s.status)).length;
    const remaining = states.length - done - failed;
    const elapsed = ((Date.now() - startedAt) / 60000).toFixed(1);
    console.log(`[${elapsed}m] ✅ ${done} done | ⏳ ${remaining} in flight | ❌ ${failed} failed`);

    if (remaining === 0) break;
    await sleep(POLL_INTERVAL_MS);
  }

  // Final report
  console.log("\n=== FINAL ===");
  const byStatus = states.reduce((acc, s) => ({ ...acc, [s.status]: (acc[s.status] || 0) + 1 }), {});
  for (const [k, v] of Object.entries(byStatus)) console.log(`  ${k}: ${v}`);
  writeProgress(states);
  console.log(`Progress saved: ${progressPath}`);
})().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
