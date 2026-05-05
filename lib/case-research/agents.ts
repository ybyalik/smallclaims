// Real-research agents called from the Inngest function.
// Every step here either makes a network call (LLM, Tavily, Firecrawl) or
// processes data deterministically. Network failures bubble up; the Inngest
// step wrapper retries.

import { MODEL, plainText, structuredJson } from "./openai";
import { tavilySearch, type TavilySearchResult } from "./tavily";
import { firecrawlFetch, type FirecrawlPage } from "./firecrawl";
import { brightDataFetch, isBrightDataConfigured } from "./brightdata";
import { isOfficialDomain } from "./source-policy";

export interface IntakeSnapshot {
  caseId: string;
  state: string;
  // Best single-county fallback (defaults to defendant_county if set, then
  // incident_county, then plaintiff_county). Kept for backwards compat.
  county: string | null;
  city: string | null;
  // Per-party counties so prompts can reason about venue rules without us
  // pre-applying them. Any may be null.
  plaintiffCounty: string | null;
  defendantCounty: string | null;
  incidentCounty: string | null;
  disputeType: string;
  amountCents: number;
  defendantName: string;
  defendantAddress: Record<string, unknown> | null;
  factsNarrative: string | null;
}

export interface Classification {
  claim_category: string;
  proper_court_type: string;
  proper_court_type_notes: string;
  amount_within_limit: boolean;
  amount_limit_dollars: number | null;
  venue_rule: string;
  statute_of_limitations: {
    deadline: string | null;
    citation: string;
    notes: string;
  };
  pre_filing_requirements: string[];
  eligibility_concerns: string[];
  jury_trial_available: boolean | null;
  attorneys_allowed: boolean | null;
  counterclaim_implications: string;
  notes: string;
}

export const CLASSIFY_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    claim_category: { type: "string" },
    proper_court_type: { type: "string" },
    proper_court_type_notes: { type: "string" },
    amount_within_limit: { type: "boolean" },
    amount_limit_dollars: { type: ["number", "null"] },
    venue_rule: { type: "string" },
    statute_of_limitations: {
      type: "object",
      additionalProperties: false,
      properties: {
        deadline: { type: ["string", "null"] },
        citation: { type: "string" },
        notes: { type: "string" },
      },
      required: ["deadline", "citation", "notes"],
    },
    pre_filing_requirements: { type: "array", items: { type: "string" } },
    eligibility_concerns: { type: "array", items: { type: "string" } },
    jury_trial_available: { type: ["boolean", "null"] },
    attorneys_allowed: { type: ["boolean", "null"] },
    counterclaim_implications: { type: "string" },
    notes: { type: "string" },
  },
  required: [
    "claim_category",
    "proper_court_type",
    "proper_court_type_notes",
    "amount_within_limit",
    "amount_limit_dollars",
    "venue_rule",
    "statute_of_limitations",
    "pre_filing_requirements",
    "eligibility_concerns",
    "jury_trial_available",
    "attorneys_allowed",
    "counterclaim_implications",
    "notes",
  ],
};

export interface QueryPlan {
  queries: string[];
}

const QUERY_PLAN_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    queries: { type: "array", items: { type: "string" } },
  },
  required: ["queries"],
};

export async function buildQueryPlan(
  intake: IntakeSnapshot,
  classification: Classification,
): Promise<{ data: QueryPlan; costCents: number }> {
  const prompt = `Generate web search queries that will surface every piece of OFFICIAL court information someone would need to file this case themselves. Target sources are .gov / .us / state court self-help / county clerk / e-filing portals.

Use as many queries as you need. Don't pad and don't undershoot. If the case has unusual aspects (specific claim type, specific county, statute citation, special program) generate dedicated queries for each. A typical case needs 8 to 15 queries; complex cases may need 20+.

State: ${intake.state}
Plaintiff's county: ${intake.plaintiffCounty ?? "(not provided)"}
Defendant's county: ${intake.defendantCounty ?? "(not provided)"}
Incident / property county: ${intake.incidentCounty ?? "(not provided)"}
Defendant city: ${intake.city ?? "(not provided)"}
Claim category (user-tagged): ${classification.claim_category}
Amount: $${(intake.amountCents / 100).toFixed(2)}

Cover all of these dimensions, generating one or more queries for each:
- Which specific courthouse / division this case belongs in (especially in the named county/city)
- Statute or rule of court that governs this claim type in this state, with the citation number
- Subject-matter exclusions for this division: what kinds of claims it CANNOT hear in this state
- Per-plaintiff filing-frequency limits and rules against splitting one claim into multiple suits
- Forum-selection / arbitration clause considerations (consumer-contract carve-outs in small claims)
- All official forms required to start the case (claim, summons, fee waiver if relevant)
- Where to download those forms officially
- Filing fee schedule (and any service-of-process fee)
- E-filing availability and the specific portal name (Odyssey Guide & File, eFileTexas, eCourts NJ, etc.)
- Service of process rules: who can serve, methods allowed, deadline
- Pre-filing requirements (notice letters, mediation, agency exhaustion, etc.)
- Hearing process: timeline, what to bring, format
- Hearing logistics specifics: copies required, exhibit format, hearsay rules, default judgment prove-up, plaintiff no-show consequences
- Counterclaim handling: what happens if defendant's counterclaim exceeds the cap (transfer to higher court)
- Court-annexed mediation: whether offered, when (day-of-hearing), free or paid
- Court interpreter request process and ADA accommodation request process
- Costs the prevailing party can recover (filing fee, service fee, witness fees) and items NOT recoverable (lost wages, travel)
- Prejudgment and post-judgment statutory interest rates
- Attorney's fees rules in this division (usually unavailable, but specific statutes may award them)
- Appeal mechanics: window, who can appeal, trial de novo vs appellate review
- Motion to vacate default judgment: deadline and process
- Post-judgment collection: writ of execution, garnishment, levy, debtor exam
- Wage garnishment state cap (e.g., 25% federal, but TX/NC/SC restrict more)
- Exemptions from collection (homestead, federal benefits, retirement, tools of trade) with dollar amounts
- Bank levy mechanics and Motion to Turn Over Funds
- Judgment renewal deadline and process
- Recording an Abstract of Judgment and how it creates a lien on real property
- Satisfaction of Judgment: whether required after payment and consequences of failing to file
- Domestication of out-of-state judgments under UEFJA
- Bankruptcy automatic stay effects on the case
- State-specific quirks tied to the claim type (e.g., security deposit double-damages statutes, lemon-law procedures, wage-claim agencies)
- Tax implications of recovery (taxable income vs excluded; 1099-C considerations)
- Evidence checklist specific to this claim type

Each query should be a literal phrase a human would type into Google to find an OFFICIAL court page. Do NOT include "site:" filters. Each query should be self-contained — include the state name in every query so generic ones don't leak across jurisdictions.`;

  return structuredJson<QueryPlan>({
    model: MODEL.FAST,
    input: prompt,
    jsonSchema: QUERY_PLAN_SCHEMA,
    temperature: 0,
  });
}

