import { BUCKET_NAME, s3Client } from "@/server/config/storage"
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export const storageService = {
  async uploadFile(
    path: string,
    file: Buffer,
    contentType: string,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: path,
      Body: file,
      ContentType: contentType,
    })

    await s3Client.send(command)
    return path
  },

  async deleteFile(path: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: path,
    })

    await s3Client.send(command)
  },

  async getSignedUrl(path: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: path,
    })

    return getSignedUrl(s3Client, command, { expiresIn })
  },
}
