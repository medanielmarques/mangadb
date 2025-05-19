import { db } from "@/server/db"
import { reviews } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

export async function getReviewByIdUseCase(id: string) {
  const review = await db.query.reviews.findFirst({
    where: eq(reviews.id, id),
  })

  if (!review) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Review not found" })
  }

  return review
}
