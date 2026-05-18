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

  // Fan out the four independent reads — case row, admin check, payment
  // check, and latest letter. Was sequential before, costing 4 roundtrips
  // before PDF render could start.
  const [caseRes, profileRes, paymentsRes, letterRes] = await Promise.all([
    admin
      .from("cases")
      .select("id, owner_user_id, defendant_name")
      .eq("id", params.caseId)
      .single(),
    admin.from("profiles").select("is_admin").eq("user_id", user.id).single(),
    admin
      .from("payments")
      .select("id")
      .eq("case_id", params.caseId)
      .eq("status", "succeeded")
      .eq("product_key", "demand_letter_download"),
    admin
      .from("demand_letters")
      .select("body_md, version")
      .eq("case_id", params.caseId)
      .order("version", { ascending: false })
      .limit(1)
      .single(),
  ]);
  const caseRow = caseRes.data;
  if (!caseRow) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const isAdmin = !!profileRes.data?.is_admin;

  if (!isAdmin) {
    if (caseRow.owner_user_id !== user.id) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    if (!paymentsRes.data || paymentsRes.data.length === 0) {
      return NextResponse.json({ error: "payment_required" }, { status: 402 });
    }
  }

  const letter = letterRes.data;
  if (!letter) return NextResponse.json({ error: "letter_not_found" }, { status: 404 });

  // ETag based on letter version: the browser can short-circuit re-fetches
  // when the user re-opens /letter without us re-rendering the PDF on the
  // server. Lifecycle: each new letter version (rare) bumps the ETag.
  const etag = `W/"letter-${params.caseId}-v${letter.version}"`;
  const ifNoneMatch = req.headers.get("if-none-match");
  if (ifNoneMatch === etag) {
    return new NextResponse(null, { status: 304, headers: { ETag: etag } });
  }

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

  const inline = req.nextUrl.searchParams.get("disposition") === "inline";
  const disposition = inline ? "inline" : "attachment";

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="civilcase-demand-${safeName}.pdf"`,
      // Private (per-user, no shared CDN cache). The ETag above lets the
      // browser short-circuit on re-fetch without re-rendering the PDF; the
      // 5-minute max-age is the cushion for back/forward and re-renders
      // within a session. must-revalidate forces a conditional GET after
      // expiry so the browser sees new versions immediately.
      "Cache-Control": "private, max-age=300, must-revalidate",
      ETag: etag,
    },
  });
}
