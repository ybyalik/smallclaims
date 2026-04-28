#!/usr/bin/env node
// Pass 2 — Evidence extraction.
// Takes reports/{state}-sources.json (from Pass 1) and asks gpt-4.1 to extract
// the structured evidence pack defined in scripts/prompts/research-pass.md,
// using ONLY the URLs in the source list. No web_search — the model must work
// from the URL list (and what it can fetch via the responses API's URL access)
// to produce verifiable, primary-source-only facts.
//
// Output: reports/{state}-evidence.json (consumed by Pass 3 / run-draft-pass.mjs).
//
// Usage:
//   node scripts/run-evidence-extraction.mjs --states alabama
//   node scripts/run-evidence-extraction.mjs                  (every state with sources)
//   node scripts/run-evidence-extraction.mjs --redo alabama   (force re-extract)

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
const redo = new Set(takeFlag("--redo")?.split(",") ?? []);
const MODEL = takeFlag("--model") || "gpt-4.1";

const titleCase = (slug) =>
  slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

const reportsDir = resolve(ROOT, "reports");
mkdirSync(reportsDir, { recursive: true });
const progressPath = resolve(reportsDir, "_evidence_extraction_progress.json");

const headers = { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` };
const API = "https://api.openai.com/v1";

function paths(slug) {
  return {
    sources: resolve(reportsDir, `${slug}-sources.json`),
    evidence: resolve(reportsDir, `${slug}-evidence.json`),
    raw: resolve(reportsDir, `${slug}-evidence.raw.json`),
    failure: resolve(reportsDir, `${slug}-evidence.failure.json`),
  };
}

const evidenceSchemaPrompt = readFileSync(resolve(ROOT, "scripts/prompts/research-pass.md"), "utf8");

const developerPrompt = [
  "You are a legal research analyst extracting structured facts from a curated set of authoritative URLs.",
  "Use web_search_preview ONLY against the URLs in the user message — do NOT search the open web for additional sources. If the source list is incomplete for a given field, return null for that field rather than reaching for an off-list source.",
  "Do NOT invent statute citations, fee numbers, or deadlines. If a fact is not findable in the provided URLs, return null — the downstream drafting step needs to know what's verified vs missing.",
  "Return ONE valid JSON object matching the schema in the user message. No markdown fences, no commentary before or after the JSON.",
].join(" ");

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

function tryParseJson(text) {
  const stripped = text
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();
  return JSON.parse(stripped);
}

function buildSourceList(sourcesPack) {
  // Flatten the source list into a numbered, model-friendly format
  const lines = [];
  let idx = 1;
  const cats = [
    ["state_judiciary_pages", "State judiciary"],
    ["statutes", "Statutes"],
    ["court_rules", "Court rules"],
    ["forms_pages", "Forms"],
    ["fee_schedules", "Fee schedules"],
    ["service_rules", "Service of process"],
    ["appeal_rules", "Appeals"],
    ["post_judgment_collection", "Post-judgment collection"],
    ["county_specific", "County-specific"],
  ];
  for (const [key, label] of cats) {
    const arr = sourcesPack[key];
    if (!Array.isArray(arr) || !arr.length) continue;
    lines.push(`### ${label}`);
    for (const entry of arr) {
      lines.push(`[S${idx}] ${entry.label || ""} — ${entry.url}`);
      idx++;
    }
    lines.push("");
  }
  return lines.join("\n");
}

