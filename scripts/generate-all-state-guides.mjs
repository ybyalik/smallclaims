#!/usr/bin/env node
// Batch generator for the v2 state guide. Walks every state in
// state_research, runs the single-state generator for any slug that
// doesn't already have content in state_guide_v2, and reports progress.
//
// Usage:
//   node scripts/generate-all-state-guides.mjs              # default: skip states with content, 3 concurrent
//   node scripts/generate-all-state-guides.mjs --force      # regenerate every state (overwrites existing rows)
//   node scripts/generate-all-state-guides.mjs --concurrency 6
//   node scripts/generate-all-state-guides.mjs --only california,new-york,texas
//
// Failures don't abort the run. A final summary lists succeeded + failed
// slugs so you can re-run just the failures.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("Missing Supabase env");
if (!ANTHROPIC_KEY) throw new Error("Missing ANTHROPIC_API_KEY in .env.local");

const MODEL = "claude-opus-4-7";
const MAX_OUTPUT_TOKENS = 32000;
const BRIEF_VERSION = "2026-05-18.2";

// CLI flags
const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const CONCURRENCY = (() => {
  const i = args.indexOf("--concurrency");
  if (i >= 0 && args[i + 1]) return parseInt(args[i + 1], 10) || 3;
  return 3;
})();
const ONLY = (() => {
  const i = args.indexOf("--only");
  if (i >= 0 && args[i + 1]) return args[i + 1].split(",").map((s) => s.trim());
  return null;
})();

// Load the brief.md file once. It's static across the whole batch.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BRIEF = fs.readFileSync(
  path.join(__dirname, "..", "lib", "state-guide-v2", "brief.md"),
  "utf8",
);

// ---- System prompt (same as single-state script; keep them in sync) ----

const SYSTEM_PROMPT = `You are a senior content editor producing the single-page small-claims-court guide for a US state, for a website that serves pro-se plaintiffs and defendants who are in the middle of a real dispute.

You will receive (1) the master content brief which defines exactly what sections to write, in what order, in what voice, and (2) the state's research Pack with the underlying facts, dollar amounts, statute citations, day counts, form codes, and quirks.

Your job: produce the complete state page as a single markdown document, following the brief's section order, structure, headings, tables, and writing rules. Every dollar figure, day count, form code, and statute citation must trace to the Pack. If the Pack hedges (varies by county, not specified, customary but not codified), the page hedges the same way. If a field is absent from the Pack, say so or omit it. Never invent numbers.

Reader profile:
- Not a lawyer. Often stressed, often in the middle of a real money problem.
- Wants the answer fast, in plain words, with the specific dollar amounts and day counts.
- Will give up if you write like a court rule.

Voice and style:
- Write like you'd write to a friend who asked you for help, not like you'd write a legal memo. Aim for 7th-grade reading level.
- Short sentences (average 12-14 words). Lead with the fact, then qualify in a second sentence if needed.
- Second person ("you", "your"), present tense.
- Plain words instead of legalese. The brief includes a long list of swaps (amount in controversy → what you're suing for; legal capacity → be old enough and mentally able to sue; commence → start; pursuant to → under; shall → must; etc.). Follow them strictly. NEVER write "amount in controversy", "exclusive of interest and costs", "legal capacity", "commence an action", "pursuant to", "shall", "thereto/thereof", "respondent/petitioner", "prior to/subsequent to", "in lieu of", "with respect to", "constitutes", "treble damages" (use "three times your damages"), "liquidated damages" (use "a penalty written into the law"), "quasi-contract", "res judicata", "in rem", "in personam", "prima facie", "ex parte".
- When you need a real document name or statute citation, keep it (e.g., "SM-01 Statement of Claim", "Ala. Code § 6-2-34"). When you EXPLAIN a concept, use plain words.
- Expand acronyms on first use: "Servicemembers Civil Relief Act (SCRA)", "Americans with Disabilities Act (ADA)", "Temporary Assistance for Needy Families (TANF)", "Supplemental Nutrition Assistance Program (SNAP)", "Social Security Disability Insurance (SSDI)". Skip expansion for LLC, DBA, UCC, FAQ.
- No em-dashes in your prose. Use periods, commas, or colons. Em-dashes are allowed only inside fixed proper nouns where they appear in the source (e.g., an official form name).
- No LLM-isms: delve, navigate (as a verb), leverage (as a verb), tapestry, robust, seamless, unlock, landscape, in today's, it's worth noting, in the realm of, moreover, furthermore, nonetheless, elevate, empower, cutting-edge, holistic, streamline, game-changer, paradigm, foster (as a verb), ecosystem, dive into, embark on, journey (as a verb or metaphor), treasure trove, plethora.
- No throat-clearing: "It's important to note", "When it comes to", "In conclusion".
- No "consult a lawyer" disclaimers in the prose. Section 20 has the standard disclaimer; don't repeat it elsewhere.

GEO writing rules:
- Every section opens with a direct answer in its first 40-80 words.
- When a heading is phrased as a question, the answer's first clause echoes the heading's noun or verb phrase. Example: H3 "How do I serve the defendant?" → answer starts "To serve the defendant in [State]..."
- Every paragraph contains at least one concrete fact (number, statute, deadline, form code, percentage, court name).

Output format:
- Pure GitHub-flavored markdown.
- Start directly with the H1. No preamble.
- Use # for H1, ## for H2 (sections 1-20), ### for H3 subsections.
- Section 0 contains: H1, italic standfirst paragraph, key-facts table. DO NOT include a byline (no attorney name, no "Last updated", no "Reading time"). DO NOT include a table of contents. The page template handles both.
- Render tables as standard markdown tables. Do not embed HTML.
- DO NOT emit horizontal rules ("---") between sections. The page template handles visual separation.
- There is no Glossary section. Sections are 0, 1-20. Last two sections are "## 19. Frequently asked questions" and "## 20. When to call a lawyer (and disclaimer)".
- Word count targets per section are guidance. Aim for the middle of each range. Total page should land 8,000-12,000 words.

Do not include any commentary, summary, or meta-text. Just the page.`;

