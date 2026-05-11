// POST /api/admin/state-research/[slug]/poll
//
// Manually trigger polling for a state's running calls. Useful when an admin
// doesn't want to wait for the 15-minute cron.
//
// Body: optional { "call": 1 | 2 | 3 | 4 } to poll just that call. Default
// polls all four if any are running.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";
import { pollStateResearchCall } from "../../../../../../lib/state-research/orchestrate";
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

  let body: { call?: number } = {};
  try {
    body = (await req.json().catch(() => ({}))) as { call?: number };
  } catch {
    // ignore
  }

  if (body.call === 1 || body.call === 2 || body.call === 3 || body.call === 4) {
    const outcome = await pollStateResearchCall(ctx.params.slug, body.call as StateCallId);
    return NextResponse.json({ ok: true, outcome });
  }

  // Default: poll all 4. Independent so one failure doesn't skip others.
  const calls: StateCallId[] = [1, 2, 3, 4];
  const results = await Promise.all(
    calls.map(async (c) => {
      try {
        const o = await pollStateResearchCall(ctx.params.slug, c);
        return { call: c, ...o };
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { call: c, outcome: "failed" as const, error: msg };
      }
    }),
  );
  return NextResponse.json({ ok: true, results });
}