function validateEvidence(pack) {
  const errors = [];
  const requiredTop = [
    "state","as_of","court","limits","claims_eligibility","exclusions","damages",
    "venue","fees","statute_of_limitations","pre_filing","forms","service",
    "response_and_default","hearing","appeals","collection","businesses",
    "county_variations_material","county_variations","pitfalls","recent_changes",
    "faq_topics_to_cover","state_specific_notes","sources",
  ];
  for (const k of requiredTop) {
    if (!(k in pack)) errors.push(`missing: ${k}`);
  }
  if (errors.length) return errors;

  const required = [
    "written-contract","oral-contract","personal-loan","promissory-note","unpaid-invoice",
    "unpaid-rent","bad-check","co-signer","defective-product","bad-service","auto-repair",
    "contractor","subscription-cancellation","used-car","false-advertising","vehicle-collision",
    "neighbor-property","damage-to-rental","pet-damage","security-deposit","unpaid-rent-by-tenant",
    "repair-and-deduct","unpaid-wages","unpaid-commission","minor-injury","mechanic-dispute",
    "wrongful-tow",
  ];
  const slugs = new Set((pack.claims_eligibility || []).map((c) => c.slug));
  const miss = required.filter((s) => !slugs.has(s));
  if (miss.length) errors.push(`missing claim slugs: ${miss.slice(0,5).join(", ")}${miss.length>5?"...":""}`);

  if (!Array.isArray(pack.sources) || pack.sources.length < 5) {
    errors.push(`only ${pack.sources?.length ?? 0} sources`);
  }
  // Spot checks
  if (!pack.limits?.individual_max_dollars) errors.push("limits.individual_max_dollars missing/zero");
  if (!Array.isArray(pack.fees?.filing_fee_tiers) || !pack.fees.filing_fee_tiers.length) {
    errors.push("fees.filing_fee_tiers missing/empty");
  }

  // Coverage check: critical sections must have source_ids populated.
  // Hard fail if claims_eligibility, SOL, or filing_fee_tiers come back with
  // mostly empty source_ids — that means Pass 2 didn't bother citing.
  function emptyRatio(arr) {
    if (!Array.isArray(arr) || !arr.length) return 1;
    const empty = arr.filter((e) => !e?.source_ids || !e.source_ids.length).length;
    return empty / arr.length;
  }
  const claimsEmpty = emptyRatio(pack.claims_eligibility);
  if (claimsEmpty > 0.5) errors.push(`${(claimsEmpty * 100).toFixed(0)}% of claims_eligibility entries have empty source_ids (need <50%)`);
  const solEmpty = emptyRatio(pack.statute_of_limitations);
  if (solEmpty > 0.3) errors.push(`${(solEmpty * 100).toFixed(0)}% of statute_of_limitations entries have empty source_ids (need <30%)`);
  const feesEmpty = emptyRatio(pack.fees?.filing_fee_tiers);
  if (feesEmpty > 0) errors.push(`${(feesEmpty * 100).toFixed(0)}% of filing_fee_tiers have empty source_ids (need 0%)`);

  return errors;
}

