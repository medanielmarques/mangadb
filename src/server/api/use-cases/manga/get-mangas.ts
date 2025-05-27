import { db } from "@/server/db"
import { images, mangas, volumes } from "@/server/db/schema"
import { and, eq } from "drizzle-orm"

export async function getMangasUseCase() {
  const results = await db
    .select({
      manga: mangas,
      volumeNumber: volumes.number,
      coverUrl: images.url,
    })
    .from(mangas)
    .innerJoin(volumes, eq(mangas.id, volumes.mangaId))
    .innerJoin(images, and(eq(images.entityId, volumes.id)))
    .where(eq(volumes.isLatestCompleteVolume, true))

  return results
}
