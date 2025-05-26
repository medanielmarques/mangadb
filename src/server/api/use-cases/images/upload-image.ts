import { storageService } from "@/server/api/services/storage"
import { db } from "@/server/db"
import { images } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"

type ImageMetadata = {
  dimensions?: {
    width?: number
    height?: number
    aspectRatio?: number
  }
  technical?: {
    size?: number
    mimeType?: string
    format?: string
  }
  optimization?: {
    quality?: number
    compressed?: boolean
    originalSize?: number
  }
  variants?: {
    thumbnail?: string
    medium?: string
    large?: string
  }
  accessibility?: {
    altText?: string
    caption?: string
  }
  usage?: {
    uploadedBy?: string
    lastAccessed?: string
    accessCount?: number
  }
}

export async function uploadImageUseCase({
  entityId,
  entityType,
  file,
  contentType,
  metadata,
  filename,
}: {
  entityId: string
  entityType: "manga_cover" | "volume_cover"
  file: Buffer
  contentType: string
  metadata?: ImageMetadata
  filename: string
}) {
  if (!contentType.startsWith("image/")) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Content type must be an image",
    })
  }

  try {
    const url = await storageService.uploadFile(filename, file, contentType)

    await db.insert(images).values({
      url,
      type: entityType,
      entityId,
      filename,
      metadata,
    })

    return url
  } catch (error) {
    console.error(error)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload volume cover",
    })
  }
}
