#!/usr/bin/env node
// Generate plain-language content for the public state page for one slug.
//
// Usage:
//   node scripts/generate-state-page-content.mjs <state-slug>
//   node scripts/generate-state-page-content.mjs new-york
//
// Reads state_research.structured_pack from Supabase. For each section in
// lib/state-page-content/sections.ts, builds a section-specific prompt with
// only the relevant slice of the pack, calls gpt-5-mini, and writes the
// result to state_page_content.
//
// Runs all sections in parallel. Roughly 30-60 seconds wall clock per state,
// ~$0.10 in API costs at gpt-5-mini pricing.

import fs from "node:fs";
import path from "node:path";

// Load env from .env.local
for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("Missing Supabase env");
if (!OPENAI_KEY) throw new Error("Missing OPENAI_API_KEY");

const MODEL = "gpt-5-mini";

// Mirrors lib/state-page-content/sections.ts. We duplicate here so the
// script can be a plain mjs (no TS / no transpiler step). If you change
// the sections, update both files.
const SYSTEM_PROMPT = `You write for a regular person who is trying to figure out whether and how to sue someone in their state. They are not a lawyer. They are stressed. They want to know the answer.

Write like you're explaining this to a friend over coffee. Plain English. Short sentences. Short paragraphs (2-3 sentences each).

DO use:
- Second person ("you", "your").
- Specific numbers (dollars, days, percentages) from the data you're given.
- Plain words.

DO NOT use:
- Legalese: "statute of limitations" → "deadline to sue". "Plaintiff/defendant" → "you/the other side". "Treble damages" → "three times your damages". "Liquidated damages" → "an automatic penalty written into the law". "Prove-up" → "show your case to the judge". "Hearsay" → "what someone else told you". "De novo" → "a brand-new trial". "Tort" → "wrongful harm". "Per annum" → "per year". "Equitable relief" → "court orders besides money".
- Em-dashes (—) or en-dashes (–). Use a period, a comma, or "and".
- Statute citations in the prose. The page already shows them in a table below. You can say "the law" or "state law" without naming a section number.
- Filler: "It is important to note", "It is worth mentioning", "Generally speaking", "In essence".
- Marketing language: "robust", "comprehensive", "seamless", "navigate the complexities".
- Disclaimers like "consult a lawyer" or "this is not legal advice". The page footer handles that.
- Restating the section heading. The reader already sees it. Just answer the question.
- The phrase "In [state]," at the start. Just start with the answer.
- Hedging: "may", "might", "could" when the data is definite. If a deadline is 30 days, say "30 days", not "may be up to 30 days".

Output:
- Markdown. No H1/H2 (the page renders the heading).
- 2-4 short paragraphs, roughly 80-180 words. Less is fine when the data is thin. Never pad.
- If a fact really helps the reader, lead with it. Don't bury the key number in the third paragraph.

If the data you receive is empty or minimal for a section, return one short paragraph and stop. Don't invent details to fill space.`;

function num(v) {
  return typeof v === "number" && !Number.isNaN(v) ? v : undefined;
}

