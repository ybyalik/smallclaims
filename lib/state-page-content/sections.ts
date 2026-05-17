// Per-section specs for the public state page (e.g. /small-claims/new-york).
// Each section is a chunk of plain-language explainer prose generated from
// the matching slice of state_research.structured_pack.
//
// The page template renders the structured data (fee tiers, SOL entries,
// exemption table, etc.) directly from the pack. The explainer rendered
// here goes ABOVE that data and frames it in plain English so the reader
// has context before they hit a table.
//
// To add a section: add an entry below + render it in the page template
// at the right slot.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Pack = Record<string, any>;

export interface SectionSpec {
  /** DB primary-key fragment. Stable. */
  key: string;
  /** Human label for admin tooling and page eyebrows. */
  title: string;
  /** Builds the relevant slice of the pack to hand to the LLM. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slice: (pack: Pack) => Record<string, any>;
  /** Per-section instruction. */
  instructions: string;
}

// Shared author voice. Anchored in the project's plain-language rule
// (CLAUDE.md feedback: no em-dashes, plain English, no AI slop).
export const SYSTEM_PROMPT = `You write plain-English explainers for a public small-claims legal guide. Your reader is a non-lawyer who is trying to figure out whether and how to sue someone in their state.

Voice:
- Second person ("you"), present tense, conversational but precise.
- Short sentences. Short paragraphs (2-3 sentences each).
- Use specific numbers (dollars, days, percentages) when the data has them. Never invent numbers — only use the values you are given.
- When citing a statute, write it inline like "(Cal. Code Civ. Proc. § 116.221)". Keep citations short.

Hard rules:
- Never use em-dashes (—) or en-dashes (–). Use a period, a comma, or "and" instead.
- Do not say "consult a lawyer" or add disclaimers about not being legal advice. The page has a footer disclaimer; you don't repeat it.
- Do not start with "In [state]," or restate the section heading. Just start with the substance.
- No marketing language ("seamlessly", "robust", "comprehensive", "navigate the complexities"). Just say what is true.
- No filler ("It is important to note", "It is worth mentioning"). Cut it.
- Output markdown. Use bullets only when listing 3+ peer items; otherwise prose. No H1/H2 — the page template handles headings.

Length: 2-4 short paragraphs (roughly 80-180 words). Some sections can be 1 paragraph if there isn't much data; never pad.`;

function pick<T extends Record<string, unknown>>(obj: T, keys: (keyof T)[]): Partial<T> {
  const out: Partial<T> = {};
  for (const k of keys) if (obj[k] !== undefined) out[k] = obj[k];
  return out;
}

