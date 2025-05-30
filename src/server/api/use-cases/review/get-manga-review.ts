import { db } from "@/server/db"
import { reviews } from "@/server/db/schema"
import { and, eq } from "drizzle-orm"

export async function getMangaReviewUseCase({
  mangaId,
  userId,
}: {
  mangaId: string
  userId: string
}) {
  const review = await db.query.reviews.findFirst({
    where: and(eq(reviews.mangaId, mangaId), eq(reviews.userId, userId)),
  })

  if (!review) {
    return null
  }

  return review
}
