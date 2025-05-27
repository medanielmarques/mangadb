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
          averageRating: sql<number>`
            COALESCE(
              (
                SELECT AVG(${reviews.rating})
                FROM ${reviews}
                WHERE ${reviews.chapterId} = ${chapters.id}
                AND ${reviews.mangaId} = ${volumes.mangaId}
              ),
              0
            )`.as("average_rating"),
        },
        orderBy: [asc(chapters.number)],
      },
    },
    orderBy: [asc(volumes.number)],
    limit: 10,
  })
}
