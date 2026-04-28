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
    ["statutes", "Statutes (procedural)"],
    ["court_rules", "Court rules"],
    ["forms_pages", "Forms"],
    ["fee_schedules", "Fee schedules"],
    ["service_rules", "Service of process"],
    ["appeal_rules", "Appeals"],
    ["post_judgment_collection", "Post-judgment collection"],
    ["consumer_protection_statutes", "Consumer protection statutes"],
    ["landlord_tenant_statutes", "Landlord-tenant statutes"],
    ["wage_and_employment_statutes", "Wage / employment statutes"],
    ["civil_remedies_statutes", "Civil remedies statutes"],
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
    "state","slug","as_of","hero","at_a_glance","limits","claim_categories","exclusions",
    "damages","where_to_file","fees","statute_of_limitations","pre_filing","forms","service",
    "response_and_default","counterclaim","hearing","appeals","collection","businesses",
    "county_variations","pitfalls","recent_changes","faqs","state_specific_notes","sources",
  ];
  for (const k of requiredTop) {
    if (!(k in pack)) errors.push(`missing: ${k}`);
  }
  if (errors.length) return errors;

  const required = [
    "written-contract","oral-contract","personal-loan","promissory-note","unpaid-invoice",
    "open-account","unpaid-rent","bad-check","co-signer",
    "defective-product","bad-service","auto-repair","contractor","subscription-cancellation",
    "used-car","false-advertising",
    "vehicle-collision","neighbor-property","damage-to-rental","pet-damage",
    "security-deposit","unpaid-rent-by-tenant","repair-and-deduct",
    "unpaid-wages","final-paycheck",
    "minor-injury","mechanic-dispute","wrongful-tow",
  ];
  const flatClaims = (pack.claim_categories || []).flatMap((cat) => cat.claims || []);
  const slugs = new Set(flatClaims.map((c) => c.slug));
  const miss = required.filter((s) => !slugs.has(s));
  if (miss.length) errors.push(`missing claim slugs: ${miss.slice(0,5).join(", ")}${miss.length>5?` (+${miss.length-5} more)`:""}`);

  // Per-claim depth: every claim must have name, example, notes populated
  const thinClaims = flatClaims.filter((c) =>
    !c.name || c.name.length < 5 ||
    !c.example || c.example.length < 20 ||
    !c.notes || c.notes.length < 15
  );
  if (thinClaims.length > flatClaims.length * 0.2) {
    errors.push(`${thinClaims.length}/${flatClaims.length} claim entries are missing name/example/notes (>20% threshold)`);
  }

  if (!Array.isArray(pack.sources) || pack.sources.length < 3) {
    errors.push(`only ${pack.sources?.length ?? 0} sources (need ≥3)`);
  }

  // Categories must have blurbs
  const catsNoBlurb = (pack.claim_categories || []).filter((c) => !c.blurb || c.blurb.length < 30);
  if (catsNoBlurb.length) errors.push(`${catsNoBlurb.length} claim_categories missing/short blurb`);

  // Hero
  if (!pack.hero?.individual_limit_dollars) errors.push("hero.individual_limit_dollars missing");
  if (!pack.hero?.tagline || pack.hero.tagline.length < 30) errors.push("hero.tagline missing/short");
  if (!Array.isArray(pack.at_a_glance) || pack.at_a_glance.length < 4) {
    errors.push(`at_a_glance has ${pack.at_a_glance?.length ?? 0} entries (need ≥4)`);
  }

  // SOL & fees populated. SOL minimum is 5 — anything less means the model
  // truncated the section. Fewer than 5 leaves the SOL table on the page
  // useless. We'd prefer 8-12 but accept 5+ to avoid blocking otherwise good work.
  if (!Array.isArray(pack.statute_of_limitations?.entries) || pack.statute_of_limitations.entries.length < 5) {
    errors.push(`SOL entries: ${pack.statute_of_limitations?.entries?.length ?? 0} (need ≥5)`);
  }
  if (!Array.isArray(pack.fees?.filing_fee_tiers) || !pack.fees.filing_fee_tiers.length) {
    errors.push("fees.filing_fee_tiers missing/empty");
  }
  if (!Array.isArray(pack.collection?.methods) || pack.collection.methods.length < 3) {
    errors.push(`collection.methods has ${pack.collection?.methods?.length ?? 0} (need ≥3)`);
  }
  if (!Array.isArray(pack.pitfalls) || pack.pitfalls.length < 6) {
    errors.push(`pitfalls has ${pack.pitfalls?.length ?? 0} (need ≥6)`);
  }
  const thinPitfalls = (pack.pitfalls || []).filter((p) => !p.what_happens || !p.how_to_avoid || p.what_happens.length < 30);
  if (thinPitfalls.length) errors.push(`${thinPitfalls.length} pitfalls missing what_happens/how_to_avoid detail`);
  if (!Array.isArray(pack.faqs) || pack.faqs.length < 5) {
    errors.push(`faqs has ${pack.faqs?.length ?? 0} (need ≥5)`);
  }
  const thinFaqs = (pack.faqs || []).filter((f) => !f.answer || f.answer.length < 50);
  if (thinFaqs.length) errors.push(`${thinFaqs.length} FAQs missing detailed answer`);
  if (!Array.isArray(pack.state_specific_notes) || pack.state_specific_notes.length < 4) {
    errors.push(`state_specific_notes has ${pack.state_specific_notes?.length ?? 0} (need ≥4)`);
  }

  // Coverage check: critical fields must have source_ids populated.
  function emptyRatio(arr) {
    if (!Array.isArray(arr) || !arr.length) return 1;
    const empty = arr.filter((e) => !e?.source_ids || !e.source_ids.length).length;
    return empty / arr.length;
  }
  // Citation coverage is a quality signal, not a hard rejection. The drafter
  // emits `[unverified]` markers for fields with empty source_ids, so the
  // downstream guide still reads honestly. We only fail if structure is broken,
  // not if the model under-cited.
  const claimsEmpty = emptyRatio(flatClaims);
  const solEmpty = emptyRatio(pack.statute_of_limitations?.entries);
  const feesEmpty = emptyRatio(pack.fees?.filing_fee_tiers);
  if (claimsEmpty === 1 && solEmpty === 1 && feesEmpty === 1) {
    errors.push("100% empty source_ids across claims, SOL, and fees — model produced data without any citations");
  }

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
    "- `claim_categories[*].claims[*].claim_statute` AND `source_ids`: prefer the SOL or substantive statute for THAT specific claim type (e.g., the written-contract SOL statute, NOT the small-claims jurisdiction statute). Put the source ID that hosts that statute in `source_ids`.",
    "- `claim_categories[*].claims[*].name`: a 4-8 word friendly title (e.g., 'Breach of a written contract'), not just the slug repeated.",
    "- `claim_categories[*].claims[*].example`: ONE specific concrete scenario (≥1 sentence, with a dollar amount and a relatable fact pattern). NEVER blank.",
    "- `claim_categories[*].claims[*].notes`: 1-3 sentences of state-specific tactical guidance (deadline, what to bring, leverage tactics, common pitfalls for this claim).",
    "- `claim_categories[*].claims[*].damage_boost`: when the claim has a special remedy (statutory penalty, multiplier, attorney fees), explain the FULL formula. Otherwise empty string.",
    "- `claim_categories[*].blurb`: 1-2 sentence intro to the category that mentions the SOL or other state-specific framing.",
    "- `statute_of_limitations.entries[*].source_ids`: every entry's `statute` field MUST be cited via source_ids that point to the URL hosting that section.",
    "- `damages.statutory_multipliers[*].explanation`: full formula in plain English, not just '2x'. e.g., 'Check amount + service charge up to $40 + civil penalty up to $100 OR 2x check amount, whichever greater.'",
    "- `fees.filing_fee_tiers[*].source_ids`, `fees.service_fees[*].source_ids`: cite the fee schedule URL.",
    "- `collection.methods[*]`: include `description` (full procedural walkthrough), `exemptions` array, `effectiveness_notes`, `estimated_cost` — DO NOT leave any of these blank for the most common methods (wage garnishment, bank levy, property lien, writ of execution).",
    "- `pitfalls[*]`: every entry needs `what_happens` (≥1 full sentence on the failure mode) AND `how_to_avoid` (≥1 sentence on the fix). Do not return one-word pitfalls.",
    "- `faqs[*]`: write FULL answers (2-4 sentences each), not stubs. Cover the 6 listed topics at minimum.",
    "- `state_specific_notes[*]`: capture distinctive things this state does — e.g., uninsured-driver license suspension as collection leverage, statutory-multiplier remedies, special venue rules, e-filing variations.",
    "- `forms[*]`: include `description` (plain-English purpose) and `group` (one of: starting, service, hearing, counterclaim, after-judgment, fee-waiver, appeal).",
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
    max_output_tokens: 32000,
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
