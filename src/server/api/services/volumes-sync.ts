import volumesData from "@/cheerio-one-piece-volumes.json"
import { uploadVolumeCoverUseCase } from "@/server/api/use-cases/manga/upload-volume-cover"
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

  await db.insert(volumes).values(formattedVolumes)
}
