// Generate a demand letter for a case if one doesn't already exist.
// Idempotent and safe to call from the /case/[id]/letter server route or
// from the payment-success flow. Falls back to a no-op if the case is
// missing required intake fields (e.g. someone paid before completing the
// wizard somehow).

import { createServiceRoleClient } from "../supabase/service-role";
import { generateDemandLetter } from "./generate";
import { getCaseClaimType } from "../cases/classify-claim-type";
import { createNotification } from "../notifications";
import { notifyCustomerProductReady } from "../notifications/notify-product-ready";
import { notifyAdminOfResearchFailure } from "../case-research/notify-admin-failure";
import type { Case, DisputeType, PostalAddress } from "../supabase/types";
import type { DemandLetterIntake } from "./types";

interface EnsureResult {
  status: "created" | "existing" | "skipped";
  letterId: string | null;
  reason?: string;
}

// The letter page calls ensureDemandLetter on every load, so a persistent
// generation failure would otherwise alert the team on each refresh. Throttle
// to at most one alert per case per hour (best-effort, per serverless instance).
const ALERT_THROTTLE_MS = 60 * 60 * 1000;
const lastGenFailureAlert = new Map<string, number>();
function shouldAlertGenFailure(caseId: string): boolean {
  const now = Date.now();
  const last = lastGenFailureAlert.get(caseId) ?? 0;
  if (now - last < ALERT_THROTTLE_MS) return false;
  lastGenFailureAlert.set(caseId, now);
  return true;
}

function caseToIntake(c: Case): { intake: DemandLetterIntake | null; missing: string[] } {
  const missing: string[] = [];
  if (!c.plaintiff_name) missing.push("plaintiff_name");
  if (!c.defendant_name) missing.push("defendant_name");
  if (!c.plaintiff_address) missing.push("plaintiff_address");
  if (!c.defendant_address) missing.push("defendant_address");
  if (!c.amount_cents) missing.push("amount_cents");
  if (!c.facts_narrative) missing.push("facts_narrative");
  if (missing.length > 0) {
    return { intake: null, missing };
  }

  const answers = (c.intake_answers ?? {}) as Record<string, unknown>;
  const consent =
    answers.lawsuit_threat_consent === "yes" ||
    answers.lawsuit_threat_consent === "no"
      ? (answers.lawsuit_threat_consent as "yes" | "no")
      : undefined;
  const civilcaseLetterhead =
    answers.civilcase_letterhead === "yes" ||
    answers.civilcase_letterhead === "no"
      ? (answers.civilcase_letterhead as "yes" | "no")
      : undefined;
  const disputeTypeOther =
    typeof answers.dispute_type_other === "string" &&
    answers.dispute_type_other.trim().length > 0
      ? answers.dispute_type_other.trim()
      : undefined;

  return {
    intake: {
      plaintiff_name: c.plaintiff_name!,
      plaintiff_address: c.plaintiff_address as PostalAddress,
      plaintiff_email: c.plaintiff_email ?? "",
      plaintiff_phone: c.plaintiff_phone ?? undefined,
      defendant_name: c.defendant_name!,
      defendant_address: c.defendant_address as PostalAddress,
      state: c.state,
      dispute_type: c.dispute_type as DisputeType,
      amount_cents: c.amount_cents,
      facts_narrative: c.facts_narrative!,
      cure_period_days: 14,
      state_specific_enhanced: false,
      lawsuit_threat_consent: consent,
      civilcase_letterhead: civilcaseLetterhead,
      dispute_type_other: disputeTypeOther,
    },
    missing: [],
  };
}

