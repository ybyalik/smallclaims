import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/cases/[id]/response
//   body: { state: "pending" | "responded" | "no_response" | "partial_offer" }
//
// Saves the user's record of how the defendant responded to the demand
// letter. Stored in cases.intake_answers.demand_response so we don't need a
// schema migration. Owner-of-case auth required.

const VALID_STATES = ["pending", "responded", "no_response", "partial_offer"] as const;
type ResponseState = (typeof VALID_STATES)[number];

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  let body: { state?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  if (
    !body.state ||
    typeof body.state !== "string" ||
    !VALID_STATES.includes(body.state as ResponseState)
  ) {
    return NextResponse.json(
      { error: "invalid_state", message: `state must be one of: ${VALID_STATES.join(", ")}` },
      { status: 400 },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createServiceRoleClient() as any;
  const { data: caseRow, error: loadErr } = await db
    .from("cases")
    .select("id, owner_user_id, intake_answers, status")
    .eq("id", params.id)
    .maybeSingle();
  if (loadErr || !caseRow || caseRow.owner_user_id !== user.id) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const recordedAt = new Date().toISOString();
  const nextState = body.state as ResponseState;
  const existingAnswers = (caseRow.intake_answers as Record<string, unknown> | null) ?? {};

  const updatedAnswers = {
    ...existingAnswers,
    demand_response:
      nextState === "pending"
        ? null
        : {
            state: nextState,
            recorded_at: recordedAt,
          },
  };

  // Promote the response into a lifecycle change when the user marks "they
  // paid or settled". Reverting that response (back to pending, or to one
  // of the non-settled states) brings the case back to "active". We do NOT
  // touch case.status for "closed" cases because closing is a separate,
  // explicit user action — the response tracker shouldn't override it.
  const currentStatus = caseRow.status as string;
  let nextStatus: string | null = null;
  if (nextState === "responded" && currentStatus !== "settled" && currentStatus !== "closed") {
    nextStatus = "settled";
  } else if (nextState !== "responded" && currentStatus === "settled") {
    nextStatus = "active";
  }

  const update: Record<string, unknown> = { intake_answers: updatedAnswers };
  if (nextStatus) update.status = nextStatus;

  const { error: updateErr } = await db
    .from("cases")
    .update(update)
    .eq("id", params.id);
  if (updateErr) {
    console.error("[cases/response]", updateErr);
    return NextResponse.json({ error: "update_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, state: nextState, recorded_at: recordedAt });
}