export interface RankedHit extends TavilySearchResult {
  query: string;
  isOfficial: boolean;
}

export async function searchAll(
  _state: string,
  queries: string[],
): Promise<{ hits: RankedHit[]; costCents: number }> {
  // We do NOT pass include_domains here. Tavily's exact-domain filter is too
  // restrictive when we don't have a per-state seed list, and unmaintainable
  // when we do. Instead, we let the open web be searched and filter at cite
  // time using regex patterns in source-policy.ts (.gov / .us / *.courts.*.gov
  // / *clerk*.gov etc.). Official sources still get ranked first.
  let cost = 0;
  const seen = new Set<string>();
  const hits: RankedHit[] = [];

  for (const q of queries) {
    const res = await tavilySearch(q, {
      maxResults: 8,
      searchDepth: "advanced",
    });
    cost += res.costCents;
    for (const r of res.results) {
      if (seen.has(r.url)) continue;
      seen.add(r.url);
      hits.push({ ...r, query: q, isOfficial: isOfficialDomain(r.url) });
    }
  }
  // Prefer official, then score
  hits.sort((a, b) => {
    if (a.isOfficial !== b.isOfficial) return a.isOfficial ? -1 : 1;
    return b.score - a.score;
  });
  return { hits, costCents: cost };
}

export interface FetchedDoc extends FirecrawlPage {
  query: string;
  isOfficial: boolean;
}

export async function fetchAndExtract(
  hits: RankedHit[],
  opts: { maxPages: number },
): Promise<{ docs: FetchedDoc[]; costCents: number; fallbacks: number }> {
  const slice = hits.filter((h) => h.isOfficial).slice(0, opts.maxPages);
  const docs: FetchedDoc[] = [];
  let cost = 0;
  let fallbacks = 0;
  const canFallback = isBrightDataConfigured();

  await Promise.all(
    slice.map(async (h) => {
      // First try Firecrawl ($0.02 / page)
      try {
        const page = await firecrawlFetch(h.url);
        if (page.markdown && page.markdown.trim().length > 200) {
          docs.push({ ...page, query: h.query, isOfficial: h.isOfficial });
          cost += 2;
          return;
        }
        // Empty/thin response — fall through to Bright Data
      } catch (e) {
        console.warn(`[case-research firecrawl] ${h.url}:`, e);
      }

      // Fallback: Bright Data Web Unlocker (~$0.005 - $0.02 / page depending on plan)
      if (!canFallback) return;
      try {
        const page = await brightDataFetch(h.url);
        docs.push({ ...page, query: h.query, isOfficial: h.isOfficial });
        cost += 2;
        fallbacks += 1;
      } catch (e) {
        console.error(`[case-research brightdata] ${h.url}:`, e);
      }
    }),
  );
  return { docs, costCents: cost, fallbacks };
}

export interface EvidencePack {
  classification: Classification;

  // Court / venue
  court_name: string;
  filing_location: string;
  claim_limit_dollars: number | null;

  // Scope and gating issues
  excluded_claim_types: string[];
  arbitration_clause_considerations: string;
  frequency_caps: string;
  claim_splitting_prohibited: boolean | null;

  // Pre-filing demand letter requirements (separate from the generic
  // pre_filing_requirements list under classification — this is structured).
  demand_letter: {
    required: boolean | null;
    recommended: boolean | null;
    minimum_days_before_filing: number | null;
    certified_mail_required: boolean | null;
    return_receipt_required: boolean | null;
    required_content_elements: string[];
    notes: string;
  };

  // Government tort claim notice (only when defendant is a city/county/state
  // entity). Many states have a separate, much shorter deadline for these.
  government_tort_claim_notice: {
    required_for_government_defendants: boolean | null;
    deadline_days: number | null;
    form_code: string;
    recipient_address: string;
    statute: string;
  };

