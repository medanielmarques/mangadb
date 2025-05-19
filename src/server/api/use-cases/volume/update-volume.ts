import { db } from "@/server/db"
import { volumes } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

export async function updateVolumeUseCase(
  volume: Partial<typeof volumes.$inferInsert>,
) {
  const doesVolumeExist = await db.query.volumes.findFirst({
    where: eq(volumes.id, volume.id ?? ""),
  })

  if (!doesVolumeExist) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Volume not found",
    })
  }

  return await db
    .update(volumes)
    .set(volume)
    .where(eq(volumes.id, volume.id ?? ""))
    .returning()
}