async function runOne(slug) {
  const p = paths(slug);
  if (!existsSync(p.sources)) {
    throw new Error(`missing sources file: run Pass 1 first (${p.sources})`);
  }
  const sourcesPack = JSON.parse(readFileSync(p.sources, "utf8"));
  const stateTitle = titleCase(slug);
  const userPrompt = [
    `# Extract evidence pack for ${stateTitle}`,
    "",
    "Use ONLY the URLs below. Do NOT invent citations. If a field is not findable in these URLs, return null for it.",
    "",
    "## Authoritative source list",
    "",
    buildSourceList(sourcesPack),
    "",
    "## SOURCE_IDS — read carefully, this is the most important rule",
    "",
    "Every array entry and every structured object below has a `source_ids` array. You MUST populate it with the IDs (e.g. `[\"S4\", \"S12\"]`) of sources from the list above that you actually used to verify that field. The downstream drafter relies on this — empty `source_ids` get flagged `[unverified]` in the final guide.",
    "",
    "Specific rules per section:",
    "- `claims_eligibility[*].source_ids`: cite the statute or court rule that establishes small-claims jurisdiction over money disputes (typically the same source as `limits.statute`). If a claim is `conditional` or `not eligible`, cite the specific statute that creates that condition or exclusion.",
    "- `statute_of_limitations[*].source_ids`: every entry has a `statute` field (e.g., \"Ala. Code § 6-2-34\"). Find the source list entry that points to that statute (or to the state code site that hosts it) and put its ID here.",
    "- `damages.source_ids` AND every nested array's `source_ids`: cite the statute or court rule that authorizes/prohibits each damage type. If state law is silent, set the value to null and leave source_ids empty.",
    "- `fees.filing_fee_tiers[*].source_ids`, `fees.service_fees[*].source_ids`, etc.: cite the fee schedule URL.",
    "- `forms[*].source_ids`: cite the forms page URL.",
    "- `service.*.source_ids`: cite the service-of-process rule.",
    "- `appeals.source_ids`, `collection.*.source_ids`: cite the appropriate statute or rule URL.",
    "",
    "If a fact is not findable in the source list at all, set the value to `null` and leave `source_ids: []`. Do NOT populate `source_ids` with an ID whose URL does not actually justify the fact.",
    "",
    "## Schema and field requirements",
    "",
    evidenceSchemaPrompt.replaceAll("{STATE}", stateTitle),
  ].join("\n");

  const body = {
    model: MODEL,
    input: [
      { role: "developer", content: [{ type: "input_text", text: developerPrompt }] },
      { role: "user", content: [{ type: "input_text", text: userPrompt }] },
    ],
    tools: [{ type: "web_search_preview" }],
    max_output_tokens: 16000,
    temperature: 0.1,
  };
  const r = await api("POST", "/responses", body);
  const text = (r.output || [])
    .filter((o) => o.type === "message" && Array.isArray(o.content))
    .flatMap((o) => o.content)
    .filter((c) => (c.type === "output_text" || c.type === "text") && c.text)
    .map((c) => c.text)
    .join("\n\n");
  let pack;
  try {
    pack = tryParseJson(text);
  } catch (e) {
    writeFileSync(p.failure, JSON.stringify({ raw: text, error: e.message }, null, 2));
    throw new Error(`invalid JSON: ${e.message.slice(0, 100)}`);
  }
  const errors = validateEvidence(pack);
  if (errors.length) {
    writeFileSync(p.failure, JSON.stringify({ pack, errors }, null, 2));
    throw new Error(`validation: ${errors.slice(0, 3).join("; ")}`);
  }

  writeFileSync(p.raw, JSON.stringify(r, null, 2));
  const annotated = { ...pack, _meta: {
    state: stateTitle, slug, model: MODEL,
    sources_response_id: sourcesPack._meta?.response_id || null,
    extraction_response_id: r.id,
    generated_at: new Date().toISOString(),
    usage: r.usage || null,
  }};
  writeFileSync(p.evidence, JSON.stringify(annotated, null, 2));
  if (existsSync(p.failure)) try { unlinkSync(p.failure); } catch {}
}

function writeProgress(state) {
  const existing = existsSync(progressPath) ? JSON.parse(readFileSync(progressPath, "utf8")) : { history: [] };
  existing.history.push({ ...state, at: new Date().toISOString() });
  existing.last = state;
  writeFileSync(progressPath, JSON.stringify(existing, null, 2));
}

(async () => {
  const stateSlugs = readdirSync(reportsDir)
    .filter((f) => f.endsWith("-sources.json"))
    .map((f) => f.replace("-sources.json", ""));

  const todo = stateSlugs.filter((slug) => {
    if (onlyStates && !onlyStates.has(slug)) return false;
    if (existsSync(paths(slug).evidence) && !redo.has(slug)) return false;
    return true;
  });

  console.log(`Evidence extraction (model: ${MODEL}). ${todo.length} state(s):`);
  todo.forEach((s) => console.log(`  - ${s}`));
  console.log("");

  const tally = { completed: 0, failed: 0 };
  const startedAt = Date.now();

  for (let i = 0; i < todo.length; i++) {
    const slug = todo[i];
    console.log(`[${i + 1}/${todo.length}] ${slug}`);
    try {
      await runOne(slug);
      console.log(`    ✅ ${slug}-evidence.json`);
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
