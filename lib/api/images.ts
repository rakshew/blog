import "server-only"

import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { randomUUID } from "crypto"
import { getR2Client } from "@/lib/storage/r2"

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"])
const extensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
}
const maxSize = 8 * 1024 * 1024

export async function createImageUpload({ contentType, size }: { contentType: string; size: number }) {
  if (!allowedTypes.has(contentType)) throw new Error("Unsupported image type")
  if (!Number.isFinite(size) || size <= 0 || size > maxSize) throw new Error("Image exceeds the 8 MB limit")

  const { client, bucket, publicBaseUrl } = getR2Client()
  const key = `posts/${randomUUID()}.${extensions[contentType]}`
  const command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType })
  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 300 })

  return { uploadUrl, publicUrl: `${publicBaseUrl}/${key}` }
}
