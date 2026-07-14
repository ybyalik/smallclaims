// POST /api/demand-letter/generate — DISABLED.
//
// This was an early MVP endpoint that drafted a letter via OpenRouter and
// created a brand-new case + demand_letter row on every request, for any
// signed-in (or anonymous) session, with no payment check, no rate limit, and
// no dedupe. No page in the app calls it anymore — the live wizard uses
// /api/demand-letters/start plus lazy generation on the paid letter page.
//
// Left enabled it was an abuse vector: a visitor could loop it to run up the
// OpenRouter bill and fill the database with junk cases, and it was the entry
// point for the "free certified mail" path. Disabled to close all of that.

import { NextResponse, type NextRequest } from "next/server";

export async function POST(_req: NextRequest) {
  return NextResponse.json(
    { error: "This endpoint is no longer available." },
    { status: 410 },
  );
}
