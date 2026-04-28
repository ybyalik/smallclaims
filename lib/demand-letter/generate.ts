// Demand letter generation via OpenRouter / Claude.
//
// State-specific awareness:
//   - For all 50 states we generate a generic but legally sound demand letter
//   - For states where we have full Deep Research data (DE, MN, TX, WY today),
//     we layer in state-specific statutes and cure-period requirements
//   - As more states' research completes, they automatically upgrade to enhanced

import { complete } from "../openrouter";
import { availableStateSlugs, loadStateGuide } from "../state-data";
import { STATES } from "../states";
import type { DemandLetterDraft, DemandLetterIntake } from "./types";

const SYSTEM_PROMPT = `You are drafting a pre-suit demand letter for a non-lawyer plaintiff who is preparing to file a small claims action if the dispute is not resolved. Write in clear, firm, professional English. The plaintiff is the one demanding payment.

Output requirements:
- Plain markdown only. No code fences. No HTML.
- Length: 350-550 words. Concise, not padded.
- Tone: firm and professional, not aggressive or threatening.
- Structure (in this order):
  1. Plaintiff's contact block at the top (name, address, email if provided)
  2. Date line
  3. Defendant's address block
  4. "Re:" line summarizing the dispute and amount
  5. One paragraph stating the facts (clearly, without legal jargon)
  6. One paragraph stating the amount owed and the basis
  7. One paragraph stating the deadline to pay (the cure period) and the consequence if not paid
  8. Closing
- Do NOT cite any specific statute unless the user is told the citation is verified.
- Do NOT promise specific legal outcomes ("you will lose in court" is wrong; "I will file in small claims court" is fine).
- Do NOT use the word "litigation" or "esquire" or attorney-style hedging.
- Do NOT include placeholders like [DATE] or [NAME]; use the data provided.
- Use plain dollar amounts ($1,500.00). Spell out the cure period in words and digits ("fourteen (14) days").
- Use today's date for the date line.

Critical: The plaintiff is NOT an attorney. Do NOT write the letter as if it were on attorney letterhead. Write it as a self-represented individual or business owner.`;

function formatAddress(addr: { line1: string; line2?: string | null; city: string; state: string; zip: string }): string {
  const lines = [addr.line1];
  if (addr.line2) lines.push(addr.line2);
  lines.push(`${addr.city}, ${addr.state} ${addr.zip}`);
  return lines.join("\n");
}

function formatDollars(amount_cents: number): string {
  const dollars = amount_cents / 100;
  return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function stateNameFromCode(code: string): string {
  const match = STATES.find((s) => s.abbr.toUpperCase() === code.toUpperCase());
  return match?.name || code;
}

async function loadStateContext(stateCode: string): Promise<string> {
  const stateName = stateNameFromCode(stateCode);
  const slug = stateName.toLowerCase().replace(/\s+/g, "-");
  if (!availableStateSlugs().includes(slug)) {
    return "";
  }
  try {
    const guide = await loadStateGuide(slug);
    if (!guide) return "";
    const sol = guide.statuteOfLimitations.entries.slice(0, 4)
      .map((e) => `- ${e.claim}: ${e.years} years (${e.statute || "see statute"})`)
      .join("\n");
    const preFiling = guide.preFiling.demandLetterNotes;
    return `\n\nState-specific context for ${stateName}:\nApplicable statute-of-limitations highlights:\n${sol}\n\nPre-suit notice rules:\n${preFiling}\n\nIf any of the above applies to this dispute (e.g., bad-check claims need a 30-day demand, security-deposit claims have specific deadlines), reflect it accurately in the cure period or wording. Do not invent state-specific statute citations not listed above.`;
  } catch {
    return "";
  }
}

function disputeTypeLabel(t: string): string {
  switch (t) {
    case "unpaid_debt":
      return "an unpaid debt";
    case "security_deposit":
      return "an unreturned security deposit";
    case "property_damage":
      return "property damage";
    case "services_not_rendered":
      return "services that were paid for but not properly delivered";
    case "goods_not_delivered":
      return "goods that were paid for but not delivered as agreed";
    default:
      return "an unresolved civil dispute";
  }
}

export async function generateDemandLetter(
  intake: DemandLetterIntake
): Promise<DemandLetterDraft> {
  const stateContext = await loadStateContext(intake.state);
  const stateEnhanced = stateContext.length > 0;

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const userPrompt = `Generate a demand letter for the following situation.

PLAINTIFF (the person sending the letter):
Name: ${intake.plaintiff_name}
Address:
${formatAddress(intake.plaintiff_address)}
Email: ${intake.plaintiff_email}
${intake.plaintiff_phone ? `Phone: ${intake.plaintiff_phone}` : ""}

DEFENDANT (the person being demanded from):
Name: ${intake.defendant_name}
Address:
${formatAddress(intake.defendant_address)}

DISPUTE:
Type: ${disputeTypeLabel(intake.dispute_type)}
Amount owed: ${formatDollars(intake.amount_cents)}
State where the dispute arose: ${stateNameFromCode(intake.state)}

FACTS (as described by the plaintiff in their own words):
${intake.facts_narrative}

CURE PERIOD: ${intake.cure_period_days} days from the date of this letter.

TODAY'S DATE: ${today}${stateContext}

Now draft the demand letter following the structure I specified.`;

  const result = await complete({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.4,
    max_tokens: 2000,
  });

  return {
    body_md: result.text.trim(),
    template_key: stateEnhanced
      ? `${intake.dispute_type}_${intake.state.toLowerCase()}_v1`
      : `${intake.dispute_type}_generic_v1`,
    cure_period_days: intake.cure_period_days,
    generated_by: result.model,
  };
}
