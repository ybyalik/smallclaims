// Presigned URL helpers. Two flavors:
//
//   getPresignedDownloadUrl(key)  -> short-lived URL the browser can GET
//                                    to download the object directly from S3.
//   getPresignedUploadUrl(key)    -> short-lived URL the browser can PUT
//                                    to, uploading directly to S3 without
//                                    going through our server.
//
// Direct-to-S3 upload pattern:
//   1. Client asks our server: "I want to upload an evidence file (jpg, 4MB)"
//   2. Server validates auth + size/type, generates an S3 key with paths.ts,
//      returns presigned PUT URL + key.
//   3. Client PUTs the file directly to S3 using the URL.
//   4. Client tells our server "upload {key} done", server inserts the
//      documents row.
//
// Saves Vercel function bandwidth + 4.5MB body limit on big files.

import {
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getS3Client, getBucket } from "./client";

// Tight defaults. Downloads are short-lived; uploads slightly longer for
// large file uploads on slow connections.
const DEFAULT_DOWNLOAD_TTL_S = 5 * 60; // 5 min
const DEFAULT_UPLOAD_TTL_S = 15 * 60;  // 15 min

export async function getPresignedDownloadUrl(
  key: string,
  opts: { ttlSeconds?: number; filename?: string } = {},
): Promise<string> {
  const client = getS3Client();
  const bucket = getBucket();
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    // If filename is set, force the browser to download (not display inline)
    // with the given name.
    ResponseContentDisposition: opts.filename
      ? `attachment; filename="${opts.filename.replace(/"/g, "")}"`
      : undefined,
  });
  return getSignedUrl(client, command, {
    expiresIn: opts.ttlSeconds ?? DEFAULT_DOWNLOAD_TTL_S,
  });
}

export interface PresignedUploadOptions {
  contentType: string;
  // Optional content-length cap. The browser PUT MUST include the same
  // Content-Length header; mismatched lengths are rejected by S3.
  maxBytes?: number;
  ttlSeconds?: number;
}

export async function getPresignedUploadUrl(
  key: string,
  opts: PresignedUploadOptions,
): Promise<{ url: string; key: string; headers: Record<string, string> }> {
  const client = getS3Client();
  const bucket = getBucket();
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: opts.contentType,
    ContentLength: opts.maxBytes,
  });
  const url = await getSignedUrl(client, command, {
    expiresIn: opts.ttlSeconds ?? DEFAULT_UPLOAD_TTL_S,
  });
  // The browser must replay these headers in the PUT request, otherwise the
  // signature fails. Surface them so the caller can pass them through.
  const headers: Record<string, string> = {
    "Content-Type": opts.contentType,
  };
  if (opts.maxBytes) headers["Content-Length"] = String(opts.maxBytes);
  return { url, key, headers };
}
