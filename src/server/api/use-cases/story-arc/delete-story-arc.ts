import { db } from "@/server/db"
import { storyArcs } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

export async function deleteStoryArcUseCase(id: string) {
  const doesStoryArcExist = await db.query.storyArcs.findFirst({
    where: eq(storyArcs.id, id),
  })

  if (!doesStoryArcExist) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Story arc not found" })
  }

  return await db.delete(storyArcs).where(eq(storyArcs.id, id))
}
