import { db } from "@/server/db"
import { reviews, users } from "@/server/db/schema"
import { and, desc, eq, lt } from "drizzle-orm"

type ReviewWithUser = {
  id: string
  rating: number
  comment: string | null
  createdAt: Date
  users: {
    id: string
    username: string | null
    avatarUrl: string | null
  }
}

export async function getReviewsUseCase({
  mangaId,
  chapterId,
  cursor,
  limit = 10,
}: {
  mangaId?: string
  chapterId?: string
  cursor?: string
  limit?: number
}) {
  if (mangaId) {
    const mangaReviews = await db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        comment: reviews.comment,
        createdAt: reviews.createdAt,
        users: {
          id: users.id,
          username: users.name,
          avatarUrl: users.avatarUrl,
        },
      })
      .from(reviews)
      .where(
        cursor
          ? and(eq(reviews.mangaId, mangaId), lt(reviews.id, cursor))
          : eq(reviews.mangaId, mangaId),
      )
      .innerJoin(users, eq(reviews.userId, users.id))
      .orderBy(desc(reviews.createdAt))
      .limit(limit + 1)

    const hasMore = mangaReviews.length > limit
    const items = mangaReviews.slice(0, limit)
    const nextCursor =
      hasMore && items.length > 0 ? items[items.length - 1].id : undefined

    return {
      items,
      nextCursor,
    }
  }

  if (chapterId) {
    const chapterReviews = await db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        comment: reviews.comment,
        createdAt: reviews.createdAt,
        users: {
          id: users.id,
          username: users.name,
          avatarUrl: users.avatarUrl,
        },
      })
      .from(reviews)
      .where(
        cursor
          ? and(eq(reviews.chapterId, chapterId), lt(reviews.id, cursor))
          : eq(reviews.chapterId, chapterId),
      )
      .innerJoin(users, eq(reviews.userId, users.id))
      .orderBy(desc(reviews.createdAt))
      .limit(limit + 1)

    const hasMore = chapterReviews.length > limit
    const items = chapterReviews.slice(0, limit)
    const nextCursor =
      hasMore && items.length > 0 ? items[items.length - 1]?.id : undefined

    return {
      items,
      nextCursor,
    }
  }

  return {
    items: [],
    nextCursor: undefined,
  }
}
