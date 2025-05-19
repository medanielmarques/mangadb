import { db } from "@/server/db"
import { volumes } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

export async function deleteVolumeUseCase(id: string) {
  const doesVolumeExist = await db.query.volumes.findFirst({
    where: eq(volumes.id, id),
  })

  if (!doesVolumeExist) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Volume not found",
    })
  }

  return await db.delete(volumes).where(eq(volumes.id, id))
}
