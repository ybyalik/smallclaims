// Orchestrator for "case marked paid → mail the demand letter via PostGrid".
// Called from the Inngest background worker so the Stripe webhook can return
// fast. Idempotent: if the letter already has a mail_vendor_letter_id we
// don't re-mail.

import { createServiceRoleClient } from "../supabase/service-role";
import { renderLetterPdf } from "../pdf/letter";
import { createCertifiedLetter, type PostGridAddress } from "./postgrid";
import { sendEmail } from "../resend";
import { createNotification } from "../notifications";
import type { Case, DemandLetter, PostalAddress } from "../supabase/types";

interface MailDemandLetterResult {
  ok: boolean;
  reason?:
    | "already_mailed"
    | "no_letter"
    | "no_address"
    | "no_postgrid_config"
    | "letter_too_short"
    | "not_approved";
  letterId?: string;
  trackingNumber?: string | null;
}

interface MailDemandLetterOptions {
  // Admin testing escape hatch: skip the approval-status guard so an admin
  // can dispatch a letter directly from /admin/cases/[id] regardless of
  // whether the customer has clicked Approve yet. Default false.
  adminOverride?: boolean;
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


export async function mailDemandLetter(
  caseId: string,
  options: MailDemandLetterOptions = {},
): Promise<MailDemandLetterResult> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const { data: caseRow } = await admin
    .from("cases")
    .select(
      "id, owner_user_id, defendant_name, defendant_address, plaintiff_name, plaintiff_address, intake_answers",
    )
    .eq("id", caseId)
    .single();
  if (!caseRow) return { ok: false, reason: "no_letter" };
  const c = caseRow as Pick<
    Case,
    | "id"
    | "owner_user_id"
    | "defendant_name"
    | "defendant_address"
    | "plaintiff_name"
    | "plaintiff_address"
    | "intake_answers"
  >;

  if (!c.defendant_name || !c.defendant_address) {
    return { ok: false, reason: "no_address" };
  }

  // The same intake-answer flag that controls the PDF letterhead (CivilCase
  // vs plaintiff) also drives the envelope/carrier-sheet sender. "no" means
  // the customer opted out — send the letter under the plaintiff's name and
  // address instead of CivilCase. Anything else (including missing) keeps
  // the CivilCase default since CivilCase letterhead is the recommended
  // path and the PDF was generated on that assumption.
  const answers = (c.intake_answers as Record<string, unknown> | null) ?? {};
  const civilcaseLetterhead =
    answers.civilcase_letterhead === "no" ? "no" : "yes";
  let fromOverride: PostGridAddress | undefined;
  if (
    civilcaseLetterhead === "no" &&
    c.plaintiff_name &&
    c.plaintiff_address
  ) {
    fromOverride = toPostGridAddress(
      c.plaintiff_name,
      c.plaintiff_address as PostalAddress,
    );
  }

  const { data: letter } = await admin
    .from("demand_letters")
    .select(
      "id, version, body_md, mail_status, mail_vendor_letter_id, approval_status",
    )
    .eq("case_id", caseId)
    .order("version", { ascending: false })
    .limit(1)
    .single();
  if (!letter) return { ok: false, reason: "no_letter" };
  const ltr = letter as Pick<
    DemandLetter,
    | "id"
    | "version"
    | "body_md"
    | "mail_status"
    | "mail_vendor_letter_id"
    | "approval_status"
  >;

  // Idempotency — already mailed.
  if (ltr.mail_vendor_letter_id) {
    return {
      ok: true,
      reason: "already_mailed",
      letterId: ltr.mail_vendor_letter_id,
    };
  }

  // Approval gate — unless admin override, never dispatch a letter the
  // customer hasn't explicitly approved. Inngest delivery + Stripe
  // resends won't sneak past this.
  if (!options.adminOverride && ltr.approval_status !== "approved") {
    console.log(
      `[send-demand-letter] case=${caseId} skipping send: approval_status=${ltr.approval_status}`,
    );
    return { ok: false, reason: "not_approved" };
  }

  if (!ltr.body_md || ltr.body_md.length < 100) {
    return { ok: false, reason: "letter_too_short" };
  }

  // Render the PDF the same way the user-facing download does.
  const pdfBytes = await renderLetterPdf({ body_md: ltr.body_md });

  const result = await createCertifiedLetter({
    to: toPostGridAddress(c.defendant_name, c.defendant_address),
    from: fromOverride,
    pdfBuffer: Buffer.from(pdfBytes),
    description: `Demand letter, ${c.plaintiff_name ?? "plaintiff"} v. ${c.defendant_name}`,
    metadata: {
      case_id: caseId,
      demand_letter_id: ltr.id,
      version: String(ltr.version),
      letterhead: civilcaseLetterhead,
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

  // Notify the owner that the letter is on its way. Best-effort — failures
  // don't block the mail dispatch itself.
  if (c.owner_user_id) {
    const caseName = `${c.plaintiff_name ?? "Plaintiff"} v. ${c.defendant_name}`;
    const link = `/case/${caseId}/letter`;
    const trackingLine = result.trackingNumber
      ? `Tracking number: ${result.trackingNumber}`
      : "Tracking number will appear in your dashboard shortly.";
    await createNotification({
      userId: c.owner_user_id,
      caseId,
      type: "letter_mailed",
      title: "Your demand letter is in the mail",
      body: `${caseName}: dispatched via USPS Certified Mail with return receipt. ${trackingLine}`,
      link,
    });
    // Also email — pulls the owner's auth email server-side.
    const { data: owner } = await admin.auth.admin.getUserById(c.owner_user_id);
    const ownerEmail = owner?.user?.email ?? null;
    if (ownerEmail) {
      await sendEmail({
        to: ownerEmail,
        subject: `Your demand letter is in the mail`,
        text: [
          `Hi,`,
          ``,
          `Your demand letter for ${caseName} has been dispatched via USPS Certified Mail with return receipt.`,
          ``,
          trackingLine,
          ``,
          `You can follow the delivery status from your case dashboard:`,
          `https://civilcase.com${link}`,
          ``,
          `Thanks,`,
          `CivilCase`,
        ].join("\n"),
      });
    }
  }

  // case.status is no longer touched here. Mail state lives on the
  // demand_letters row (mail_status, mail_vendor_letter_id, sent_at) and is
  // surfaced via derive-status-label.

  return { ok: true, letterId: result.id, trackingNumber: result.trackingNumber };
}
