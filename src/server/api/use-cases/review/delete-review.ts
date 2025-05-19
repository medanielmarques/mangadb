import { db } from "@/server/db"
import { reviews } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

export async function deleteReviewUseCase(id: string) {
  const doesReviewExist = await db.query.reviews.findFirst({
    where: eq(reviews.id, id),
  })

  if (!doesReviewExist) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Review not found" })
  }

  return await db.delete(reviews).where(eq(reviews.id, id))
}
