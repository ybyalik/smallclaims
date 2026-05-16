// Demand letter generation via OpenRouter / Claude.
//
// The system prompt and user-prompt template both come from the
// prompt_templates DB table (admin-editable at /admin/prompts). If no row
// exists yet, the hardcoded constants below act as fallback.

import { complete } from "../openrouter";
import { STATES } from "../states";
import { loadActivePrompt, renderTemplate } from "../prompts";
import { buildLetterStateContext } from "./letter-context";
import { formatDisputeTypePhrase } from "../cases/dispute-type-label";
import type { DemandLetterDraft, DemandLetterIntake } from "./types";

export const FALLBACK_SYSTEM_PROMPT = `You are drafting a pre-suit demand letter for a non-lawyer plaintiff who is preparing to file a small claims action if the dispute is not resolved. Write in clear, firm, professional English. The plaintiff is the one demanding payment.

Output requirements:
- Plain markdown only. No code fences. No HTML.
- Length: 400-700 words. Concise, not padded. Slightly longer if a statutory multiplier or recoverable-fees note applies.
- ADDRESS BLOCKS (sender at top, defendant before "Re:"): put each line on its own line, exactly as supplied. Format:
    Yury Byalik
    123 Main St
    Apt 4B
    San Francisco, CA 94110
  Do NOT combine the lines with commas. Do NOT add ", " between street and city. Each line stays on its own line.
- The SENDER block at the top is determined by the LETTERHEAD block in the user message (CivilCase letterhead vs. plaintiff's own letterhead). The signature at the bottom is always the plaintiff's name regardless of which letterhead is used.
- Tone: firm and professional, not aggressive or threatening.
- Structure (in this order):
  1. Sender's contact block at the top (use the LETTERHEAD block below to decide whether this is the plaintiff or CivilCase)
  2. Date line
  3. Defendant's address block
  4. "Re:" line summarizing the dispute and amount
  5. Greeting: use the recipient's FULL NAME with no honorific. "Dear Noah Brennan:" — not "Dear Mr. Brennan:" or "Dear Mrs. Brennan:". We do not know the recipient's gender or preferred title.
  6. One paragraph stating the facts (clearly, without legal jargon)
  7. One paragraph stating the amount owed and the basis
  8. One paragraph stating the deadline to pay (the cure period). The content of the consequence statement depends on the PLAINTIFF CONSENT block below.
  9. Closing (content also depends on the PLAINTIFF CONSENT block below)
  10. Signature line with the plaintiff's full name (always the plaintiff, even when the letterhead is CivilCase)
- Do NOT cite any specific statute unless it appears verbatim in the State-Specific Context block below. Cite it exactly as written there (preserve section numbers and statute name).
- Do NOT promise specific legal outcomes ("you will lose in court" is wrong; "I will file in small claims court" is fine).
- Do NOT use the word "litigation" or "esquire" or attorney-style hedging.
- Do NOT include placeholders like [DATE] or [NAME]; use the data provided.
- Use plain dollar amounts ($1,500.00). Spell out the cure period in words and digits ("fourteen (14) days").
- Use today's date for the date line.
- ABSOLUTELY no em-dashes (—) or en-dashes (–) anywhere in the letter. These are banned characters. Use a comma, a period, a colon, parentheses, or two short sentences instead. Subject lines that would naturally use a dash should use a colon or pipe ("Re: Demand for Payment | Vehicle Collision on April 11, 2026"). The user calls em-dashes and en-dashes "AI slop" and will reject any letter containing them.

USING THE STATE-SPECIFIC CONTEXT BLOCK:
The user message includes a "State-specific context" block with structured legal facts. Use it as follows:

- APPLICABLE STATUTE OF LIMITATIONS: If a matched row exists, weave the citation into the deadline paragraph ("under [statute], the limitations period for this claim is [N] years from [event]"). Use it to add pressure, not as a threat.

- STATUTORY DAMAGE MULTIPLIERS: If a multiplier in the block clearly applies to the facts, the demand should reflect the multiplied amount (or at minimum warn the defendant the multiplier will be sought). For example, if a row says "Bad-faith security deposit retention: 2x wrongfully withheld + up to $500 punitive (Statute X)," and the facts describe a withheld security deposit, demand 2x the principal plus the punitive cap and cite the statute. Never invent a multiplier not listed in the block.

- PREJUDGMENT INTEREST: If the block specifies a rate, mention that interest is accruing on the principal at that rate per year and that the demand will increase if a suit becomes necessary.

- RECOVERABLE COSTS AND FEES: If the block notes costs/attorney fees are recoverable, add a single sentence to the consequence paragraph that the plaintiff will seek those if a suit is filed.

- DEMAND-LETTER REQUIREMENTS: If the block notes a government-entity tort claim deadline or other minimum cure period, the cure_period_days supplied by the user/system has already been adjusted; just use what you're given.

- SMALL-CLAIMS JURISDICTION / FILING COST PRESSURE: Use these as subtext only. One short clause maximum (e.g., "this claim is within the small-claims cap and can be filed promptly"). Do not lecture the defendant on the entire procedural posture.

PLAINTIFF CONSENT TO COURT THREAT:
The user message ends with a "Plaintiff consent" block telling you whether the plaintiff has authorized the letter to threaten a small claims filing. This is binding.

- If consent is "yes": the deadline paragraph MUST state that if payment is not received by the deadline, the plaintiff intends to file a claim in small claims court. You may also note (if the State-specific block supports it) that recoverable costs/fees and prejudgment interest will be sought once a suit is filed. Close professionally.

- If consent is "no": the deadline paragraph MUST NOT mention small claims court, filing suit, litigation, judgment, or any specific legal consequence. State the deadline as a firm payment demand only. Do NOT cite statutes of limitations as a threat (you may still mention them neutrally if the State-specific block warrants it, but never as "I will sue you" framing). The Closing must contain a short seriousness line such as: "I trust you understand the seriousness of this matter and expect a prompt response." Do not soften the firmness of the demand itself, just remove the court/filing threat.

- If no consent block is present (legacy cases): default to "yes" behavior.

Critical: The plaintiff is NOT an attorney. Do NOT write the letter as if it were on attorney letterhead. Write it as a self-represented individual or business owner. CivilCase (when used on the letterhead) is a small-claims help platform, not a law firm. Do not refer to CivilCase as an attorney, counsel, or law firm. Do not have CivilCase speak in the first person inside the letter body. The letter is from the plaintiff; CivilCase is only the sender of record on the envelope and letterhead.`;

