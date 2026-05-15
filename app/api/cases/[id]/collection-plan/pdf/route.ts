// GET /api/cases/[id]/collection-plan/pdf
//
// Returns the latest ready collection_plans row rendered as a downloadable
// PDF. Accessible to the case owner (who has paid for the plan) and to
// admins. Same renderer as the customer research report PDF.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../../lib/supabase/service-role";
import { hasPaidForProduct } from "../../../../../../lib/payments/access";
import { renderHtmlToPdf } from "../../../../../../lib/pdf/render";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(req: NextRequest, ctx: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  // Owner OR admin can download.
  const { data: caseRow } = await admin
    .from("cases")
    .select("id, owner_user_id, plaintiff_name, defendant_name, state")
    .eq("id", ctx.params.id)
    .maybeSingle();
  if (!caseRow) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const isOwner = caseRow.owner_user_id === user.id;
  let isAdmin = false;
  if (!isOwner) {
    const { data: profile } = await admin
      .from("profiles")
      .select("is_admin")
      .eq("user_id", user.id)
      .maybeSingle();
    isAdmin = !!profile?.is_admin;
  }
  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  // Owners must have paid; admins bypass.
  if (isOwner && !isAdmin) {
    const paid = await hasPaidForProduct(ctx.params.id, "collection_plan");
    if (!paid) {
      return NextResponse.json({ error: "not_paid" }, { status: 402 });
    }
  }

  const { data: plan } = await admin
    .from("collection_plans")
    .select("body_html, body_md, status")
    .eq("case_id", ctx.params.id)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();

  const html = (plan?.body_html as string | undefined) ?? "";
  if (!html || html.length < 10) {
    return NextResponse.json(
      { error: "no_content", message: "Plan isn't ready yet." },
      { status: 404 },
    );
  }

  const title = "Post-Judgment Collection Plan";
  const plaintiff = (caseRow.plaintiff_name ?? "").trim() || "Plaintiff";
  const defendant = (caseRow.defendant_name ?? "").trim() || "Defendant";
  const subtitle = `${plaintiff} vs. ${defendant}`;
  const fileBase = `${title} - ${defendant}`
    .replace(/[^a-z0-9 \-_()]+/gi, "")
    .replace(/\s+/g, "_");

  const inline = req.nextUrl.searchParams.get("disposition") === "inline";
  const disposition = inline ? "inline" : "attachment";

  try {
    const pdf = await renderHtmlToPdf(html, { title, subtitle });
    return new NextResponse(pdf as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${disposition}; filename="${fileBase}.pdf"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[collection-plan pdf]", msg);
    return NextResponse.json(
      { error: "pdf_failed", message: "We couldn't render the PDF. Try again in a moment." },
      { status: 500 },
    );
  }
}
