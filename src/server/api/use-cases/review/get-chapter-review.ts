import { db } from "@/server/db"
import { reviews } from "@/server/db/schema"
import { and, eq } from "drizzle-orm"

export async function getChapterReviewUseCase({
  chapterId,
  userId,
}: {
  chapterId: string
  userId: string
}) {
  const review = await db.query.reviews.findFirst({
    where: and(eq(reviews.chapterId, chapterId), eq(reviews.userId, userId)),
  })

  if (!review) {
    return null
  }

  return review
}
