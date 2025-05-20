import { storageService } from "@/server/api/services/storage"
import { db } from "@/server/db"
import { images } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"

export async function uploadVolumeCoverUseCase({
  mangaId,
  volumeNumber,
  volumeId,
  file,
  contentType,
}: {
  mangaId: string
  volumeNumber: number
  volumeId: string
  file: Buffer
  contentType: string
}) {
  const path = `${mangaId}/covers/volume-${volumeNumber}.${contentType.split("/")[1]}`

  try {
    const filePath = await storageService.uploadFile(path, file, contentType)

    await db.insert(images).values({
      url: filePath,
      type: "volume_cover",
      mangaId,
      volumeId,
      filename: `volume-${volumeNumber}.${contentType.split("/")[1]}`,
      size: file.length,
      mimeType: contentType,
      width: 100,
      height: 100,
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

export async function deleteVolumeCoverUseCase(
  mangaId: string,
  volumeNumber: number,
) {
  const path = `${mangaId}/covers/volume-${volumeNumber}.jpg`
  await storageService.deleteFile(path)
}
