// OAuth callback route.
// Handles the `?code=...` exchange from Supabase Auth (Google OAuth + magic links).
// After the session is established, claims any anonymous cases that
// belong to this visitor (via cookie handoff or email match) before
// redirecting them to their destination.

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { claimAnonymousCases } from "../../../lib/auth/claim-anonymous";

const HANDOFF_COOKIE = "cc_anon_handoff";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/dashboard";

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", req.url));
  }

  // Capture the anonymous handoff id BEFORE the session swap so we
  // have it even if the exchange replaces every cookie.
  const cookieAnon = cookies().get(HANDOFF_COOKIE)?.value || null;

  const supabase = createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, req.url)
    );
  }

  // Run the claim logic. Failures here should never block the redirect —
  // worst case the user lands on the dashboard with cases still attached
  // to a stale anonymous user, which the 7-day cleanup will sweep away.
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const isAnon = (user as { is_anonymous?: boolean } | null)?.is_anonymous === true;
    if (user && !isAnon) {
      await claimAnonymousCases({
        destinationUserId: user.id,
        destinationEmail: user.email ?? null,
        candidateAnonUserId: cookieAnon,
      });
    }
  } catch (e) {
    console.error("[auth/callback] claim failed", e);
  }

  const res = NextResponse.redirect(new URL(next, req.url));
  // Clear the handoff cookie regardless of outcome so it can't linger.
  res.cookies.set(HANDOFF_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
