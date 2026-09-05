import "server-only"

import { S3Client } from "@aws-sdk/client-s3"

function getR2Config() {
  const accountId = process.env.R2_ACCOUNT_ID
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
  const bucket = process.env.R2_BUCKET_NAME
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL?.replace(/\/$/, "")

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicBaseUrl) {
    throw new Error("R2 storage is not configured")
  }

  return { accountId, accessKeyId, secretAccessKey, bucket, publicBaseUrl }
}

export function getR2Client() {
  const config = getR2Config()
  return {
    client: new S3Client({
      region: "auto",
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    }),
    bucket: config.bucket,
    publicBaseUrl: config.publicBaseUrl,
  }
}
