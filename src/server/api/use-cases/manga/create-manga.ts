import { db } from "@/server/db"
import { mangas } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"

export async function createMangaUseCase(manga: typeof mangas.$inferInsert) {
  try {
    return await db.insert(mangas).values(manga).returning()
  } catch (error) {
    console.error(error)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create manga",
    })
  }
}