export const FALLBACK_USER_TEMPLATE = `Generate a demand letter for the following situation.

PLAINTIFF (the person on whose behalf the demand is made):
Name: {{plaintiff_name}}
Address:
{{plaintiff_address}}
Email: {{plaintiff_email}}
{{plaintiff_phone_line}}

DEFENDANT (the person being demanded from):
Name: {{defendant_name}}
Address:
{{defendant_address}}

DISPUTE:
Type: {{dispute_type_label}}
Amount owed: {{amount}}
State where the dispute arose: {{state_name}}

FACTS (as described by the plaintiff in their own words):
{{facts_narrative}}

CURE PERIOD: {{cure_period_days}} days from the date of this letter.

TODAY'S DATE: {{today_date}}

{{state_law_context}}

{{claim_type_block}}

{{letterhead_block}}

{{consent_block}}

Now draft the demand letter following the structure I specified.`;

function formatAddress(addr: { line1: string; line2?: string | null; city: string; state: string; zip: string }): string {
  const lines = [addr.line1];
  if (addr.line2) lines.push(addr.line2);
  lines.push(`${addr.city}, ${addr.state} ${addr.zip}`);
  return lines.join("\n");
}

// Reserved marker the PDF renderer treats as a forced page break. The cover
// letter sits before this marker so it lands on its own page in the PDF.
export const PAGE_BREAK_MARKER = "<!-- PAGEBREAK -->";

