// POST /api/cases/[id]/finish-intake
//
// Final step of the wizard. Saves the user's signature, marks the case as
// info-complete, and returns the URL to redirect to (the product timeline).
// No payment happens here — product purchase is on the timeline page.
//
// Body:
//   { signature_image?: string,    // data URL (PNG base64) — present if drawn
//     signature_typed_name: string // typed attest name, always required
//   }
//
// Auth: requires the case to be owned by the current user.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../../lib/supabase/service-role";
import { validateCaseForFinish } from "../../../../../lib/cases/validate-case";
import { getCaseClaimType } from "../../../../../lib/cases/classify-claim-type";
import type { Case } from "../../../../../lib/supabase/types";

export const runtime = "nodejs";
export const maxDuration = 30;

const MIN_TYPED_NAME_LENGTH = 2;
const MAX_TYPED_NAME_LENGTH = 200;
const MAX_SIGNATURE_DATA_URL_BYTES = 200_000; // ~150 KB PNG cap to keep row size sane

interface Body {
  signature_image?: unknown;
  signature_typed_name?: unknown;
}

export async function POST(req: NextRequest, ctx: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const typedName =
    typeof body.signature_typed_name === "string" ? body.signature_typed_name.trim() : "";
  if (typedName.length > MAX_TYPED_NAME_LENGTH) {
    return NextResponse.json(
      { error: `Signature name must be ${MAX_TYPED_NAME_LENGTH} characters or fewer.` },
      { status: 400 },
    );
  }

  let signatureImage: string | null = null;
  if (typeof body.signature_image === "string" && body.signature_image.startsWith("data:image/")) {
    if (body.signature_image.length > MAX_SIGNATURE_DATA_URL_BYTES) {
      return NextResponse.json(
        { error: "Signature image too large. Please re-sign in a smaller area." },
        { status: 400 },
      );
    }
    signatureImage = body.signature_image;
  }

  // Need at least one form of signature: a typed name OR a drawn image.
  if (signatureImage === null && typedName.length < MIN_TYPED_NAME_LENGTH) {
    return NextResponse.json(
      {
        error:
          "Please either type your full name or draw a signature before finishing.",
      },
      { status: 400 },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const admin = createServiceRoleClient() as any;

  // Confirm ownership before any write. We need the full row to validate
  // case completeness, not just the auth-related columns.
  const { data: caseRow, error: loadErr } = await admin
    .from("cases")
    .select("*")
    .eq("id", ctx.params.id)
    .single();
  if (loadErr || !caseRow) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 });
  }
  if (caseRow.owner_user_id !== user.id) {
    return NextResponse.json({ error: "Not your case" }, { status: 403 });
  }

  // Final validation gate: refuse to commit if any required field is
  // missing. ReviewStep does the same check client-side, but we re-check
  // here in case the client logic was bypassed.
  const issues = validateCaseForFinish(caseRow as Case);
  if (issues.length > 0) {
    return NextResponse.json(
      {
        error: "case_incomplete",
        message: "Some required fields are still missing.",
        issues,
      },
      { status: 400 },
    );
  }

  // Only finalize from draft (or legacy intake_complete). Anything else means
  // the case is already past intake; finish-intake becomes a signature-only
  // re-save and we leave status alone.
  const allowedTransitions = new Set(["draft", "intake_complete"]);
  const shouldUpdate = allowedTransitions.has(caseRow.status as string);

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    null;

  if (shouldUpdate) {
    const { error: updateErr } = await admin
      .from("cases")
      .update({
        status: "active",
        signature_image: signatureImage,
        signature_typed_name: typedName,
        signature_signed_at: new Date().toISOString(),
        signature_ip: ip,
        updated_at: new Date().toISOString(),
      })
      .eq("id", ctx.params.id);
    if (updateErr) {
      console.error("[finish-intake] db update failed", updateErr);
      return NextResponse.json(
        { error: "We couldn't save your case just now. Please try again in a moment." },
        { status: 500 },
      );
    }
  }

  console.log(
    JSON.stringify({
      tag: "case.finish-intake",
      ts: new Date().toISOString(),
      case_id: ctx.params.id,
      had_drawn_signature: signatureImage !== null,
      typed_name_chars: typedName.length,
      status_transitioned: shouldUpdate,
    }),
  );

  // Pre-compute the canonical legal claim type so downstream consumers
  // (letter generation, case research) hit a warm cache. Fire-and-forget:
  // a failure here doesn't block the wizard; the helper returns null and
  // the next reader will retry.
  getCaseClaimType(ctx.params.id).catch((err) => {
    console.error("[finish-intake] classify-claim-type failed", err);
  });

  return NextResponse.json({
    ok: true,
    redirectUrl: `/case/${ctx.params.id}`,
  });
}
