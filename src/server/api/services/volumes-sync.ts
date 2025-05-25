import volumesData from "@/data/one-piece-volumes.json"
import { uploadImageUseCase } from "@/server/api/use-cases/images/upload-image"
import { db } from "@/server/db"
import { volumes } from "@/server/db/schema"
import { nanoid } from "nanoid"

type LocalVolumeData = {
  volumeTitle: string
  volumeNumber: number
  isbnJapan: string
  isbnUs: string
  pagesInJapanVersion: number | null
  pagesInUsVersion: number | null
  releaseDateInJapan: string
  releaseDateInUs: string
  firstChapter: number
  lastChapter: number
  coverArtUrl: string
}

export async function syncVolumes() {
  const MANGA_ID = "mzuviufkrdch" // One Piece manga ID
  const BATCH_SIZE = 50

  // Process volumes in batches to avoid overwhelming the database
  for (let i = 0; i < volumesData.length; i += BATCH_SIZE) {
    const batch = volumesData.slice(i, i + BATCH_SIZE)
    await insertVolumesBatch(batch, MANGA_ID)
    console.log(
      `Processed volumes ${i + 1} to ${Math.min(i + BATCH_SIZE, volumesData.length)}`,
    )
  }

  return "volumes synced successfully"
}

function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? null : date
}

async function insertVolumesBatch(
  volumesBatch: LocalVolumeData[],
  mangaId: string,
) {
  const formattedVolumes = volumesBatch.map((volume) => ({
    id: nanoid(),
    title: volume.volumeTitle,
    mangaId: mangaId,
    number: volume.volumeNumber,
    completedAt: null,
    publishedAtJapan: parseDate(volume.releaseDateInJapan),
    publishedAtUs: parseDate(volume.releaseDateInUs),
    isbnJapan: volume.isbnJapan || null,
    isbnUs: volume.isbnUs || null,
    pagesInJapan: volume.pagesInJapanVersion,
    pagesInUs: volume.pagesInUsVersion,
    firstChapter: volume.firstChapter,
  }))

  const insertedVolumes = await db
    .insert(volumes)
    .values(formattedVolumes)
    .returning({ id: volumes.id, number: volumes.number })

  insertedVolumes.forEach(async (volume) => {
    const coverUrl = volumesBatch.find(
      (v) => v.volumeNumber === volume.number,
    )?.coverArtUrl

    if (!coverUrl) {
      throw new Error("Failed to find cover image")
    }

    const coverImage = await fetch(coverUrl)

    if (!coverImage) {
      throw new Error("Failed to fetch cover image")
    }

    const extension = coverImage.headers.get("content-type")?.split("/")[1]

    await uploadImageUseCase({
      entityId: volume.id,
      entityType: "volume_cover",
      file: Buffer.from(await coverImage.arrayBuffer()),
      contentType: coverImage.headers.get("content-type") ?? "",
      filename: `volume-cover/${mangaId}/volume-${volume.number}.${extension}`,
    })
  })
}
