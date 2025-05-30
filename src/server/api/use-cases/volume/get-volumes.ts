import { db } from "@/server/db"
import { volumes } from "@/server/db/schema"
import { desc, eq } from "drizzle-orm"

export async function getVolumesUseCase({ mangaId }: { mangaId: string }) {
  return await db
    .select()
    .from(volumes)
    .where(eq(volumes.mangaId, mangaId))
    .orderBy(desc(volumes.number))
}
