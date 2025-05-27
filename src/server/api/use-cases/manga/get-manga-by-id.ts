import { storageService } from "@/server/api/services/storage"
import { db } from "@/server/db"
import { chapters, images, mangas, reviews, volumes } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { and, avg, count, eq } from "drizzle-orm"

export async function getMangaByIdUseCase({ id }: { id: string }) {
  const manga = await db
    .select({
      id: mangas.id,
      title: mangas.title,
      description: mangas.description,
      coverArtUrl: images.url,
      authors: mangas.authors,
      artists: mangas.artists,
      status: mangas.status,
      publishedAt: mangas.publishedAt,
      volumes: count(volumes.id),
      chapters: count(chapters.id),
      avgRating: avg(reviews.rating),
    })
    .from(mangas)
    .where(eq(mangas.id, id))
    .innerJoin(volumes, eq(mangas.id, volumes.mangaId))
    .innerJoin(
      chapters,
      and(
        eq(chapters.mangaId, mangas.id),
        eq(chapters.volumeNumber, volumes.number),
      ),
    )
    .innerJoin(images, and(eq(images.entityId, volumes.id)))
    .innerJoin(reviews, eq(mangas.id, reviews.mangaId))
    .groupBy(
      mangas.id,
      mangas.title,
      mangas.description,
      mangas.authors,
      mangas.artists,
      mangas.status,
      mangas.publishedAt,
      images.url,
    )

  if (!manga[0]) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Manga not found",
    })
  }

  const coverArtUrl = await storageService.getSignedUrl(
    manga[0].coverArtUrl ?? "",
  )

  return {
    ...manga[0],
    coverArtUrl,
  }
}
