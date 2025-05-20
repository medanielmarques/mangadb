import { env } from "@/env"
import { S3Client } from "@aws-sdk/client-s3"

export const s3Client = new S3Client({
  region: env.AWS_S3_REGION,
  credentials: {
    accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
})

export const BUCKET_NAME = env.AWS_S3_BUCKET_NAME
