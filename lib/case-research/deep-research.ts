// OpenAI Deep Research integration. Two-call architecture:
//   Call A — Pre-filing and filing (sections 1-11 of the original 21-section
//            prompt): venue, jurisdictional fit, scope, arbitration, frequency
//            caps, statute of limitations, pre-filing requirements, forms,
//            filing fees, filing methods, service of process.
//   Call B — Hearing through collection (sections 12-21): hearing logistics,
//            counterclaims, mediation, accommodations, recoverable amounts,
//            appeal mechanics, post-judgment collection, garnishment, state
//            quirks, sources.
//
// Why two calls: the single-call 21-section prompt repeatedly hit
// max_output_tokens before finishing (reasoning + 30+ web searches consumed
// the 80k cap before the model finished writing). Splitting halves the per-
// call workload AND switches output format from prose to compact findings/
// bullets with citations, which lets each call fit comfortably in budget.
//
// Findings output (not prose): each call returns markdown bullets grouped
// under H2 headings. The customer-facing prose is generated downstream by
// the writer, which is why we drop personalization here.

import { MODEL, OpenAINotConfigured, structuredJson } from "./openai";
import { makeApiError } from "./api-errors";
import {
  EVIDENCE_PACK_NO_CLASSIFICATION_SCHEMA,
  type EvidencePack,
  type IntakeSnapshot,
  type Classification,
} from "./agents";

const DEFAULT_DR_MODEL = "o3-deep-research";

export type DeepCallId = "a" | "b";

interface SubmitResult {
  responseId: string;
  model: string;
  costCents: number;
}

export interface DeepResearchOutput {
  citations: Array<{ url: string; title: string; domain: string }>;
  reportMarkdown: string;
  rawText: string;
  responseId: string;
  costCents: number;
  model: string;
}

interface ResponsesEnvelope {
  id?: string;
  status?: string;
  output_text?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  output?: any[];
  usage?: { input_tokens?: number; output_tokens?: number };
  error?: { message: string } | null;
  incomplete_details?: { reason?: string };
}

const SHARED_HEADER = (intake: IntakeSnapshot, classification: Classification) => `You are conducting deep procedural research for one specific US plaintiff's case. Your output is procedural and informational research only — never legal advice. Do not personalize: a downstream writer turns these findings into customer-facing prose.

CASE FACTS (use to scope your research; do NOT echo back as a personalized narrative)
- State: ${intake.state}
- Plaintiff's county: ${intake.plaintiffCounty ?? "(unknown)"}
- Defendant's county: ${intake.defendantCounty ?? "(unknown)"}
- Incident / property location county: ${intake.incidentCounty ?? "(unknown)"}
- Defendant city: ${intake.city ?? "(unknown)"}
- Court division (best guess from classifier): ${classification.proper_court_type}
- Claim category: ${classification.claim_category}
- Amount in dispute: $${(intake.amountCents / 100).toFixed(2)}

OUTPUT CONTRACT (mandatory)

Output is a FINDINGS DOSSIER, not a narrative. Use compact markdown:
- H2 (##) for each numbered section, in the order given below, exact heading text.
- Under each H2, use bullets. One fact per bullet. Each fact ends with an inline markdown citation: [source title](URL).
- Use H3 sub-headings inside a section only when the bullets group naturally (e.g., "Methods", "Deadlines").
- Tables are allowed where they convey information faster (fee schedule by bracket, exemption amounts).
- Do NOT write paragraphs of prose. Do NOT include an introduction, executive summary, or sign-off.
- Do NOT restart, retry, or revise. Each section appears exactly once.
- Length budget: 1,500 to 4,000 words total across all sections. If you can't fit a low-value detail, drop it; never restart.

SOURCES — official only:
- Statewide judiciary self-help portals (njcourts.gov, courts.ca.gov, txcourts.gov, mass.gov/courts, etc.)
- County clerk / county court websites for the named county
- E-filing portals: Odyssey Guide & File, eFileTexas, eCourts NJ, OneLegal, official state portals
- Official form pages (prefer direct PDF links)
- Statewide statutes and rules of court (cite the specific rule number where possible)
- State agency pages relevant to the claim type (DOL for wage claims, AG for consumer protection)

Federal sources (.uscourts.gov) only if the case clearly belongs in federal court.

CITATION RULES
- Every concrete fact (court name, fee, deadline, form code, statute) carries an inline markdown link to the source URL.
- If a source contradicts another, surface the contradiction in-place. Do not restart.
- Prefer current pages; flag any page that looks stale.

CONTENT RULES
- Procedural information only. Never strategic advice ("you should sue", "your case is strong").
- Do NOT compute deadline dates, do NOT inject the plaintiff's amount or defendant's name into prose. Just state the rule and cite it; the writer will personalize.
- If you cannot find authoritative information for a section, write one bullet describing what's missing and move on. Do not omit the section heading.`;

