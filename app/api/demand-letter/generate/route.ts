// POST /api/demand-letter/generate
//
// Takes the intake form payload, drafts a letter via OpenRouter, persists a
// new case + demand_letter row, and returns the case_id so the client can
// redirect to /demand-letter/[id]/preview.
//
// Anonymous users are supported for MVP — we mint a Supabase anon session via
// signInAnonymously() if the user isn't authenticated yet, so the case_id is
// owned by SOMEONE for RLS purposes. They can claim the account later.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";
import { generateDemandLetter } from "../../../../lib/demand-letter/generate";
import { logEvent } from "../../../../lib/audit/log";
import type { DisputeType } from "../../../../lib/supabase/types";

interface IntakePayload {
  dispute_type: DisputeType;
  state: string;
  amount_cents: number;
  cure_period_days: number;
  plaintiff_name: string;
  plaintiff_email: string;
  plaintiff_phone?: string | null;
  plaintiff_address: {
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    zip: string;
  };
  defendant_name: string;
  defendant_email?: string | null;
  defendant_phone?: string | null;
  defendant_address: {
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    zip: string;
  };
  facts_narrative: string;
}

function clientIp(req: NextRequest): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return null;
}

export async function POST(req: NextRequest) {
  let body: IntakePayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Lightweight server-side validation
  if (!body.dispute_type || !body.state || !body.amount_cents || body.amount_cents <= 0) {
    return NextResponse.json({ error: "Missing required dispute fields" }, { status: 400 });
  }
  if (!body.plaintiff_name || !body.plaintiff_email || !body.plaintiff_address?.line1) {
    return NextResponse.json({ error: "Missing plaintiff information" }, { status: 400 });
  }
  if (!body.defendant_name || !body.defendant_address?.line1) {
    return NextResponse.json({ error: "Missing defendant information" }, { status: 400 });
  }
  if (!body.facts_narrative || body.facts_narrative.trim().length < 60) {
    return NextResponse.json({ error: "Facts narrative too short" }, { status: 400 });
  }
  if (body.amount_cents > 5_000_000) {
    return NextResponse.json(
      { error: "Amount exceeds small-claims jurisdiction. Consider regular civil court." },
      { status: 400 }
    );
  }

  // Auth required. Pay-first model: dashboard pages are gated by middleware,
  // and this API route enforces the same gate at the data layer.
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }
  const userId = user.id;

  // Generate the letter via OpenRouter
  let draft;
  try {
    draft = await generateDemandLetter({
      plaintiff_name: body.plaintiff_name,
      plaintiff_email: body.plaintiff_email,
      plaintiff_phone: body.plaintiff_phone || undefined,
      plaintiff_address: body.plaintiff_address,
      defendant_name: body.defendant_name,
      defendant_email: body.defendant_email || undefined,
      defendant_phone: body.defendant_phone || undefined,
      defendant_address: body.defendant_address,
      state: body.state,
      dispute_type: body.dispute_type,
      amount_cents: body.amount_cents,
      facts_narrative: body.facts_narrative,
      cure_period_days: body.cure_period_days || 14,
      state_specific_enhanced: false, // determined inside generate()
    });
  } catch (err) {
    console.error("[demand-letter] generate failed:", err);
    return NextResponse.json(
      { error: "Could not draft the letter. Try again in a moment." },
      { status: 502 }
    );
  }

  // Persist the case + demand_letter via service role (RLS-safe; we trust the auth above)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  const { data: caseRow, error: caseErr } = await admin
    .from("cases")
    .insert({
      owner_user_id: userId,
      status: "demand_drafted",
      state: body.state,
      county: null,
      dispute_type: body.dispute_type,
      amount_cents: body.amount_cents,
      currency: "USD",
      plaintiff_name: body.plaintiff_name,
      plaintiff_address: body.plaintiff_address,
      plaintiff_email: body.plaintiff_email,
      plaintiff_phone: body.plaintiff_phone || null,
      defendant_name: body.defendant_name,
      defendant_address: body.defendant_address,
      defendant_email: body.defendant_email || null,
      defendant_phone: body.defendant_phone || null,
      intake_answers: { ...body },
      intake_version: 1,
      facts_narrative: body.facts_narrative,
    })
    .select("id")
    .single();

  if (caseErr || !caseRow) {
    console.error("[demand-letter] case insert failed:", caseErr);
    return NextResponse.json({ error: "Could not save your case." }, { status: 500 });
  }

  const { error: letterErr } = await admin.from("demand_letters").insert({
    case_id: caseRow.id,
    version: 1,
    template_key: draft.template_key,
    body_md: draft.body_md,
    body_html: null,
    cure_period_days: draft.cure_period_days,
    generated_by: draft.generated_by,
  });

  if (letterErr) {
    console.error("[demand-letter] letter insert failed:", letterErr);
    return NextResponse.json({ error: "Letter draft saved partially. Reload." }, { status: 500 });
  }

  // Audit log
  const ctx = {
    case_id: caseRow.id,
    actor_user_id: userId,
    ip: clientIp(req),
    user_agent: req.headers.get("user-agent"),
    request_id: req.headers.get("x-vercel-id") || null,
  };
  await logEvent("demand.generated", ctx, {
    entity_type: "demand_letter",
    payload: {
      template_key: draft.template_key,
      generated_by: draft.generated_by,
      state: body.state,
      dispute_type: body.dispute_type,
      amount_cents: body.amount_cents,
    },
  });
  await logEvent("disclaimer.shown", ctx, {
    payload: { surface: "demand-letter-intake" },
  });

  return NextResponse.json({ case_id: caseRow.id });
}
