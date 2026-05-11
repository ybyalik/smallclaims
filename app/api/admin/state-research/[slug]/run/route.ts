// POST /api/admin/state-research/[slug]/run
//
// Kicks off state-level deep research for one state.
//
// Body:
//   { "call": 1 | 2 | 3 | 4 }   -> run just that call
//   { "call": "all" }            -> run all four in parallel
//
// Each call submits to OpenAI in background mode and returns a response ID
// instantly. The actual research runs for ~10-30 minutes; the polling cron
// (or admin manual poll) picks up the completion.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";
import {
  startAllStateResearch,
  startStateResearchCall,
} from "../../../../../../lib/state-research/orchestrate";
import type { StateCallId } from "../../../../../../lib/state-research/prompts";

export const runtime = "nodejs";
export const maxDuration = 60;

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
  return { user };
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

  let body: { call?: number | "all" };
  try {
    body = (await req.json()) as { call?: number | "all" };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.call === "all") {
    const r = await startAllStateResearch(ctx.params.slug);
    return NextResponse.json(r, { status: r.ok ? 200 : 502 });
  }

  if (body.call === 1 || body.call === 2 || body.call === 3 || body.call === 4) {
    const r = await startStateResearchCall(ctx.params.slug, body.call as StateCallId);
    return NextResponse.json(r, { status: r.ok ? 200 : 502 });
  }

  return NextResponse.json({ error: "call must be 1, 2, 3, 4, or 'all'" }, { status: 400 });
}
