import { NextResponse, type NextRequest } from "next/server";
import { loadOwnedCase } from "../../../../lib/demand-letter/access";
import { createClient } from "../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";
import { classificationInputsChanged } from "../../../../lib/cases/classify-claim-type";

/**
 * PATCH /api/demand-letters/[id]
 *
 * Generic save endpoint for the wizard. Accepts a subset of case fields
 * and writes them. Validation happens here for known fields. Anything
 * the wizard wants to track that doesn't have a column goes in
 * intake_answers (JSONB).
 */
export async function PATCH(req: NextRequest, ctx: { params: { id: string } }) {
  const caseRow = await loadOwnedCase(ctx.params.id);
  if (!caseRow) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Whitelist of writable fields. Reject anything else to avoid privilege
  // escalation (no setting owner_user_id, status, cookie_session_id, etc.).
  const ALLOWED = new Set([
    "state",
    "county",
    "dispute_type",
    "amount_cents",
    "plaintiff_name",
    "plaintiff_address",
    "plaintiff_county",
    "plaintiff_email",
    "plaintiff_phone",
    "defendant_name",
    "defendant_address",
    "defendant_county",
    "defendant_email",
    "defendant_phone",
    "incident_county",
    "facts_narrative",
    "intake_answers",
  ]);

  const update: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(body)) {
    if (ALLOWED.has(k)) update[k] = v;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No writable fields" }, { status: 400 });
  }

  // If any input that drives the legal-claim-type classifier changed, drop
  // the cached classification BEFORE merging so the next reader re-classifies
  // from the new facts.
  const invalidateClassification = classificationInputsChanged(
    {
      dispute_type: caseRow.dispute_type,
      facts_narrative: caseRow.facts_narrative,
      intake_answers: caseRow.intake_answers as Record<string, unknown> | null,
    },
    {
      dispute_type: update.dispute_type as string | undefined,
      facts_narrative: update.facts_narrative as string | undefined,
      intake_answers: update.intake_answers as Record<string, unknown> | undefined,
    },
  );

  // Merge intake_answers rather than replace, so each step can patch its slice
  if (update.intake_answers && typeof update.intake_answers === "object") {
    const existingAnswers = (caseRow.intake_answers ?? {}) as Record<string, unknown>;
    const merged: Record<string, unknown> = {
      ...existingAnswers,
      ...(update.intake_answers as Record<string, unknown>),
    };
    if (invalidateClassification) {
      delete merged.case_classification;
    }
    update.intake_answers = merged;
  } else if (invalidateClassification) {
    // Non-intake_answers field (e.g. facts_narrative) drove the invalidation.
    // Rebuild intake_answers without the classification.
    const existingAnswers = { ...((caseRow.intake_answers ?? {}) as Record<string, unknown>) };
    delete existingAnswers.case_classification;
    update.intake_answers = existingAnswers;
  }

  const db = createServiceRoleClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (db as any)
    .from("cases")
    .update({ ...update, updated_at: new Date().toISOString() })
    .eq("id", ctx.params.id);

  if (error) {
    console.error("[demand-letter PATCH]", error);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }

  // If the visitor is still anonymous and just supplied an email in the
  // Plaintiff step, stash it on their user_metadata so we know who to
  // upgrade them into at first checkout. Best-effort; failures here are
  // not fatal to the save.
  if (typeof update.plaintiff_email === "string" && update.plaintiff_email) {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const isAnon = (user as { is_anonymous?: boolean } | null)?.is_anonymous === true;
      const pending = (user?.user_metadata as { email_pending_claim?: string } | undefined)?.email_pending_claim;
      if (isAnon && pending !== update.plaintiff_email) {
        await supabase.auth.updateUser({
          data: { email_pending_claim: update.plaintiff_email },
        });
      }
    } catch (e) {
      console.error("[demand-letter PATCH] stash pending email failed", e);
    }
  }

  return NextResponse.json({ ok: true });
}
