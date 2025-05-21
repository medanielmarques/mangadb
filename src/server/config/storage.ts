import { env } from "@/env"
import { S3Client } from "@aws-sdk/client-s3"

export const s3Client = new S3Client({
  region: env.SUPABASE_STORAGE_REGION,
  endpoint: env.SUPABASE_STORAGE_ENDPOINT,
  credentials: {
    accessKeyId: env.SUPABASE_STORAGE_ACCESS_KEY_ID,
    secretAccessKey: env.SUPABASE_STORAGE_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
})

export const BUCKET_NAME = env.SUPABASE_STORAGE_BUCKET_NAME
