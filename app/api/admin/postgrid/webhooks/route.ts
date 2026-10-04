// GET  /api/admin/postgrid/webhooks  -> the webhooks registered at PostGrid
// POST /api/admin/postgrid/webhooks  -> register this site's webhook address
//
// Admin only. Exists so the webhook secret can be read and set as
// POSTGRID_WEBHOOK_SECRET without digging through the PostGrid dashboard.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE = "https://api.postgrid.com/print-mail/v1";

async function requireAdmin(): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, status: 401, error: "auth_required" };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: profile } = await admin.from("profiles").select("is_admin").eq("user_id", user.id).maybeSingle();
  if (!profile?.is_admin) return { ok: false, status: 403, error: "not_admin" };
  return { ok: true };
}

function webhookUrl(): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://civilcase.com").replace(/\/$/, "");
  return `${base}/api/mail/postgrid/webhook`;
}

async function pg(path: string, init: RequestInit = {}): Promise<{ status: number; body: unknown }> {
  const key = process.env.POSTGRID_API_KEY;
  if (!key) return { status: 500, body: { error: "POSTGRID_API_KEY is not set" } };
  const res = await fetch(`${BASE}${path}`, { ...init, headers: { "x-api-key": key, ...(init.headers as Record<string, string> | undefined) } });
  const text = await res.text();
  let body: unknown = text;
  try {
    body = JSON.parse(text);
  } catch {
    /* keep text */
  }
  return { status: res.status, body };
}

export async function GET() {
  const g = await requireAdmin();
  if (!g.ok) return NextResponse.json({ error: g.error }, { status: g.status });
  const r = await pg("/webhooks?limit=50");
  return NextResponse.json({ expectedUrl: webhookUrl(), postgrid: r.body }, { status: r.status === 200 ? 200 : 502 });
}

export async function POST(_req: NextRequest) {
  const g = await requireAdmin();
  if (!g.ok) return NextResponse.json({ error: g.error }, { status: g.status });
  const form = new URLSearchParams();
  form.set("url", webhookUrl());
  form.set("description", "CivilCase letter status updates");
  form.set("payloadFormat", "json");
  for (const ev of ["letter.created", "letter.updated"]) form.append("enabledEvents[]", ev);
  const r = await pg("/webhooks", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: form.toString() });
  return NextResponse.json({ expectedUrl: webhookUrl(), postgrid: r.body }, { status: r.status === 200 || r.status === 201 ? 200 : 502 });
}
