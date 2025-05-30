import { db } from "@/server/db"
import { chapters, reviews, volumes } from "@/server/db/schema"
import { and, asc, eq, gt, sql } from "drizzle-orm"

export async function getVolumesWithChaptersUseCase({
  mangaId,
  cursor,
  limit = 10,
}: {
  mangaId: string
  cursor?: number
  limit?: number
}) {
  const volumesWithChapters = await db.query.volumes.findMany({
    where: cursor
      ? and(eq(volumes.mangaId, mangaId), gt(volumes.number, cursor))
      : eq(volumes.mangaId, mangaId),
    with: {
      chapters: {
        extras: {
          avgRating: sql<number>`
            COALESCE(
              (
                SELECT AVG(r.rating)
                FROM ${reviews} r
                WHERE r.chapter_id = ${chapters.id}
              )::numeric,
              0
            )`.as("avg_rating"),
        },
        orderBy: [asc(chapters.number)],
      },
    },
    orderBy: [asc(volumes.number)],
    limit: limit + 1,
  })

  const hasMore = volumesWithChapters.length > limit
  const items = volumesWithChapters.slice(0, limit)
  const nextCursor =
    hasMore && items.length > 0 ? items[items.length - 1]?.number : undefined

  return {
    items,
    nextCursor,
  }
}
