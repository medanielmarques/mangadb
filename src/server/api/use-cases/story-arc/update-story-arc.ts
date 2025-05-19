import { db } from "@/server/db"
import { storyArcs } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

export async function updateStoryArcUseCase(
  storyArc: Partial<typeof storyArcs.$inferInsert>,
) {
  const doesStoryArcExist = await db.query.storyArcs.findFirst({
    where: eq(storyArcs.id, storyArc.id ?? ""),
  })

  if (!doesStoryArcExist) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Story arc not found" })
  }

  return await db
    .update(storyArcs)
    .set(storyArc)
    .where(eq(storyArcs.id, storyArc.id ?? ""))
    .returning()
}
