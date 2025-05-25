import chaptersData from "@/cheerio-one-piece-chapters.json"
import { db } from "@/server/db"
import { chapters } from "@/server/db/schema"

type LocalChapterData = {
  chapterTitleEnglish: string
  chapterTitleJapanese: string
  chapterNumber: number
  volumeNumber: number
}

export async function syncChapters() {
  const MANGA_ID = "mzuviufkrdch" // One Piece manga ID
  const BATCH_SIZE = 100

  // Process chapters in batches to avoid overwhelming the database
  for (let i = 0; i < chaptersData.length; i += BATCH_SIZE) {
    const batch = chaptersData.slice(i, i + BATCH_SIZE)
    await insertChaptersBatch(batch, MANGA_ID)
    console.log(
      `Processed chapters ${i + 1} to ${Math.min(i + BATCH_SIZE, chaptersData.length)}`,
    )
  }

  return "chapters synced successfully"
}

async function insertChaptersBatch(
  chaptersBatch: LocalChapterData[],
  mangaId: string,
) {
  const formattedChapters = chaptersBatch.map((chapter) => ({
    title: chapter.chapterTitleEnglish,
    mangaId: mangaId,
    number: chapter.chapterNumber,
    volumeNumber: chapter.volumeNumber,
    chapterLength: null,
    publishedAt: null,
  }))

  await db.insert(chapters).values(formattedChapters)
}
