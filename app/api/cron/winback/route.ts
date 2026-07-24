// GET /api/cron/winback
//
// Daily winback sweep: emails people who started a case (email on file) but
// never paid, following the sequence configured at /admin/winback. All the
// eligibility / idempotency / opt-out logic lives in lib/winback/run.
//
// Triggered by Vercel Cron (vercel.json). Protected by CRON_SECRET, matching
// the other cron routes.

import { NextRequest, NextResponse } from "next/server";
import { runWinback } from "../../../../lib/winback/run";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(req: NextRequest) {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return NextResponse.json({ error: "CRON_SECRET not set" }, { status: 500 });
  }
  if ((req.headers.get("authorization") || "") !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const result = await runWinback();
  return NextResponse.json(result);
}
