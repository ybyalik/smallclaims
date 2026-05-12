// POST /api/admin/upload
//
// Admin image upload endpoint. Used by the blog editor and any other admin
// surface that needs to attach an image to content. Returns a long-lived URL
// the admin can paste into markdown / blog body / wherever.
//
// Storage: AWS S3 (bucket from env). The bucket is private, so we return a
// path the consumer can later sign on-demand if needed. For images that
// will be displayed publicly, a follow-up step should be CloudFront in front
// of the bucket — until then, signed URLs work but are short-lived.

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";
import { adminUploadPath, uploadToS3, getPresignedDownloadUrl } from "../../../../lib/s3";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);

function extFor(type: string): string {
  switch (type) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    case "image/svg+xml":
      return "svg";
    default:
      return "bin";
  }
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
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

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: `Unsupported type: ${file.type}` }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
  }

  const key = adminUploadPath(extFor(file.type));
  const bytes = Buffer.from(await file.arrayBuffer());

  try {
    await uploadToS3({
      key,
      body: bytes,
      contentType: file.type,
      cacheControl: "public, max-age=31536000, immutable",
    });
  } catch (e) {
    console.error("[upload]", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  // Short-lived signed GET URL so the admin can preview / paste it. Until
  // we put CloudFront in front of the bucket, callers should re-sign as
  // needed (or we can extend this to return a longer TTL for admin use).
  const url = await getPresignedDownloadUrl(key, { ttlSeconds: 60 * 60 * 24 });
  return NextResponse.json({ url, key });
}