  // Forms and filing
  forms_required: Array<{
    code: string | null;
    name: string;
    url: string | null;
    purpose: string;
    fillable_online: boolean;
    completion_methods: string[];
  }>;
  filing_fee_cents: number | null;
  filing_fee_notes: string;
  filing_methods: string[];
  // E-file portal specifics for this jurisdiction (if e-filing is offered).
  efile_portal: {
    name: string;
    url: string;
    account_required: boolean | null;
    accepted_file_types: string[];
  };
  // Granular fee schedule. Headline filing_fee_cents stays for back-compat;
  // these expose the fees that often surprise plaintiffs (service, motions,
  // jury demand) plus fee waiver eligibility.
  fee_schedule: {
    service_fee_cents: number | null;
    motion_fee_cents: number | null;
    jury_demand_fee_cents: number | null;
    accepted_payment_methods: string[];
    check_payee: string;
    fee_waiver: {
      available: boolean | null;
      eligibility_criteria: string;
      form_code: string;
      form_url: string;
    };
  };

  // Service and hearing
  service_requirements: string[];
  // Structured per-method service options. service_requirements stays for
  // any free-form notes that don't fit a single method.
  service_methods: Array<{
    method: string;
    allowed: boolean | null;
    cost_cents: number | null;
    deadline_days_before_hearing: number | null;
    proof_of_service_form_code: string;
    notes: string;
  }>;
  hearing_process: string[];
  hearing_logistics: {
    copies_required: number | null;
    exhibit_format: string;
    recording_rules: string;
    hearsay_rules: string;
    default_proveup_required: boolean | null;
    plaintiff_no_show_consequence: string;
    typical_days_filing_to_hearing: number | null;
    continuance_rules: string;
    witness_subpoena_process: string;
    phone_video_appearance_allowed: boolean | null;
  };
  counterclaim_transfer_threshold: string;

  // Recoverable amounts
  recoverable_amounts: {
    costs_recoverable: string[];
    prejudgment_interest_rate_pct: number | null;
    post_judgment_interest_rate_pct: number | null;
    attorney_fees: {
      available: boolean | null;
      conditions: string;
      statute: string;
    };
  };

  // Court-annexed mediation
  court_mediation: {
    available: boolean | null;
    when: string;
    free: boolean | null;
    process: string;
  };

  // Accommodations
  accommodations: {
    interpreter_request_process: string;
    interpreter_lead_time_days: number | null;
    available_languages: string[];
    interpreter_request_form_code: string;
    ada_request_process: string;
    ada_coordinator_name: string;
    ada_coordinator_contact: string;
    ada_request_form_code: string;
  };

  // Appeal mechanics
  appeal_details: {
    window_days: number | null;
    who_can_appeal: string;
    type: string;
    motion_to_vacate_default_window_days: number | null;
  };

  // Post-judgment narrative bullets (kept for prose) + structured collection details
  post_judgment_steps: string[];
  collection_details: {
    judgment_renewal_years: number | null;
    abstract_of_judgment_process: string;
    wage_garnishment_cap_pct: number | null;
    bank_levy_process: string;
    debtors_exam_process: string;
    exemptions: string[];
    // Structured exemption list with state-specific dollar amounts and
    // statute citations. exemptions stays for back-compat as a flat label list.
    exemption_details: Array<{
      category: string;
      dollar_amount_cents: number | null;
      statute: string;
      notes: string;
    }>;
    federal_vs_state_exemption_rule: string;
    satisfaction_required: boolean | null;
    bankruptcy_stay_effects: string;
    domestication_of_out_of_state_judgment: string;
  };

  // Practical case-specific guidance
  defendant_collectability_signals: string[];
  evidence_required_for_this_claim_type: string[];
  state_specific_quirks: string[];
  // Structured statutory damages multipliers for this state and claim type
  // (e.g., NJ NJSA 46:8-21.1 awards 2x for wrongful security-deposit
  // withholding). Empty array if none apply.
  statutory_multipliers: Array<{
    statute: string;
    multiplier: number | null;
    conditions: string;
    claim_types: string[];
  }>;
  tax_implications: {
    recovery_taxability: string;
    form_1099_c_consideration: string;
  };

  sources: Array<{
    n?: number;
    url: string;
    title: string;
    domain: string;
    cited_for: string[];
  }>;
  unknowns: string[];
}

// Shared sub-schemas — used by both EVIDENCE_PACK_SCHEMA (shallow agent) and
// the deep-research extraction schema. Keeping one definition prevents drift.
const FORMS_REQUIRED_SCHEMA = {
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    properties: {
      code: { type: ["string", "null"] },
      name: { type: "string" },
      url: { type: ["string", "null"] },
      purpose: { type: "string" },
      fillable_online: { type: "boolean" },
      completion_methods: { type: "array", items: { type: "string" } },
    },
    required: ["code", "name", "url", "purpose", "fillable_online", "completion_methods"],
  },
};

const HEARING_LOGISTICS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    copies_required: { type: ["number", "null"] },
    exhibit_format: { type: "string" },
    recording_rules: { type: "string" },
    hearsay_rules: { type: "string" },
    default_proveup_required: { type: ["boolean", "null"] },
    plaintiff_no_show_consequence: { type: "string" },
    typical_days_filing_to_hearing: { type: ["number", "null"] },
    continuance_rules: { type: "string" },
    witness_subpoena_process: { type: "string" },
    phone_video_appearance_allowed: { type: ["boolean", "null"] },
  },
  required: [
    "copies_required",
    "exhibit_format",
    "recording_rules",
    "hearsay_rules",
    "default_proveup_required",
    "plaintiff_no_show_consequence",
    "typical_days_filing_to_hearing",
    "continuance_rules",
    "witness_subpoena_process",
    "phone_video_appearance_allowed",
  ],
};

