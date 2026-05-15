// POST /api/cases/[id]/lifecycle
//   body: { action: "close" | "reopen", reason?: string }
//
// Manual lifecycle action for the case owner. "close" sets case.status to
// "closed" and stores an optional free-text reason on intake_answers.
// "reopen" sets it back to "active" and clears the reason. Owner-of-case
// auth required. Admins can also call this on any case.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  let body: { action?: string; reason?: string };
  try {
    body = (await req.json()) as { action?: string; reason?: string };
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  if (body.action !== "close" && body.action !== "reopen") {
    return NextResponse.json(
      { error: "invalid_action", message: 'action must be "close" or "reopen"' },
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
  if (loadErr || !caseRow) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  // Owner OR admin can take lifecycle actions.
  let isAdmin = false;
  if (caseRow.owner_user_id !== user.id) {
    const { data: profile } = await db
      .from("profiles")
      .select("is_admin")
      .eq("user_id", user.id)
      .maybeSingle();
    isAdmin = !!profile?.is_admin;
    if (!isAdmin) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
  }

  const existingAnswers = (caseRow.intake_answers as Record<string, unknown> | null) ?? {};
  const update: Record<string, unknown> = {};

  if (body.action === "close") {
    update.status = "closed";
    const reason = typeof body.reason === "string" ? body.reason.trim().slice(0, 500) : "";
    update.intake_answers = {
      ...existingAnswers,
      closed_at: new Date().toISOString(),
      closed_reason: reason || null,
      closed_by: isAdmin ? "admin" : "owner",
    };
  } else {
    // reopen → back to active, clear the close metadata
    update.status = "active";
    const next = { ...existingAnswers };
    delete next.closed_at;
    delete next.closed_reason;
    delete next.closed_by;
    update.intake_answers = next;
  }

  const { error: updateErr } = await db
    .from("cases")
    .update(update)
    .eq("id", params.id);
  if (updateErr) {
    console.error("[cases/lifecycle]", updateErr);
    return NextResponse.json({ error: "update_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, status: update.status });
}