export async function ensureDemandLetterForCase(
  caseId: string,
  opts: { forceNew?: boolean } = {},
): Promise<EnsureResult> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const { data: existing } = await admin
    .from("demand_letters")
    .select("id, version, approval_status, changes_text, changes_requested_at, body_md")
    .eq("case_id", caseId)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();

  // Default: return the latest existing letter (lazy-generate semantics).
  // forceNew=true: always create a new version. The old version stays in
  // the table for history so a failed LLM call never destroys prior work.
  if (existing?.id && !opts.forceNew) {
    console.log(`[ensureDemandLetter] case=${caseId} existing letter ${existing.id}`);
    return { status: "existing", letterId: existing.id };
  }

  const nextVersion = existing?.version ? existing.version + 1 : 1;

  // Revision mode: when regenerating a letter the customer requested changes
  // on, feed their feedback + the previous letter into the model so the new
  // version actually addresses their comments instead of redrafting blind.
  const revision =
    opts.forceNew &&
    existing?.approval_status === "changes_requested" &&
    typeof existing.changes_text === "string" &&
    existing.changes_text.trim()
      ? {
          customer_feedback: existing.changes_text as string,
          previous_letter_md: (existing.body_md as string) ?? "",
        }
      : undefined;

  const { data: caseRow, error: caseErr } = await admin
    .from("cases")
    .select("*")
    .eq("id", caseId)
    .maybeSingle();
  if (caseErr || !caseRow) {
    console.warn(`[ensureDemandLetter] case=${caseId} not found`, caseErr);
    return { status: "skipped", letterId: null, reason: "case_not_found" };
  }

  const { intake, missing } = caseToIntake(caseRow as Case);
  if (!intake) {
    console.warn(
      `[ensureDemandLetter] case=${caseId} incomplete intake, missing: ${missing.join(", ")}`,
    );
    return {
      status: "skipped",
      letterId: null,
      reason: `incomplete_intake: missing ${missing.join(", ")}`,
    };
  }

  // Resolve the canonical legal claim type(s). getCaseClaimType is cached,
  // so this is a fast lookup if the wizard pre-computed at finish-intake.
  // First-time miss runs a one-shot LLM call; failures degrade gracefully.
  const classification = await getCaseClaimType(caseId);
  if (classification) {
    intake.primary_claim_type = classification.primary_claim_type;
    intake.secondary_claim_types = classification.secondary_claim_types;
  }

  console.log(
    `[ensureDemandLetter] case=${caseId} starting LLM generation${revision ? " (revision from customer feedback)" : ""}`,
  );
  let draft;
  try {
    draft = await generateDemandLetter(intake, revision);
  } catch (err) {
    console.error(`[ensureDemandLetter] case=${caseId} LLM call failed`, err);
    // Alert the team. Otherwise a paid customer whose letter keeps failing to
    // generate just sees "hold tight" on every page load with nobody notified,
    // until they email support. Throttled + never throws.
    if (shouldAlertGenFailure(caseId)) {
      await notifyAdminOfResearchFailure({
        product: "Demand Letter",
        caseId,
        stage: "ensure_letter:generate",
        error: err,
      });
    }
    return { status: "skipped", letterId: null, reason: "llm_call_failed" };
  }

  // Race guard: between the initial existing-check and now, another
  // concurrent call may have inserted a letter for this case (common when
  // the user double-loads /letter while the first generation is in flight).
  // Re-query just before insert so we use the existing row instead of
  // creating a duplicate v1.
  if (!opts.forceNew) {
    const { data: raceWinner } = await admin
      .from("demand_letters")
      .select("id")
      .eq("case_id", caseId)
      .order("version", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (raceWinner?.id) {
      console.log(
        `[ensureDemandLetter] case=${caseId} race winner found ${raceWinner.id}, discarding fresh draft`,
      );
      return { status: "existing", letterId: raceWinner.id };
    }
  }

  const { data: inserted, error: insertErr } = await admin
    .from("demand_letters")
    .insert({
      case_id: caseId,
      version: nextVersion,
      body_md: draft.body_md,
      template_key: draft.template_key,
      generated_by: draft.generated_by,
      mail_status: "draft",
      // A revision draft stays in the changes_requested state (with the
      // feedback carried over for the admin panel) until an admin reviews it
      // and clicks "Mark ready for review" — which flips it to pending and
      // notifies the customer. Prevents an unreviewed AI rewrite from being
      // announced to the customer.
      ...(revision
        ? {
            approval_status: "changes_requested",
            changes_text: existing?.changes_text ?? null,
            changes_requested_at: existing?.changes_requested_at ?? null,
          }
        : {}),
    })
    .select("id")
    .single();

  if (insertErr || !inserted) {
    console.error(`[ensureDemandLetter] case=${caseId} insert failed`, insertErr);
    return { status: "skipped", letterId: null, reason: "insert_failed" };
  }

  console.log(`[ensureDemandLetter] case=${caseId} created letter ${inserted.id}`);

  // Revision drafts are NOT announced to the customer here. The admin reviews
  // the rewrite first; "Mark ready for review" sends the notification + email.
  if (revision) {
    return { status: "created", letterId: inserted.id };
  }

  // Tell the owner their letter is ready for review. Fires for first
  // generation AND every regenerated version, so a customer never has to
  // figure out "is it ready yet?" by polling the page.
  if (caseRow.owner_user_id) {
    const caseName = `${caseRow.plaintiff_name ?? "Plaintiff"} v. ${caseRow.defendant_name ?? "Defendant"}`;
    await createNotification({
      userId: caseRow.owner_user_id,
      caseId,
      type: "letter_ready_for_review",
      title: "Your demand letter is ready for review",
      body: `${caseName}: review the letter and click Approve when you're happy with it. Nothing is mailed until you approve.`,
      link: `/case/${caseId}/letter`,
      actionRequired: true,
    });
  }

  // Also email the customer (the in-app bell only helps if they're logged in
  // and looking). Fires once per generated version, same as the bell above.
  await notifyCustomerProductReady({
    caseId,
    product: "Demand Letter",
    viewPath: `/case/${caseId}/letter`,
    reviewRequired: true,
  });

  return { status: "created", letterId: inserted.id };
}
