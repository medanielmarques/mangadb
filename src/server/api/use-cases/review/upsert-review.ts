import { db } from "@/server/db"
import { reviews } from "@/server/db/schema"

export async function upsertReviewUseCase({
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
  const newReview = await db
    .insert(reviews)
    .values({
      ...review,
      mangaId,
      storyArcId,
      chapterId,
    })
    .onConflictDoUpdate({
      target: [reviews.mangaId, reviews.userId],
      set: review,
    })

  return newReview
}
