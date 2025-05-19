import { db } from "@/server/db"
import { volumes } from "@/server/db/schema"

export async function getVolumesUseCase() {
  return await db.select().from(volumes)
}
