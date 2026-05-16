import { createServiceRoleClient } from "../supabase/service-role";
import { inngest } from "../inngest/client";

interface MarkCasePaidResult {
  alreadyPaid: boolean;
  jobId: string | null;
  jobVersion: number | null;
  researchTriggered: boolean;
}

/**
 * Idempotent post-payment hook for the demand letter product.
 *
 * Records the payment side-effects (currently: nothing else needed) and
 * deliberately does NOT auto-fire the PostGrid mail event. Mailing is gated
 * behind explicit customer approval at /case/[id]/letter — the approve
 * endpoint is what fires `case/letter.send` once the user has reviewed the
 * generated letter.
 *
 * Safe to call from any payment success path (Stripe webhook, admin bypass,
 * inline PaymentIntent confirm).
 */
export async function markCasePaid(
  caseId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _opts: { source: "stripe_webhook" | "admin_bypass" | "inline_confirm" },
): Promise<MarkCasePaidResult> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const { data: caseRow } = await admin
    .from("cases")
    .select("id")
    .eq("id", caseId)
    .single();
  if (!caseRow) {
    throw new Error(`markCasePaid: case ${caseId} not found`);
  }

  // Has the letter already been mailed? Reported back for callers (admin
  // bypass UI uses it to suppress a "trigger send" prompt).
  const { data: latestLetter } = await admin
    .from("demand_letters")
    .select("mail_vendor_letter_id")
    .eq("case_id", caseId)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();
  const alreadyMailed = !!latestLetter?.mail_vendor_letter_id;

  // Research is intentionally NOT auto-enqueued either. While we're iterating
  // on the pipeline, an admin clicks "Run research" / "Re-run research" on
  // the case page. Re-enable here once the pipeline is stable.
  return {
    alreadyPaid: alreadyMailed,
    jobId: null,
    jobVersion: null,
    researchTriggered: false,
  };
}

interface EnqueueResult {
  enqueued: boolean;
  jobId: string | null;
  version: number | null;
  reason?: string;
}

/**
 * Insert a queued case_research_jobs row and emit the Inngest event.
 *
 * - force=false: skip if a non-failed job already exists for this case.
 * - force=true:  always insert a new row at version = max(version) + 1.
 */
export async function enqueueCaseResearch(
  caseId: string,
  opts: { force: boolean; source: string },
): Promise<EnqueueResult> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const { data: existing } = await admin
    .from("case_research_jobs")
    .select("id, version, status")
    .eq("case_id", caseId)
    .order("version", { ascending: false });

  if (!opts.force && existing && existing.length > 0) {
    const latest = existing[0];
    if (latest.status !== "failed" && latest.status !== "canceled") {
      return {
        enqueued: false,
        jobId: latest.id,
        version: latest.version,
        reason: "job_already_exists",
      };
    }
  }

  const nextVersion = existing && existing.length > 0 ? existing[0].version + 1 : 1;
  const idempotencyKey = `case_research:${caseId}:v${nextVersion}`;

  const { data: inserted, error } = await admin
    .from("case_research_jobs")
    .insert({
      case_id: caseId,
      version: nextVersion,
      status: "queued",
      idempotency_key: idempotencyKey,
      model_versions: { source: opts.source },
    })
    .select("id, version")
    .single();
  if (error || !inserted) {
    throw new Error(`enqueueCaseResearch: insert failed: ${error?.message ?? "unknown"}`);
  }

  await inngest.send({
    name: "case/intake.paid",
    id: idempotencyKey,
    data: { caseId, jobId: inserted.id, version: inserted.version },
  });

  return { enqueued: true, jobId: inserted.id, version: inserted.version };
}
