#!/usr/bin/env node
// Sequential runner: processes missing states ONE AT A TIME so we never
// blow OpenAI's per-minute token rate limit. Slower but reliable.
//
// Idempotent: skips states that already have a finished report file.
// Resilient: if a state fails (rate limit, timeout, etc.), logs and moves on.
//            Re-running the script will retry whatever's still missing.
//
// Usage:
//   node scripts/run-states-sequential.mjs
//   node scripts/run-states-sequential.mjs --skip texas,new-york
//   node scripts/run-states-sequential.mjs --states texas,florida   (only these)

import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// .env.local
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

const MODEL = "o3-deep-research";
const API = "https://api.openai.com/v1";
const headers = { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` };

const args = process.argv.slice(2);
const skipFlagIdx = args.indexOf("--skip");
const skips = new Set(skipFlagIdx >= 0 && args[skipFlagIdx + 1] ? args[skipFlagIdx + 1].split(",") : []);
const onlyFlagIdx = args.indexOf("--states");
const onlyStates = onlyFlagIdx >= 0 && args[onlyFlagIdx + 1] ? new Set(args[onlyFlagIdx + 1].split(",")) : null;

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
  slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

const reportsDir = resolve(ROOT, "reports");
mkdirSync(reportsDir, { recursive: true });
const progressPath = resolve(reportsDir, "_sequential_progress.json");

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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} ${method} ${path}\n${text.slice(0, 400)}`);
    err.status = res.status;
    throw err;
  }
  return JSON.parse(text);
}

function extractText(result) {
  // Concat ALL message text outputs in order. Deep Research can self-continue
  // across multiple messages on long runs.
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
    max_output_tokens: 100000,
    background: true,
    store: true,
  };
  // Retry submission on rate-limit / 5xx
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const r = await api("POST", "/responses", body);
      writeFileSync(paths(slug).id, r.id);
      return r.id;
    } catch (e) {
      if (e.status === 429 || (e.status >= 500 && e.status < 600)) {
        const wait = 30000 * attempt; // 30s, 60s, 90s, ...
        console.log(`    submission ${e.status}, waiting ${wait / 1000}s before retry (${attempt}/6)`);
        await sleep(wait);
        continue;
      }
      throw e;
    }
  }
  throw new Error("submission failed after 6 attempts");
}

async function pollUntilDone(id, slug) {
  const start = Date.now();
  const TIMEOUT = 240 * 60 * 1000; // 4 hours per state — Deep Research can take >2 hours on long runs
  let lastStatus = "";
  let dots = 0;
  while (true) {
    if (Date.now() - start > TIMEOUT) throw new Error(`timeout (110m)`);
    let r;
    try {
      r = await api("GET", `/responses/${id}`);
    } catch (e) {
      // transient: just wait and retry
      await sleep(30000);
      continue;
    }
    if (r.status !== lastStatus) {
      const elapsed = ((Date.now() - start) / 60000).toFixed(1);
      process.stdout.write(`\n    [${elapsed}m] ${r.status}`);
      lastStatus = r.status;
      dots = 0;
    } else {
      process.stdout.write(".");
      if (++dots % 30 === 0) {
        const elapsed = ((Date.now() - start) / 60000).toFixed(1);
        process.stdout.write(` [${elapsed}m]`);
      }
    }
    if (r.status === "completed") return r;
    if (
      r.status === "failed" ||
      r.status === "cancelled" ||
      r.status === "expired" ||
      r.status === "incomplete"
    ) {
      throw new Error(`${r.status}: ${JSON.stringify(r.error || r.incomplete_details || {}).slice(0, 300)}`);
    }
    await sleep(45000); // 45s polls (slightly slower than batch script since we're not in a hurry)
  }
}

