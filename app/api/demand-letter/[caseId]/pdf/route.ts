// GET /api/demand-letter/[caseId]/pdf
//
// Streams a formatted PDF of the demand letter to the user.
// Auth + payment check enforced server-side; admins bypass payment.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";
import { renderLetterPdf } from "../../../../../lib/pdf/letter";
import { logEvent } from "../../../../../lib/audit/log";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: { caseId: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const { data: caseRow } = await admin
    .from("cases")
    .select("id, owner_user_id, defendant_name")
    .eq("id", params.caseId)
    .single();
  if (!caseRow) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const { data: profile } = await admin
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();
  const isAdmin = !!profile?.is_admin;

  if (!isAdmin) {
    if (caseRow.owner_user_id !== user.id) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    const { data: payments } = await admin
      .from("payments")
      .select("id")
      .eq("case_id", params.caseId)
      .eq("status", "succeeded")
      .eq("product_key", "demand_letter_download");
    if (!payments || payments.length === 0) {
      return NextResponse.json({ error: "payment_required" }, { status: 402 });
    }
  }

  const { data: letter } = await admin
    .from("demand_letters")
    .select("body_md, version")
    .eq("case_id", params.caseId)
    .order("version", { ascending: false })
    .limit(1)
    .single();
  if (!letter) return NextResponse.json({ error: "letter_not_found" }, { status: 404 });

  const pdfBytes = await renderLetterPdf({ body_md: letter.body_md });

  await logEvent("document.downloaded", {
    case_id: params.caseId,
    actor_user_id: user.id,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
    user_agent: req.headers.get("user-agent"),
    request_id: req.headers.get("x-vercel-id") || null,
  }, {
    entity_type: "demand_letter",
    payload: { format: "pdf", version: letter.version, admin_bypass: isAdmin },
  });

  const safeName = (caseRow.defendant_name || "demand-letter")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="civilcase-demand-${safeName}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
