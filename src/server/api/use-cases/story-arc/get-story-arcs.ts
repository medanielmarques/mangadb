import { db } from "@/server/db"
import { storyArcs } from "@/server/db/schema"

export async function getStoryArcsUseCase() {
  return await db.select().from(storyArcs)
}
