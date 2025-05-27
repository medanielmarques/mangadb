import { storageService } from "@/server/api/services/storage"
import { db } from "@/server/db"
import { images, mangas, volumes } from "@/server/db/schema"
import { and, eq } from "drizzle-orm"

export async function getMangasUseCase() {
  const allMangas = await db
    .select({
      manga: mangas,
      coverUrl: images.url,
    })
    .from(mangas)
    .innerJoin(volumes, eq(mangas.id, volumes.mangaId))
    .innerJoin(images, and(eq(images.entityId, volumes.id)))
    .where(eq(volumes.isLatestCompleteVolume, true))

  const mangasWithCoverArtUrls = await Promise.all(
    allMangas.map(async (data) => {
      const coverArtUrl = await storageService.getSignedUrl(data.coverUrl)
      return {
        ...data.manga,
        coverArtUrl,
      }
    }),
  )

  return mangasWithCoverArtUrls
}
