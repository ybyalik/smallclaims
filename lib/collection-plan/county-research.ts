// County-specific post-judgment paperwork research.
//
// Runs once at purchase time. Searches the user's county sheriff + recorder +
// clerk for the actual forms and fees used to enforce a judgment, fetches
// the top pages, and runs an LLM extraction to produce a structured
// CountyPack. The result is cached on the collection_plans row.
//
// Same pattern as lib/case-research/agents.ts (search → fetch → extract)
// just narrower in scope.

import { tavilySearch, type TavilySearchResult } from "../case-research/tavily";
import { firecrawlFetch } from "../case-research/firecrawl";
import { structuredJson, MODEL } from "../case-research/openai";
import { STATES } from "../states";
import type { CountyPack } from "./types";

interface CountyResearchInput {
  state: string; // 2-letter abbr (e.g. "CA")
  county: string; // e.g. "Los Angeles"
}

interface CountyResearchResult {
  pack: CountyPack;
  costCents: number;
  sourcesFetched: number;
}

const COUNTY_PACK_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    county: { type: "string" },
    state: { type: "string" },
    writ_of_execution: {
      type: "object",
      additionalProperties: false,
      properties: {
        form_code: { type: ["string", "null"] },
        form_url: { type: ["string", "null"] },
        filing_fee_cents: { type: ["number", "null"] },
        who_files: { type: "string" },
        notes: { type: "string" },
      },
      required: ["form_code", "form_url", "filing_fee_cents", "who_files", "notes"],
    },
    wage_garnishment: {
      type: "object",
      additionalProperties: false,
      properties: {
        form_code: { type: ["string", "null"] },
        form_url: { type: ["string", "null"] },
        filing_fee_cents: { type: ["number", "null"] },
        sheriff_service_fee_cents: { type: ["number", "null"] },
        continuing_or_single_shot: { type: "string" },
        notes: { type: "string" },
      },
      required: [
        "form_code",
        "form_url",
        "filing_fee_cents",
        "sheriff_service_fee_cents",
        "continuing_or_single_shot",
        "notes",
      ],
    },
    bank_levy: {
      type: "object",
      additionalProperties: false,
      properties: {
        form_code: { type: ["string", "null"] },
        form_url: { type: ["string", "null"] },
        filing_fee_cents: { type: ["number", "null"] },
        sheriff_service_fee_cents: { type: ["number", "null"] },
        lookback_days: { type: ["number", "null"] },
        notes: { type: "string" },
      },
      required: [
        "form_code",
        "form_url",
        "filing_fee_cents",
        "sheriff_service_fee_cents",
        "lookback_days",
        "notes",
      ],
    },
    debtor_exam: {
      type: "object",
      additionalProperties: false,
      properties: {
        form_code: { type: ["string", "null"] },
        form_url: { type: ["string", "null"] },
        filing_fee_cents: { type: ["number", "null"] },
        service_method: { type: "string" },
        consequence_if_defendant_does_not_appear: { type: "string" },
        notes: { type: "string" },
      },
      required: [
        "form_code",
        "form_url",
        "filing_fee_cents",
        "service_method",
        "consequence_if_defendant_does_not_appear",
        "notes",
      ],
    },
    abstract_of_judgment: {
      type: "object",
      additionalProperties: false,
      properties: {
        recording_fee_cents: { type: ["number", "null"] },
        recorder_office: { type: "string" },
        recorder_url: { type: ["string", "null"] },
        lien_duration_years: { type: ["number", "null"] },
        notes: { type: "string" },
      },
      required: [
        "recording_fee_cents",
        "recorder_office",
        "recorder_url",
        "lien_duration_years",
        "notes",
      ],
    },
    sheriff: {
      type: "object",
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        phone: { type: ["string", "null"] },
        address: { type: ["string", "null"] },
        hours: { type: ["string", "null"] },
        levying_officer_role: { type: "string" },
      },
      required: ["name", "phone", "address", "hours", "levying_officer_role"],
    },
    fee_waiver: {
      type: "object",
      additionalProperties: false,
      properties: {
        available: { type: ["boolean", "null"] },
        form_code: { type: ["string", "null"] },
        form_url: { type: ["string", "null"] },
        eligibility_notes: { type: "string" },
      },
      required: ["available", "form_code", "form_url", "eligibility_notes"],
    },
    defendant_claim_of_exemption: {
      type: "object",
      additionalProperties: false,
      properties: {
        form_code: { type: ["string", "null"] },
        form_url: { type: ["string", "null"] },
        deadline_days_to_object: { type: ["number", "null"] },
        notes: { type: "string" },
      },
      required: ["form_code", "form_url", "deadline_days_to_object", "notes"],
    },
    satisfaction_of_judgment: {
      type: "object",
      additionalProperties: false,
      properties: {
        form_code: { type: ["string", "null"] },
        form_url: { type: ["string", "null"] },
        deadline_days_after_payment: { type: ["number", "null"] },
        penalty_for_late_filing: { type: "string" },
        notes: { type: "string" },
      },
      required: [
        "form_code",
        "form_url",
        "deadline_days_after_payment",
        "penalty_for_late_filing",
        "notes",
      ],
    },
    till_tap_or_keeper_levy: {
      type: "object",
      additionalProperties: false,
      properties: {
        available: { type: ["boolean", "null"] },
        applicable_to: { type: "string" },
        fee_cents: { type: ["number", "null"] },
        notes: { type: "string" },
      },
      required: ["available", "applicable_to", "fee_cents", "notes"],
    },
    professional_license_suspension: {
      type: "object",
      additionalProperties: false,
      properties: {
        available: { type: ["boolean", "null"] },
        applicable_professions: { type: "array", items: { type: "string" } },
        agency: { type: "string" },
        notes: { type: "string" },
      },
      required: ["available", "applicable_professions", "agency", "notes"],
    },
    self_help_center: {
      type: "object",
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        phone: { type: ["string", "null"] },
        url: { type: ["string", "null"] },
        address: { type: ["string", "null"] },
        hours: { type: ["string", "null"] },
        languages_available: { type: "array", items: { type: "string" } },
        notes: { type: "string" },
      },
      required: [
        "name",
        "phone",
        "url",
        "address",
        "hours",
        "languages_available",
        "notes",
      ],
    },
    sources: { type: "array", items: { type: "string" } },
  },
  required: [
    "county",
    "state",
    "writ_of_execution",
    "wage_garnishment",
    "bank_levy",
    "debtor_exam",
    "abstract_of_judgment",
    "sheriff",
    "fee_waiver",
    "defendant_claim_of_exemption",
    "satisfaction_of_judgment",
    "till_tap_or_keeper_levy",
    "professional_license_suspension",
    "self_help_center",
    "sources",
  ],
};

