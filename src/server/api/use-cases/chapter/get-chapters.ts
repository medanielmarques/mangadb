import { db } from "@/server/db"
import { chapters, storyArcs, volumes } from "@/server/db/schema"
import { eq } from "drizzle-orm"

export async function getChaptersUseCase({
  storyArcId,
  volumeId,
}: {
  storyArcId?: string
  volumeId?: string
}) {
  if (storyArcId) {
    return await db
      .select()
      .from(chapters)
      .leftJoin(storyArcs, eq(chapters.storyArcId, storyArcs.id))
      .where(eq(chapters.storyArcId, storyArcId))
  }

  if (volumeId) {
    return await db
      .select()
      .from(chapters)
      .leftJoin(volumes, eq(chapters.volumeId, volumes.id))
      .where(eq(chapters.volumeId, volumeId))
  }

  return await db.select().from(chapters)
}
