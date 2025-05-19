import { db } from "@/server/db"
import { storyArcs } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

export async function getStoryArcByIdUseCase(id: string) {
  const storyArc = await db.query.storyArcs.findFirst({
    where: eq(storyArcs.id, id),
  })

  if (!storyArc) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Story arc not found" })
  }

  return storyArc
}
