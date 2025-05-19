import { db } from "@/server/db"
import { reviews } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

export async function updateReviewUseCase(
  review: Partial<typeof reviews.$inferInsert>,
) {
  const doesReviewExist = await db.query.reviews.findFirst({
    where: eq(reviews.id, review.id ?? ""),
  })

  if (!doesReviewExist) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Review not found" })
  }

  return await db
    .update(reviews)
    .set(review)
    .where(eq(reviews.id, review.id ?? ""))
}
