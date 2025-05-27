import { db } from "@/server/db"
import { manga_favorites } from "@/server/db/schema"
import { and } from "drizzle-orm"
import { eq } from "drizzle-orm"

export async function isFavoriteMangaUseCase({
  mangaId,
  userId,
}: {
  mangaId: string
  userId: string
}) {
  const favoriteManga = await db.query.manga_favorites.findFirst({
    where: and(
      eq(manga_favorites.mangaId, mangaId),
      eq(manga_favorites.userId, userId),
    ),
  })

  return Boolean(favoriteManga)
}
