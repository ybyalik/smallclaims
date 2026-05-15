// Orchestrator for "case marked paid → mail the demand letter via PostGrid".
// Called from the Inngest background worker so the Stripe webhook can return
// fast. Idempotent: if the letter already has a mail_vendor_letter_id we
// don't re-mail.

import { createServiceRoleClient } from "../supabase/service-role";
import { renderLetterPdf } from "../pdf/letter";
import { createCertifiedLetter, type PostGridAddress } from "./postgrid";
import type { Case, DemandLetter, PostalAddress } from "../supabase/types";

interface MailDemandLetterResult {
  ok: boolean;
  reason?: "already_mailed" | "no_letter" | "no_address" | "no_postgrid_config" | "letter_too_short";
  letterId?: string;
  trackingNumber?: string | null;
}

function toPostGridAddress(name: string, addr: PostalAddress): PostGridAddress {
  // PostGrid wants firstName/lastName for individuals, companyName for
  // businesses. We don't always know which side of that the recipient is
  // on; safest path is to send `firstName` carrying the full name. PostGrid
  // accepts that without complaint and renders it as a single line.
  return {
    firstName: name.trim().slice(0, 100),
    addressLine1: addr.line1,
    addressLine2: addr.line2 ?? null,
    city: addr.city,
    provinceOrState: addr.state,
    postalOrZip: addr.zip,
    country: "US",
  };
}

export async function mailDemandLetter(caseId: string): Promise<MailDemandLetterResult> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const { data: caseRow } = await admin
    .from("cases")
    .select("id, defendant_name, defendant_address, plaintiff_name")
    .eq("id", caseId)
    .single();
  if (!caseRow) return { ok: false, reason: "no_letter" };
  const c = caseRow as Pick<Case, "id" | "defendant_name" | "defendant_address" | "plaintiff_name">;

  if (!c.defendant_name || !c.defendant_address) {
    return { ok: false, reason: "no_address" };
  }

  const { data: letter } = await admin
    .from("demand_letters")
    .select("id, version, body_md, mail_status, mail_vendor_letter_id")
    .eq("case_id", caseId)
    .order("version", { ascending: false })
    .limit(1)
    .single();
  if (!letter) return { ok: false, reason: "no_letter" };
  const ltr = letter as Pick<DemandLetter, "id" | "version" | "body_md" | "mail_status" | "mail_vendor_letter_id">;

  // Idempotency — already mailed.
  if (ltr.mail_vendor_letter_id) {
    return {
      ok: true,
      reason: "already_mailed",
      letterId: ltr.mail_vendor_letter_id,
    };
  }

  if (!ltr.body_md || ltr.body_md.length < 100) {
    return { ok: false, reason: "letter_too_short" };
  }

  // Render the PDF the same way the user-facing download does.
  const pdfBytes = await renderLetterPdf({ body_md: ltr.body_md });

  const result = await createCertifiedLetter({
    to: toPostGridAddress(c.defendant_name, c.defendant_address),
    pdfBuffer: Buffer.from(pdfBytes),
    description: `Demand letter — ${c.plaintiff_name ?? "plaintiff"} v. ${c.defendant_name}`,
    metadata: {
      case_id: caseId,
      demand_letter_id: ltr.id,
      version: String(ltr.version),
    },
    extraService: "certified_return_receipt",
  });

  if (!result) {
    // PostGrid not configured. Not an error — leave the letter in "draft"
    // mail_status so once PostGrid is wired up we can retry.
    return { ok: false, reason: "no_postgrid_config" };
  }

  await admin
    .from("demand_letters")
    .update({
      mail_vendor_letter_id: result.id,
      tracking_number: result.trackingNumber,
      mail_status: "queued",
      sent_at: result.sendDate ?? new Date().toISOString(),
    })
    .eq("id", ltr.id);

  // case.status is no longer touched here. Mail state lives on the
  // demand_letters row (mail_status, mail_vendor_letter_id, sent_at) and is
  // surfaced via derive-status-label.

  return { ok: true, letterId: result.id, trackingNumber: result.trackingNumber };
}
