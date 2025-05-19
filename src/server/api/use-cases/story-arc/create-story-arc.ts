import { db } from "@/server/db"
import { storyArcs } from "@/server/db/schema"

export async function createStoryArcUseCase(
  storyArc: typeof storyArcs.$inferInsert,
) {
  return await db.insert(storyArcs).values(storyArc).returning()
}
