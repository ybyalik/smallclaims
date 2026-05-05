import { NextResponse, type NextRequest } from "next/server";
import { loadOwnedCase } from "../../../../lib/demand-letter/access";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";

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

  // Merge intake_answers rather than replace, so each step can patch its slice
  if (update.intake_answers && typeof update.intake_answers === "object") {
    const merged = {
      ...(caseRow.intake_answers ?? {}),
      ...(update.intake_answers as Record<string, unknown>),
    };
    update.intake_answers = merged;
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

  return NextResponse.json({ ok: true });
}