const APPEAL_DETAILS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    window_days: { type: ["number", "null"] },
    who_can_appeal: { type: "string" },
    type: { type: "string" },
    motion_to_vacate_default_window_days: { type: ["number", "null"] },
  },
  required: ["window_days", "who_can_appeal", "type", "motion_to_vacate_default_window_days"],
};

const RECOVERABLE_AMOUNTS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    costs_recoverable: { type: "array", items: { type: "string" } },
    prejudgment_interest_rate_pct: { type: ["number", "null"] },
    post_judgment_interest_rate_pct: { type: ["number", "null"] },
    attorney_fees: {
      type: "object",
      additionalProperties: false,
      properties: {
        available: { type: ["boolean", "null"] },
        conditions: { type: "string" },
        statute: { type: "string" },
      },
      required: ["available", "conditions", "statute"],
    },
  },
  required: [
    "costs_recoverable",
    "prejudgment_interest_rate_pct",
    "post_judgment_interest_rate_pct",
    "attorney_fees",
  ],
};

const COURT_MEDIATION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    available: { type: ["boolean", "null"] },
    when: { type: "string" },
    free: { type: ["boolean", "null"] },
    process: { type: "string" },
  },
  required: ["available", "when", "free", "process"],
};

const ACCOMMODATIONS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    interpreter_request_process: { type: "string" },
    interpreter_lead_time_days: { type: ["number", "null"] },
    available_languages: { type: "array", items: { type: "string" } },
    interpreter_request_form_code: { type: "string" },
    ada_request_process: { type: "string" },
    ada_coordinator_name: { type: "string" },
    ada_coordinator_contact: { type: "string" },
    ada_request_form_code: { type: "string" },
  },
  required: [
    "interpreter_request_process",
    "interpreter_lead_time_days",
    "available_languages",
    "interpreter_request_form_code",
    "ada_request_process",
    "ada_coordinator_name",
    "ada_coordinator_contact",
    "ada_request_form_code",
  ],
};

const EXEMPTION_DETAILS_SCHEMA = {
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    properties: {
      category: { type: "string" },
      dollar_amount_cents: { type: ["number", "null"] },
      statute: { type: "string" },
      notes: { type: "string" },
    },
    required: ["category", "dollar_amount_cents", "statute", "notes"],
  },
};

const COLLECTION_DETAILS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    judgment_renewal_years: { type: ["number", "null"] },
    abstract_of_judgment_process: { type: "string" },
    wage_garnishment_cap_pct: { type: ["number", "null"] },
    bank_levy_process: { type: "string" },
    debtors_exam_process: { type: "string" },
    exemptions: { type: "array", items: { type: "string" } },
    exemption_details: EXEMPTION_DETAILS_SCHEMA,
    federal_vs_state_exemption_rule: { type: "string" },
    satisfaction_required: { type: ["boolean", "null"] },
    bankruptcy_stay_effects: { type: "string" },
    domestication_of_out_of_state_judgment: { type: "string" },
  },
  required: [
    "judgment_renewal_years",
    "abstract_of_judgment_process",
    "wage_garnishment_cap_pct",
    "bank_levy_process",
    "debtors_exam_process",
    "exemptions",
    "exemption_details",
    "federal_vs_state_exemption_rule",
    "satisfaction_required",
    "bankruptcy_stay_effects",
    "domestication_of_out_of_state_judgment",
  ],
};

const DEMAND_LETTER_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    required: { type: ["boolean", "null"] },
    recommended: { type: ["boolean", "null"] },
    minimum_days_before_filing: { type: ["number", "null"] },
    certified_mail_required: { type: ["boolean", "null"] },
    return_receipt_required: { type: ["boolean", "null"] },
    required_content_elements: { type: "array", items: { type: "string" } },
    notes: { type: "string" },
  },
  required: [
    "required",
    "recommended",
    "minimum_days_before_filing",
    "certified_mail_required",
    "return_receipt_required",
    "required_content_elements",
    "notes",
  ],
};

const GOVERNMENT_TORT_CLAIM_NOTICE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    required_for_government_defendants: { type: ["boolean", "null"] },
    deadline_days: { type: ["number", "null"] },
    form_code: { type: "string" },
    recipient_address: { type: "string" },
    statute: { type: "string" },
  },
  required: [
    "required_for_government_defendants",
    "deadline_days",
    "form_code",
    "recipient_address",
    "statute",
  ],
};

const EFILE_PORTAL_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    url: { type: "string" },
    account_required: { type: ["boolean", "null"] },
    accepted_file_types: { type: "array", items: { type: "string" } },
  },
  required: ["name", "url", "account_required", "accepted_file_types"],
};

const FEE_SCHEDULE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    service_fee_cents: { type: ["number", "null"] },
    motion_fee_cents: { type: ["number", "null"] },
    jury_demand_fee_cents: { type: ["number", "null"] },
    accepted_payment_methods: { type: "array", items: { type: "string" } },
    check_payee: { type: "string" },
    fee_waiver: {
      type: "object",
      additionalProperties: false,
      properties: {
        available: { type: ["boolean", "null"] },
        eligibility_criteria: { type: "string" },
        form_code: { type: "string" },
        form_url: { type: "string" },
      },
      required: ["available", "eligibility_criteria", "form_code", "form_url"],
    },
  },
  required: [
    "service_fee_cents",
    "motion_fee_cents",
    "jury_demand_fee_cents",
    "accepted_payment_methods",
    "check_payee",
    "fee_waiver",
  ],
};

