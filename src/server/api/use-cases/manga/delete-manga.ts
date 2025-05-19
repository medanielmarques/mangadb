import { db } from "@/server/db"
import { mangas } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

export async function deleteMangaUseCase({ id }: { id: string }) {
  const manga = await db.delete(mangas).where(eq(mangas.id, id)).returning()

  if (!manga) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Manga not found",
    })
  }

  return manga
}
