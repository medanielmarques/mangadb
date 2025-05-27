import { storageService } from "@/server/api/services/storage"
import { db } from "@/server/db"
import { chapters, images, mangas, reviews, volumes } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { and, count, eq, sql } from "drizzle-orm"

export async function getMangaByIdUseCase({ id }: { id: string }) {
  const totalChaptersSubQuery = db
    .select({
      totalChapters: count(chapters.id),
    })
    .from(chapters)
    .where(eq(chapters.mangaId, id))

  const totalVolumesSubQuery = db
    .select({
      totalVolumes: count(volumes.id),
    })
    .from(volumes)
    .where(eq(volumes.mangaId, id))

  const manga = await db
    .select({
      title: mangas.title,
      authors: mangas.authors,
      artists: mangas.artists,
      description: mangas.description,
      status: mangas.status,
      releaseDate: mangas.publishedAt,
      volumeNumber: volumes.number,
      coverArtUrl: images.url,
      avgRating: sql<number>`CAST(AVG(${reviews.rating}) AS DECIMAL(10, 2))`,
      totalChapters: sql<number>`(${totalChaptersSubQuery})`,
      totalVolumes: sql<number>`(${totalVolumesSubQuery})`,
    })
    .from(mangas)
    .innerJoin(volumes, eq(mangas.id, volumes.mangaId))
    .innerJoin(images, eq(images.entityId, volumes.id))
    .innerJoin(reviews, eq(reviews.mangaId, mangas.id))
    .where(and(eq(volumes.isLatestCompleteVolume, true), eq(mangas.id, id)))
    .groupBy(
      mangas.id,
      mangas.title,
      mangas.authors,
      mangas.artists,
      mangas.description,
      mangas.status,
      mangas.publishedAt,
      volumes.number,
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
    avgRating: Number(manga[0].avgRating),
  }
}
