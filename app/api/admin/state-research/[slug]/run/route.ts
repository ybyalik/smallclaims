// POST /api/admin/state-research/[slug]/run
//
// Kicks off state-level deep research for one state.
//
// Body:
//   { "call": 1 | 2 | 3 | 4 }                  -> run just that call
//   { "call": "all" }                           -> run all four in parallel
//   { "call": 1, "via": "batch" }              -> run via Batch API (50% off
//                                                  tokens, up to 24h SLA)
//   { "call": 1, "via": "background" }         -> default; ~30 min SLA, full
//                                                  price
//
// Each call records its 'via' mode in call_N_via so the poller knows which
// path to use (response_id vs. batch_id).

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";
import {
  startAllStateResearch,
  startStateResearchCall,
  type SubmitMode,
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

  let body: { call?: number | "all"; via?: string };
  try {
    body = (await req.json()) as { call?: number | "all"; via?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const via: SubmitMode = body.via === "batch" ? "batch" : "background";

  // Audit log: every submission attempt gets a line so we can correlate
  // duplicate OpenAI responses with our server invocations.
  console.log(
    JSON.stringify({
      tag: "state-research.run",
      ts: new Date().toISOString(),
      slug: ctx.params.slug,
      call: body.call,
      via,
      ua: req.headers.get("user-agent")?.slice(0, 120) ?? "",
      ip:
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        req.headers.get("x-real-ip") ||
        "",
    }),
  );

  if (body.call === "all") {
    const r = await startAllStateResearch(ctx.params.slug, via);
    return NextResponse.json(r, { status: r.ok ? 200 : 502 });
  }

  if (body.call === 1 || body.call === 2 || body.call === 3 || body.call === 4) {
    const r = await startStateResearchCall(ctx.params.slug, body.call as StateCallId, via);
    return NextResponse.json(r, { status: r.ok ? 200 : 502 });
  }

  return NextResponse.json({ error: "call must be 1, 2, 3, 4, or 'all'" }, { status: 400 });
}