export const SECTIONS: SectionSpec[] = [
  {
    key: "tldr",
    title: "Quick answer",
    slice: (p) => ({
      claim_limit_dollars: p.claim_limit_dollars,
      claim_cap_tiers: p.claim_cap_tiers,
      filing_fee_tiers: p.filing_fee_tiers,
      filing_methods: p.filing_methods,
      government_tort_claim_notice_required: !!p.government_tort_claim_notice,
      hearing_typical_timeline_weeks: p.hearing_logistics?.typical_timeline_weeks,
      statute_of_limitations_typical_years_min: Math.min(
        ...(p.statute_of_limitations_by_claim_type ?? [])
          .map((x: { years?: number }) => x.years)
          .filter((y: number | undefined): y is number => typeof y === "number"),
      ),
      statute_of_limitations_typical_years_max: Math.max(
        ...(p.statute_of_limitations_by_claim_type ?? [])
          .map((x: { years?: number }) => x.years)
          .filter((y: number | undefined): y is number => typeof y === "number"),
      ),
    }),
    instructions:
      "Write a 3-4 sentence opening for the state's small-claims guide. Cover: the max claim amount (note if it varies by court tier), typical filing fee range, typical timeline from filing to hearing if known, and the typical deadline range to sue. Keep it tight — this is the lede.",
  },

  {
    key: "can_i_sue",
    title: "Can I sue here?",
    slice: (p) => ({
      claim_limit_dollars: p.claim_limit_dollars,
      claim_cap_tiers: p.claim_cap_tiers,
      claim_splitting_prohibited: p.claim_splitting_prohibited,
      frequency_caps: p.frequency_caps,
      excluded_claim_types: p.excluded_claim_types,
      classification: p.classification,
    }),
    instructions:
      "Explain who can sue in this state's small claims court and for what. Cover: the dollar cap (if it varies by court level, explain which court handles what range), whether you can split a larger claim into smaller ones, any frequency caps (how many cases per year), and the headline things you CAN'T bring here. Don't enumerate every excluded claim type — point at the 2-3 most common (eviction, divorce, government agencies if applicable) and say the full list is below.",
  },

  {
    key: "how_long",
    title: "How long do I have?",
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
    title: "What will it cost?",
    slice: (p) => ({
      filing_fee_tiers: p.filing_fee_tiers,
      filing_fee_notes: p.filing_fee_notes,
      fee_schedule: p.fee_schedule,
      fee_waiver: p.fee_schedule?.fee_waiver,
      service_methods_with_costs: (p.service_methods ?? []).map((m: { name?: string; cost_cents?: number }) => ({
        name: m.name,
        cost_cents: m.cost_cents,
      })),
    }),
    instructions:
      "Explain the real out-of-pocket cost of filing. Cover four buckets: the filing fee (tiered by claim size), the cost to serve the defendant (varies by method), and any 'hidden' fees like motion-to-vacate or jury-demand fees if the pack has them. Then explain the fee waiver: who qualifies (income thresholds, benefits programs like SNAP/Medicaid/SSI if listed). Add up an example total for a typical $3,000 claim if you can.",
  },

  {
    key: "how_to_file",
    title: "How do I file?",
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
    title: "What I can recover",
    slice: (p) => ({
      recoverable_amounts: p.recoverable_amounts,
      statutory_multipliers: p.statutory_multipliers,
      prejudgment_interest_by_claim_type: p.prejudgment_interest_by_claim_type,
      collection_details_post_judgment_interest: p.collection_details?.post_judgment_interest_rate_percent,
    }),
    instructions:
      "Explain what dollars you can actually get back. Three buckets: (1) Your direct losses (the money you're owed plus documented out-of-pocket damages). (2) Statutory multipliers — list the 2-3 highest-leverage ones (e.g. 'security deposit kept in bad faith = 2-3x', 'consumer fraud = treble damages'), what claim types they apply to, and the statute. (3) Interest — pre-judgment (clock starts when harm happened) and post-judgment (clock starts when you win). Use the real percentages from the pack.",
  },

  {
    key: "serving",
    title: "Serving the defendant",
    slice: (p) => ({
      service_methods: p.service_methods,
      service_requirements: p.service_requirements,
    }),
    instructions:
      "Explain what 'serving the defendant' means and how to do it in this state. List the allowed methods (sheriff, certified mail, process server, etc.) with their cost and how reliable each one is. Cover the timing: how many days before the hearing service must be completed, and how many days before the hearing the proof-of-service form must be filed. End with the 'can't find them' fallback (publication, posting, etc.) if listed.",
  },

  {
    key: "hearing",
    title: "The hearing",
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
    title: "If you lose",
    slice: (p) => ({
      appeal_details: p.appeal_details,
    }),
    instructions:
      "Explain what happens after a small-claims judgment if you lose (or if the defendant loses and wants to appeal). Cover: how many days you have to appeal, what type of appeal it is (trial de novo means a brand-new trial, vs. a record review), who is allowed to appeal (plaintiff, defendant, or both), what court hears the appeal, and what it costs. Be honest if appeals are limited or expensive — readers want to know whether it's worth fighting.",
  },

  {
    key: "collecting",
    title: "If you win, collecting",
    slice: (p) => ({
      collection_details: p.collection_details,
      post_judgment_steps: p.post_judgment_steps,
    }),
    instructions:
      "This is where most people stop and lose. Explain that the court does NOT collect for the winner. Cover: the loser's deadline to pay before collection methods become available, the post-judgment interest rate, the main collection methods (wage garnishment, bank levy, lien) with rough cost and effectiveness for each. Briefly preview the exemption schedule (what assets are protected) shown in a table below this section, with a note that defendants who only have protected assets — Social Security, unemployment, the family home up to $X — may be 'judgment-proof' in practice.",
  },

  {
    key: "fine_print",
    title: "Fine print and quirks",
    slice: (p) => ({
      state_specific_quirks: p.state_specific_quirks,
      tax_implications: p.tax_implications,
      defendant_collectability_signals: p.defendant_collectability_signals,
      arbitration_clause_considerations: p.arbitration_clause_considerations,
    }),
    instructions:
      "Surface the 3-5 things that surprise people about this state's small-claims process. Pull from state_specific_quirks. Then a short paragraph on tax implications (debt forgiveness 1099-C threshold, taxability of the recovery if applicable). If arbitration_clause_considerations are present and the user might have signed one, add a one-paragraph warning that an arbitration clause in a contract can block small-claims court even if the case otherwise qualifies. Keep it tight — this is a 'before you go' section, not an essay.",
  },
];