const SERVICE_METHODS_SCHEMA = {
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    properties: {
      method: { type: "string" },
      allowed: { type: ["boolean", "null"] },
      cost_cents: { type: ["number", "null"] },
      deadline_days_before_hearing: { type: ["number", "null"] },
      proof_of_service_form_code: { type: "string" },
      notes: { type: "string" },
    },
    required: [
      "method",
      "allowed",
      "cost_cents",
      "deadline_days_before_hearing",
      "proof_of_service_form_code",
      "notes",
    ],
  },
};

const STATUTORY_MULTIPLIERS_SCHEMA = {
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    properties: {
      statute: { type: "string" },
      multiplier: { type: ["number", "null"] },
      conditions: { type: "string" },
      claim_types: { type: "array", items: { type: "string" } },
    },
    required: ["statute", "multiplier", "conditions", "claim_types"],
  },
};

const TAX_IMPLICATIONS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    recovery_taxability: { type: "string" },
    form_1099_c_consideration: { type: "string" },
  },
  required: ["recovery_taxability", "form_1099_c_consideration"],
};

const SOURCES_SCHEMA = {
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    properties: {
      n: { type: "number" },
      url: { type: "string" },
      title: { type: "string" },
      domain: { type: "string" },
      cited_for: { type: "array", items: { type: "string" } },
    },
    required: ["n", "url", "title", "domain", "cited_for"],
  },
};

const SOURCES_NO_N_SCHEMA = {
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    properties: {
      url: { type: "string" },
      title: { type: "string" },
      domain: { type: "string" },
      cited_for: { type: "array", items: { type: "string" } },
    },
    required: ["url", "title", "domain", "cited_for"],
  },
};

const EVIDENCE_PACK_PROPS = {
  court_name: { type: "string" },
  filing_location: { type: "string" },
  claim_limit_dollars: { type: ["number", "null"] },
  excluded_claim_types: { type: "array", items: { type: "string" } },
  arbitration_clause_considerations: { type: "string" },
  frequency_caps: { type: "string" },
  claim_splitting_prohibited: { type: ["boolean", "null"] },
  demand_letter: DEMAND_LETTER_SCHEMA,
  government_tort_claim_notice: GOVERNMENT_TORT_CLAIM_NOTICE_SCHEMA,
  forms_required: FORMS_REQUIRED_SCHEMA,
  filing_fee_cents: { type: ["number", "null"] },
  filing_fee_notes: { type: "string" },
  filing_methods: { type: "array", items: { type: "string" } },
  efile_portal: EFILE_PORTAL_SCHEMA,
  fee_schedule: FEE_SCHEDULE_SCHEMA,
  service_requirements: { type: "array", items: { type: "string" } },
  service_methods: SERVICE_METHODS_SCHEMA,
  hearing_process: { type: "array", items: { type: "string" } },
  hearing_logistics: HEARING_LOGISTICS_SCHEMA,
  counterclaim_transfer_threshold: { type: "string" },
  recoverable_amounts: RECOVERABLE_AMOUNTS_SCHEMA,
  court_mediation: COURT_MEDIATION_SCHEMA,
  accommodations: ACCOMMODATIONS_SCHEMA,
  appeal_details: APPEAL_DETAILS_SCHEMA,
  post_judgment_steps: { type: "array", items: { type: "string" } },
  collection_details: COLLECTION_DETAILS_SCHEMA,
  defendant_collectability_signals: { type: "array", items: { type: "string" } },
  evidence_required_for_this_claim_type: { type: "array", items: { type: "string" } },
  state_specific_quirks: { type: "array", items: { type: "string" } },
  statutory_multipliers: STATUTORY_MULTIPLIERS_SCHEMA,
  tax_implications: TAX_IMPLICATIONS_SCHEMA,
  unknowns: { type: "array", items: { type: "string" } },
};

const EVIDENCE_PACK_REQUIRED_KEYS = [
  "court_name",
  "filing_location",
  "claim_limit_dollars",
  "excluded_claim_types",
  "arbitration_clause_considerations",
  "frequency_caps",
  "claim_splitting_prohibited",
  "demand_letter",
  "government_tort_claim_notice",
  "forms_required",
  "filing_fee_cents",
  "filing_fee_notes",
  "filing_methods",
  "efile_portal",
  "fee_schedule",
  "service_requirements",
  "service_methods",
  "hearing_process",
  "hearing_logistics",
  "counterclaim_transfer_threshold",
  "recoverable_amounts",
  "court_mediation",
  "accommodations",
  "appeal_details",
  "post_judgment_steps",
  "collection_details",
  "defendant_collectability_signals",
  "evidence_required_for_this_claim_type",
  "state_specific_quirks",
  "statutory_multipliers",
  "tax_implications",
  "unknowns",
];

// Exported so deep-research.ts can reuse the same shape for its second-pass
// extraction (without `classification` since deep doesn't reclassify).
export const EVIDENCE_PACK_NO_CLASSIFICATION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: { ...EVIDENCE_PACK_PROPS, sources: SOURCES_NO_N_SCHEMA },
  required: [...EVIDENCE_PACK_REQUIRED_KEYS, "sources"],
};

// Full schema (with classification). Exported as EVIDENCE_PACK_FULL_SCHEMA
// so the deep-research extraction step can reuse the same shape — it now
// fills classification too (no upstream classify step).
export const EVIDENCE_PACK_FULL_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    classification: CLASSIFY_SCHEMA,
    ...EVIDENCE_PACK_PROPS,
    sources: SOURCES_SCHEMA,
  },
  required: ["classification", ...EVIDENCE_PACK_REQUIRED_KEYS, "sources"],
};

