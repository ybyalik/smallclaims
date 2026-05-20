// POST /api/auth/claim-anonymous
//
// Called from the client right after a password sign-in or sign-up
// completes. The body may include the anonymous user id that was on
// the session before the new auth event. We also do an email-based
// fallback inside the helper.
//
// For OAuth and magic-link flows, the same logic runs server-side in
// /auth/callback so the client doesn't need to call this manually.

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { claimAnonymousCases } from "../../../../lib/auth/claim-anonymous";

export const runtime = "nodejs";

const HANDOFF_COOKIE = "cc_anon_handoff";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }
  const isAnon = (user as { is_anonymous?: boolean }).is_anonymous === true;
  if (isAnon) {
    // The session still points at an anonymous user. Nothing to claim
    // onto. (This can happen if /finish-signup hasn't finished yet.)
    return NextResponse.json({ ok: true, moved: 0 });
  }

  let body: { anon_user_id?: string | null } = {};
  try {
    body = (await req.json()) as { anon_user_id?: string | null };
  } catch {
    // Body is optional. Still proceed with email fallback only.
  }

  const cookieAnon = cookies().get(HANDOFF_COOKIE)?.value || null;
  const candidate = body.anon_user_id || cookieAnon || null;

  const result = await claimAnonymousCases({
    destinationUserId: user.id,
    destinationEmail: user.email ?? null,
    candidateAnonUserId: candidate,
  });

  const res = NextResponse.json({
    ok: true,
    moved: result.moved,
    deleted_anon_users: result.deletedAnonUsers.length,
  });
  // Clear the handoff cookie so it can't accidentally re-fire.
  res.cookies.set(HANDOFF_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
