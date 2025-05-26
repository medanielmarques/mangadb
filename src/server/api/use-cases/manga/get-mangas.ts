import { db } from "@/server/db"
import { volumes } from "@/server/db/schema"
import { and, eq } from "drizzle-orm"

export async function getMangasUseCase() {
  const mangas = await db.query.mangas.findMany({
    with: {
      volumes: {
        where: and(
          eq(volumes.isComplete, true),
          eq(volumes.isLatestCompleteVolume, true),
        ),
        limit: 1,
      },
    },
  })

  return mangas
}
