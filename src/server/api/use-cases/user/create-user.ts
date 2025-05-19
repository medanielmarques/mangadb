import { db } from "@/server/db"
import { users } from "@/server/db/schema"

export async function createUserUseCase(user: typeof users.$inferInsert) {
  await db.insert(users).values(user)

  return user
}