export async function buildEvidencePack(
  intake: IntakeSnapshot,
  classification: Classification,
  docs: FetchedDoc[],
): Promise<{ data: EvidencePack; costCents: number }> {
  const corpus = docs
    .map(
      (d, i) =>
        `[#${i + 1}] ${d.title ?? d.finalUrl} (${d.finalUrl})\n${(d.markdown || "").slice(0, 8000)}`,
    )
    .join("\n\n---\n\n");

  const prompt = `You are assembling a procedural-research evidence pack for one US small-claims case. You have access to fetched OFFICIAL court pages below, each tagged with a number like [#1], [#2], [#3], etc. Cite EVERY concrete fact (court name, claim limit, fee, form code/URL, service rule, hearing detail, post-judgment step) by writing the bracket marker inline (e.g. "filing fee is $35 [#3]").

CASE
- State: ${intake.state}
- Plaintiff's county: ${intake.plaintiffCounty ?? "(unknown)"}
- Defendant's county: ${intake.defendantCounty ?? "(unknown)"}
- Incident / property county: ${intake.incidentCounty ?? "(unknown)"}
- Defendant city: ${intake.city ?? "(unknown)"}
- Claim category (user-tagged): ${classification.claim_category}
- Amount: $${(intake.amountCents / 100).toFixed(2)}

Apply this state's venue rule to pick the correct filing county from the three above. Show your venue reasoning in court_name and filing_location.

SOURCES (numbered)
${corpus}

CITATION RULES (mandatory)
- The numbers in your inline citations [#N] MUST be the same numbers shown above (1 through ${docs.length}). Do not invent new numbers.
- The "sources" array in your output MUST contain an entry for EVERY number you cite anywhere in the pack. If you cite [#7] in any field, sources must include an entry with n=7.
- Each entry in "sources" must include: n (the integer matching the inline citation), url, title, domain, and cited_for (a short list of the topics that source covered for you).
- If you do not need a source page, simply do not cite it and do not include it in sources. But never cite a number that is not in sources.

INSTRUCTIONS
Output one structured evidence pack as JSON matching the schema. For every field below, fill it from what the sources actually say. If a field is not addressed by any source, leave a sensible empty default (empty string / empty array / null) and add a one-line note in "unknowns" describing what you couldn't find.

Classification (fill ALL of these from the fetched pages — there is no separate classifier upstream)
- classification.claim_category: a short canonical label that best describes the cause of action (use the user-tagged value above as a hint, but refine if the sources name it differently).
- classification.proper_court_type: the actual name used in this state for the court division that hears claims like this at this dollar amount (e.g. "Special Civil Part – Small Claims Section" in NJ, "Justice of the Peace Court" in TX, "Superior Court Small Claims Division" in CA).
- classification.proper_court_type_notes: brief explanation of why this division and not another (e.g. "Amount exceeds small-claims cap of $5,000, so it goes to Special Civil Part regular docket").
- classification.amount_within_limit: whether the case fits within the small-claims dollar cap.
- classification.amount_limit_dollars: the dollar cap for that division. null if not stated.
- classification.venue_rule: plain-English venue principle (e.g. "defendant's county of residence", "where the property is located").
- classification.statute_of_limitations.deadline: the applicable deadline (e.g. "6 years from breach for written contracts").
- classification.statute_of_limitations.citation: the specific statute citation (e.g. "N.J.S.A. 2A:14-1").
- classification.statute_of_limitations.notes: tolling rules, discovery rule, partial-payment restart, etc.
- classification.pre_filing_requirements: bullets of things the plaintiff MUST do before filing (demand letters, statutory notice, etc.).
- classification.eligibility_concerns: anything the sources flag that could block filing.
- classification.jury_trial_available: whether a jury is available in this division.
- classification.attorneys_allowed: whether attorneys are allowed (CA's small-claims initial hearing is famously a "no").
- classification.counterclaim_implications: what happens if defendant counterclaims over the cap.
- classification.notes: anything ambiguous that an admin should verify.

Court / venue
- court_name: the most specific courthouse / division (e.g., "Superior Court of California, County of Santa Clara — Small Claims Division").
- filing_location: full filing address with street, city, zip if available.
- claim_limit_dollars: dollar cap for this division.

Scope and gating
- excluded_claim_types: types of claims this division CANNOT hear in this state (e.g., "defamation", "specific performance", "evictions", "name changes"). Plaintiffs need to know what's off the table.
- arbitration_clause_considerations: if any source mentions consumer-contract arbitration clauses or forum-selection clauses that affect filing here, summarize. Otherwise empty string.
- frequency_caps: per-plaintiff filing-frequency limits if the state has them (e.g., CA: "no more than 2 claims over $2,500 per calendar year, statewide").
- claim_splitting_prohibited: true if the state explicitly bars splitting one claim into multiple suits to fit under the cap. null if unknown.

Pre-filing demand letter (separate from generic pre_filing_requirements)
- demand_letter.required / recommended: whether a demand letter is statutorily required and/or strongly recommended before filing.
- demand_letter.minimum_days_before_filing: required wait time after sending demand before plaintiff can file (e.g., 14, 30).
- demand_letter.certified_mail_required / return_receipt_required: whether USPS Certified Mail and/or Return Receipt are required for legal sufficiency.
- demand_letter.required_content_elements: bullets like "exact dollar amount demanded", "deadline to respond", "itemized breakdown of damages", "address for response".
- demand_letter.notes: anything else that doesn't fit a slot.

Government tort claim notice (only relevant if defendant is a government entity)
- government_tort_claim_notice.required_for_government_defendants: true if the state's Tort Claims Act requires pre-suit notice.
- government_tort_claim_notice.deadline_days: how many days after the incident the notice must be filed (often 90 or 180).
- government_tort_claim_notice.form_code, recipient_address, statute: form code, where notice is sent, and the statute citation.

Forms and filing
- forms_required: every form the plaintiff files to start the case. Include URL only if it appears in the sources.
- completion_methods values: "online_form" | "fillable_pdf" | "print_and_handwrite" | "guided_filing".
- filing_methods values: "in_person" | "mail" | "drop_box" | "efile" | "fax".
- filing_fee_cents: dollar fee in cents that applies to this case's amount bracket.
- efile_portal.name / url: e-file portal name (e.g., "eCourts Guide & File", "Odyssey Guide & File") and direct URL.
- efile_portal.account_required: whether registering an account is required to e-file.
- efile_portal.accepted_file_types: file extensions accepted by the portal (e.g., "pdf", "docx").
- fee_schedule.service_fee_cents / motion_fee_cents / jury_demand_fee_cents: each separate fee in cents (null if unstated).
- fee_schedule.accepted_payment_methods: e.g., ["cash", "check", "money_order", "credit_card", "online"].
- fee_schedule.check_payee: who checks should be made out to (e.g., "Treasurer, State of New Jersey").
- fee_schedule.fee_waiver: { available, eligibility_criteria (income thresholds, public-benefits programs accepted), form_code, form_url }.

Service and hearing
- service_requirements: free-form notes that don't fit a single service method (kept for back-compat; prefer service_methods for structured items).
- service_methods: one entry per allowed method. method values: "sheriff" | "certified_mail" | "personal_service" | "alternate_service" | "publication" | "private_process_server". Each entry: { method, allowed, cost_cents, deadline_days_before_hearing, proof_of_service_form_code, notes }.
- hearing_process: timeline, what to bring, what happens at the hearing.
- hearing_logistics.copies_required: how many copies of exhibits to bring (judge + opponent + you = often 3). null if unstated.
- hearing_logistics.exhibit_format: how exhibits should be presented (binder, marked, originals, etc.).
- hearing_logistics.recording_rules: whether the hearing is recorded, whether the parties can record.
- hearing_logistics.hearsay_rules: whether rules of evidence are relaxed in this division.
- hearing_logistics.default_proveup_required: whether plaintiff must still prove damages even on default.
- hearing_logistics.plaintiff_no_show_consequence: what happens if plaintiff fails to appear (dismissal, w/ or w/o prejudice).
- hearing_logistics.typical_days_filing_to_hearing: typical days between filing and the first hearing date as a number.
- hearing_logistics.continuance_rules: how to request a continuance, deadlines, fee, who can object.
- hearing_logistics.witness_subpoena_process: how to subpoena witnesses (form code, fee, service method, deadline).
- hearing_logistics.phone_video_appearance_allowed: whether parties can appear by phone or video, and how to request.
- counterclaim_transfer_threshold: if the defendant's counterclaim exceeds the cap, what happens (case transfers? remains?).

Recoverable amounts
- recoverable_amounts.costs_recoverable: list of costs the prevailing party can add to the judgment (filing fee, service fee, witness fee, etc.). Note items that are NOT recoverable (e.g., lost wages, travel) in unknowns or as a separate item.
- recoverable_amounts.prejudgment_interest_rate_pct: prejudgment statutory rate, percent per year. null if unstated.
- recoverable_amounts.post_judgment_interest_rate_pct: post-judgment statutory rate, percent per year. null if unstated.
- recoverable_amounts.attorney_fees: { available, conditions, statute }. attorney_fees are usually unavailable in small claims unless a contract or statute provides them — capture both the rule and any statute mentioned.

Court-annexed mediation
- court_mediation: whether the court offers mediation, when (e.g., "day-of-hearing"), whether free, and the process to request it.

Accommodations
- accommodations.interpreter_request_process: how to request a court interpreter.
- accommodations.interpreter_lead_time_days: how many days in advance the interpreter must be requested.
- accommodations.available_languages: language list the court provides interpreters for (e.g., ["Spanish", "Mandarin", "Vietnamese"]).
- accommodations.interpreter_request_form_code: form code if a specific form is used (otherwise empty string).
- accommodations.ada_request_process: how to request ADA accommodations.
- accommodations.ada_coordinator_name: ADA coordinator name if known.
- accommodations.ada_coordinator_contact: ADA coordinator phone or email.
- accommodations.ada_request_form_code: form code if used.

Appeal mechanics
- appeal_details.window_days: days from judgment entry to file appeal.
- appeal_details.who_can_appeal: who has appeal rights (often defendant only in small claims).
- appeal_details.type: "de_novo" (full new trial in higher court), "appellate" (record review), or "none".
- appeal_details.motion_to_vacate_default_window_days: time limit for the defaulted defendant to move to vacate.

Post-judgment
- post_judgment_steps: prose bullets summarizing the collection sequence.
- collection_details.judgment_renewal_years: how long judgment is good for; renew before this expires.
- collection_details.abstract_of_judgment_process: how to record an abstract / lien on real property.
- collection_details.wage_garnishment_cap_pct: state cap on wage garnishment as a percent of disposable earnings (federal default is 25%; some states forbid consumer wage garnishment entirely — capture the rule).
- collection_details.bank_levy_process: short summary of how to levy a bank account.
- collection_details.debtors_exam_process: how to conduct a judgment-debtor's examination.
- collection_details.exemptions: list of asset category labels exempt from execution (kept for back-compat).
- collection_details.exemption_details: structured array, one entry per category. Each entry: { category (e.g. "homestead", "wages", "vehicle", "tools_of_trade", "federal_benefits", "retirement", "personal_property"), dollar_amount_cents (specific dollar cap in cents if state law sets one), statute (citation), notes (any conditions). MUST include the dollar amount when state law provides a specific cap.
- collection_details.federal_vs_state_exemption_rule: explain whether the debtor must elect either the federal exemption set or the state set (some states force one or the other), and the deadline / mechanism for the election.
- collection_details.satisfaction_required: whether the plaintiff must file a Satisfaction of Judgment after being paid.
- collection_details.bankruptcy_stay_effects: what happens if the defendant files bankruptcy (automatic stay, proof of claim, dischargeability).
- collection_details.domestication_of_out_of_state_judgment: process for enforcing this state's judgment in another state.

Practical case-specific guidance
- defendant_collectability_signals: bullet points to help the plaintiff judge whether the defendant has assets to collect from (e.g., "If defendant is a sole proprietor, personal assets are reachable; if LLC, you must execute against entity assets unless veil-piercing is proven").
- evidence_required_for_this_claim_type: claim-type-specific evidence checklist (e.g., for security deposit cases: "lease, move-in/out condition photos, written demand, landlord's accounting statement").
- state_specific_quirks: bullet points on state-specific gotchas tied to this claim type.
- statutory_multipliers: STRUCTURED list of damages-multiplier statutes that apply to this claim type. Each entry: { statute (citation, e.g. "NJSA 46:8-21.1"), multiplier (numeric, e.g. 2 for "double damages", 3 for "treble"; null if non-numeric), conditions (when the multiplier applies, e.g. "wrongful retention of security deposit"), claim_types (e.g. ["security_deposit"]) }. Empty array if none. This is critical SEO data, do not miss it.
- tax_implications.recovery_taxability: whether amounts recovered are taxable income (interest is generally taxable, physical-injury compensatory under IRC § 104 is excluded, etc.).
- tax_implications.form_1099_c_consideration: whether forgiving uncollectible amounts may trigger 1099-C reporting.

Hard rules
- DO NOT give legal advice, only procedural guidance.
- Cite EVERY concrete fact inline with [#N].
- If sources contradict each other, note both and add to "unknowns".`;

  return structuredJson<EvidencePack>({
    model: MODEL.REASONING,
    input: prompt,
    jsonSchema: EVIDENCE_PACK_FULL_SCHEMA,
    temperature: 0,
    maxOutputTokens: 12000,
  });
}

