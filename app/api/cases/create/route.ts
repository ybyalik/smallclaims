import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";

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
export async function POST() {
  const supabase = createClient();
  let {
    data: { user },
  } = await supabase.auth.getUser();

  // No user yet — try anonymous sign-in. If the project has anonymous
  // auth disabled this will fail and we fall back to the login redirect.
  if (!user) {
    const { data, error } = await supabase.auth.signInAnonymously();
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
