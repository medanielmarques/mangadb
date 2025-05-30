import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"
import { createVolumeUseCase } from "@/server/api/use-cases/volume/create-volume"
import { deleteVolumeUseCase } from "@/server/api/use-cases/volume/delete-volume"
import { getVolumeByIdUseCase } from "@/server/api/use-cases/volume/get-volume-by-id"
import { getVolumesUseCase } from "@/server/api/use-cases/volume/get-volumes"
import { getVolumesWithChaptersUseCase } from "@/server/api/use-cases/volume/get-volumes-with-chapters"
import { updateVolumeUseCase } from "@/server/api/use-cases/volume/update-volume"
import { z } from "zod"

export const volumeRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ mangaId: z.string() }))
    .query(async ({ input }) => {
      return await getVolumesUseCase(input)
    }),

  getVolumesWithChapters: publicProcedure
    .input(
      z.object({
        mangaId: z.string(),
        cursor: z.number().optional(),
        limit: z.number().min(1).max(20).optional(),
      }),
    )
    .query(async ({ input }) => {
      return await getVolumesWithChaptersUseCase(input)
    }),

  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await getVolumeByIdUseCase(input)
  }),

  create: protectedProcedure
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

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        number: z.number(),
        title: z.string(),
        publishedAt: z.date(),
        completedAt: z.date().optional(),
        isComplete: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await updateVolumeUseCase(input)
    }),

  delete: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
    return await deleteVolumeUseCase(input)
  }),
})
