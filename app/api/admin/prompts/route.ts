// POST /api/admin/prompts
//
// Save a new version of a prompt template. The new row is inserted with
// is_active=true and version=max(version)+1; the previous active row for
// the same (key, role) is flipped to is_active=false. Older versions are
// kept in the table for audit history.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";

export const runtime = "nodejs";

const VALID_KEYS = new Set(["demand_letter"]);
const VALID_ROLES = new Set(["system", "user_template"]);
const MAX_BODY = 50_000;
const MAX_NOTES = 500;

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

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: 403 });
  }
  const { user, admin } = guard;

  let body: {
    key?: unknown;
    role?: unknown;
    body?: unknown;
    notes?: unknown;
  };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const key = typeof body.key === "string" ? body.key : "";
  const role = typeof body.role === "string" ? body.role : "";
  const promptBody = typeof body.body === "string" ? body.body : "";
  const notes =
    typeof body.notes === "string" ? body.notes.trim().slice(0, MAX_NOTES) : null;

  if (!VALID_KEYS.has(key)) {
    return NextResponse.json({ error: "Invalid prompt key" }, { status: 400 });
  }
  if (!VALID_ROLES.has(role)) {
    return NextResponse.json({ error: "Invalid prompt role" }, { status: 400 });
  }
  if (!promptBody.trim() || promptBody.length > MAX_BODY) {
    return NextResponse.json({ error: "Body required (and under 50k chars)" }, { status: 400 });
  }

  // Find current max version for this key+role
  const { data: latest } = await admin
    .from("prompt_templates")
    .select("version")
    .eq("key", key)
    .eq("role", role)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextVersion = ((latest?.version as number | undefined) ?? 0) + 1;

  // Flip any currently-active row for this key+role to is_active=false
  await admin
    .from("prompt_templates")
    .update({ is_active: false })
    .eq("key", key)
    .eq("role", role)
    .eq("is_active", true);

  // Insert the new active version
  const { data: inserted, error: insertErr } = await admin
    .from("prompt_templates")
    .insert({
      key,
      role,
      body: promptBody,
      version: nextVersion,
      is_active: true,
      notes,
      created_by: user.id,
    })
    .select("id, version")
    .single();

  if (insertErr || !inserted) {
    console.error("[admin/prompts] insert failed", insertErr);
    return NextResponse.json(
      { error: insertErr?.message ?? "Insert failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    id: inserted.id,
    version: inserted.version,
  });
}
