// Customer-facing report writer.
//
// Inputs: merged pack, state research findings, intake, merge summary,
// computed case facts. Output: ONE polished, prose-driven procedural report
// written for a layperson. No separate action checklist (everything important
// lives inline in the prose). No bullet-heavy formatting.

import { MODEL, plainText } from "./openai";
import type { EvidencePack, IntakeSnapshot } from "./agents";
import type { MergeSummary } from "./merge";

// Single slice of the combined state findings fed into the writer prompt.
// The four state-research calls concatenated can be ~250k chars; 60k is
// what the writer comfortably needs as backup material on top of the
// merged structured pack.
const STATE_FINDINGS_WRITER_BUDGET = 60_000;

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
  stateFindings: string,
  summary: MergeSummary,
  caseFacts: { incidentDate: string | null; defendantEmail: string | null; defendantPhone: string | null },
): Promise<CustomerReportResult> {
  const stateFindingsSlice = (stateFindings || "").slice(
    0,
    STATE_FINDINGS_WRITER_BUDGET,
  );
  const dollars = (intake.amountCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Pre-filter statutory multipliers by the case's claim types so the writer
  // doesn't have to read every state multiplier and pick the relevant ones
  // itself. The case-research stage stamps classification.all_claim_types
  // (primary + secondaries); a multiplier matches if any of its claim_types
  // overlaps. Empty claim_types arrays are kept as a conservative fallback
  // (some legacy rows lack the join key).
  const cls = mergedPack.classification as unknown as Record<string, unknown> | undefined;
  const caseClaimTypes = (() => {
    const all = cls?.all_claim_types;
    if (Array.isArray(all)) return (all as unknown[]).filter((x): x is string => typeof x === "string");
    const primary = cls?.primary_claim_type;
    return typeof primary === "string" && primary ? [primary] : [];
  })();
  const filteredPack: EvidencePack = (() => {
    let base: EvidencePack = mergedPack;
    if (caseClaimTypes.length > 0) {
      const lowerSet = new Set(caseClaimTypes.map((c) => c.toLowerCase()));
      const relevant = (mergedPack.statutory_multipliers ?? []).filter((m) => {
        const ct = m.claim_types ?? [];
        if (ct.length === 0) return true;
        return ct.some((c) => lowerSet.has((c ?? "").toLowerCase()));
      });
      base = { ...mergedPack, statutory_multipliers: relevant };
    }
    // Post-judgment collection/enforcement and tax data belong to the separate
    // Collection Plan product. Strip them from the JSON the writer sees so this
    // Filing Kit report can't pull them in. recoverable_amounts stays: it feeds
    // prejudgment interest and the "What to ask for" damages itemization.
    const stripped = { ...base } as Record<string, unknown>;
    delete stripped.collection_details;
    delete stripped.post_judgment_steps;
    delete stripped.defendant_collectability_signals;
    delete stripped.tax_implications;
    return stripped as unknown as EvidencePack;
  })();

  // Read the per-case prejudgment-interest rate that the case-research stage
  // stamped onto recoverable_amounts. Surfaced as a dedicated prompt fact so
  // the writer doesn't have to find it in the JSON dump.
  const interestRate =
    filteredPack.recoverable_amounts?.prejudgment_interest_rate_pct ?? null;

  const criticalNote = summary.critical_conflict_detected
    ? `\n\nCRITICAL CONFLICT FLAG\nThe two research branches disagreed on a fundamental aspect of this case (different court division, amount over the cap, etc.). Include a clearly visible section near the top under an H2 heading "Important: review needed" describing the disagreement in plain English so the reader knows to verify with the clerk before relying on the rest. The exact issue: ${summary.critical_conflict_notes}`
    : "";

  const lowConfidenceSections = summary.section_confidence
    .filter((s) => s.level === "low")
    .map((s) => s.section);
  const lowConfidenceNote = lowConfidenceSections.length
    ? `\n\nLOW-CONFIDENCE SECTIONS\nThe research was weaker for these sections; mention plainly in the relevant paragraphs that the reader should verify with the clerk before acting: ${lowConfidenceSections.join(", ")}`
    : "";

  const prompt = `You are writing a single procedural-research report for one specific US small-claims plaintiff. The reader is a regular person, not a lawyer or paralegal. Your job is to give them, in plain English, everything they need to file this case themselves and see it through the hearing and judgment. Collecting the judgment afterward is a separate product and is out of scope for this report.

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

MERGED EVIDENCE PACK (the reconciled facts you should use). Note: statutory_multipliers has already been pre-filtered to those that match this case's claim type, so every entry is relevant. Do not exclude any.
${JSON.stringify(filteredPack, null, 2)}

PREJUDGMENT INTEREST RATE (already resolved for this claim type): ${interestRate !== null ? `${interestRate}% per year` : "(no rate available, omit the Prejudgment interest section)"}

STATE RESEARCH FINDINGS (four sections concatenated: court structure/venue, deadlines/pre-filing, defendant ID/forms/fees/filing/service, hearing through collection)
${stateFindingsSlice}
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
Two to three short paragraphs. First: state the claim limit for this division and confirm the amount in dispute fits. If claim_cap_tiers has more than one entry, name the tier that applies to THIS case and mention a higher or special cap (for example a municipal-plaintiff exception or an auto property-damage exception) only when it could actually matter to this reader. Second: the subject-matter exclusions from excluded_claim_types that a reader with this kind of dispute might trip over, and say plainly whether this case is affected (housing court, title to real estate, defamation, equitable relief, etc.). Third: if frequency_caps has data, quote or paraphrase it ("This state limits each plaintiff to..."), and if claim_splitting_prohibited is true, explain in one sentence that the reader cannot break a single dispute into several smaller suits to get under the cap.

## Naming the right defendant
One to two paragraphs. Naming the defendant wrong is one of the most common reasons a case is dismissed or a judgment turns out to be uncollectable, so be specific. Explain how to identify the defendant correctly for this case: an individual by full legal name; a business by its exact registered entity (the LLC or corporation, or the real owner behind a "doing business as" name), not just the storefront or brand. Tell the reader how to confirm it (the state's business-entity or Secretary of State search, the lease or signed contract, the name on a receipt or invoice). If classification.notes explains who may appear on behalf of a business (for example that a corporation or LLC may be represented by a non-lawyer officer or employee), include it. If the defendant could be a government entity, point back to the pre-filing notice requirement.

## Arbitration and forum-selection clauses
ONLY include if arbitration_clause_considerations is non-empty. One paragraph in plain English: explain whether the kind of contract the plaintiff signed (lease, service agreement, etc.) might contain an arbitration clause that knocks the case out of small claims, and what to look for. Tell them to read their contract for an "Arbitration" or "Dispute Resolution" section. End with a sentence on whether small claims is typically a carve-out.

## The deadline
A paragraph stating the statute of limitations rule and the precise statute citation. Then, if you can compute the actual expiry date from the incident date plus the rule, state the date plainly: "Your deadline is approximately [date]." If you cannot compute, give the rule and ask the reader to compute. ALWAYS surface tolling, discovery rule, accrual specifics, and partial-payment-restart rules from classification.statute_of_limitations.notes if they have content — those are the most case-altering details.

## Prejudgment interest
ONLY include if the PREJUDGMENT INTEREST RATE fact at the top of this prompt is a real percentage (not the "no rate available" notice). One short paragraph in plain English. State the per-year rate, explain in one sentence that prejudgment interest is money the defendant owes for the time between when the debt arose and when the judge enters a judgment, and add one practical sentence on what the reader should do (request prejudgment interest in the complaint or at the hearing; many courts won't award it unless asked). If recoverable_amounts.prejudgment_interest_rate_pct is null AND no rate is in the merged pack, skip the section entirely. Do not invent a rate.

## Pre-filing requirements
Walk through pre-filing steps with specifics. If demand_letter.required or demand_letter.recommended is true, dedicate a paragraph: what the letter must contain (use demand_letter.required_content_elements verbatim if available), the minimum days the plaintiff must wait (demand_letter.minimum_days_before_filing), whether Certified Mail and Return Receipt are required. If demand_letter.notes has content, weave it in (e.g., "Not legally required, but Certified Mail gives you proof of service"). If the defendant is or might be a government entity AND government_tort_claim_notice.required_for_government_defendants is true, add a paragraph on the tort-claim notice with the deadline_days, form_code, recipient_address, and statute. Cover any agency exhaustion or pre-suit mediation that applies. Say plainly which steps DO NOT apply, so the reader is reassured.

## The forms you need
Use a markdown table because forms genuinely tabulate well:

| Form code | Name | What it does | Where to get it |
|-----------|------|--------------|-----------------|
| ... | ... | ... | [link](url) |

If a form has no official form code (the code field is null or empty), leave the Form code cell completely empty. Do not write a comma, dash, "N/A", or any other placeholder in it.

Follow the table with a fuller walkthrough (three to five short paragraphs) of how to complete the main complaint or statement-of-claim form, field by field: the parties (tie back to naming the defendant correctly), the plaintiff's contact details, how to describe the dispute in two or three plain sentences (what was promised or owed, what went wrong, what is owed now), where and how to enter the dollar amount, the date the claim arose, and how and where to sign and date. Call out the spots people most often get wrong on this form (signing in the wrong place, leaving the amount blank, a vague or rambling description). Keep it specific to the forms named in the table above.

## What to ask for
Two to four short paragraphs (a tight labeled breakdown is acceptable here, since amounts itemize cleanly) on how to build the total dollar figure the reader claims, so they neither leave money on the table nor blow past the cap. Cover only the pieces that apply to THIS case: the principal (the actual amount owed or lost); prejudgment interest, if a rate was provided above, noting it is usually requested in the complaint and often must be asked for explicitly; recoverable costs from recoverable_amounts.costs_recoverable (for example the filing fee, the service-of-process fee, witness and mileage fees), which are added on top and typically awarded to the winner; attorney's fees ONLY if recoverable_amounts.attorney_fees.available is true, in which case state the statute or condition (recoverable_amounts.attorney_fees.conditions) and note that most small-claims plaintiffs represent themselves, so this usually applies only where a statute or the contract allows it. If a statutory multiplier applies to this claim type, note that the base claim plus the multiplier can exceed the small-claims cap, and give the reader their options (waive the excess to stay in small claims, or file in a higher court); cross-reference the "State-specific rules" section rather than repeating the statute detail here.

## Filing fee and how to pay
A paragraph stating the filing fee for THIS case. If filing_fee_tiers has bands, name the band the case's amount falls into and give that exact fee, then mention the next band so the reader sees how it scales. Include filing_fee_notes if it has content (often explains bracketed pricing or what counts as a "claim"). Add any other fees from fee_schedule worth knowing (service fee, motion fee, jury demand fee). Name the accepted payment methods and the check_payee. If fee_schedule.fee_waiver.available is true, add a sentence explaining who qualifies (use eligibility_criteria text) and link the form (form_url) by form code. Do not bullet this.

## How to file
Walk through every method available in this county as prose, not bullets. If e-filing is available, name the portal (efile_portal.name), link it (efile_portal.url), and say whether an account is required. Mention accepted file types if relevant. If in-person, give the courthouse hours if known. If mail, give the mailing address.

## How to serve the defendant
For each entry in service_methods that has allowed=true, write a short paragraph: how the method works, the cost (in dollars), the deadline relative to the hearing, the proof-of-service form code. Cover sheriff service, certified mail, personal service by a non-party adult, alternate service, publication, and any other method present. Use service_requirements for any free-form notes that don't fit a single method.

## Evidence to bring and how to present it
Start from evidence_required_for_this_claim_type when it has entries, and tailor each item to this dispute (name the actual agreement, the actual payments, the actual photos, not generic categories). This section MAY use a focused bullet list because the reader will literally pack a folder: group by category (the agreement, payment records, communications, photos, witness names), eight to fifteen bullets max, each specific to this claim type. Then a short closing paragraph (not bullets) on how to present it: how many copies to bring (hearing_logistics.copies_required), the accepted exhibit format (hearing_logistics.exhibit_format, for example printed copies for the court and the other side, or eFiled PDFs), labeling exhibits, and bringing an extra copy for the defendant. If a key witness will not come voluntarily, point to the subpoena process named in the hearing section.

## Court-annexed mediation
Include if court_mediation has any populated field (available true OR when, process has data). One paragraph: when in the timeline mediation is offered (court_mediation.when), whether it is free (court_mediation.free), how to opt in (court_mediation.process), and a frank sentence on why it can save time and money. Skip the section ONLY if all of court_mediation is empty.

## Court interpreter and ADA accommodations
ONLY include if interpreter_request_process or ada_request_process is non-empty. One paragraph each. For the interpreter: how to request, how many days lead time (interpreter_lead_time_days), available languages (available_languages), and the request form code if any. For ADA: the request process, the ADA coordinator's name and contact, and the request form code if any. Skip if neither has data.

## What happens at the hearing
Three to four short paragraphs covering ALL populated hearing_logistics fields. First: timeline from filing to hearing using hearing_logistics.typical_days_filing_to_hearing if available. Second: what to expect during the hearing (format, who speaks, exhibit copies, plaintiff goes first). Third: evidence and recording — use hearing_logistics.hearsay_rules and hearing_logistics.recording_rules if populated. Fourth: default-judgment rules and the consequence if the plaintiff fails to appear (plaintiff_no_show_consequence + default_proveup_required). If hearing_logistics.continuance_rules has content, add a sentence on how to request a continuance. If hearing_logistics.witness_subpoena_process has content, add a sentence on how to subpoena a witness. If hearing_logistics.phone_video_appearance_allowed is true, mention how to request remote appearance.

## Counterclaims and removal
ONLY include if counterclaim_transfer_threshold has data. One short paragraph: what happens if the defendant files a counterclaim that exceeds the small-claims cap (does the case transfer to a higher court, does plaintiff lose small-claims simplicity, etc.).

## After the hearing
A paragraph covering what happens once the case is decided: when and how the judgment is entered, the appeal window in days (appeal_details.window_days), explicitly who can appeal (appeal_details.who_can_appeal, for example "Either party," not just "the defendant"), the type of appeal (appeal_details.type, for example "trial de novo," which means a brand-new trial in a higher court), and the motion-to-vacate deadline if the defendant defaulted (motion_to_vacate_default_window_days). If the reader wins, add ONE sentence noting that actually collecting the judgment (liens, levies, wage garnishment) is a separate process not covered in this report. Do not explain how to collect.

## State-specific rules to know
ONLY include if state_specific_quirks or statutory_multipliers has entries. Cover statutory multipliers first as a focused paragraph. Every multiplier in the pack has already been filtered to this case's claim type, so cite ALL of them — do not omit any as irrelevant. For each: cite the statute, name the multiplier in plain English ("double damages", "treble damages"), and the conditions under which it applies ("if the landlord willfully retained the security deposit beyond N days"). End with one practical sentence on how to invoke it (typically: ask for it in the complaint and at the hearing). Then a paragraph on any state quirks not already covered elsewhere.

## Common mistakes that get cases dismissed
A focused section on the avoidable errors that most often sink a small-claims case, tailored to THIS dispute. This MAY be a short bullet list since it reads as a checklist; keep each to a sentence or two. Cover only the ones that actually apply: suing the wrong legal entity (cross-reference naming the defendant); filing in the wrong court or after the deadline; claiming more than the cap, or splitting one dispute into several suits to get under it (if claim_splitting_prohibited is true); a claim type that does not belong in small claims at all (draw from excluded_claim_types); skipping a required pre-suit step (the demand letter or government notice where required); defective service of process; and showing up without the right evidence or enough copies. Frame each as "avoid this," never as a prediction about whether the reader will win.

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
- No length cap, but no padding. Aim for what a paying customer needs and nothing more. A reasonable target is 2,500 to 3,500 words across all sections.

WHAT NOT TO INCLUDE
- No table of contents.
- No executive summary or "summary of recommendations" at the end.
- No disclaimer language. A standard disclaimer footer is appended separately.
- No "About this report", "How to use this report", or meta-commentary.
- No marketing voice ("CivilCase walks you through", "we'll guide you").
- No post-judgment collection or enforcement content. Do NOT explain how to collect a judgment: no debtor's exams, bank levies, wage garnishment, liens or abstracts of judgment, exemptions, judgment renewal, bankruptcy effects, or out-of-state domestication. That is a separate product. You may note in ONE sentence (in "After the hearing") that collecting the judgment is a separate process, but never teach it.
- No tax advice or taxability discussion. Do not cover whether a recovery is taxable or 1099-C consequences.

Begin the report now. The very first character of your output must be the start of the header block, with the case-memo definition list of bold keys.`;

  const res = await plainText({
    model: MODEL.REASONING,
    input: prompt,
    temperature: 0.3,
    // No max_output_tokens cap — model uses its full default output budget.
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

// Shared disclaimer used across customer-facing products (research report,
// collection plan, etc.). Single source of truth lives in lib/cases.
import { appendDisclaimerMd } from "../cases/disclaimer";

export function appendDisclaimerFooter(guideMd: string): string {
  return appendDisclaimerMd(guideMd);
}