// ---- Helpers ----

const supabaseHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
};

async function listAllStates() {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/state_research?select=slug,state_name&order=state_name.asc`,
    { headers: supabaseHeaders },
  );
  return r.json();
}

async function listExisting() {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/state_guide_v2?select=state_slug`,
    { headers: supabaseHeaders },
  );
  return new Set((await r.json()).map((x) => x.state_slug));
}

async function loadPack(slug) {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/state_research?slug=eq.${slug}&select=state_name,structured_pack`,
    { headers: supabaseHeaders },
  );
  const rows = await r.json();
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error(`No state_research row for slug=${slug}`);
  }
  if (!rows[0].structured_pack) throw new Error(`Pack is null for ${slug}`);
  return { stateName: rows[0].state_name, pack: rows[0].structured_pack };
}

async function writeGuide(slug, body, usage, costCents) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/state_guide_v2?on_conflict=state_slug`,
    {
      method: "POST",
      headers: {
        ...supabaseHeaders,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({
        state_slug: slug,
        body_md: body,
        model: MODEL,
        brief_version: BRIEF_VERSION,
        generated_at: new Date().toISOString(),
        input_tokens: usage.inputTokens,
        output_tokens: usage.outputTokens,
        cost_cents: costCents,
      }),
    },
  );
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Supabase write ${res.status}: ${txt.slice(0, 400)}`);
  }
}

async function callClaude(userPrompt) {
  const body = {
    model: MODEL,
    max_tokens: MAX_OUTPUT_TOKENS,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
    stream: true,
  };
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Anthropic ${res.status}: ${txt.slice(0, 600)}`);
  }
  if (!res.body) throw new Error("Anthropic: empty response body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";
  let inputTokens = 0;
  let outputTokens = 0;
  let stopReason = "unknown";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let sep;
    while ((sep = buffer.indexOf("\n\n")) !== -1) {
      const frame = buffer.slice(0, sep);
      buffer = buffer.slice(sep + 2);
      for (const line of frame.split("\n")) {
        if (!line.startsWith("data: ")) continue;
        const payload = line.slice(6).trim();
        if (!payload) continue;
        let evt;
        try {
          evt = JSON.parse(payload);
        } catch {
          continue;
        }
        if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
          text += evt.delta.text ?? "";
        } else if (evt.type === "message_start") {
          inputTokens = evt.message?.usage?.input_tokens ?? 0;
        } else if (evt.type === "message_delta") {
          if (typeof evt.usage?.output_tokens === "number") {
            outputTokens = evt.usage.output_tokens;
          }
          if (typeof evt.delta?.stop_reason === "string") {
            stopReason = evt.delta.stop_reason;
          }
        }
      }
    }
  }
  return { text, inputTokens, outputTokens, stopReason };
}