function stateName(abbr: string): string {
  return STATES.find((s) => s.abbr.toUpperCase() === abbr.toUpperCase())?.name ?? abbr;
}

function buildQueries(input: CountyResearchInput): string[] {
  const county = input.county.replace(/\s+county\s*$/i, "");
  const state = stateName(input.state);
  // Quote the state name so Tavily treats it as a phrase rather than
  // optional tokens. This is critical for counties whose names exist in
  // multiple states (Kings, Orange, Washington, Jefferson, Lincoln, etc.)
  // Without quoting, "Kings County New York" can still surface Kings County
  // California results because the search engine ranks county-name match
  // higher than the loose state qualifier.
  const stateQ = `"${state}"`;
  return [
    // General overviews (court self-help and law-library guides; usually
    // the single most valuable source per county/state)
    `how to collect small claims judgment ${county} County ${stateQ}`,
    `${stateQ} enforcement of money judgment self help court`,
    `${county} County ${stateQ} public law library collecting judgment`,
    // Officer fee schedules and the writ of execution
    `${county} County ${stateQ} sheriff constable civil enforcement fee schedule`,
    `${county} County ${stateQ} writ of execution earnings withholding order form`,
    // Method-specific procedure pages
    `${county} County ${stateQ} bank levy notice of levy procedure`,
    `${county} County ${stateQ} judgment debtor examination order to appear`,
    // Recording and lien
    `${county} County ${stateQ} recorder abstract of judgment recording fee`,
    // Defendant-side pushback (claim of exemption); helps the plaintiff
    // know what's coming and what deadlines apply.
    `${stateQ} claim of exemption judgment collection form`,
    // State-level forms (fee waiver, satisfaction of judgment, professional
    // license suspension). These are state-wide rather than county-specific
    // but plug into the same CountyPack so we don't re-run state research.
    `${stateQ} fee waiver judicial council form low income`,
    `${stateQ} satisfaction of judgment form how to file`,
    `${stateQ} professional license suspension judgment debtor contractor`,
  ];
}

// Light dedup + ranking. Prefer .gov / .us domains; cap to 6 unique URLs.
function selectTopUrls(rawHits: TavilySearchResult[][]): string[] {
  const seen = new Set<string>();
  const ranked: TavilySearchResult[] = [];
  for (const list of rawHits) {
    for (const hit of list) {
      if (seen.has(hit.url)) continue;
      seen.add(hit.url);
      ranked.push(hit);
    }
  }
  ranked.sort((a, b) => {
    const govA = /\.(gov|us)\b/i.test(a.domain) ? 1 : 0;
    const govB = /\.(gov|us)\b/i.test(b.domain) ? 1 : 0;
    if (govA !== govB) return govB - govA;
    return b.score - a.score;
  });
  // Cap at 12 pages. Was 6, but the expanded schema covers more topics
  // including state-level forms (fee waiver, claim of exemption,
  // satisfaction of judgment, license suspension). Cost: ~$0.30 in Firecrawl.
  return ranked.slice(0, 12).map((r) => r.url);
}

