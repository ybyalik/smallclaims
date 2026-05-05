// Builds the demand-letter body from a case row. Deterministic / template-based
// for v1. The same shape works for a real LLM-generated body later — just swap
// generateLetterBody() with an LLM call returning the same string.

import type { Case } from "../supabase/types";
import { getStateContext } from "./state-context";
import { getCategory } from "./categories";

interface LineItem {
  key: string;
  title: string;
  amount: number;
}

export interface GeneratedLetter {
  subject: string;
  body: string;
  totalDemandCents: number;
}

export function generateLetter(c: Case): GeneratedLetter {
  const answers = (c.intake_answers as Record<string, unknown> | null) ?? {};
  const ctx = c.state ? getStateContext(c.state) : null;
  const category = getCategory(c.dispute_type);

  const baseAmount = Math.max(0, Math.round(c.amount_cents / 100));
  const lineItems = (answers.line_items as LineItem[]) || [];
  const lineItemsTotal = lineItems.reduce((sum, li) => sum + (li.amount || 0), 0);

  // Statutory interest based on incident date (if present), defaulting to 3 months
  const incidentDateStr = (answers.incident_date as string) || "";
  const incidentDate = incidentDateStr ? new Date(incidentDateStr) : null;
  const months = incidentDate
    ? Math.max(
        0,
        (new Date().getFullYear() - incidentDate.getFullYear()) * 12 +
          (new Date().getMonth() - incidentDate.getMonth())
      )
    : 3;
  const interest = ctx
    ? Math.round((baseAmount * (ctx.prejudgment_interest_rate / 100) * months) / 12)
    : 0;

  const totalDemand = baseAmount + lineItemsTotal + interest;
  const totalDemandCents = totalDemand * 100;

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const defendantName = c.defendant_name || "[Recipient name]";
  const defendantAddress = formatAddress(c.defendant_address);

  const plaintiffName = c.plaintiff_name || "[Sender name]";
  const summary =
    (answers.ai_summary as string) ||
    truncate(c.facts_narrative ?? "", 180) ||
    "the events giving rise to this demand";

  const calculation = (answers.amount_calculation as string) || "";

  const stateName = ctx?.name ?? "the recipient's state";

  // Build the body
  const subject = `FORMAL DEMAND FOR PAYMENT — ${formatDollars(totalDemandCents)}`;

  const lineItemBlock = lineItems.length
    ? `\n\nClaim breakdown:\n` +
      lineItems
        .map((li) => `   • ${li.title}: ${formatDollars(li.amount * 100)}`)
        .join("\n")
    : "";

  const interestBlock =
    ctx && interest > 0
      ? `\n   • Pre-judgment interest at ${ctx.prejudgment_interest_rate}% per year (${months} months): ${formatDollars(interest * 100)}`
      : "";

  const calcBlock = calculation
    ? `\n\nThe amount demanded is calculated as follows: ${calculation}`
    : "";

  const stateConsequence = ctx
    ? `Failure to respond may result in the filing of a small-claims action in ${stateName}, where you may be liable for the original amount, statutory interest at ${ctx.prejudgment_interest_rate}%, and court costs (the small-claims jurisdictional cap in ${stateName} is ${formatDollars(ctx.small_claims_max_dollars * 100)}).`
    : `Failure to respond may result in legal action.`;

  const body = `${today}

${defendantName}
${defendantAddress}

RE: ${subject}

Dear ${defendantName},

We are writing on behalf of ${plaintiffName} to formally demand payment in the amount of ${formatDollars(totalDemandCents)} arising from ${summary}.

${category ? `This matter concerns ${category.label.toLowerCase()}.` : ""} ${calcBlock}${lineItemBlock}${interestBlock}

${plaintiffName} has attempted to resolve this matter directly without success. Pursuant to applicable state law, you are formally on notice of the amount owed and your obligations.

Please remit the full amount of ${formatDollars(totalDemandCents)} within FOURTEEN (14) DAYS of the date of this letter. Payment may be made through the response link provided with this notice.

${stateConsequence}

This letter is sent in good faith to provide an opportunity to resolve this matter without litigation. We urge you to act promptly.

Sincerely,

${plaintiffName}
c/o CivilCase
`;

  return { subject, body: body.trim(), totalDemandCents };
}

function formatDollars(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function formatAddress(addr: Case["defendant_address"]): string {
  if (!addr) return "[Address required — skip-trace will provide]";
  const lines: string[] = [];
  if (addr.line1) lines.push(addr.line1);
  if (addr.line2) lines.push(addr.line2);
  const cityStateZip = [addr.city, addr.state, addr.zip].filter(Boolean).join(", ");
  if (cityStateZip) lines.push(cityStateZip);
  return lines.join("\n");
}

function truncate(s: string, n: number): string {
  if (s.length <= n) return s;
  return s.slice(0, n - 1) + "…";
}
