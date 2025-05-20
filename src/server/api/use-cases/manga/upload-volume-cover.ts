import { storageService } from "@/server/api/services/storage"

export async function uploadVolumeCoverUseCase(
  mangaId: string,
  volumeNumber: number,
  file: Buffer,
  contentType: string,
) {
  const path = `${mangaId}/covers/volume-${volumeNumber}.${contentType.split("/")[1]}`

  try {
    const filePath = await storageService.uploadFile(path, file, contentType)
    // Here you would update your database with the file path
    return filePath
  } catch (error) {
    // Handle error appropriately
    throw new Error("Failed to upload volume cover")
  }
}

export async function deleteVolumeCoverUseCase(
  mangaId: string,
  volumeNumber: number,
) {
  const path = `${mangaId}/covers/volume-${volumeNumber}.jpg`
  await storageService.deleteFile(path)
}
