import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";
import { hasPaidForProduct } from "../../../../../../lib/payments/access";
import { generateCourtPrepPack } from "../../../../../../lib/court-prep/generate";
import { CATEGORIES } from "../../../../../../lib/demand-letter/categories";
import { getStateContext } from "../../../../../../lib/demand-letter/state-context";
import type { Case, DisputeType } from "../../../../../../lib/supabase/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/cases/[id]/prep/generate
//   body: { force?: boolean }   // force=true regenerates even if cached
//
// Auth-required. Caller must own the case AND have paid for court_prep.
// Generates the prep pack via LLM and caches it on cases.court_prep_content.

export async function POST(req: NextRequest, ctx: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;
  const { data: caseRow } = await admin
    .from("cases")
    .select("*")
    .eq("id", ctx.params.id)
    .maybeSingle();
  if (!caseRow || caseRow.owner_user_id !== user.id) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const c = caseRow as Case;

  const paid = await hasPaidForProduct(c.id, "court_prep");
  if (!paid) {
    return NextResponse.json({ error: "payment_required" }, { status: 402 });
  }

  let body: { force?: boolean } = {};
  try {
    body = await req.json();
  } catch {
    // POST with no body is fine
  }

  // Cached?
  if (c.court_prep_content && !body.force) {
    return NextResponse.json({ pack: c.court_prep_content, cached: true });
  }

  const category = CATEGORIES.find((cat) => cat.slug === c.dispute_type);
  const stateCtx = getStateContext(c.state || "");

  let pack;
  try {
    pack = await generateCourtPrepPack({
      state: c.state || "",
      state_name: stateCtx?.name ?? c.state ?? "your state",
      dispute_type: c.dispute_type as DisputeType,
      dispute_label: category?.label ?? c.dispute_type.replace(/_/g, " "),
      amount_cents: c.amount_cents || 0,
      plaintiff_name: c.plaintiff_name || "Plaintiff",
      defendant_name: c.defendant_name || "Defendant",
      facts_narrative: c.facts_narrative || "",
      intake_answers: (c.intake_answers as Record<string, unknown>) || {},
    });
  } catch (e) {
    console.error("[court-prep] generation failed:", e);
    return NextResponse.json(
      { error: "generation_failed", message: "Couldn't generate the prep pack. Try again in a moment." },
      { status: 502 },
    );
  }

  await admin
    .from("cases")
    .update({ court_prep_content: pack })
    .eq("id", c.id);

  return NextResponse.json({ pack, cached: false });
}
