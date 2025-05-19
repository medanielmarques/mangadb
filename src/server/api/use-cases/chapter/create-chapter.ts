import { db } from "@/server/db"
import { chapters } from "@/server/db/schema"

export async function createChapterUseCase(
  chapter: typeof chapters.$inferInsert,
) {
  return await db.insert(chapters).values(chapter).returning()
}
