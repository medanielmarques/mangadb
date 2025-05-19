import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { createVolumeUseCase } from "@/server/api/use-cases/volume/create-volume"
import { deleteVolumeUseCase } from "@/server/api/use-cases/volume/delete-volume"
import { getVolumeByIdUseCase } from "@/server/api/use-cases/volume/get-volume-by-id"
import { getVolumesUseCase } from "@/server/api/use-cases/volume/get-volumes"
import { updateVolumeUseCase } from "@/server/api/use-cases/volume/update-volume"
import { z } from "zod"

export const volumeRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await getVolumesUseCase()
  }),

  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await getVolumeByIdUseCase(input)
  }),

  create: publicProcedure
    .input(
      z.object({
        mangaId: z.string(),
        number: z.number(),
        title: z.string(),
        publishedAt: z.date(),
        completedAt: z.date().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await createVolumeUseCase(input)
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        number: z.number(),
        title: z.string(),
        publishedAt: z.date(),
        completedAt: z.date().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await updateVolumeUseCase(input)
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await deleteVolumeUseCase(input)
  }),
})
