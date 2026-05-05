import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";

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

const SLUG_RE = /^[a-z][a-z0-9-]+$/;

export async function POST(req: NextRequest, ctx: { params: { slug: string } }) {
  if (!SLUG_RE.test(ctx.params.slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }
  const guard = await requireAdmin();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: 403 });
  }

  let body: { markdown?: string };
  try {
    body = (await req.json()) as { markdown?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (typeof body.markdown !== "string" || body.markdown.length < 1) {
    return NextResponse.json({ error: "Empty markdown" }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = guard.admin as any;
  const { error } = await admin
    .from("research_overrides")
    .upsert({
      slug: ctx.params.slug,
      markdown: body.markdown,
      updated_at: new Date().toISOString(),
      updated_by: guard.user.id,
    });
  if (error) {
    console.error("[research save]", error);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, ctx: { params: { slug: string } }) {
  const guard = await requireAdmin();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: 403 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = guard.admin as any;
  await admin.from("research_overrides").delete().eq("slug", ctx.params.slug);
  return NextResponse.json({ ok: true });
}
