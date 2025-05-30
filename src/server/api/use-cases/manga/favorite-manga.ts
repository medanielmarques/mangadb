import { db } from "@/server/db"
import { mangaFavorites, mangas } from "@/server/db/schema"
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

  const isFavorite = await db.query.mangaFavorites.findFirst({
    where: and(
      eq(mangaFavorites.mangaId, mangaId),
      eq(mangaFavorites.userId, userId),
    ),
  })

  if (isFavorite) {
    await db
      .delete(mangaFavorites)
      .where(
        and(
          eq(mangaFavorites.mangaId, mangaId),
          eq(mangaFavorites.userId, userId),
        ),
      )

    return {
      success: true,
      message: "Manga removed from favorites",
    }
  }

  await db.insert(mangaFavorites).values({
    mangaId,
    userId,
  })

  return {
    success: true,
    message: "Manga added to favorites",
  }
}
