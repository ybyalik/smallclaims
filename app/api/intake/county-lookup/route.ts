// POST /api/intake/county-lookup
//
// Used by the wizard to derive a county from a plaintiff/defendant/incident
// address while the user is still filling out the form. No auth requirement
// (anonymous wizard support); this is a thin proxy to the public Census
// Bureau geocoder so callers don't need to know about it client-side.
//
// Request body: { line1?, city?, state?, zip?, oneline? }
// Response:     { county, state, countyFips, matchedAddress, source } | { ok: false }

import { NextResponse, type NextRequest } from "next/server";
import { lookupCounty } from "../../../../lib/intake/county-lookup";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: {
    line1?: string;
    city?: string;
    state?: string;
    zip?: string;
    oneline?: string;
  };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  try {
    const result = await lookupCounty(body);
    if (!result) {
      return NextResponse.json({ ok: false, reason: "no_match" });
    }
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    console.error("[county-lookup]", e);
    return NextResponse.json({ ok: false, error: "lookup_failed" }, { status: 500 });
  }
}