const PROMPT_A = (intake: IntakeSnapshot, classification: Classification) => `${SHARED_HEADER(intake, classification)}

REPORT STRUCTURE — CALL A (PRE-FILING AND FILING)

Produce exactly these 11 sections in this order, with these exact H2 headings. The next call (B) covers hearing through collection — do NOT write any of those sections here.

# Filing research — A

## 1. Court and venue
Which exact courthouse this claim goes to, why that one, the venue rule and the statute or rule that defines it, the courthouse address and clerk contact. Apply the venue rule to the three counties given (plaintiff / defendant / incident) and state explicitly which one wins.

## 2. Jurisdictional fit
Whether this case fits in the chosen division at this dollar amount. If it might belong in a different division (housing court, district regular docket, justice court), explain the decision tree.

## 3. Subject-matter scope and exclusions
What types of claims this division CANNOT hear in this state.

## 4. Forum-selection and arbitration clauses
Whether arbitration clauses in consumer contracts can knock the case out, and whether small claims is a typical carve-out.

## 5. Filing-frequency caps and claim-splitting
Per-plaintiff limits if the state has them. Rules against splitting one claim into multiple suits.

## 6. Statute of limitations
Specific deadline for this claim type with the precise statute citation. Tolling rules, discovery rule, partial-payment restart.

## 7. Pre-filing requirements
- Demand letter rules: required by statute? Strongly recommended? Minimum days plaintiff must wait after sending the demand before filing? Certified Mail required? Return Receipt required? What MUST the demand letter contain (exact dollar amount, deadline to respond, itemized damages, address for response, etc.)?
- Mediation prerequisites and agency exhaustion (DOL for wage claims, AG for consumer protection, etc.).
- Tort Claims Act notice if a government defendant: deadline in days, form code, where notice is sent, and the statute citation.

## 8. Forms required to file
Every form: code, full name, direct PDF URL, purpose, whether fillable online, filing channel (mail / in-person / e-file).

## 9. Filing fee schedule
- Exact filing fee for this case's bracket.
- Separate service-of-process fees, motion fees, jury demand fees.
- What payment methods does the clerk accept (cash, check, money order, credit card, online portal)?
- Who should checks be made out to (e.g., "Treasurer, State of New Jersey")?
- Fee waiver: who qualifies (income thresholds, public-benefits programs accepted), the form code, and the form's URL.

## 10. Filing methods
- Every method available in this specific county: in-person, mail, drop-box, e-file, fax.
- Name the e-file portal (e.g., "eCourts Guide & File", "Odyssey Guide & File"), give the direct URL, whether an account is required, and accepted file types/sizes.
- Mailing address (separate from the courthouse street address if relevant) and drop-box hours/location.

## 11. Service of process
For each allowed method (sheriff, certified mail, personal service by non-party adult, alternate service, publication, private process server): is it allowed for this case type, what does it cost, what is the deadline relative to the hearing, what is the proof-of-service form code, and any restrictions. Tabulate when useful.

After "## 11. Service of process", output NOTHING further. The next character after the last bullet is end-of-output.

Begin output now with "# Filing research — A".`;

