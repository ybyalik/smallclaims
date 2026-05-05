import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";
import { enqueueCaseResearch } from "../../../../../../lib/demand-letter/mark-paid";

export async function POST(_req: NextRequest, ctx: { params: { caseId: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: profile } = await admin
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!profile?.is_admin) {
    return NextResponse.json({ error: "not_admin" }, { status: 403 });
  }

  try {
    const result = await enqueueCaseResearch(ctx.params.caseId, {
      force: true,
      source: "admin_rerun",
    });
    return NextResponse.json(result);
  } catch (e) {
    console.error("[case-research rerun]", e);
    return NextResponse.json({ error: "Could not enqueue" }, { status: 500 });
  }
}
