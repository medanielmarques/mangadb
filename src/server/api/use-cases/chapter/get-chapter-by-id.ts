import { db } from "@/server/db"
import { chapters, reviews, volumes } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { count, eq, sql } from "drizzle-orm"

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
      avgRating: sql<number>`CAST(AVG(${reviews.rating}) AS DECIMAL(10, 2))`,
      totalReviews: sql<number>`(${totalReviewsSubQuery})`,
    })
    .from(chapters)
    .leftJoin(volumes, eq(chapters.volumeNumber, volumes.number))
    .leftJoin(reviews, eq(chapters.id, reviews.chapterId))
    .where(eq(chapters.id, id))
    .groupBy(
      chapters.id,
      chapters.title,
      chapters.number,
      volumes.title,
      volumes.number,
      chapters.publishedAt,
    )

  if (!chapter[0]) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Chapter not found",
    })
  }

  return {
    ...chapter[0],
    avgRating: Number(chapter[0].avgRating),
  }
}
