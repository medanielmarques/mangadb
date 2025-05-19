import { db } from "@/server/db"
import { reviews } from "@/server/db/schema"

export async function createReviewUseCase({
  review,
  mangaId,
  storyArcId,
  chapterId,
}: {
  review: typeof reviews.$inferInsert
  mangaId?: string
  storyArcId?: string
  chapterId?: string
}) {
  const newReview = await db.insert(reviews).values({
    ...review,
    mangaId,
    storyArcId,
    chapterId,
  })

  return newReview
}