const SECTIONS = [
  {
    key: "tldr",
    slice: (p) => {
      const years = (p.statute_of_limitations_by_claim_type ?? [])
        .map((x) => x.years)
        .filter((y) => typeof y === "number");
      return {
        claim_limit_dollars: p.claim_limit_dollars,
        claim_cap_tiers: p.claim_cap_tiers,
        filing_fee_tiers: p.filing_fee_tiers,
        filing_methods: p.filing_methods,
        government_tort_claim_notice_required: !!p.government_tort_claim_notice,
        hearing_typical_timeline_weeks: p.hearing_logistics?.typical_timeline_weeks,
        statute_of_limitations_typical_years_min: years.length ? Math.min(...years) : undefined,
        statute_of_limitations_typical_years_max: years.length ? Math.max(...years) : undefined,
      };
    },
    instructions:
      "Write a 3-4 sentence opening for the state's small-claims guide. Cover: the max claim amount (note if it varies by court tier), typical filing fee range, typical timeline from filing to hearing if known, and the typical deadline range to sue. Keep it tight, this is the lede.",
  },
  {
    key: "can_i_sue",
    slice: (p) => ({
      claim_limit_dollars: p.claim_limit_dollars,
      claim_cap_tiers: p.claim_cap_tiers,
      claim_splitting_prohibited: p.claim_splitting_prohibited,
      frequency_caps: p.frequency_caps,
      excluded_claim_types: p.excluded_claim_types,
      classification: p.classification,
    }),
    instructions:
      "Explain who can sue in this state's small claims court and for what. Cover: the dollar cap (if it varies by court level, explain which court handles what range), whether you can split a larger claim into smaller ones, any frequency caps (how many cases per year), and the headline things you CAN'T bring here. Don't enumerate every excluded claim type, point at the 2-3 most common (eviction, divorce, government agencies if applicable) and say the full list is below.",
  },
  {
    key: "how_long",
    slice: (p) => ({
      statute_of_limitations_by_claim_type: (p.statute_of_limitations_by_claim_type ?? []).slice(0, 8),
      total_claim_types_with_sol: (p.statute_of_limitations_by_claim_type ?? []).length,
      classification_sol_notes: p.classification?.statute_of_limitations,
    }),
    instructions:
      "Explain how the statute of limitations works for small-claims plaintiffs. Mention: each type of dispute has its own clock, the clock usually starts when the harm happened (note if any common claim types use a 'discovery rule' instead), missing the deadline kills the case even by one day. Tell the reader there's an interactive deadline-checker below covering all common claim types. If the per-claim-type list shows a wide range (e.g. 1 year to 10 years), point that range out.",
  },
  {
    key: "cost",
    slice: (p) => ({
      filing_fee_tiers: p.filing_fee_tiers,
      filing_fee_notes: p.filing_fee_notes,
      fee_schedule: p.fee_schedule,
      fee_waiver: p.fee_schedule?.fee_waiver,
      service_methods_with_costs: (p.service_methods ?? []).map((m) => ({
        name: m.name,
        cost_cents: m.cost_cents,
      })),
    }),
    instructions:
      "Explain the real out-of-pocket cost of filing. Cover four buckets: the filing fee (tiered by claim size), the cost to serve the defendant (varies by method), and any 'hidden' fees like motion-to-vacate or jury-demand fees if the pack has them. Then explain the fee waiver: who qualifies (income thresholds, benefits programs like SNAP/Medicaid/SSI if listed). Add up an example total for a typical $3,000 claim if you can.",
  },
  {
    key: "how_to_file",
    slice: (p) => ({
      court_name: p.court_name,
      filing_location: p.filing_location,
      filing_methods: p.filing_methods,
      efile_portal: p.efile_portal,
      demand_letter: p.demand_letter,
      government_tort_claim_notice: p.government_tort_claim_notice,
      forms_required: (p.forms_required ?? []).slice(0, 3),
    }),
    instructions:
      "Walk through the filing process. Cover: where you file (court name + which county/jurisdiction), how you file (paper vs e-file, portal name if listed, what file types it accepts), whether a demand letter is required before filing, and the main intake forms. If the pack has a government_tort_claim_notice object, add a clearly-marked WARNING paragraph explaining that suing a city/county/state agency requires filing a notice of claim first within a deadline, and missing that deadline can destroy the case even if the underlying lawsuit is timely.",
  },
  {
    key: "damages",
    slice: (p) => ({
      recoverable_amounts: p.recoverable_amounts,
      statutory_multipliers: p.statutory_multipliers,
      prejudgment_interest_by_claim_type: p.prejudgment_interest_by_claim_type,
      collection_details_post_judgment_interest:
        p.collection_details?.post_judgment_interest_rate_percent,
    }),
    instructions:
      "Explain what dollars you can actually get back. Three buckets: (1) Your direct losses (the money you're owed plus documented out-of-pocket damages). (2) Statutory multipliers, list the 2-3 highest-leverage ones (e.g. 'security deposit kept in bad faith = 2-3x', 'consumer fraud = treble damages'), what claim types they apply to, and the statute. (3) Interest, pre-judgment (clock starts when harm happened) and post-judgment (clock starts when you win). Use the real percentages from the pack.",
  },
  {
    key: "serving",
    slice: (p) => ({
      service_methods: p.service_methods,
      service_requirements: p.service_requirements,
    }),
    instructions:
      "Explain what 'serving the defendant' means and how to do it in this state. List the allowed methods (sheriff, certified mail, process server, etc.) with their cost and how reliable each one is. Cover the timing: how many days before the hearing service must be completed, and how many days before the hearing the proof-of-service form must be filed. End with the 'can't find them' fallback (publication, posting, etc.) if listed.",
  },
  {
    key: "hearing",
    slice: (p) => ({
      hearing_logistics: p.hearing_logistics,
      hearing_process: p.hearing_process,
      court_mediation: p.court_mediation,
      accommodations: p.accommodations,
    }),
    instructions:
      "Describe what showing up to a small-claims hearing actually looks like. Cover: format (in-person, video, hybrid), how long the hearing takes, whether the other side can bring a lawyer, what evidence to bring, and how the judge typically decides. If the pack lists court-day mediation, mention it as an option that can resolve the case without a ruling. If the pack has accommodations (interpreters, ADA), include a short paragraph: which languages are available, how much lead time the court needs, and how to request.",
  },
  {
    key: "appeals",
    slice: (p) => ({ appeal_details: p.appeal_details }),
    instructions:
      "Explain what happens after a small-claims judgment if you lose (or if the defendant loses and wants to appeal). Cover: how many days you have to appeal, what type of appeal it is (trial de novo means a brand-new trial, vs. a record review), who is allowed to appeal (plaintiff, defendant, or both), what court hears the appeal, and what it costs. Be honest if appeals are limited or expensive, readers want to know whether it's worth fighting.",
  },
  {
    key: "collecting",
    slice: (p) => ({
      collection_details: p.collection_details,
      post_judgment_steps: p.post_judgment_steps,
    }),
    instructions:
      "This is where most people stop and lose. Explain that the court does NOT collect for the winner. Cover: the loser's deadline to pay before collection methods become available, the post-judgment interest rate, the main collection methods (wage garnishment, bank levy, lien) with rough cost and effectiveness for each. Briefly preview the exemption schedule (what assets are protected) shown in a table below this section, with a note that defendants who only have protected assets, Social Security, unemployment, the family home up to $X, may be 'judgment-proof' in practice.",
  },
  {
    key: "fine_print",
    slice: (p) => ({
      state_specific_quirks: p.state_specific_quirks,
      tax_implications: p.tax_implications,
      defendant_collectability_signals: p.defendant_collectability_signals,
      arbitration_clause_considerations: p.arbitration_clause_considerations,
    }),
    instructions:
      "Surface the 3-5 things that surprise people about this state's small-claims process. Pull from state_specific_quirks. Then a short paragraph on tax implications (debt forgiveness 1099-C threshold, taxability of the recovery if applicable). If arbitration_clause_considerations are present and the user might have signed one, add a one-paragraph warning that an arbitration clause in a contract can block small-claims court even if the case otherwise qualifies. Keep it tight, this is a 'before you go' section, not an essay.",
  },
];