// In-code fallback for the CivilCase cover letter. Used when no admin
// override exists in prompt_templates(key=demand_letter, role=cover_letter).
// Editable from /admin/prompts/demand-letter.
export const FALLBACK_COVER_LETTER_TEMPLATE = `CivilCase
32 N Gould St
Sheridan, WY 82801

{{today_date}}

{{defendant_name}}
{{defendant_address}}

Re: Enclosed demand letter from {{plaintiff_name}}

Dear {{defendant_name}}:

Enclosed is a formal demand letter from {{plaintiff_name}} regarding the matter described in the attached letter. This demand is being sent and facilitated by CivilCase.com, a platform that helps individuals pursue resolution of small claims disputes.
{{#if threat_consent_yes}}
The plaintiff has taken the first steps toward filing a small claims action and intends to proceed if the matter is not resolved within the stated deadline.
{{/if}}
Please review the enclosed letter carefully and respond by the deadline stated within.

Sincerely,

CivilCase`;

// Build the cover letter from the admin-editable template. The "static" feel
// (everyone gets the same wording) comes from the template body itself, not
// from hardcoded strings — change the template at /admin/prompts/demand-letter
// to rewrite the cover letter for every future send.
async function buildCoverLetter(
  intake: DemandLetterIntake,
  todayDate: string,
): Promise<string> {
  const tpl = await loadActivePrompt("demand_letter", "cover_letter", {
    fallback: FALLBACK_COVER_LETTER_TEMPLATE,
  });
  return renderTemplate(tpl.body, {
    today_date: todayDate,
    plaintiff_name: intake.plaintiff_name,
    defendant_name: intake.defendant_name,
    defendant_address: formatAddress(intake.defendant_address),
    threat_consent_yes:
      intake.lawsuit_threat_consent === "no" ? "" : "1",
  });
}