const PROMPT_B = (intake: IntakeSnapshot, classification: Classification) => `${SHARED_HEADER(intake, classification)}

REPORT STRUCTURE — CALL B (HEARING THROUGH COLLECTION)

Produce exactly these 10 sections in this order, with these exact H2 headings. Numbered 12-21 to match the original full schema. The previous call (A) covered pre-filing and filing — do NOT repeat any of those sections.

# Filing research — B

## 12. Hearing process and logistics
- Typical days from filing to first hearing (give a number).
- What to bring, exhibit copies (typically 3), exhibit format.
- Evidence rules and hearsay rules (relaxed in small claims?).
- Recording rules (court records? parties may record?).
- Default-judgment prove-up requirements.
- Plaintiff no-show consequences (dismissal w/ or w/o prejudice).
- How to request a continuance (deadline, fee, who can object).
- How to subpoena witnesses (form code, fee, service method, deadline).
- Phone or video appearances allowed? How to request?

## 13. Counterclaims and removal
What happens if defendant counterclaims over the cap (transfer to higher court). Jury demand triggers.

## 14. Court-annexed mediation
Whether the court offers free same-day mediation, when in the timeline, how to opt in.

## 15. Court interpreter and ADA accommodations
- Interpreter request process and the lead time in days.
- Languages the court provides interpreters for.
- Interpreter request form code (if any).
- ADA accommodations process and the ADA coordinator's name + phone or email.
- ADA request form code (if any).

## 16. Recoverable amounts and interest
What costs the prevailing party recovers. Prejudgment + post-judgment interest rates. Attorney's fees (when authorized by contract or statute).

## 17. Appeal mechanics
Days to appeal from judgment, who can appeal, trial de novo vs appellate review, motion to vacate default deadline.

## 18. Post-judgment collection
Writ of execution, wage garnishment, bank levy, debtor's exam, abstract of judgment, satisfaction of judgment, judgment renewal deadline, domestication under UEFJA, bankruptcy stay effects.

## 19. Wage garnishment specifics and exemptions
- State cap on wage garnishment as a percent of disposable earnings.
- Exempt income and asset categories WITH the state-specific dollar amounts (e.g., homestead $X, motor vehicle $Y, tools of trade $Z, federal benefits, retirement). Cite the statute for each.
- Whether the debtor must elect federal exemptions or state exemptions, and the deadline / form for the election.

## 20. State-specific quirks and evidence checklist for this claim type
- Statutory damages multipliers as a structured list: each statute citation, the multiplier (2x, 3x, etc.), the conditions, and which claim types the multiplier applies to. Example: NJSA 46:8-21.1 → 2x damages for wrongful retention of security deposit.
- Pre-suit notice requirements unique to this claim type.
- The specific evidence the plaintiff should gather and bring (claim-type-specific).

## 21. Sources
A markdown bullet list of every official source cited in THIS call, formatted as:
- [Page title](URL) — domain — what topic this source supported

After "## 21. Sources", output NOTHING further. The next character after the last source bullet is end-of-output.

Begin output now with "# Filing research — B".`;

// max_output_tokens: 100k per call (the model's hard ceiling). Reasoning
// tokens for o3-deep-research run 30-50k+ regardless of output length — they
// scale with research workload (web searches, planning), not findings length.
// At 50k the first run starved on call A: ~45k of reasoning left almost
// nothing for findings, and the model tripped max_output_tokens before
// finishing Section 1. With 100k we get ~50k for reasoning and ~50k for the
// findings — way more than the actual ~8k a findings dossier needs.
//
// max_tool_calls: 20 per call — each half has roughly half the topical
// surface area, so 20 web searches per half is plenty.
const PER_CALL_MAX_OUTPUT_TOKENS = 100_000;
const PER_CALL_MAX_TOOL_CALLS = 20;

