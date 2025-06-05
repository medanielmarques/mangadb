import { logEvent } from "@/server/api/services/log-event"
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
  let conflictTarget: [
    typeof reviews.userId,
    (
      | typeof reviews.mangaId
      | typeof reviews.storyArcId
      | typeof reviews.chapterId
    ),
  ]

  if (mangaId) {
    conflictTarget = [reviews.userId, reviews.mangaId]
  } else if (storyArcId) {
    conflictTarget = [reviews.userId, reviews.storyArcId]
  } else if (chapterId) {
    conflictTarget = [reviews.userId, reviews.chapterId]
  } else {
    throw new Error(
      "At least one of mangaId, storyArcId, or chapterId must be provided",
    )
  }

  const newReview = await db
    .insert(reviews)
    .values({
      ...review,
      mangaId,
      storyArcId,
      chapterId,
    })
    .onConflictDoUpdate({
      target: conflictTarget,
      set: review,
    })

  await logEvent({
    title: `New ${mangaId ? "Manga" : storyArcId ? "Story Arc" : "Chapter"} Review`,
    fields: [
      {
        name: "User ID",
        value: review.userId,
      },
      {
        name: `${mangaId ? "Manga ID" : storyArcId ? "Story Arc ID" : "Chapter ID"}`,
        value: mangaId ?? storyArcId ?? chapterId ?? "Unknown",
      },
      {
        name: "Rating",
        value: review.rating.toString(),
      },
      {
        name: "Review",
        value: review.comment ?? "No comment",
      },
    ],
  })

  return newReview
}
