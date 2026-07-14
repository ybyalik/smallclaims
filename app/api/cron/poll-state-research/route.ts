// GET /api/cron/poll-state-research
//
// Polls every state_research row that has any call in 'running' status, checks
// OpenAI for completion, and persists the markdown + metadata when done. Each
// of the four calls per state is independent — one failure doesn't affect
// the others.
//
// Schedule: every 5 minutes via vercel.json.
//
// Authentication: gated on CRON_SECRET (Vercel Cron sends it as
// Authorization: Bearer <secret>), so random internet callers can't trigger
// OpenAI polling on our account.

import { NextResponse, type NextRequest } from "next/server";
import { pollAllRunningStateResearch } from "../../../../lib/state-research/orchestrate";

export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return NextResponse.json({ error: "CRON_SECRET not set" }, { status: 500 });
  }
  if ((req.headers.get("authorization") || "") !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const results = await pollAllRunningStateResearch();
    return NextResponse.json({ ok: true, count: results.length, results });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[cron poll-state-research]", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
