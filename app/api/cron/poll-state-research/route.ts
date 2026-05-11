// GET /api/cron/poll-state-research
//
// Polls every state_research row that has any call in 'running' status, checks
// OpenAI for completion, and persists the markdown + metadata when done. Each
// of the four calls per state is independent — one failure doesn't affect
// the others.
//
// Schedule: every 5 minutes via vercel.json.
//
// Authentication: open to any caller. The work is idempotent — re-running
// hits OpenAI for known polling response IDs.

import { NextResponse, type NextRequest } from "next/server";
import { pollAllRunningStateResearch } from "../../../../lib/state-research/orchestrate";

export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  try {
    const results = await pollAllRunningStateResearch();
    return NextResponse.json({ ok: true, count: results.length, results });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[cron poll-state-research]", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
