#!/usr/bin/env node
// Generate the full v2 state guide for one slug. Single mega-call to
// Claude Opus 4.7 with the master brief + state name + structured pack.
//
// Usage:
//   node scripts/generate-state-guide-v2.mjs <state-slug>
//   node scripts/generate-state-guide-v2.mjs alabama
//
// The model is asked to return the entire page as markdown following the
// brief's section order and writing rules. Output is written verbatim to
// state_guide_v2.body_md. The page template in app/(site)/small-claims/
// [state]/page.tsx renders that markdown for any state that has a row.

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
if (!ANTHROPIC_KEY) {
  console.error("Missing ANTHROPIC_API_KEY. Add it to .env.local.");
  console.error("Get a key from https://console.anthropic.com/settings/keys");
  process.exit(1);
}

const MODEL = "claude-opus-4-7";
// Page targets ~10-15k words. Words-to-tokens ratio is ~1.3-1.4 for English,
// so ~13k words = ~17-18k tokens. We give Claude headroom with 32k.
const MAX_OUTPUT_TOKENS = 32000;

// --- Brief loading -----------------------------------------------------

// Locate brief.md relative to this script regardless of CWD.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const briefPath = path.join(__dirname, "..", "lib", "state-guide-v2", "brief.md");
const BRIEF = fs.readFileSync(briefPath, "utf8");

// Bump this when the brief materially changes so we can detect stale
// state_guide_v2 rows. Stored alongside the generated output.
const BRIEF_VERSION = "2026-05-18.2";

// --- System prompt -----------------------------------------------------

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

// --- Pack loading + flattening -----------------------------------------

async function loadPack(slug) {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/state_research?slug=eq.${slug}&select=state_name,structured_pack`,
    {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    },
  );
  const rows = await r.json();
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error(`No state_research row for slug=${slug}`);
  }
  if (!rows[0].structured_pack) {
    throw new Error(`Pack is null for ${slug}. Re-extract the state first.`);
  }
  return { stateName: rows[0].state_name, pack: rows[0].structured_pack };
}

// --- Storage -----------------------------------------------------------

async function writeGuide(slug, body, model, briefVersion, usage, costCents) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/state_guide_v2?on_conflict=state_slug`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({
        state_slug: slug,
        body_md: body,
        model,
        brief_version: briefVersion,
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

// --- Claude call -------------------------------------------------------

async function callClaude(userPrompt) {
  // Opus 4.7 doesn't accept `temperature` (reasoning model — outputs are
  // already calibrated for fact-density / voice-consistency without a knob).
  //
  // We use streaming because long Opus generations (>5 min) exceed Node's
  // default fetch headers-timeout. Streaming keeps the connection live and
  // lets us see progress as text accumulates.
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
  let lastProgressLog = Date.now();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE frames are separated by "\n\n". Each frame has lines like
    // "event: content_block_delta\ndata: {...}".
    let sepIdx;
    while ((sepIdx = buffer.indexOf("\n\n")) !== -1) {
      const frame = buffer.slice(0, sepIdx);
      buffer = buffer.slice(sepIdx + 2);
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

    // Progress log every ~10 seconds
    if (Date.now() - lastProgressLog > 10_000) {
      const words = text.split(/\s+/).filter(Boolean).length;
      console.log(`  ...streaming: ~${words.toLocaleString()} words so far`);
      lastProgressLog = Date.now();
    }
  }

  return { text, inputTokens, outputTokens, stopReason };
}

// --- Main --------------------------------------------------------------

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("usage: node scripts/generate-state-guide-v2.mjs <slug>");
    process.exit(1);
  }

  console.log(`Loading pack for ${slug}...`);
  const { stateName, pack } = await loadPack(slug);
  console.log(`Loaded: ${stateName} (${Object.keys(pack).length} top-level pack keys)`);

  const userPrompt = [
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

  console.log(`Calling ${MODEL} (max_tokens=${MAX_OUTPUT_TOKENS})...`);
  const t0 = Date.now();
  const result = await callClaude(userPrompt);
  const ms = Date.now() - t0;
  const words = result.text.split(/\s+/).filter(Boolean).length;

  // Cost estimate: $15/M input, $75/M output for Opus 4.7 (in cents)
  const costCents = Math.ceil(
    (result.inputTokens * 1500 + result.outputTokens * 7500) / 1_000_000,
  );

  console.log("");
  console.log(`Done in ${(ms / 1000).toFixed(1)}s`);
  console.log(`  Input tokens:  ${result.inputTokens.toLocaleString()}`);
  console.log(`  Output tokens: ${result.outputTokens.toLocaleString()}`);
  console.log(`  Words:         ~${words.toLocaleString()}`);
  console.log(`  Cost:          ~$${(costCents / 100).toFixed(2)}`);
  console.log(`  Stop reason:   ${result.stopReason}`);

  if (result.stopReason === "max_tokens") {
    console.warn("");
    console.warn("WARNING: hit max_tokens. The page may be truncated.");
    console.warn("Bump MAX_OUTPUT_TOKENS at the top of this script and re-run.");
  }

  console.log("");
  console.log("Writing to state_guide_v2...");
  await writeGuide(slug, result.text, MODEL, BRIEF_VERSION, result, costCents);
  console.log(`Saved. Visit http://localhost:3000/small-claims/${slug} to preview.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
