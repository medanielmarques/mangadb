import { db } from "@/server/db"
import { volumes } from "@/server/db/schema"

export async function createVolumeUseCase(volume: typeof volumes.$inferInsert) {
  return await db.insert(volumes).values(volume).returning()
}
