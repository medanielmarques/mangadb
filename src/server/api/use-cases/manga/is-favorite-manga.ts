import { db } from "@/server/db"
import { mangaFavorites } from "@/server/db/schema"
import { and } from "drizzle-orm"
import { eq } from "drizzle-orm"

export async function isFavoriteMangaUseCase({
  mangaId,
  userId,
}: {
  mangaId: string
  userId: string
}) {
  const favoriteManga = await db.query.mangaFavorites.findFirst({
    where: and(
      eq(mangaFavorites.mangaId, mangaId),
      eq(mangaFavorites.userId, userId),
    ),
  })

  return Boolean(favoriteManga)
}