export async function submitDeepResearch(
  which: DeepCallId,
  intake: IntakeSnapshot,
  classification: Classification,
): Promise<SubmitResult> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new OpenAINotConfigured();
  const model = process.env.OPENAI_DEEP_RESEARCH_MODEL || DEFAULT_DR_MODEL;
  const promptFn = which === "a" ? PROMPT_A : PROMPT_B;

  const body = {
    model,
    input: promptFn(intake, classification),
    background: true,
    tools: [{ type: "web_search_preview" }],
    max_output_tokens: PER_CALL_MAX_OUTPUT_TOKENS,
    max_tool_calls: PER_CALL_MAX_TOOL_CALLS,
  };

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw makeApiError(`Deep Research submit (${which})`, res.status, txt);
  }
  const data = (await res.json()) as ResponsesEnvelope;
  if (!data.id) throw new Error(`Deep Research submit (${which}): no response id returned`);
  return { responseId: data.id, model, costCents: 0 };
}

export async function getDeepResearchStatus(
  responseId: string,
): Promise<{ status: string; envelope: ResponsesEnvelope }> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new OpenAINotConfigured();
  const res = await fetch(`https://api.openai.com/v1/responses/${responseId}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw makeApiError("Deep Research poll", res.status, txt);
  }
  const env = (await res.json()) as ResponsesEnvelope;
  return { status: env.status ?? "unknown", envelope: env };
}

interface CitationItem {
  type?: string;
  url?: string;
  title?: string;
  start_index?: number;
  end_index?: number;
}

// OpenAI deep-research pricing (cents per 1M tokens, public list price).
// Update if rates change. Reasoning tokens are included in output_tokens by
// the Responses API, so they're already covered by the output rate.
const DEEP_RESEARCH_RATES: Record<string, { in: number; out: number }> = {
  "o3-deep-research": { in: 1000, out: 4000 },
  "o3-deep-research-2025-06-26": { in: 1000, out: 4000 },
  "o4-mini-deep-research": { in: 200, out: 800 },
  "o4-mini-deep-research-2025-06-26": { in: 200, out: 800 },
};

// Web search tool: OpenAI bills the web_search_preview tool separately at
// $25 per 1000 calls, i.e. 2.5 cents per call. Each call to the model can
// trigger many web_search_call items in the output array.
const WEB_SEARCH_CALL_COST_CENTS = 2.5;

export function parseDeepResearchOutput(
  envelope: ResponsesEnvelope,
  responseId: string,
  model: string,
): DeepResearchOutput {
  const text = extractText(envelope);
  const citations = collectCitations(envelope);
  const usage = envelope.usage ?? {};
  const inTokens = usage.input_tokens ?? 0;
  const outTokens = usage.output_tokens ?? 0;
  const rates = DEEP_RESEARCH_RATES[model] ?? DEEP_RESEARCH_RATES["o3-deep-research"];
  const tokenCostCents = (inTokens * rates.in + outTokens * rates.out) / 1_000_000;
  const webSearchCalls = countWebSearchCalls(envelope);
  const toolCostCents = webSearchCalls * WEB_SEARCH_CALL_COST_CENTS;
  const costCents = Math.ceil(tokenCostCents + toolCostCents);
  return {
    citations,
    reportMarkdown: text,
    rawText: text,
    responseId,
    costCents,
    model,
  };
}

// Count tool-call items in the Responses API output. The deep-research model
// emits one output item per tool invocation (web_search_call, etc.). Each
// item has a `type` field; we count the search-related ones.
function countWebSearchCalls(env: ResponsesEnvelope): number {
  if (!Array.isArray(env.output)) return 0;
  let n = 0;
  for (const item of env.output) {
    const t = item?.type as string | undefined;
    if (t === "web_search_call" || t === "web_search_preview_call") n += 1;
  }
  return n;
}

// ---------------------------------------------------------------------------
// Combined deep extraction
//
// Runs ONCE after both deep calls complete. Concatenates the call A + call B
// findings dossiers, hands them to gpt-5-mini, and produces a full structured
// EvidencePack — including the classification block (since there's no longer
// a separate classify step upstream).
// ---------------------------------------------------------------------------

import { EVIDENCE_PACK_FULL_SCHEMA } from "./agents";

export async function extractStructuredPackFromCombinedFindings(
  findingsA: string,
  findingsB: string,
  intake: IntakeSnapshot,
  classificationStub: Classification,
): Promise<{ data: EvidencePack; costCents: number; model: string }> {
  const combined = [
    "# DEEP RESEARCH FINDINGS — CALL A (pre-filing and filing: court/venue, jurisdiction, scope/exclusions, arbitration, frequency caps, statute of limitations, pre-filing requirements, forms, filing fees, filing methods, service of process)",
    "",
    findingsA || "(call A produced no findings)",
    "",
    "---",
    "",
    "# DEEP RESEARCH FINDINGS — CALL B (hearing through collection: hearing logistics, counterclaims, mediation, accommodations, recoverable amounts, appeals, post-judgment collection, garnishment exemptions, state-specific quirks, sources)",
    "",
    findingsB || "(call B produced no findings)",
  ].join("\n");

  const prompt = `You are reading combined procedural-research findings dossiers for one US court filing and extracting structured fields into a full EvidencePack JSON. Do NOT invent facts. Use only what the dossiers state. If a field isn't addressed, leave it as a sensible empty default (empty string, empty array, null) and add a one-line note in "unknowns".

CASE CONTEXT (orientation only — do not echo as-is)
- State: ${intake.state}
- Plaintiff's county: ${intake.plaintiffCounty ?? "(unknown)"}
- Defendant's county: ${intake.defendantCounty ?? "(unknown)"}
- Incident / property county: ${intake.incidentCounty ?? "(unknown)"}
- Claim category (user-tagged hint): ${classificationStub.claim_category}
- Amount: $${(intake.amountCents / 100).toFixed(2)}

COMBINED DOSSIERS
${combined}

EXTRACTION FIELDS

Classification (FILL FROM THE DOSSIERS — there is no upstream classifier)
- classification.claim_category: short canonical label (refine the user-tagged hint above based on the dossiers).
- classification.proper_court_type: actual division name as the state names it (e.g. "Special Civil Part – Small Claims Section" in NJ, "Justice of the Peace Court" in TX).
- classification.proper_court_type_notes: brief explanation of why this division at this dollar amount.
- classification.amount_within_limit: whether the case fits the small-claims cap.
- classification.amount_limit_dollars: dollar cap for that division. null if not stated.
- classification.venue_rule: plain-English venue principle.
- classification.statute_of_limitations.deadline: applicable deadline.
- classification.statute_of_limitations.citation: specific statute citation (e.g. "N.J.S.A. 2A:14-1").
- classification.statute_of_limitations.notes: tolling, discovery rule, partial-payment restart.
- classification.pre_filing_requirements: bullets of MUST-DO before filing.
- classification.eligibility_concerns: anything the dossiers flag that could block filing.
- classification.jury_trial_available: whether a jury is available in this division.
- classification.attorneys_allowed: whether attorneys are allowed.
- classification.counterclaim_implications: what happens if defendant counterclaims over the cap.
- classification.notes: anything ambiguous worth flagging.

Court / venue
- court_name, filing_location, claim_limit_dollars

Scope and gating
- excluded_claim_types, arbitration_clause_considerations, frequency_caps, claim_splitting_prohibited

Pre-filing
- demand_letter { required, recommended, minimum_days_before_filing, certified_mail_required, return_receipt_required, required_content_elements[], notes }
- government_tort_claim_notice { required_for_government_defendants, deadline_days, form_code, recipient_address, statute }

Forms and filing
- forms_required (code, name, URL if dossier gave one, purpose, fillable_online, completion_methods of [online_form, fillable_pdf, print_and_handwrite, guided_filing])
- filing_fee_cents, filing_fee_notes, filing_methods (any of in_person, mail, drop_box, efile, fax)
- efile_portal { name, url, account_required, accepted_file_types[] }
- fee_schedule { service_fee_cents, motion_fee_cents, jury_demand_fee_cents, accepted_payment_methods[], check_payee, fee_waiver { available, eligibility_criteria, form_code, form_url } }

Service
- service_requirements (free-form notes)
- service_methods: one entry per allowed method (sheriff / certified_mail / personal_service / alternate_service / publication / private_process_server). Each: { method, allowed, cost_cents, deadline_days_before_hearing, proof_of_service_form_code, notes }

Hearing
- hearing_process
- hearing_logistics.copies_required, exhibit_format, recording_rules, hearsay_rules, default_proveup_required, plaintiff_no_show_consequence, typical_days_filing_to_hearing, continuance_rules, witness_subpoena_process, phone_video_appearance_allowed
- counterclaim_transfer_threshold

Recoverable amounts
- recoverable_amounts { costs_recoverable[], prejudgment_interest_rate_pct, post_judgment_interest_rate_pct, attorney_fees { available, conditions, statute } }

Court-annexed mediation
- court_mediation { available, when, free, process }

Accommodations
- accommodations { interpreter_request_process, interpreter_lead_time_days, available_languages[], interpreter_request_form_code, ada_request_process, ada_coordinator_name, ada_coordinator_contact, ada_request_form_code }

Appeal
- appeal_details { window_days, who_can_appeal, type ("de_novo" | "appellate" | "none"), motion_to_vacate_default_window_days }

Post-judgment
- post_judgment_steps
- collection_details { judgment_renewal_years, abstract_of_judgment_process, wage_garnishment_cap_pct, bank_levy_process, debtors_exam_process, exemptions[] (label list), exemption_details[] (structured: { category, dollar_amount_cents, statute, notes } per category — INCLUDE dollar caps where state law sets one), federal_vs_state_exemption_rule, satisfaction_required, bankruptcy_stay_effects, domestication_of_out_of_state_judgment }

Practical
- defendant_collectability_signals, evidence_required_for_this_claim_type, state_specific_quirks
- statutory_multipliers: structured (e.g., { statute: "NJSA 46:8-21.1", multiplier: 2, conditions: "wrongful retention of security deposit", claim_types: ["security_deposit"] })
- tax_implications { recovery_taxability, form_1099_c_consideration }

- sources: every URL the dossiers cite with url, title, domain, cited_for
- unknowns: anything the dossiers explicitly flag as unknown OR fields you'd normally extract but neither dossier covered

Return only the JSON. The dossiers are ground truth.`;

  const res = await structuredJson<EvidencePack>({
    model: MODEL.FAST,
    input: prompt,
    jsonSchema: EVIDENCE_PACK_FULL_SCHEMA,
    temperature: 0,
    // The combined dossiers can be 50-100k chars, but the JSON output stays
    // bounded by the schema (~12-16k tokens). Bumped over the per-call
    // version because the combined extraction has more fields to fill.
    maxOutputTokens: 16000,
  });

  return { data: res.data, costCents: res.costCents, model: res.model };
}

function extractText(env: ResponsesEnvelope): string {
  if (typeof env.output_text === "string" && env.output_text.length > 0) return env.output_text;
  if (Array.isArray(env.output)) {
    const parts: string[] = [];
    for (const item of env.output) {
      const content = item?.content;
      if (Array.isArray(content)) {
        for (const c of content) {
          if (typeof c?.text === "string") parts.push(c.text);
          else if (typeof c?.text?.value === "string") parts.push(c.text.value);
        }
      }
    }
    if (parts.length > 0) return parts.join("\n");
  }
  return "";
}

function collectCitations(env: ResponsesEnvelope): Array<{ url: string; title: string; domain: string }> {
  const out = new Map<string, { url: string; title: string; domain: string }>();
  if (!Array.isArray(env.output)) return [];
  for (const item of env.output) {
    const content = item?.content;
    if (!Array.isArray(content)) continue;
    for (const c of content) {
      const annotations = c?.annotations as CitationItem[] | undefined;
      if (!Array.isArray(annotations)) continue;
      for (const a of annotations) {
        if (a?.type === "url_citation" && a.url) {
          const domain = hostOf(a.url);
          if (!out.has(a.url)) {
            out.set(a.url, { url: a.url, title: a.title ?? "", domain });
          }
        }
      }
    }
  }
  return Array.from(out.values());
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "unknown";
  }
}
