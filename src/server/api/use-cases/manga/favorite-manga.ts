import { db } from "@/server/db"
import { manga_favorites, mangas } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

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

  const favoriteManga = await db.insert(manga_favorites).values({
    mangaId,
    userId,
  })

  return favoriteManga
}
