import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { searchEntities } from "../../../lib/sos-lookup";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  const result = await searchEntities({
    name: body.name,
    state,
    limit: body.limit,
  });

  return NextResponse.json(result);
}
