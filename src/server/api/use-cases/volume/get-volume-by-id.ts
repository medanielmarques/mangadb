import { db } from "@/server/db"
import { volumes } from "@/server/db/schema"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

export async function getVolumeByIdUseCase(id: string) {
  const volume = await db.query.volumes.findFirst({
    where: eq(volumes.id, id),
  })

  if (!volume) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Volume not found" })
  }

  return volume
}
