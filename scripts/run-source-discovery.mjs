#!/usr/bin/env node
// Pass 1 — Source discovery.
// gpt-4.1 with web_search_preview finds official primary-source URLs for one state.
// Output: reports/{state}-sources.json. Validated against a domain whitelist
// before saving. Pass 2 (run-evidence-extraction.mjs) consumes this file.
//
// This replaces the o3-deep-research approach. Cheaper, faster, and avoids the
// reasoning/output token collision that caused silent truncation.
//
// Usage:
//   node scripts/run-source-discovery.mjs --states alabama
//   node scripts/run-source-discovery.mjs --states alabama,mississippi
//   node scripts/run-source-discovery.mjs --resubmit alabama

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
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

const args = process.argv.slice(2);
function takeFlag(flag) {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}
const onlyStates = takeFlag("--states") ? new Set(takeFlag("--states").split(",")) : null;
const resubmit = new Set(takeFlag("--resubmit")?.split(",") ?? []);
const MODEL = takeFlag("--model") || "gpt-4.1";

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
const progressPath = resolve(reportsDir, "_source_discovery_progress.json");

const headers = { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` };
const API = "https://api.openai.com/v1";

function paths(slug) {
  return {
    sources: resolve(reportsDir, `${slug}-sources.json`),
    raw: resolve(reportsDir, `${slug}-sources.raw.json`),
    failure: resolve(reportsDir, `${slug}-sources.failure.json`),
  };
}

const promptTemplate = readFileSync(resolve(ROOT, "scripts/prompts/source-discovery.md"), "utf8");
const developerPrompt =
  "You are a legal research librarian. Use web_search_preview to find authoritative .gov / state-judiciary URLs only. Return one valid JSON object matching the schema in the user message. No markdown fences, no commentary before or after the JSON.";

async function api(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} ${method} ${path}\n${text.slice(0, 600)}`);
    err.status = res.status;
    throw err;
  }
  return JSON.parse(text);
}

function extractTextFromResponse(result) {
  const parts = [];
  for (const o of result.output || []) {
    if (o.type === "message" && Array.isArray(o.content)) {
      for (const c of o.content) {
        if ((c.type === "output_text" || c.type === "text") && c.text) parts.push(c.text);
      }
    }
  }
  return parts.join("\n\n");
}

function tryParseJson(text) {
  const stripped = text
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();
  return JSON.parse(stripped);
}

// Domain whitelist. The downstream extraction step will use ONLY these URLs,
// so anything not on the whitelist would either get ignored or worse, get
// fabricated facts cited to it. Reject hard.
const ALLOWED_HOSTS_RE = [
  /\.gov(?::\d+)?$/i,                 // *.gov (federal, state judicial, legislative)
  /\.[a-z]{2}\.us(?::\d+)?$/i,        // *.<state-abbr>.us
  /\.us(?::\d+)?$/i,                  // *.us catch-all (state.us)
  /^justia\.com$/i,                   // primary-source mirror
  /^.+\.justia\.com$/i,
  /^law\.cornell\.edu$/i,
  /^.+\.law\.cornell\.edu$/i,
];

function urlAllowed(url) {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:" && u.protocol !== "http:") return false;
    return ALLOWED_HOSTS_RE.some((re) => re.test(u.hostname));
  } catch {
    return false;
  }
}

function validateSources(pack) {
  const errors = [];
  const warnings = [];

  const requiredTop = [
    "state","as_of","state_judiciary_pages","statutes","court_rules","forms_pages",
    "fee_schedules","service_rules","appeal_rules","post_judgment_collection","county_specific",
  ];
  for (const k of requiredTop) {
    if (!(k in pack)) errors.push(`missing top-level key: ${k}`);
  }
  if (errors.length) return { errors, warnings };

  // URL whitelist enforcement across every entry that has a `url`
  const arrayKeys = [
    "state_judiciary_pages","statutes","court_rules","forms_pages","fee_schedules",
    "service_rules","appeal_rules","post_judgment_collection","county_specific",
  ];
  let totalUrls = 0;
  let rejected = [];
  for (const k of arrayKeys) {
    const arr = pack[k];
    if (!Array.isArray(arr)) {
      errors.push(`${k} is not an array`);
      continue;
    }
    for (const entry of arr) {
      if (!entry || typeof entry !== "object") continue;
      if (!entry.url) {
        errors.push(`${k}: entry missing url (label=${entry.label || "?"})`);
        continue;
      }
      totalUrls++;
      if (!urlAllowed(entry.url)) {
        rejected.push({ category: k, label: entry.label, url: entry.url });
      }
    }
  }
  if (rejected.length) {
    errors.push(`${rejected.length} URL(s) failed domain whitelist:\n  ` +
      rejected.slice(0, 5).map((r) => `${r.category}: ${r.url}`).join("\n  "));
  }

  // Coverage minimums — partial discovery is acceptable, total absence is not.
  if ((pack.statutes?.length ?? 0) < 1) errors.push("no statutes found (need at least 1)");
  if ((pack.state_judiciary_pages?.length ?? 0) < 1) errors.push("no state_judiciary_pages found");
  if (totalUrls < 6) warnings.push(`only ${totalUrls} total URLs (typical states have 12+)`);

  return { errors, warnings };
}

