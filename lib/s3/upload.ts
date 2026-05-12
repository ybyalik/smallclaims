// Server-side S3 upload + delete helpers. Used by routes that generate
// content server-side (e.g., PDF generation, admin image uploads).
//
// For BROWSER → S3 direct uploads (big files like evidence), use the
// presigned PUT URL helpers in ./presigned.ts instead — those don't go
// through our server.

import {
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getS3Client, getBucket } from "./client";

export interface UploadOptions {
  key: string;
  body: Buffer | Uint8Array | string;
  contentType: string;
  cacheControl?: string;
  // S3 metadata (key/value pairs, ASCII only)
  metadata?: Record<string, string>;
}

export async function uploadToS3(opts: UploadOptions): Promise<{ key: string }> {
  const client = getS3Client();
  const bucket = getBucket();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: opts.key,
      Body: opts.body,
      ContentType: opts.contentType,
      CacheControl: opts.cacheControl,
      Metadata: opts.metadata,
    }),
  );
  return { key: opts.key };
}

export async function deleteFromS3(key: string): Promise<void> {
  const client = getS3Client();
  const bucket = getBucket();
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

export async function existsInS3(key: string): Promise<boolean> {
  const client = getS3Client();
  const bucket = getBucket();
  try {
    await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch (e) {
    // 404 means not found; anything else we bubble up.
    if (e && typeof e === "object" && "name" in e && (e as { name?: string }).name === "NotFound") {
      return false;
    }
    if (e && typeof e === "object" && "$metadata" in e) {
      const httpCode = (e as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode;
      if (httpCode === 404) return false;
    }
    throw e;
  }
}
