// Customer-facing report writer.
//
// Inputs: merged pack, deep findings (A and B), intake, merge summary,
// computed case facts. Output: ONE polished, prose-driven procedural report
// written for a layperson. No separate action checklist (everything important
// lives inline in the prose). No bullet-heavy formatting.

import { MODEL, plainText } from "./openai";
import type { EvidencePack, IntakeSnapshot } from "./agents";
import type { MergeSummary } from "./merge";

const FINDINGS_BUDGET_PER_HALF = 30_000;

export interface CustomerReportResult {
  data: {
    // Kept as separate fields so existing DB columns / admin UI don't break.
    // checklist_md is intentionally empty in the new design — the prose
    // covers everything important inline.
    checklist_md: string;
    guide_md: string;
  };
  costCents: number;
  model: string;
}

export async function writeCustomerReport(
  intake: IntakeSnapshot,
  mergedPack: EvidencePack,
  findingsA: string,
  findingsB: string,
  summary: MergeSummary,
  caseFacts: { incidentDate: string | null; defendantEmail: string | null; defendantPhone: string | null },
): Promise<CustomerReportResult> {
  const findingsASlice = (findingsA || "").slice(0, FINDINGS_BUDGET_PER_HALF);
  const findingsBSlice = (findingsB || "").slice(0, FINDINGS_BUDGET_PER_HALF);
  const dollars = (intake.amountCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const criticalNote = summary.critical_conflict_detected
    ? `\n\nCRITICAL CONFLICT FLAG\nThe two research branches disagreed on a fundamental aspect of this case (different court division, amount over the cap, etc.). Include a clearly visible section near the top under an H2 heading "Important: review needed" describing the disagreement in plain English so the reader knows to verify with the clerk before relying on the rest. The exact issue: ${summary.critical_conflict_notes}`
    : "";

  const lowConfidenceSections = summary.section_confidence
    .filter((s) => s.level === "low")
    .map((s) => s.section);
  const lowConfidenceNote = lowConfidenceSections.length
    ? `\n\nLOW-CONFIDENCE SECTIONS\nThe research was weaker for these sections; mention plainly in the relevant paragraphs that the reader should verify with the clerk before acting: ${lowConfidenceSections.join(", ")}`
    : "";

  const prompt = `You are writing a single procedural-research report for one specific US small-claims plaintiff. The reader is a regular person, not a lawyer or paralegal. Your job is to give them, in plain English, everything they need to file this case themselves and follow it through to collection.

CASE
- Plaintiff facts: ${(intake.factsNarrative ?? "(not provided)").slice(0, 2000)}
- Defendant: ${intake.defendantName}
- State: ${intake.state}
- Plaintiff's county: ${intake.plaintiffCounty ?? "(unknown)"}
- Defendant's county: ${intake.defendantCounty ?? "(unknown)"}
- Incident / property county: ${intake.incidentCounty ?? "(unknown)"}
- Amount in dispute: ${dollars}
- Incident date: ${caseFacts.incidentDate ?? "(unspecified)"}
- Claim category: ${mergedPack.classification.claim_category}
- Court division: ${mergedPack.classification.proper_court_type}

MERGED EVIDENCE PACK (the reconciled facts you should use)
${JSON.stringify(mergedPack, null, 2)}

DEEP RESEARCH FINDINGS — CALL A (pre-filing and filing: court/venue, jurisdiction, forms, fees, service, statute of limitations)
${findingsASlice}

DEEP RESEARCH FINDINGS — CALL B (hearing through collection: hearing logistics, mediation, accommodations, recoverable amounts, appeals, post-judgment collection, garnishment, state quirks)
${findingsBSlice}
${criticalNote}
${lowConfidenceNote}

OUTPUT FORMAT
Return ONE polished markdown document. No separators, no checklist, no preamble. Just the report.

The document opens with a short header block formatted as a small case-memo, then flows into prose sections.

HEADER BLOCK (first thing in the document)
Write it as a definition list using bold key names, like a one-paragraph cover note that an attorney's office would put on the front page. Include:
- **Court:** the courthouse and division
- **Address:** if known
- **Claim type:** the merged classification
- **Amount in dispute:** ${dollars}
- **Filing fee:** the dollar amount the merged pack states
- **Filing deadline:** computed expiry date if you can compute it (incident date + statute of limitations), otherwise the rule with a note that the reader should compute their date from it

Then a short opening paragraph (2 to 4 sentences) summarizing the case in your own words from the plaintiff's facts. Use the plaintiff's amount and defendant name naturally in the sentence. End the paragraph with one sentence about what this report covers.

REPORT BODY — sections in this order, with these exact H2 headings unless noted. Skip a section ONLY when the merged pack has no useful data for it (treat empty strings, empty arrays, and nulls as "no data"). Do NOT skip a section just because it would be inconvenient.

## Important: review needed
ONLY include this section if the CRITICAL CONFLICT FLAG block above is present. Otherwise skip the heading entirely. When present, write 2 to 4 plain-English sentences explaining what disagreed and what the reader should do (call the clerk and verify before filing).

## Where to file
A paragraph naming the courthouse, division, and address. Explain in one sentence why this courthouse is the right one — quote or paraphrase classification.venue_rule ("File in the county where the defendant resides…") and apply it to this case's three counties (plaintiff/defendant/incident). If classification.proper_court_type_notes has data, use that as the explanation for why this division and not another. If the address is not known, say so plainly and tell them to call the clerk.

## Whether your case fits in this court
Two short paragraphs. First: state the claim limit for this division and confirm the amount in dispute fits. Second: any subject-matter exclusions that could move the case out of this division (housing court, district court, etc.) and why this case is or is not affected. If frequency_caps has data, include a sentence quoting/paraphrasing it ("This state limits each plaintiff to..."). If claim_splitting_prohibited is true, mention that too.

## Arbitration and forum-selection clauses
ONLY include if arbitration_clause_considerations is non-empty. One paragraph in plain English: explain whether the kind of contract the plaintiff signed (lease, service agreement, etc.) might contain an arbitration clause that knocks the case out of small claims, and what to look for. Tell them to read their contract for an "Arbitration" or "Dispute Resolution" section. End with a sentence on whether small claims is typically a carve-out.

## The deadline
A paragraph stating the statute of limitations rule and the precise statute citation. Then, if you can compute the actual expiry date from the incident date plus the rule, state the date plainly: "Your deadline is approximately [date]." If you cannot compute, give the rule and ask the reader to compute. ALWAYS surface tolling, discovery rule, accrual specifics, and partial-payment-restart rules from classification.statute_of_limitations.notes if they have content — those are the most case-altering details.

## Pre-filing requirements
Walk through pre-filing steps with specifics. If demand_letter.required or demand_letter.recommended is true, dedicate a paragraph: what the letter must contain (use demand_letter.required_content_elements verbatim if available), the minimum days the plaintiff must wait (demand_letter.minimum_days_before_filing), whether Certified Mail and Return Receipt are required. If demand_letter.notes has content, weave it in (e.g., "Not legally required, but Certified Mail gives you proof of service"). If the defendant is or might be a government entity AND government_tort_claim_notice.required_for_government_defendants is true, add a paragraph on the tort-claim notice with the deadline_days, form_code, recipient_address, and statute. Cover any agency exhaustion or pre-suit mediation that applies. Say plainly which steps DO NOT apply, so the reader is reassured.

## The forms you need
Use a markdown table because forms genuinely tabulate well:

| Form code | Name | What it does | Where to get it |
|-----------|------|--------------|-----------------|
| ... | ... | ... | [link](url) |

Follow the table with one to two paragraphs explaining how to fill out the main complaint form: what each section asks for, and how the reader should describe their dispute (one or two sentences, the amount, the legal basis if relevant).

## Filing fee and how to pay
A paragraph with the headline filing fee dollar amount, plus filing_fee_notes if it has content (the notes often explain bracketed pricing or what counts as a "claim"). Add any other fees from fee_schedule worth knowing (service fee, motion fee, jury demand fee). Name the accepted payment methods and the check_payee. If fee_schedule.fee_waiver.available is true, add a sentence explaining who qualifies (use eligibility_criteria text) and link the form (form_url) by form code. Do not bullet this.

## How to file
Walk through every method available in this county as prose, not bullets. If e-filing is available, name the portal (efile_portal.name), link it (efile_portal.url), and say whether an account is required. Mention accepted file types if relevant. If in-person, give the courthouse hours if known. If mail, give the mailing address.

## How to serve the defendant
For each entry in service_methods that has allowed=true, write a short paragraph: how the method works, the cost (in dollars), the deadline relative to the hearing, the proof-of-service form code. Cover sheriff service, certified mail, personal service by a non-party adult, alternate service, publication, and any other method present. Use service_requirements for any free-form notes that don't fit a single method.

## Evidence to bring
This section MAY use a focused bullet list because the reader will literally pack a folder. Group the bullets by category (the contract or agreement, payment records, communications, photos, witness names). Eight to fifteen bullets max, each one specific to this claim type.

## Court-annexed mediation
Include if court_mediation has any populated field (available true OR when, process has data). One paragraph: when in the timeline mediation is offered (court_mediation.when), whether it is free (court_mediation.free), how to opt in (court_mediation.process), and a frank sentence on why it can save time and money. Skip the section ONLY if all of court_mediation is empty.

## Court interpreter and ADA accommodations
ONLY include if interpreter_request_process or ada_request_process is non-empty. One paragraph each. For the interpreter: how to request, how many days lead time (interpreter_lead_time_days), available languages (available_languages), and the request form code if any. For ADA: the request process, the ADA coordinator's name and contact, and the request form code if any. Skip if neither has data.

## What happens at the hearing
Three to four short paragraphs covering ALL populated hearing_logistics fields. First: timeline from filing to hearing using hearing_logistics.typical_days_filing_to_hearing if available. Second: what to expect during the hearing (format, who speaks, exhibit copies, plaintiff goes first). Third: evidence and recording — use hearing_logistics.hearsay_rules and hearing_logistics.recording_rules if populated. Fourth: default-judgment rules and the consequence if the plaintiff fails to appear (plaintiff_no_show_consequence + default_proveup_required). If hearing_logistics.continuance_rules has content, add a sentence on how to request a continuance. If hearing_logistics.witness_subpoena_process has content, add a sentence on how to subpoena a witness. If hearing_logistics.phone_video_appearance_allowed is true, mention how to request remote appearance.

## Counterclaims and removal
ONLY include if counterclaim_transfer_threshold has data. One short paragraph: what happens if the defendant files a counterclaim that exceeds the small-claims cap (does the case transfer to a higher court, does plaintiff lose small-claims simplicity, etc.).

## After the hearing
A paragraph covering the judgment, the appeal window in days (appeal_details.window_days), explicitly who can appeal (appeal_details.who_can_appeal — e.g. "Either party," not just "the defendant"), the type of appeal (appeal_details.type, e.g. "trial de novo" means a brand-new trial in a higher court), the motion-to-vacate deadline if the defendant defaulted (motion_to_vacate_default_window_days), and how to file Satisfaction of Judgment if the defendant pays.

## Collecting your money
Three to five paragraphs. Cover the full collection toolkit using ALL populated collection_details fields:
- post_judgment_steps (the recommended sequence)
- abstract_of_judgment_process (how to record a lien on real property)
- bank_levy_process (how to levy a bank account)
- debtors_exam_process (how to question a defendant about assets)
- wage_garnishment_cap_pct (state cap percent on wages)
- exemption_details when present, with specific dollar amounts ("homestead exemption is $X, motor vehicle exemption is $Y")
- federal_vs_state_exemption_rule (whether the debtor must elect one set or can mix)
- judgment_renewal_years (how long the judgment is good and the renewal procedure)
- bankruptcy_stay_effects (one sentence on what happens if the defendant files bankruptcy)
- domestication_of_out_of_state_judgment (only if relevant to this case, e.g. cross-state defendant)
Don't list these as bullets — weave each into prose.

## State-specific rules to know
ONLY include if state_specific_quirks or statutory_multipliers has entries. Cover statutory multipliers first as a focused paragraph: cite each statute, name the multiplier ("double damages", "treble damages"), and the conditions under which it applies ("if the landlord wilfully retained the security deposit beyond N days"). Then a paragraph on any state quirks not already covered elsewhere.

## Tax considerations
ONLY include if tax_implications.recovery_taxability or form_1099_c_consideration has data. One short paragraph in plain English: whether the recovered money is taxable income (often interest portions are, compensatory portions for physical injury are not), and whether forgiving an uncollectible debt may trigger a 1099-C form on the plaintiff's tax return. Tell the reader to ask a tax professional, not their lawyer, about specifics.

## Things to verify before filing
A short paragraph noting that fees, deadlines, and forms can change. Tell the reader plainly to call the clerk before they pay or mail anything important. If the merged pack has unknowns, weave the most important ones into this paragraph as questions to ask the clerk.

WRITING STYLE — strict
- Plain English. Eighth-grade reading level. Imagine the reader has never been to court.
- Confident, neutral, attorney's-paralegal voice. Direct, not hedging. Not chatty, not warm-and-fuzzy.
- Vary sentence length. Mix short and long sentences in every paragraph.
- ABSOLUTELY no em-dashes (—). Use commas, periods, parentheses, or two short sentences instead. Em-dashes are a banned character. The user calls them AI slop.
- No semicolons unless joining two genuine independent clauses. Prefer two sentences.
- No "you'll probably win", "your case is strong", or any strategic prediction. Procedure only.
- No phrases like "navigate the process", "embark on", "leverage", "robust", "ensure", "delve", "in today's world", "it's important to note that". These are AI tells.
- Personalize naturally. Use ${dollars} and ${intake.defendantName} in real sentences ("Your ${dollars} claim against ${intake.defendantName} is well within this division's jurisdiction"). Do not stuff the amount into every paragraph.
- Computed dates: if statute of limitations is "6 years from breach" and incident date is ${caseFacts.incidentDate ?? "n/a"}, write the actual expiry date in the prose ("Your deadline is approximately [date]") rather than making the reader do math.
- Inline citations: where the merged pack has a URL for a form, statute, or court page, link it inline as a Markdown link. Do not use [#N] reference markers. Do not write "Source:" footnotes.
- No throat-clearing. Start every section with substance. Do not write "In this section, we will discuss..." or "It's worth noting that...".
- No length cap, but no padding. Aim for what a paying customer needs and nothing more. A reasonable target is 1,500 to 2,500 words across all sections.

WHAT NOT TO INCLUDE
- No table of contents.
- No executive summary or "summary of recommendations" at the end.
- No disclaimer language. A standard disclaimer footer is appended separately.
- No "About this report", "How to use this report", or meta-commentary.
- No marketing voice ("CivilCase walks you through", "we'll guide you").

Begin the report now. The very first character of your output must be the start of the header block, with the case-memo definition list of bold keys.`;

  const res = await plainText({
    model: MODEL.REASONING,
    input: prompt,
    temperature: 0.3,
    // Bumped from 18k → 24k. The report now covers all 21 research sections
    // (some conditional) including arbitration, mediation, accommodations,
    // tax, and statutory multipliers. Reasoning + prose for a comprehensive
    // case can run 12-18k tokens; 24k leaves comfortable headroom.
    maxOutputTokens: 24000,
  });

  // Post-process:
  // 1. Scrub em-dashes the model may still have slipped in.
  // 2. Strip horizontal rule lines (`---` on their own line) the model
  //    sometimes inserts between sections. We don't want section dividers in
  //    the body — only the disclaimer footer (appended downstream) keeps one.
  const scrubbed = res.data
    .replace(/ +— +/g, ", ")
    .replace(/—/g, "-")
    .replace(/^[ \t]*-{3,}[ \t]*$/gm, "");

  return {
    data: {
      // Checklist intentionally empty in the new design — the prose covers
      // everything important. The DB column stays for backward compat.
      checklist_md: "",
      guide_md: scrubbed,
    },
    costCents: res.costCents,
    model: res.model,
  };
}

const DISCLAIMER_FOOTER = `
---

*Procedural information only, not legal advice. Court rules, fees, and forms can change without notice. Verify with the clerk before filing. This report was generated for your specific case using official court sources, but it is not a substitute for consultation with a licensed attorney if your situation is complex.*
`;

export function appendDisclaimerFooter(guideMd: string): string {
  return `${guideMd.trimEnd()}\n${DISCLAIMER_FOOTER}`;
}