async function callOpenAI(userPrompt) {
  const body = {
    model: MODEL,
    input: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
  };
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI ${res.status}: ${txt.slice(0, 400)}`);
  }
  const data = await res.json();
  if (data.error) throw new Error(`OpenAI: ${data.error.message}`);
  let text = data.output_text;
  if (!text && Array.isArray(data.output)) {
    const parts = [];
    for (const item of data.output) {
      if (Array.isArray(item?.content)) {
        for (const c of item.content) {
          if (typeof c?.text === "string") parts.push(c.text);
        }
      }
    }
    text = parts.join("\n");
  }
  return {
    text: text || "",
    usage: data.usage || {},
  };
}

async function loadPack(slug) {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/state_research?slug=eq.${slug}&select=state_name,structured_pack`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } },
  );
  const rows = await r.json();
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error(`No state_research row for slug=${slug}`);
  }
  if (!rows[0].structured_pack) {
    throw new Error(`Row exists but structured_pack is null for ${slug}`);
  }
  return { stateName: rows[0].state_name, pack: rows[0].structured_pack };
}

async function writeContent(slug, key, body) {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/state_page_content?on_conflict=state_slug,section_key`,
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
        section_key: key,
        body_md: body,
        generated_at: new Date().toISOString(),
        pack_version: 1,
        model: MODEL,
      }),
    },
  );
  if (!r.ok) {
    const txt = await r.text();
    throw new Error(`Supabase write ${r.status}: ${txt.slice(0, 300)}`);
  }
}

async function generateSection(stateName, pack, section) {
  const slice = section.slice(pack);
  const userPrompt = [
    `State: ${stateName}`,
    "",
    `Section instructions:`,
    section.instructions,
    "",
    `Data for this section (only use facts that appear here):`,
    "```json",
    JSON.stringify(slice, null, 2),
    "```",
  ].join("\n");
  const t0 = Date.now();
  const { text, usage } = await callOpenAI(userPrompt);
  const ms = Date.now() - t0;
  return { text, usage, ms };
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("usage: node scripts/generate-state-page-content.mjs <slug>");
    process.exit(1);
  }
  const { stateName, pack } = await loadPack(slug);
  console.log(`Generating content for ${stateName} (${slug}) — ${SECTIONS.length} sections`);

  const results = await Promise.all(
    SECTIONS.map(async (s) => {
      try {
        const r = await generateSection(stateName, pack, s);
        await writeContent(slug, s.key, r.text);
        const inToks = r.usage.input_tokens ?? 0;
        const outToks = r.usage.output_tokens ?? 0;
        // gpt-5-mini: $0.25 / 1M in, $2 / 1M out
        const costCents = (inToks * 25 + outToks * 200) / 1_000_000;
        console.log(
          `  ✓ ${s.key.padEnd(14)} ${r.ms}ms  in=${inToks} out=${outToks}  $${costCents.toFixed(4)}`,
        );
        return { key: s.key, ok: true, costCents };
      } catch (e) {
        console.error(`  ✗ ${s.key}: ${e.message}`);
        return { key: s.key, ok: false };
      }
    }),
  );
  const okCount = results.filter((r) => r.ok).length;
  const totalCents = results.reduce((sum, r) => sum + (r.costCents ?? 0), 0);
  console.log(`\nDone: ${okCount}/${results.length} sections, total $${totalCents.toFixed(4)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
