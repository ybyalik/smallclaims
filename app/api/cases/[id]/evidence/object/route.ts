// DELETE /api/cases/[id]/evidence/object?key=...
//
// Deletes one evidence object from S3. Same case-ownership check as the
// presign and url routes. The wizard's autosave still rewrites
// intake_answers.evidence_files separately — this only owns the S3 side.

import { NextResponse, type NextRequest } from "next/server";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { caseIdFromKey, deleteFromS3 } from "../../../../../../lib/s3";

export const runtime = "nodejs";
export const maxDuration = 15;

export async function DELETE(req: NextRequest, ctx: { params: { id: string } }) {
  const c = await loadOwnedCase(ctx.params.id);
  if (!c) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const key = req.nextUrl.searchParams.get("key");
  if (!key) return NextResponse.json({ error: "key required" }, { status: 400 });

  const keyCaseId = caseIdFromKey(key);
  if (keyCaseId !== c.id) {
    return NextResponse.json({ error: "key does not belong to this case" }, { status: 403 });
  }

  try {
    await deleteFromS3(key);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[evidence delete]", e);
    return NextResponse.json({ error: "Could not delete object" }, { status: 500 });
  }
}
