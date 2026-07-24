// POST /api/admin/winback/templates
// body: { step, delay_days, subject, body_html, enabled }
//
// Admin-only. Upserts one winback sequence step. Saving is what makes a step
// real: the cron only sends steps that have a saved row with enabled = true.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "auth_required" }, { status: 401 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: profile } = await admin
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!profile?.is_admin) return NextResponse.json({ error: "not_admin" }, { status: 403 });

  let body: {
    step?: unknown;
    delay_days?: unknown;
    subject?: unknown;
    body_html?: unknown;
    enabled?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const step = Number(body.step);
  const delayDays = Number(body.delay_days);
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const bodyHtml = typeof body.body_html === "string" ? body.body_html.trim() : "";
  const enabled = body.enabled === true;

  if (!Number.isInteger(step) || step < 1 || step > 20) {
    return NextResponse.json({ error: "invalid_step" }, { status: 400 });
  }
  if (!Number.isInteger(delayDays) || delayDays < 1 || delayDays > 365) {
    return NextResponse.json({ error: "invalid_delay" }, { status: 400 });
  }
  if (!subject || !bodyHtml) {
    return NextResponse.json({ error: "subject_and_body_required" }, { status: 400 });
  }
  // Every winback email must carry the opt-out link (CAN-SPAM). Refuse to save
  // a body that lost it during editing.
  if (!bodyHtml.includes("{{unsubscribe_url}}")) {
    return NextResponse.json(
      {
        error: "missing_unsubscribe",
        message: "The body must include the {{unsubscribe_url}} link (required by email law).",
      },
      { status: 400 },
    );
  }

  const { error } = await admin.from("winback_templates").upsert(
    {
      step,
      delay_days: delayDays,
      subject,
      body_html: bodyHtml,
      enabled,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "step" },
  );
  if (error) {
    console.error("[admin/winback] save failed:", error);
    return NextResponse.json(
      {
        error: "save_failed",
        message: error.message?.includes("does not exist")
          ? "The winback tables haven't been created yet — run the 2026-07-24_winback.sql migration first."
          : "Could not save. Check the server logs.",
      },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
