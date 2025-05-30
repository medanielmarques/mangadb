import { storageService } from "@/server/api/services/storage"
import { db } from "@/server/db"
import { images, mangas, reviews, volumes } from "@/server/db/schema"
import { and, avg, eq } from "drizzle-orm"

export async function getMangasUseCase() {
  const allMangas = await db
    .select({
      id: mangas.id,
      title: mangas.title,
      coverUrl: images.url,
      avgRating: avg(reviews.rating),
    })
    .from(mangas)
    .innerJoin(volumes, eq(mangas.id, volumes.mangaId))
    .innerJoin(images, and(eq(images.entityId, volumes.id)))
    .leftJoin(reviews, eq(mangas.id, reviews.mangaId))
    .where(eq(volumes.isLatestCompleteVolume, true))
    .groupBy(mangas.id, mangas.title, images.url)

  const mangasWithCoverArtUrls = await Promise.all(
    allMangas.map(async (manga) => {
      const coverArtUrl = await storageService.getSignedUrl(manga.coverUrl)
      const avgRating = Number(manga.avgRating).toFixed(2) ?? 0
      const avgRatingNumber = Number(avgRating)

      return {
        ...manga,
        avgRating: avgRatingNumber,
        coverArtUrl,
      }
    }),
  )

  return mangasWithCoverArtUrls
}
