// Singleton AWS S3 client built from env. Bucket access is private — all
// reads and writes go through this server-side client OR through presigned
// URLs we generate (see ./presigned.ts).
//
// Required environment variables:
//   AWS_S3_BUCKET           — bucket name (e.g., "civilcase-prod")
//   AWS_S3_REGION           — AWS region (default "us-east-1")
//   AWS_ACCESS_KEY_ID       — IAM access key with S3:* on the bucket
//   AWS_SECRET_ACCESS_KEY   — corresponding secret
//
// Optional:
//   AWS_S3_ENDPOINT         — override endpoint (for local testing only;
//                              do NOT set in prod)

import { S3Client } from "@aws-sdk/client-s3";

let cached: S3Client | null = null;

export class S3NotConfigured extends Error {
  constructor() {
    super("AWS S3 credentials not set (AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY + AWS_S3_BUCKET)");
    this.name = "S3NotConfigured";
  }
}

export function getS3Client(): S3Client {
  if (cached) return cached;
  const region = process.env.AWS_S3_REGION || "us-east-1";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  if (!accessKeyId || !secretAccessKey) throw new S3NotConfigured();

  cached = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
    ...(process.env.AWS_S3_ENDPOINT
      ? { endpoint: process.env.AWS_S3_ENDPOINT, forcePathStyle: true }
      : {}),
  });
  return cached;
}

export function getBucket(): string {
  const bucket = process.env.AWS_S3_BUCKET;
  if (!bucket) throw new S3NotConfigured();
  return bucket;
}