async function runOne(slug) {
  const stateTitle = titleCase(slug);
  const userPrompt = promptTemplate.replaceAll("{STATE}", stateTitle);
  const body = {
    model: MODEL,
    input: [
      { role: "developer", content: [{ type: "input_text", text: developerPrompt }] },
      { role: "user", content: [{ type: "input_text", text: userPrompt }] },
    ],
    tools: [{ type: "web_search_preview" }],
    max_output_tokens: 8000,
  };
  // Foreground call — gpt-4.1 returns in seconds-minutes, no need for background mode
  const result = await api("POST", "/responses", body);
  const text = extractTextFromResponse(result);
  if (!text) throw new Error("no text in response");
  let pack;
  try {
    pack = tryParseJson(text);
  } catch (e) {
    writeFileSync(paths(slug).failure, JSON.stringify({ raw: text, error: e.message }, null, 2));
    throw new Error(`invalid JSON: ${e.message.slice(0, 100)}`);
  }
  const { errors, warnings } = validateSources(pack);
  if (errors.length) {
    writeFileSync(paths(slug).failure, JSON.stringify({ pack, errors, warnings }, null, 2));
    throw new Error(`validation: ${errors.slice(0, 3).join("; ")}`);
  }
  if (warnings.length) console.log(`    warnings: ${warnings.join("; ")}`);

  writeFileSync(paths(slug).raw, JSON.stringify(result, null, 2));
  const annotated = { ...pack, _meta: {
    state: stateTitle, slug, model: MODEL,
    response_id: result.id, generated_at: new Date().toISOString(),
    usage: result.usage || null,
  }};
  writeFileSync(paths(slug).sources, JSON.stringify(annotated, null, 2));
  if (existsSync(paths(slug).failure)) try { unlinkSync(paths(slug).failure); } catch {}
}

function writeProgress(state) {
  const existing = existsSync(progressPath) ? JSON.parse(readFileSync(progressPath, "utf8")) : { history: [] };
  existing.history.push({ ...state, at: new Date().toISOString() });
  existing.last = state;
  writeFileSync(progressPath, JSON.stringify(existing, null, 2));
}

(async () => {
  const todo = ALL_SLUGS.filter((slug) => {
    if (onlyStates && !onlyStates.has(slug)) return false;
    if (existsSync(paths(slug).sources) && !resubmit.has(slug)) return false;
    return true;
  });

  console.log(`Source discovery (model: ${MODEL}). ${todo.length} state(s):`);
  todo.forEach((s) => console.log(`  - ${s}`));
  console.log("");

  const tally = { completed: 0, failed: 0 };
  const startedAt = Date.now();

  for (let i = 0; i < todo.length; i++) {
    const slug = todo[i];
    console.log(`[${i + 1}/${todo.length}] ${slug}`);
    try {
      await runOne(slug);
      console.log(`    ✅ ${slug}-sources.json`);
      tally.completed++;
      writeProgress({ slug, status: "completed" });
    } catch (e) {
      console.error(`    ❌ ${slug}: ${e.message}`);
      tally.failed++;
      writeProgress({ slug, status: "failed", error: String(e).slice(0, 300) });
    }
  }

  const totalM = ((Date.now() - startedAt) / 60000).toFixed(1);
  console.log(`\n=== DONE ===  wall: ${totalM}m  ✅ ${tally.completed}  ❌ ${tally.failed}`);
})().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
