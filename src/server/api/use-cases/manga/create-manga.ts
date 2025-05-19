import { db } from "@/server/db"
import { mangas } from "@/server/db/schema"

export async function createMangaUseCase(manga: typeof mangas.$inferInsert) {
  return await db.insert(mangas).values(manga).returning()
}
