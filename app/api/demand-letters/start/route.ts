import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { createClient } from "../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";

const COOKIE_NAME = "cc_dl_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/**
 * POST /api/demand-letters/start
 *
 * Anonymous-entry handler for the demand-letter wizard.
 *
 * Behavior:
 *   - If the request is authenticated, create a draft case attached to the user.
 *   - If anonymous, set a long-lived signed cookie (cc_dl_session) and create a
 *     draft case scoped to that session id. The case is claimed by the user
 *     when they sign up at Phase 5 (Pay).
 *
 * Returns: { case_id } on success.
 */
export async function POST() {
  const cookieStore = cookies();

  // Auth path: if user is logged in, create the case directly under their id
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Use service-role for the DB write so RLS doesn't bite us in either path
  const db = createServiceRoleClient();

  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (db as any)
      .from("cases")
      .insert({
        owner_user_id: user.id,
        status: "draft",
        // placeholders; the wizard fills these in over phases 1-4
        state: "CA",
        dispute_type: "other",
        amount_cents: 0,
        intake_version: 2, // bump for the new wizard
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error("[demand-letter/start auth path]", error);
      return NextResponse.json({ error: "Failed to start" }, { status: 500 });
    }

    return NextResponse.json({ case_id: data.id, claimed: true });
  }

  // Anonymous path: get-or-create cookie session id
  const existing = cookieStore.get(COOKIE_NAME)?.value;
  let sessionId = existing;

  if (sessionId) {
    // Reuse the most recent draft for this session if one exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existingCase } = await (db as any)
      .from("cases")
      .select("id")
      .eq("cookie_session_id", sessionId)
      .is("owner_user_id", null)
      .eq("status", "draft")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existingCase?.id) {
      return NextResponse.json({ case_id: existingCase.id, claimed: false });
    }
  } else {
    sessionId = randomUUID();
  }

  // Insert a fresh draft scoped to the session id
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db as any)
    .from("cases")
    .insert({
      cookie_session_id: sessionId,
      status: "draft",
      state: "CA",
      dispute_type: "other",
      amount_cents: 0,
      intake_version: 2,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[demand-letter/start anon path]", error);
    return NextResponse.json({ error: "Failed to start" }, { status: 500 });
  }

  // Set the session cookie. signed = true would require app-level signing;
  // for now we rely on the random uuid being unguessable.
  cookieStore.set(COOKIE_NAME, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  return NextResponse.json({ case_id: data.id, claimed: false });
}
