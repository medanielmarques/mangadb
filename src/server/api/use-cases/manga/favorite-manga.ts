import { db } from "@/server/db"
import { manga_favorites, mangas } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { and, eq } from "drizzle-orm"

export async function favoriteMangaUseCase({
  mangaId,
  userId,
}: {
  mangaId: string
  userId: string
}) {
  const mangaToFavorite = await db.query.mangas.findFirst({
    where: eq(mangas.id, mangaId),
  })

  if (!mangaToFavorite) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Manga not found",
    })
  }

  const isFavorite = await db.query.manga_favorites.findFirst({
    where: and(
      eq(manga_favorites.mangaId, mangaId),
      eq(manga_favorites.userId, userId),
    ),
  })

  if (isFavorite) {
    await db
      .delete(manga_favorites)
      .where(
        and(
          eq(manga_favorites.mangaId, mangaId),
          eq(manga_favorites.userId, userId),
        ),
      )

    return {
      success: true,
      message: "Manga removed from favorites",
    }
  }

  await db.insert(manga_favorites).values({
    mangaId,
    userId,
  })

  return {
    success: true,
    message: "Manga added to favorites",
  }
}
