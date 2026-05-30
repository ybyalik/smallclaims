// Alert the team when an AI-generated product run fails (Filing Kit research,
// Collection Plan generation, etc.), so an admin can fix the underlying issue
// and re-run for the customer. There is intentionally NO customer-facing
// fallback: the buyer stays on a status screen until a healthy result is ready.
//
// Sends to ADMIN_NOTIFICATIONS_EMAIL (comma-separated allowed). Never throws —
// a notification failure must not mask the original error in the pipeline.

import { sendEmail } from "../resend";

export async function notifyAdminOfResearchFailure(input: {
  caseId: string;
  jobId?: string | null;
  stage: string;
  error: unknown;
  // Human label for the product that failed, e.g. "Filing Kit research"
  // or "Collection Plan". Defaults to the Filing Kit wording.
  product?: string;
}): Promise<void> {
  const product = input.product ?? "Filing Kit research";
  try {
    const recipients = (process.env.ADMIN_NOTIFICATIONS_EMAIL ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (recipients.length === 0) {
      console.warn(
        "[notify-admin-failure] ADMIN_NOTIFICATIONS_EMAIL not set; skipping email.",
        { caseId: input.caseId, jobId: input.jobId, stage: input.stage },
      );
      return;
    }
    const base = process.env.NEXT_PUBLIC_SITE_URL || "https://civilcase.com";
    const msg = input.error instanceof Error ? input.error.message : String(input.error);
    for (const to of recipients) {
      await sendEmail({
        to,
        subject: `[CivilCase] ${product} failed — case ${input.caseId}`,
        text: `A ${product} run failed and the customer is still waiting.

Case:  ${input.caseId}
Job:   ${input.jobId ?? "n/a"}
Stage: ${input.stage}
Error: ${msg}

Review and re-run from the admin case page:
${base}/admin/cases/${input.caseId}

The customer sees only a status screen; they are not shown any error.`,
      });
    }
  } catch (err) {
    console.warn("[notify-admin-failure] failed to send alert:", err);
  }
}