function buildUserPrompt(stateName, slug, pack) {
  return [
    `STATE: ${stateName}`,
    `STATE SLUG: ${slug}`,
    "",
    "=== CONTENT BRIEF (follow exactly) ===",
    "",
    BRIEF,
    "",
    "=== STATE RESEARCH PACK (every fact must trace to this) ===",
    "",
    "```json",
    JSON.stringify(pack, null, 2),
    "```",
    "",
    `Now write the complete small-claims guide for ${stateName} following the brief. Output only the markdown page. Start with the H1. No preamble.`,
  ].join("\n");
}

async function generateOne(slug) {
  const t0 = Date.now();
  const { stateName, pack } = await loadPack(slug);
  const userPrompt = buildUserPrompt(stateName, slug, pack);
  const result = await callClaude(userPrompt);
  const ms = Date.now() - t0;
  const costCents = Math.ceil(
    (result.inputTokens * 1500 + result.outputTokens * 7500) / 1_000_000,
  );
  const words = result.text.split(/\s+/).filter(Boolean).length;
  await writeGuide(slug, result.text, result, costCents);
  return {
    slug,
    stateName,
    ms,
    inputTokens: result.inputTokens,
    outputTokens: result.outputTokens,
    words,
    costCents,
    stopReason: result.stopReason,
  };
}

// ---- Worker pool ----

async function runPool(slugs, concurrency) {
  const queue = [...slugs];
  const inFlight = new Map();
  const succeeded = [];
  const failed = [];
  let started = 0;

  function nextWorker() {
    if (queue.length === 0) return null;
    const slug = queue.shift();
    started++;
    const ordinal = started;
    const t0 = Date.now();
    console.log(`[${ordinal}/${slugs.length}] starting: ${slug}`);
    const p = generateOne(slug).then(
      (res) => {
        const ms = Date.now() - t0;
        console.log(
          `[${ordinal}/${slugs.length}] ✓ ${slug}   ${(ms / 1000).toFixed(0)}s  ${res.words.toLocaleString()} words  $${(res.costCents / 100).toFixed(2)}  stop=${res.stopReason}`,
        );
        succeeded.push(res);
        inFlight.delete(slug);
      },
      (err) => {
        console.error(`[${ordinal}/${slugs.length}] ✗ ${slug}   ${err.message?.slice(0, 200)}`);
        failed.push({ slug, error: err.message });
        inFlight.delete(slug);
      },
    );
    inFlight.set(slug, p);
    return p;
  }

  // Prime the pool
  const initial = [];
  for (let i = 0; i < concurrency; i++) {
    const p = nextWorker();
    if (p) initial.push(p);
  }

  // Each time one finishes, start the next
  while (inFlight.size > 0) {
    await Promise.race(inFlight.values());
    while (inFlight.size < concurrency && queue.length > 0) {
      nextWorker();
    }
  }
  await Promise.allSettled(initial);

  return { succeeded, failed };
}

// ---- Main ----

async function main() {
  const all = await listAllStates();
  const existing = await listExisting();

  let queue;
  if (ONLY) {
    queue = all.filter((s) => ONLY.includes(s.slug));
    console.log(`--only filter: ${queue.length} states`);
  } else if (FORCE) {
    queue = all;
    console.log(`--force: regenerating all ${queue.length} states`);
  } else {
    queue = all.filter((s) => !existing.has(s.slug));
    console.log(
      `Skipping ${existing.size} states with existing content. Queue: ${queue.length}`,
    );
  }
  if (queue.length === 0) {
    console.log("Nothing to do.");
    return;
  }

  const slugs = queue.map((s) => s.slug);
  console.log(`Running ${slugs.length} states at concurrency=${CONCURRENCY}`);
  console.log(`Model: ${MODEL}  Brief: ${BRIEF_VERSION}`);
  console.log("");

  const startedAt = Date.now();
  const { succeeded, failed } = await runPool(slugs, CONCURRENCY);
  const elapsedMin = (Date.now() - startedAt) / 60000;

  const totalCostCents = succeeded.reduce((s, r) => s + r.costCents, 0);
  console.log("");
  console.log("=== summary ===");
  console.log(`Succeeded: ${succeeded.length}`);
  console.log(`Failed:    ${failed.length}`);
  console.log(`Elapsed:   ${elapsedMin.toFixed(1)} min`);
  console.log(`Total $:   $${(totalCostCents / 100).toFixed(2)}`);
  if (failed.length > 0) {
    console.log("");
    console.log("Failed slugs (re-run with --only):");
    console.log(failed.map((f) => f.slug).join(","));
    console.log("");
    console.log("Failure detail:");
    for (const f of failed) console.log(`  ${f.slug}: ${f.error?.slice(0, 200)}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
