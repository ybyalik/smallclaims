// GET  /api/notifications        -> { notifications, unreadCount }
// PATCH /api/notifications        -> mark read; body { ids: string[] | "all" }
//
// Used by the dashboard bell. Auth-required.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import {
  listNotifications,
  markNotificationsRead,
} from "../../../lib/notifications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function requireUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "auth_required" as const };
  return { user };
}

export async function GET() {
  const guard = await requireUser();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: 401 });
  }
  const result = await listNotifications(guard.user.id, 30);
  return NextResponse.json(result);
}

export async function PATCH(req: NextRequest) {
  const guard = await requireUser();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: 401 });
  }
  let body: { ids?: string[] | "all" } = {};
  try {
    body = (await req.json()) as { ids?: string[] | "all" };
  } catch {
    // empty body means "mark all"
  }
  const target = body.ids ?? "all";
  if (target !== "all" && !Array.isArray(target)) {
    return NextResponse.json({ error: "invalid_ids" }, { status: 400 });
  }
  const updated = await markNotificationsRead(guard.user.id, target);
  return NextResponse.json({ ok: true, updated });
}
