import { db } from "@/server/db"
import { mangas } from "@/server/db/schema"
import { eq } from "drizzle-orm"

export async function updateMangaUseCase(
  manga: Partial<typeof mangas.$inferInsert>,
) {
  return await db
    .update(mangas)
    .set({
      ...manga,
      updatedAt: new Date(),
    })
    .where(eq(mangas.id, manga.id ?? ""))
    .returning()
}
