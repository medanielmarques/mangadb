import { db } from "@/server/db"
import { chapters } from "@/server/db/schema"

type ChapterResponse = {
  canonicalTitle: string
  volumeNumber: number
  number: number
  length: number
  published: string
}

export async function syncChapters() {
  let offset = 1002

  // (38) One Piece
  while (offset < 1148) {
    await getChapters(38, offset)
    offset += 20
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return "chapters synced successfully"
}

async function getChapters(mangaId: number, offset: number = 0) {
  const response = await fetch(
    `https://kitsu.io/api/edge/chapters?
filter[manga_id]=${mangaId}
&page[limit]=20
&page[offset]=${offset}
&sort=number`,
  )

  const chaptersResponse = (await response.json()) as {
    data: { attributes: ChapterResponse }[]
  }

  const chaptersData = chaptersResponse.data
    .map((chapter) => chapter.attributes)
    .map((chapter) => {
      return {
        title: chapter.canonicalTitle || "No Title",
        mangaId: mangaId,
        number: chapter.number,
        volumeNumber: chapter.volumeNumber,
        chapterLength: chapter.length,
        publishedAt: new Date(chapter.published),
      }
    })

  await db.insert(chapters).values(chaptersData)

  console.log(chaptersData)
}
