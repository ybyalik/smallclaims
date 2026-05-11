import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";

/**
 * POST /api/demand-letters/start
 *
 * Auth-required entry into the case builder for users who skip the case
 * score and want to start a fresh case directly.
 *
 * Returns: { case_id } on success, 401 if anonymous.
 */
export async function POST() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Sign in to start a case." },
      { status: 401 },
    );
  }

  const db = createServiceRoleClient();
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
      intake_version: 2,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[demand-letter/start]", error);
    return NextResponse.json({ error: "Failed to start" }, { status: 500 });
  }

  return NextResponse.json({ case_id: data.id });
}
