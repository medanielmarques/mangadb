import { db } from "@/server/db"
import { chapters, volumes } from "@/server/db/schema"
import { asc, eq } from "drizzle-orm"

export async function getVolumesWithChaptersUseCase({
  mangaId,
}: {
  mangaId: string
}) {
  return await db.query.volumes.findMany({
    where: eq(volumes.mangaId, mangaId),
    with: {
      chapters: {
        orderBy: [asc(chapters.number)],
      },
    },
    orderBy: [asc(volumes.number)],
    limit: 10,
  })
}