function formatDollars(amount_cents: number): string {
  const dollars = amount_cents / 100;
  return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function stateNameFromCode(code: string): string {
  const match = STATES.find((s) => s.abbr.toUpperCase() === code.toUpperCase());
  return match?.name || code;
}

// disputeTypeLabel now delegates to the shared helper. Kept as a thin
// wrapper so callers don't have to import both.
function disputeTypeLabel(t: string, customText: string | null = null): string {
  return formatDisputeTypePhrase(t, customText);
}

export async function generateDemandLetter(
  intake: DemandLetterIntake,
): Promise<DemandLetterDraft> {
  // Build the rich state-law context. When the case has a resolved canonical
  // claim type (from the classifier), use it for SOL/interest/multiplier
  // matching. Falls back to the wizard slug for older cases.
  const resolvedClaimTypes = intake.primary_claim_type
    ? {
        primary: intake.primary_claim_type,
        secondaries: intake.secondary_claim_types ?? [],
      }
    : undefined;
  const stateCtx = await buildLetterStateContext(
    intake.state,
    intake.dispute_type,
    intake.cure_period_days,
    resolvedClaimTypes,
  );

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [system, userTpl] = await Promise.all([
    loadActivePrompt("demand_letter", "system", { fallback: FALLBACK_SYSTEM_PROMPT }),
    loadActivePrompt("demand_letter", "user_template", { fallback: FALLBACK_USER_TEMPLATE }),
  ]);

  const consent = intake.lawsuit_threat_consent;
  const consentBlock =
    consent === "no"
      ? `Plaintiff consent: NO. The plaintiff has NOT authorized this letter to threaten a small claims filing. The deadline paragraph must demand payment by the deadline without mentioning small claims court, suit, litigation, or any other legal consequence. The closing must include a brief seriousness line (e.g., "I trust you understand the seriousness of this matter and expect a prompt response.").`
      : consent === "yes"
        ? `Plaintiff consent: YES. The plaintiff has authorized this letter to state that a small claims action will be filed if payment is not received by the deadline. Include that consequence clearly in the deadline paragraph.`
        : `Plaintiff consent: YES (default). The deadline paragraph should state that a small claims action will be filed if payment is not received by the deadline.`;

  // CivilCase letterhead is the default (recommended). Only an explicit "no"
  // switches back to the plaintiff's own letterhead.
  const useCivilCaseLetterhead = intake.civilcase_letterhead !== "no";
  const letterheadBlock = useCivilCaseLetterhead
    ? `LETTERHEAD: Use CivilCase as the sender on the letterhead at the top of the demand letter. Format the sender block exactly like this (each line on its own line):
    CivilCase
    32 N Gould St
    Sheridan, WY 82801
The body of the letter is still written in the plaintiff's first-person voice ("I", "my"). The signature line at the bottom of the letter is the plaintiff's full name (${intake.plaintiff_name}). Do NOT include CivilCase in the signature; CivilCase only appears on the letterhead. Do NOT mention CivilCase inside the body of the letter.`
    : `LETTERHEAD: Use the plaintiff (${intake.plaintiff_name}) as the sender on the letterhead at the top of the demand letter. Use the plaintiff's address block as supplied above.`;

  // Build a short claim-type block for the LLM. When the classifier has
  // identified multiple legal theories, we want the letter prose to mention
  // them all so the case is described accurately.
  let claimTypeBlock = "";
  if (intake.primary_claim_type) {
    const friendly = (s: string) => s.replace(/_/g, " ");
    const parts = [`Primary legal claim: ${friendly(intake.primary_claim_type)}.`];
    if (intake.secondary_claim_types && intake.secondary_claim_types.length > 0) {
      parts.push(
        `Additional legal theories that apply: ${intake.secondary_claim_types.map(friendly).join(", ")}.`,
      );
      parts.push(
        "The letter should describe the situation accurately as spanning all of the above theories. The deadline and SOL citation use the primary claim. Where statutory multipliers or recoverable costs apply to any of the theories, mention them.",
      );
    }
    claimTypeBlock = parts.join(" ");
  }

  const ctx: Record<string, string> = {
    plaintiff_name: intake.plaintiff_name,
    plaintiff_email: intake.plaintiff_email,
    plaintiff_phone: intake.plaintiff_phone ?? "",
    plaintiff_phone_line: intake.plaintiff_phone ? `Phone: ${intake.plaintiff_phone}` : "",
    plaintiff_address: formatAddress(intake.plaintiff_address),
    defendant_name: intake.defendant_name,
    defendant_address: formatAddress(intake.defendant_address),
    amount: formatDollars(intake.amount_cents),
    state_code: intake.state,
    state_name: stateNameFromCode(intake.state),
    dispute_type_label: disputeTypeLabel(intake.dispute_type, intake.dispute_type_other ?? null),
    facts_narrative: intake.facts_narrative,
    cure_period_days: String(stateCtx.curePeriodDays),
    today_date: today,
    state_law_context: stateCtx.contextBlock,
    consent_block: consentBlock,
    claim_type_block: claimTypeBlock,
    letterhead_block: letterheadBlock,
  };

  const userPrompt = renderTemplate(userTpl.body, ctx);

  const result = await complete({
    messages: [
      { role: "system", content: system.body },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.4,
    max_tokens: 2000,
  });

  const letterBody = result.text.trim();
  const finalBody = useCivilCaseLetterhead
    ? `${await buildCoverLetter(intake, today)}\n\n${PAGE_BREAK_MARKER}\n\n${letterBody}`
    : letterBody;

  return {
    body_md: finalBody,
    template_key: stateCtx.stateEnhanced
      ? `${intake.dispute_type}_${intake.state.toLowerCase()}_v1`
      : `${intake.dispute_type}_generic_v1`,
    cure_period_days: stateCtx.curePeriodDays,
    generated_by: result.model,
  };
}
