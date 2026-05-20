// Client-side helper used by /login and /signup forms. Before kicking
// off an auth flow that involves a redirect (OAuth, magic link), write
// the visitor's current anonymous user id to a cookie so /auth/callback
// can pick it up after the session swaps and migrate their cases.

import { createClient } from "../supabase/client";

const HANDOFF_COOKIE = "cc_anon_handoff";

/**
 * Read the current Supabase session and, if it's anonymous, persist the
 * user id to a short-lived cookie. Safe to call before every auth event
 * — no-op when not anonymous.
 */
export async function markAnonymousHandoff(): Promise<string | null> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const isAnon =
      (user as { is_anonymous?: boolean } | null)?.is_anonymous === true;
    if (!isAnon || !user) return null;
    // 10 minute lifespan — long enough for OAuth round-trip, short
    // enough to not stick around if the user bails.
    document.cookie = `${HANDOFF_COOKIE}=${encodeURIComponent(
      user.id
    )}; Max-Age=600; Path=/; SameSite=Lax`;
    return user.id;
  } catch {
    return null;
  }
}
