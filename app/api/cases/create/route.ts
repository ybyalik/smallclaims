import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";

// Best-effort per-instance rate limit. This endpoint mints an anonymous
// account + a case row with no prior auth, so an unthrottled script could spam
// junk users/cases. Per serverless instance and reset on cold start, so not a
// hard guarantee, but it blunts a single fast abuser at zero infra cost.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 10;
const rateHits = new Map<string, number[]>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  rateHits.set(ip, recent);
  if (rateHits.size > 5000) {
    for (const [k, v] of rateHits) {
      if (v.every((t) => now - t > RATE_WINDOW_MS)) rateHits.delete(k);
    }
  }
  return recent.length > RATE_MAX;
}

/**
 * POST /api/cases/create
 *
 * Start a new case. Two paths:
 *
 *   1. Already-logged-in user — attach the draft case to their existing
 *      profile and return the wizard URL.
 *
 *   2. Anonymous visitor — silently mint a Supabase anonymous session,
 *      attach the draft case to that hidden user id, and return the same
 *      wizard URL. The visitor never sees a login screen. Their email is
 *      captured later in the Plaintiff step and stamped onto the hidden
 *      user's metadata so we can convert them to a real account at first
 *      Stripe checkout.
 *
 * Requires "Anonymous Sign-ins" to be enabled in Supabase Auth → Providers.
 * If anonymous sign-in fails (provider disabled, etc.) we fall back to the
 * old "log in first" behaviour by returning auth_required.
 */
export async function POST(req: NextRequest) {
  const ip =
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "rate_limited", message: "Please slow down and try again in a moment." },
      { status: 429 },
    );
  }

  // Optional bot-check token from the client (present when Turnstile is
  // configured). Supabase requires it on anonymous sign-in once Captcha is
  // enabled in the dashboard; older callers that send no body are tolerated.
  let captchaToken: string | undefined;
  try {
    const body = (await req.json()) as { captchaToken?: unknown } | null;
    if (body && typeof body.captchaToken === "string") captchaToken = body.captchaToken;
  } catch {
    /* no / invalid JSON body — fine */
  }

  const supabase = createClient();
  let {
    data: { user },
  } = await supabase.auth.getUser();

  // No user yet — try anonymous sign-in. If the project has anonymous
  // auth disabled this will fail and we fall back to the login redirect.
  if (!user) {
    const { data, error } = await supabase.auth.signInAnonymously(
      captchaToken ? { options: { captchaToken } } : undefined,
    );
    if (error || !data.user) {
      return NextResponse.json(
        { error: "auth_required", loginUrl: "/login?next=/dashboard/cases/new" },
        { status: 401 }
      );
    }
    user = data.user;
  }

  const db = createServiceRoleClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db as any)
    .from("cases")
    .insert({
      owner_user_id: user.id,
      status: "draft",
      state: "",
      dispute_type: "other",
      amount_cents: 0,
      intake_version: 2,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[api/cases/create]", error);
    return NextResponse.json(
      { error: "create_failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    caseId: data.id,
    url: `/case/${data.id}/build/eligibility`,
  });
}