// Detect partial reports. Model sometimes returns status=completed but the
// output is incomplete or has degraded structure. Detection signals:
//   1. low output_tokens
//   2. fewer than 14 unique numbered sections (1-16)
//   3. missing Sources section
//   4. "restart" pattern: a section number much lower than max seen so far,
//      indicating the model lost context and started over (e.g. Rhode Island
//      wrote 1-10, then 1-6 again, then Sources — restart at section 1)
//   5. excessive duplication: any single section appearing 3+ times
function checkCompleteness(result, text) {
  const outTokens = result.usage?.output_tokens ?? 0;
  if (outTokens < 45000) {
    return { ok: false, reason: `only ${outTokens} output tokens (full reports are 45K+)` };
  }

  // Pull every "## N." header in source order
  const seq = [];
  const re = /^## (\d+)\./gm;
  let m;
  while ((m = re.exec(text)) !== null) {
    seq.push(parseInt(m[1], 10));
  }

  const uniqueSections = new Set(seq);
  if (uniqueSections.size < 14) {
    return { ok: false, reason: `only ${uniqueSections.size} of 16 sections found` };
  }

  // Restart detection. We tolerate exact duplicates (n == maxSeen) and small
  // back-steps of 1 (e.g. accidental rewrite of immediately preceding section).
  // A drop of >1 from the max seen indicates the model lost context.
  let maxSeen = 0;
  for (const n of seq) {
    if (n < maxSeen - 1) {
      return {
        ok: false,
        reason: `section restart detected: section ${n} appears after section ${maxSeen} was already written`,
      };
    }
    if (n > maxSeen) maxSeen = n;
  }

  // Excessive duplication: any one section heading appearing 3+ times signals
  // the model thrashed on it.
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
    // Archive .id as .partial for forensics, then unlink so the next run resubmits fresh
    const p = paths(slug);
    if (existsSync(p.id)) {
      try { writeFileSync(p.id + ".partial", readFileSync(p.id, "utf8")); } catch {}
      try { unlinkSync(p.id); } catch {}
    }
    throw new Error(`PARTIAL: ${completeness.reason}`);
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
        completedAt: new Date().toISOString(),
      },
      null,
      2
    )
  );
}

function writeProgress(state) {
  const existing = existsSync(progressPath) ? JSON.parse(readFileSync(progressPath, "utf8")) : { history: [] };
  existing.history.push({ ...state, at: new Date().toISOString() });
  existing.last = state;
  writeFileSync(progressPath, JSON.stringify(existing, null, 2));
}

(async () => {
  const todo = ALL_SLUGS.filter((slug) => {
    if (skips.has(slug)) return false;
    if (onlyStates && !onlyStates.has(slug)) return false;
    if (existsSync(paths(slug).md)) return false; // already done
    return true;
  });

  console.log(`Sequential runner. ${todo.length} states to process, one at a time.\n`);
  todo.forEach((s) => console.log(`  - ${s}`));
  console.log("");

  const startedAt = Date.now();
  const tally = { completed: 0, failed: 0, skipped: 0 };

  for (let i = 0; i < todo.length; i++) {
    const slug = todo[i];
    const elapsedH = ((Date.now() - startedAt) / 3600000).toFixed(2);
    console.log(`\n[${i + 1}/${todo.length}] ${slug}  (overall: ${elapsedH}h, ✅ ${tally.completed} ❌ ${tally.failed})`);

    // Skip if file appeared since we built the todo list (race-safe)
    if (existsSync(paths(slug).md)) {
      console.log("    already done, skipping");
      tally.skipped++;
      continue;
    }

    try {
      let id;
      // Reuse existing id if present (resume)
      if (existsSync(paths(slug).id)) {
        id = readFileSync(paths(slug).id, "utf8").trim();
        console.log(`    resuming with existing id ${id.slice(0, 16)}...`);
        try {
          const r = await api("GET", `/responses/${id}`);
          if (
            r.status === "failed" ||
            r.status === "cancelled" ||
            r.status === "expired" ||
            r.status === "incomplete"
          ) {
            console.log(`    previous run ${r.status}, resubmitting`);
            id = await submitState(slug);
          } else if (r.status === "completed") {
            saveResult(slug, r);
            console.log(`    ✅ already completed, saved.`);
            tally.completed++;
            writeProgress({ slug, status: "completed" });
            continue;
          }
        } catch {
          id = await submitState(slug);
        }
      } else {
        id = await submitState(slug);
        console.log(`    submitted ${id.slice(0, 16)}...`);
      }

      const r = await pollUntilDone(id, slug);
      saveResult(slug, r);
      console.log(`\n    ✅ saved`);
      tally.completed++;
      writeProgress({ slug, status: "completed", id });
    } catch (e) {
      console.error(`\n    ❌ ${slug} failed: ${e.message}`);
      tally.failed++;
      writeProgress({ slug, status: "failed", error: String(e).slice(0, 300) });
      // brief pause before next state to let any rate limit settle
      await sleep(15000);
    }
  }

  const totalH = ((Date.now() - startedAt) / 3600000).toFixed(2);
  console.log(`\n\n=== DONE ===`);
  console.log(`Wall time: ${totalH} hours`);
  console.log(`Completed: ${tally.completed}`);
  console.log(`Failed:    ${tally.failed}`);
  console.log(`Skipped:   ${tally.skipped}`);
})().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
