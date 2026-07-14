import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { searchEntities } from "../../../lib/sos-lookup";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Cobalt does live SOS-website scraping per request; first-time lookups can
// take 30-45s. Without this, Vercel's default 10s timeout (and similar
// envs) would kill the request before Cobalt responds.
export const maxDuration = 60;

// POST /api/sos-lookup
//   body: { name: string, state?: string, limit?: number }
//   returns: EntitySearchResult
//
// Auth-required so we don't burn anonymous quota and can rate-limit by user
// later if needed.

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  let body: { name?: string; state?: string; limit?: number };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
    return NextResponse.json(
      { error: "name_required", message: "Provide at least 2 characters." },
      { status: 400 },
    );
  }
  const state = body.state && /^[A-Z]{2}$/i.test(body.state) ? body.state.toUpperCase() : undefined;

  try {
    const result = await searchEntities({
      name: body.name,
      state,
      limit: body.limit,
    });
    return NextResponse.json(result);
  } catch (e) {
    // Business lookup is a convenience, never a hard dependency. Degrade to an
    // empty result rather than surfacing a 500 to the customer.
    console.error("[sos-lookup] searchEntities failed", e);
    return NextResponse.json({ matches: [], is_authoritative: false, provider: null });
  }
}
