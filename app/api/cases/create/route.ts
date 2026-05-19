import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";

/**
 * POST /api/cases/create
 *
 * Same job as the legacy /dashboard/cases/new server page: ensure the user
 * is signed in, insert a fresh draft case attached to them, then hand back
 * the URL the client should navigate to. The advantage over the page
 * version is we skip one server-rendered page in the click path, so the
 * user lands on the wizard step faster.
 */
export async function POST() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { error: "auth_required", loginUrl: "/login?next=/dashboard/cases/new" },
      { status: 401 }
    );
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
