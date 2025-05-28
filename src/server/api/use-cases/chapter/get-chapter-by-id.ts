import { db } from "@/server/db"
import { chapters, mangas, reviews, volumes } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { and, count, desc, eq, gt, lt, sql } from "drizzle-orm"

export async function getChapterByIdUseCase({ id }: { id: string }) {
  const totalReviewsSubQuery = db
    .select({
      totalReviews: count(reviews.id),
    })
    .from(reviews)
    .where(eq(reviews.chapterId, id))

  const chapter = await db
    .select({
      id: chapters.id,
      title: chapters.title,
      number: chapters.number,
      volumeTitle: volumes.title,
      volumeNumber: volumes.number,
      releaseDate: chapters.publishedAt,
      mangaTitle: mangas.title,
      mangaId: mangas.id,
      avgRating: sql<number>`CAST(AVG(${reviews.rating}) AS DECIMAL(10, 2))`,
      totalReviews: sql<number>`(${totalReviewsSubQuery})`,
    })
    .from(chapters)
    .leftJoin(volumes, eq(chapters.volumeNumber, volumes.number))
    .leftJoin(reviews, eq(chapters.id, reviews.chapterId))
    .leftJoin(mangas, eq(volumes.mangaId, mangas.id))
    .where(eq(chapters.id, id))
    .groupBy(
      chapters.id,
      chapters.title,
      chapters.number,
      volumes.title,
      volumes.number,
      chapters.publishedAt,
      mangas.title,
      mangas.id,
    )

  if (!chapter[0]) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Chapter not found",
    })
  }

  if (!chapter[0].mangaId) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Manga not found for this chapter",
    })
  }

  const previousChapter = await db
    .select({ id: chapters.id })
    .from(chapters)
    .innerJoin(volumes, eq(chapters.volumeNumber, volumes.number))
    .where(
      and(
        lt(chapters.number, chapter[0].number),
        eq(volumes.mangaId, chapter[0].mangaId),
      ),
    )
    .orderBy(desc(chapters.number))
    .limit(1)

  const nextChapter = await db
    .select({ id: chapters.id })
    .from(chapters)
    .innerJoin(volumes, eq(chapters.volumeNumber, volumes.number))
    .where(
      and(
        gt(chapters.number, chapter[0].number),
        eq(volumes.mangaId, chapter[0].mangaId),
      ),
    )
    .orderBy(chapters.number)
    .limit(1)

  return {
    ...chapter[0],
    avgRating: Number(chapter[0].avgRating),
    previousChapterId: previousChapter[0]?.id ?? null,
    nextChapterId: nextChapter[0]?.id ?? null,
  }
}