const SYSTEM_PROMPT = `You are extracting structured post-judgment collection paperwork data from official county sheriff (or constable), county clerk, county recorder, court self-help, public-law-library, and state-judicial-council pages. The data is used to tell a self-represented small-claims plaintiff exactly which forms to file and what fees to pay when they need to enforce a money judgment.

Some fields are county-specific (sheriff fees, recorder fees, self-help center contact) and others are state-wide (fee waiver form, claim of exemption form, satisfaction of judgment form, professional license suspension, till tap availability). The fetched pages contain a mix of both kinds of sources. Fill every field you have grounded evidence for, regardless of whether the source page was county-specific or state-wide.

CRITICAL: State scoping. Several US counties share names across states (Kings, Orange, Washington, Jefferson, Lincoln, Madison, etc.). The county AND state given to you are the authoritative target. Any fetched page that is clearly about a county with the same name in a DIFFERENT state must be IGNORED completely. Do not include its URL in the sources list, do not borrow its fees, form codes, or contact info. Examples of pages to reject when the target is "Kings County, New York": pages from countyofkingsca.gov, kingscounty.com (California), kingscountysheriff.com (California). Examples of pages to reject when the target is "Orange County, California": ocfl.net (Florida), orangecountygov.com (New York). If a page's URL or content makes it clear it's about a different state, treat it as if it wasn't fetched. The county/state pair given to you is the truth; never substitute another state's data because the names happen to match.

Output rules:
- Return a single CountyPack JSON object that conforms to the schema. Every field is required; use null for any monetary or form code that the source pages don't mention.
- Filing fees and sheriff service fees are in CENTS. $35.00 = 3500. Do NOT include the dollar amount itself; convert.
- Form codes: the exact short code the county uses (e.g. "EJ-130", "WG-001", "SC-134"). Do not invent codes.
- form_url: the direct link to the fillable PDF if shown; otherwise the page where the form is listed; otherwise null.
- notes (and the free-text fields who_files / service_method / consequence_if_defendant_does_not_appear / recorder_office / levying_officer_role / eligibility_notes / penalty_for_late_filing / applicable_to / agency): capture every relevant procedural detail from the source pages. Lookback periods, exemption claim deadlines, sheriff staffing notes, mail vs in-person filing, processing time, payment methods accepted, e-filing availability, multi-defendant procedures, anything else the user would want to know before they file. Be thorough; don't trim useful detail. The downstream report writer will use this prose verbatim.
- sources: every URL you grounded a fact in, deduplicated.

Per-method specific guidance:
- writ_of_execution: the master enforcement order. In states that use a constable instead of a sheriff (Arizona, parts of Texas), say so in who_files and levying_officer_role.
- wage_garnishment: this is for CIVIL MONEY JUDGMENTS only. IGNORE child-support income-withholding forms (e.g. LDSS-5037, LDSS-5038, federal OMB IWO form). Those are for support orders, NOT civil judgments. If the only "wage" form mentioned on a page is a support IWO, leave form_code as null and say so in notes ("the source pages list only the support-order IWO form, which does not apply to civil money judgments; ask the sheriff or marshal for the correct income execution form for a small-claims civil judgment"). The correct civil form is usually called "Income Execution" (NY), "Earnings Withholding Order" (CA, EJ-130 / WG-001 / WG-004 depending on case), "Continuing Garnishment Summons", or similar — never the support IWO. continuing_or_single_shot: "continuing" if the order keeps deducting until paid (most states), "single shot" if each paycheck needs a fresh filing.
- Fee extraction consistency: when a fee schedule lists MULTIPLE bands, pick the band that applies to a small-claims civil money judgment. If the schedule has separate "service fee" and "filing fee" lines, capture both into the right sub-fields. If a page lists a fee twice with slightly different amounts (e.g. an old archived schedule plus a current one), use the CURRENT one and ignore the older.
- bank_levy: lookback_days — some states freeze N days of past deposits, not just the moment-of-service balance; if the source pages mention this, capture it.
- debtor_exam: the procedure name varies (Order to Appear / ORAP / Order for Examination / Supplemental Proceedings / Citation to Discover Assets). Use whatever the source pages call it. consequence_if_defendant_does_not_appear: civil contempt? bench warrant? Both? Capture what the source says.
- abstract_of_judgment: lien_duration_years — how long the recorded lien lasts before renewal. In CA it's 10 years.
- fee_waiver: an income-based filing-fee reduction available to low-income plaintiffs in most states. The form is usually one specific code (e.g. CA's FW-001). available=true if the state offers any kind of fee waiver / hardship reduction; eligibility_notes captures the income thresholds or the rule (e.g. "200% of federal poverty line" or "receives public benefits").
- defendant_claim_of_exemption: the defendant's pushback paperwork. In CA it's EJ-160; in most states it has a short deadline (10-15 days) after the levy or garnishment is served. If the source mentions a deadline, capture it. notes should describe what triggers a hearing.
- satisfaction_of_judgment: the form the PLAINTIFF files when the defendant pays in full. Required in many states. penalty_for_late_filing: most states impose a small civil penalty or sanctions if the plaintiff doesn't file within the deadline.
- till_tap_or_keeper_levy: California specialty. A till tap sends the sheriff to a business's cash register for a one-shot grab. A keeper levy stations the sheriff at the business for up to 10 days. If the state doesn't have this, available=false and notes=brief explanation.
- professional_license_suspension: California specialty (Bus & Prof Code 7071.17 for contractors, etc.). Lets the plaintiff threaten to suspend a defendant's professional license to force payment. If the state allows this, applicable_professions is a list (e.g. ["contractor","real_estate_agent","insurance_agent"]) and agency is the licensing body (e.g. "California Contractors State License Board (CSLB)").
- self_help_center: the staffed office that walks plaintiffs through forms. Often the single most useful contact for a confused user. Capture name, phone, web URL, address, hours, and any languages besides English. Often called "Court Self-Help Center", "Family Law Facilitator", "Civil Self-Help", etc.

If a category truly isn't covered by the fetched pages, leave the form_code / form_url / fees as null and put a one-sentence explanation in notes. Do NOT guess. Saying "not listed on the source pages" is more useful than inventing a fee.

Cite by referencing the page numbers like [#1], [#2] inline in the notes fields when helpful for traceability.`;

