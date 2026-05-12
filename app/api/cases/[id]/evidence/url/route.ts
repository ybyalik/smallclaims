// GET /api/cases/[id]/evidence/url?key=...
//
// Returns a short-lived presigned GET URL for an evidence object. Used by
// the wizard to preview/download files the user uploaded earlier in this
// case. The key MUST start with cases/{caseId}/ — we refuse to sign URLs
// for objects that don't belong to this case.

import { NextResponse, type NextRequest } from "next/server";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { caseIdFromKey, getPresignedDownloadUrl } from "../../../../../../lib/s3";

export const runtime = "nodejs";
export const maxDuration = 15;

export async function GET(req: NextRequest, ctx: { params: { id: string } }) {
  const c = await loadOwnedCase(ctx.params.id);
  if (!c) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const key = req.nextUrl.searchParams.get("key");
  if (!key) return NextResponse.json({ error: "key required" }, { status: 400 });

  // Refuse keys that don't belong to this case — prevents authed users from
  // probing other cases' objects.
  const keyCaseId = caseIdFromKey(key);
  if (keyCaseId !== c.id) {
    return NextResponse.json({ error: "key does not belong to this case" }, { status: 403 });
  }

  try {
    const url = await getPresignedDownloadUrl(key, { ttlSeconds: 5 * 60 });
    return NextResponse.json({ url });
  } catch (e) {
    console.error("[evidence url]", e);
    return NextResponse.json({ error: "Could not generate download URL" }, { status: 500 });
  }
}
