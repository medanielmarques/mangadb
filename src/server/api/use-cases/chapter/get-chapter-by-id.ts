import { db } from "@/server/db"
import { chapters, storyArcs, volumes } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

export async function getChapterByIdUseCase({ id }: { id: string }) {
  const chapter = await db
    .select()
    .from(chapters)
    .where(eq(chapters.id, id))
    .leftJoin(volumes, eq(chapters.volumeId, volumes.id))
    .leftJoin(storyArcs, eq(chapters.storyArcId, storyArcs.id))

  if (!chapter) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Chapter not found",
    })
  }

  return chapter
}