function buildExtractionPrompt(
  input: CountyResearchInput,
  pages: Array<{ url: string; markdown: string }>,
): string {
  const stateNameLong = stateName(input.state);
  const blocks = pages
    .map((p, i) => `--- PAGE [#${i + 1}] (${p.url}) ---\n${p.markdown.slice(0, 12000)}`)
    .join("\n\n");
  return `County: ${input.county}\nState: ${stateNameLong} (${input.state})\n\nOfficial county pages fetched below. Extract a CountyPack JSON per the schema.\n\n${blocks}`;
}

export async function fetchCountyPack(
  input: CountyResearchInput,
): Promise<CountyResearchResult> {
  let totalCostCents = 0;

  // 1) Search the web
  const queries = buildQueries(input);
  const searchResults = await Promise.all(
    queries.map((q) => tavilySearch(q, { maxResults: 5, searchDepth: "advanced" })),
  );
  for (const r of searchResults) totalCostCents += r.costCents;
  const urls = selectTopUrls(searchResults.map((r) => r.results));

  if (urls.length === 0) {
    throw new Error(
      `County research: no sources found for ${input.county} County, ${input.state}`,
    );
  }

  // 2) Fetch each top page (parallel, but tolerate individual failures —
  // sheriffs' websites go down all the time)
  const fetches = await Promise.all(
    urls.map((u) =>
      firecrawlFetch(u)
        .then((p) => ({ ok: true as const, page: p }))
        .catch((err) => ({ ok: false as const, url: u, error: String(err) })),
    ),
  );
  // Firecrawl pricing is roughly $0.05 per scrape; conservatively 5 cents each
  const successfulFetches = fetches.filter(
    (f): f is Extract<typeof f, { ok: true }> => f.ok,
  );
  totalCostCents += successfulFetches.length * 5;
  const pages = successfulFetches.map((f) => ({
    url: f.page.url,
    markdown: f.page.markdown,
  }));

  if (pages.length === 0) {
    throw new Error(
      `County research: all page fetches failed for ${input.county} County, ${input.state}`,
    );
  }

  // 3) LLM extraction to CountyPack
  const extraction = await structuredJson<CountyPack>({
    model: MODEL.FAST,
    systemPrompt: SYSTEM_PROMPT,
    input: buildExtractionPrompt(input, pages),
    jsonSchema: COUNTY_PACK_SCHEMA,
    // No maxOutputTokens cap. We want the model to capture every useful
    // procedural detail from the fetched pages. The Responses API will use
    // its own default (around 64K for gpt-5-mini) which is plenty.
  });
  totalCostCents += extraction.costCents;

  // Backfill sources from whatever we actually fetched (LLM sometimes drops a few)
  const sources = new Set<string>([
    ...(extraction.data.sources ?? []),
    ...pages.map((p) => p.url),
  ]);

  return {
    pack: {
      ...extraction.data,
      county: extraction.data.county || input.county,
      state: extraction.data.state || input.state,
      sources: Array.from(sources),
    },
    costCents: totalCostCents,
    sourcesFetched: pages.length,
  };
}
