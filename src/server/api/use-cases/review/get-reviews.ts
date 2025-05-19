import { db } from "@/server/db"
import { reviews } from "@/server/db/schema"
import { eq } from "drizzle-orm"

export async function getReviewsUseCase({
  mangaId,
  storyArcId,
  chapterId,
}: {
  mangaId?: string
  storyArcId?: string
  chapterId?: string
}) {
  if (mangaId) {
    return await db.select().from(reviews).where(eq(reviews.mangaId, mangaId))
  }

  if (storyArcId) {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.storyArcId, storyArcId))
  }

  if (chapterId) {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.chapterId, chapterId))
  }
}
