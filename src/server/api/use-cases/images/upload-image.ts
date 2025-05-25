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
}: {
  entityId: string
  entityType: "manga_cover" | "volume_cover"
  file: Buffer
  contentType: string
  metadata?: ImageMetadata
}) {
  const path = `${entityId}/${entityType}.${contentType.split("/")[1]}`

  try {
    const filePath = await storageService.uploadFile(path, file, contentType)

    await db.insert(images).values({
      url: filePath,
      type: entityType,
      entityId,
      filename: `${entityType}.${contentType.split("/")[1]}`,
      metadata,
    })

    return filePath
  } catch (error) {
    console.error(error)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload volume cover",
    })
  }
}

export async function deleteImageUseCase(path: string) {
  await storageService.deleteFile(path)
}
