// Customer-facing "your <product> is ready" email. Sent once, at the moment a
// purchased deliverable first becomes viewable (Filing Kit report published,
// Collection Plan generated, etc.). Callers must invoke this only on the
// first-publish transition so the buyer isn't emailed twice.
//
// Never throws — a notification failure must not roll back a successful
// generation. If we can't find an address to send to, we log and move on.

import { createServiceRoleClient } from "../supabase/service-role";
import { sendEmail } from "../resend";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface NotifyInput {
  caseId: string;
  // Human product name, e.g. "Filing Kit" or "Collection Plan".
  product: string;
  // Customer-facing path to view the deliverable, e.g. "/case/<id>/file".
  viewPath: string;
  // When true, the deliverable needs the customer's review/approval before
  // anything happens (the demand letter: nothing is mailed until they
  // approve). Switches the copy from "ready to view" to "ready to review".
  reviewRequired?: boolean;
}

export async function notifyCustomerProductReady(input: NotifyInput): Promise<void> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const admin = createServiceRoleClient() as any;

    const { data: caseRow } = await admin
      .from("cases")
      .select("id, owner_user_id, plaintiff_name, plaintiff_email")
      .eq("id", input.caseId)
      .maybeSingle();
    if (!caseRow) {
      console.warn("[notify-product-ready] case not found", input.caseId);
      return;
    }

    // Prefer the email entered on the case; fall back to the account email.
    let to = (caseRow.plaintiff_email as string | null) || "";
    if (!to && caseRow.owner_user_id) {
      try {
        const { data } = await admin.auth.admin.getUserById(caseRow.owner_user_id);
        to = (data?.user?.email as string | undefined) || "";
      } catch {
        /* ignore — fall through to the no-address guard */
      }
    }
    if (!to) {
      console.warn("[notify-product-ready] no email on file for case", input.caseId);
      return;
    }

    const base = process.env.NEXT_PUBLIC_SITE_URL || "https://civilcase.com";
    const url = `${base}${input.viewPath}`;
    const firstName = ((caseRow.plaintiff_name as string | null) || "")
      .trim()
      .split(/\s+/)[0];
    const hi = firstName ? `Hi ${firstName},` : "Hi,";
    // Customer-supplied name must be escaped before going into HTML.
    const hiHtml = firstName ? `Hi ${escapeHtml(firstName)},` : "Hi,";

    const readyLine = input.reviewRequired
      ? `Your ${input.product} is ready to review.`
      : `Your ${input.product} is ready to view.`;
    const ctaLabel = input.reviewRequired
      ? `Review your ${input.product}`
      : `View your ${input.product}`;
    const followUp = input.reviewRequired
      ? "Read it over and approve it when you're happy. Nothing is sent until you approve."
      : "You can sign in any time to read it, download it, or pick up where you left off.";

    const text = `${hi}

${readyLine}

Open it here:
${url}

${followUp}

— CivilCase

CivilCase is not a law firm and does not provide legal advice.`;

    const html = `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #0e0e0e;">
        <p style="font-size: 15px; line-height: 1.5;">${hiHtml}</p>
        <p style="font-size: 15px; line-height: 1.5;">${readyLine.replace(input.product, `<strong>${input.product}</strong>`)}</p>
        <p style="margin: 24px 0;">
          <a href="${url}" style="background: #0e0e0e; color: #fff; text-decoration: none; padding: 13px 22px; border-radius: 8px; font-size: 14px; display: inline-block;">${ctaLabel}</a>
        </p>
        <p style="font-size: 14px; line-height: 1.5; color: #4b4b4b;">${followUp}</p>
        <p style="font-size: 12px; line-height: 1.5; color: #9b9b9b; margin-top: 28px;">CivilCase is not a law firm and does not provide legal advice.</p>
      </div>
    `;

    await sendEmail({
      to,
      subject: input.reviewRequired
        ? `Your ${input.product} is ready to review`
        : `Your ${input.product} is ready`,
      text,
      html,
    });
  } catch (err) {
    console.warn("[notify-product-ready] failed to send:", err);
  }
}
