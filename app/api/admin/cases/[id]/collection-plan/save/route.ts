// POST /api/admin/cases/[id]/collection-plan/save
//
// Admin-only. Replaces the body_html of the latest collection_plans row so
// the admin can hand-edit a generated plan before the customer reads it.
// body_md is preserved as the original markdown source from generation;
// body_html is what TipTap edits and what the customer view reads.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../../lib/supabase/service-role";

export const runtime = "nodejs";

async function requireAdmin() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "auth_required" as const };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: profile } = await admin
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!profile?.is_admin) return { error: "not_admin" as const };
  return { user, admin };
}

export async function POST(req: NextRequest, ctx: { params: { id: string } }) {
  const guard = await requireAdmin();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: 403 });
  }
  const { admin } = guard;

  let body: { body_html?: string; body_md?: string };
  try {
    body = (await req.json()) as { body_html?: string; body_md?: string };
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const html = typeof body.body_html === "string" ? body.body_html : null;
  const md = typeof body.body_md === "string" ? body.body_md : null;
  if (!html && !md) {
    return NextResponse.json(
      { error: "must include body_html or body_md" },
      { status: 400 },
    );
  }
  if (html && html.trim().length < 50) {
    return NextResponse.json(
      { error: "body_html must be at least 50 characters" },
      { status: 400 },
    );
  }

  const { data: latest } = await admin
    .from("collection_plans")
    .select("id")
    .eq("case_id", ctx.params.id)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!latest?.id) {
    return NextResponse.json({ error: "no_plan_to_edit" }, { status: 404 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update: Record<string, any> = {
    status: "ready",
    updated_at: new Date().toISOString(),
  };
  if (html) update.body_html = html;
  if (md) update.body_md = md;

  const { error } = await admin
    .from("collection_plans")
    .update(update)
    .eq("id", latest.id);
  if (error) {
    console.error("[admin/collection-plan/save] update failed", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, planId: latest.id });
}
