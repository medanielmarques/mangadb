import { db } from "@/server/db"

export async function getMangasUseCase() {
  return await db.query.mangas.findMany()
}
