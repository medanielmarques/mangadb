import { db } from "@/server/db"
import { mangas } from "@/server/db/schema"
import { eq } from "drizzle-orm"

export async function updateMangaUseCase(
  manga: Partial<typeof mangas.$inferInsert>,
) {
  const mangaToUpdate = await db.query.mangas.findFirst({
    where: eq(mangas.id, manga.id ?? ""),
  })

  if (!mangaToUpdate) {
    throw new Error("Manga not found")
  }

  const updatedManga = await db
    .update(mangas)
    .set(manga)
    .where(eq(mangas.id, mangaToUpdate.id))
    .returning()

  return updatedManga
}
