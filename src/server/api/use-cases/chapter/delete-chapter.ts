import { db } from "@/server/db"
import { chapters } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

export async function deleteChapterUseCase({ id }: { id: string }) {
  const chapter = await db
    .delete(chapters)
    .where(eq(chapters.id, id))
    .returning()

  if (!chapter) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Chapter not found",
    })
  }

  return chapter
}
