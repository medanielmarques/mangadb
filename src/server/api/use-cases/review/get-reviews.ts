import { db } from "@/server/db"
import { reviews, users } from "@/server/db/schema"
import { eq } from "drizzle-orm"

export async function getReviewsUseCase({
  mangaId,
  chapterId,
}: {
  mangaId?: string
  chapterId?: string
}) {
  if (mangaId) {
    return await db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        comment: reviews.comment,
        createdAt: reviews.createdAt,
        users: {
          id: users.id,
          username: users.email,
          avatarUrl: users.avatarUrl,
        },
      })
      .from(reviews)
      .where(eq(reviews.mangaId, mangaId))
      .innerJoin(users, eq(reviews.userId, users.id))
      .limit(10)
  }

  if (chapterId) {
    return await db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        comment: reviews.comment,
        createdAt: reviews.createdAt,
        users: {
          id: users.id,
          username: users.email,
          avatarUrl: users.avatarUrl,
        },
      })
      .from(reviews)
      .where(eq(reviews.chapterId, chapterId))
      .innerJoin(users, eq(reviews.userId, users.id))
      .limit(10)
  }
}
