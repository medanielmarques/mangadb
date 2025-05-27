import { db } from "@/server/db"
import { chapters, reviews, volumes } from "@/server/db/schema"
import { asc, eq, sql } from "drizzle-orm"

export async function getVolumesWithChaptersUseCase({
  mangaId,
}: {
  mangaId: string
}) {
  return await db.query.volumes.findMany({
    where: eq(volumes.mangaId, mangaId),
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
    limit: 10,
  })
}
