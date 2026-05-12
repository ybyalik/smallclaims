// POST /api/cases/[id]/evidence/presign
//
// Issues a short-lived presigned PUT URL the browser can upload an evidence
// file directly to S3 with. The server validates ownership, mime, and size;
// the actual byte transfer skips the Vercel function so we don't hit the
// 4.5MB body cap.
//
// Body: { filename: string, mime: string, size: number }
// Returns: { url, key, headers }

import { NextResponse, type NextRequest } from "next/server";
import { loadOwnedCase } from "../../../../../../lib/demand-letter/access";
import { evidencePath, getPresignedUploadUrl } from "../../../../../../lib/s3";

export const runtime = "nodejs";
export const maxDuration = 15;

const MAX_BYTES = 25 * 1024 * 1024; // matches the EvidenceStep UI cap
const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/heic",
  "image/heif",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/quicktime",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  "application/msword", // doc
  "text/plain",
  "message/rfc822", // .eml
  "application/octet-stream", // browser fallback for unrecognised types
]);

const EXT_MAP: Record<string, string> = {
  "application/pdf": "pdf",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/heic": "heic",
  "image/heif": "heif",
  "image/webp": "webp",
  "image/gif": "gif",
  "video/mp4": "mp4",
  "video/quicktime": "mov",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/msword": "doc",
  "text/plain": "txt",
  "message/rfc822": "eml",
};

function extFromFilename(filename: string): string | null {
  const m = /\.([a-z0-9]{1,6})$/i.exec(filename);
  return m ? m[1].toLowerCase() : null;
}

export async function POST(req: NextRequest, ctx: { params: { id: string } }) {
  const c = await loadOwnedCase(ctx.params.id);
  if (!c) return NextResponse.json({ error: "not_found" }, { status: 404 });

  let body: { filename?: unknown; mime?: unknown; size?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const filename = typeof body.filename === "string" ? body.filename : "";
  const mime = typeof body.mime === "string" ? body.mime : "";
  const size = typeof body.size === "number" ? body.size : 0;

  if (!filename) return NextResponse.json({ error: "filename required" }, { status: 400 });
  if (size <= 0 || size > MAX_BYTES) {
    return NextResponse.json({ error: `Size must be 1..${MAX_BYTES} bytes` }, { status: 400 });
  }
  if (!ALLOWED_MIME.has(mime)) {
    return NextResponse.json({ error: `Unsupported type: ${mime}` }, { status: 400 });
  }

  // Pick the cleanest extension: prefer the actual filename's, fall back to
  // the mime-derived one. evidencePath validates it again.
  const ext = extFromFilename(filename) || EXT_MAP[mime] || "bin";

  let key: string;
  try {
    key = evidencePath(c.id, ext);
  } catch {
    return NextResponse.json({ error: "Bad extension" }, { status: 400 });
  }

  try {
    const presigned = await getPresignedUploadUrl(key, {
      contentType: mime,
      maxBytes: size,
    });
    return NextResponse.json(presigned);
  } catch (e) {
    console.error("[evidence presign]", e);
    return NextResponse.json({ error: "Could not generate upload URL" }, { status: 500 });
  }
}
