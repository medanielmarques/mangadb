import { db } from "@/server/db"
import { chapters } from "@/server/db/schema"
import { eq } from "drizzle-orm"

export async function updateChapterUseCase(
  chapter: Partial<typeof chapters.$inferInsert>,
) {
  return await db
    .update(chapters)
    .set(chapter)
    .where(eq(chapters.id, chapter.id ?? ""))
    .returning()
}