export interface QaResult {
  passed: boolean;
  checks: {
    all_claims_cited: boolean;
    sources_official: boolean;
    county_correct: boolean;
    contradictions_found: boolean;
    legal_advice_detected: boolean;
  };
  issues: string[];
}

const QA_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    passed: { type: "boolean" },
    checks: {
      type: "object",
      additionalProperties: false,
      properties: {
        all_claims_cited: { type: "boolean" },
        sources_official: { type: "boolean" },
        county_correct: { type: "boolean" },
        contradictions_found: { type: "boolean" },
        legal_advice_detected: { type: "boolean" },
      },
      required: [
        "all_claims_cited",
        "sources_official",
        "county_correct",
        "contradictions_found",
        "legal_advice_detected",
      ],
    },
    issues: { type: "array", items: { type: "string" } },
  },
  required: ["passed", "checks", "issues"],
};

export async function qaEvidencePack(
  intake: IntakeSnapshot,
  pack: EvidencePack,
): Promise<{ data: QaResult; costCents: number }> {
  const prompt = `Audit this procedural research pack. Run these checks:
- all_claims_cited: every concrete fact (court name, claim limit, fee, form, service rule, hearing detail, post-judgment step) traces to a source in pack.sources.
- sources_official: every source domain is plausibly an official court / clerk / state / county / federal site.
- county_correct: the court_name and filing_location are consistent with the case input. Input state="${intake.state}". Input plaintiff county="${intake.plaintiffCounty ?? "(unknown)"}", defendant county="${intake.defendantCounty ?? "(unknown)"}", incident county="${intake.incidentCounty ?? "(unknown)"}". The pack should pick the venue county that matches the state's venue rule for this claim type.
- contradictions_found: any internal contradictions across fields.
- legal_advice_detected: anything phrased as legal advice rather than procedural information ("you should sue", "you will win", strategic recommendations).

Set passed=true only if all checks are clean. List specific issues you found in 'issues'.

WRITING STYLE FOR ISSUES (mandatory)
- Write each issue in plain English aimed at a non-technical admin reader.
- Refer to fields by their meaning, not by JSON path. Examples:
    BAD:  "hearing_logistics.default_proveup_required = true has no citation"
    GOOD: "The pack states the plaintiff must still prove damages even on a default judgment, but doesn't link that claim to a specific source page."
    BAD:  "filing_methods includes 'efile' but no source confirms it"
    GOOD: "The pack lists e-filing as a filing method, but no cited source explicitly confirms e-filing is available for this case type."
- Do not use JSON syntax (no equals signs, no array brackets, no field-path notation).
- One to two sentences per issue.

PACK
${JSON.stringify(pack, null, 2)}`;

  return structuredJson<QaResult>({
    model: MODEL.FAST,
    input: prompt,
    jsonSchema: QA_SCHEMA,
    temperature: 0,
  });
}

