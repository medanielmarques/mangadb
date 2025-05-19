import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { createStoryArcUseCase } from "@/server/api/use-cases/story-arc/create-story-arc"
import { deleteStoryArcUseCase } from "@/server/api/use-cases/story-arc/delete-story-arc"
import { getStoryArcByIdUseCase } from "@/server/api/use-cases/story-arc/get-story-arc-by-id"
import { getStoryArcsUseCase } from "@/server/api/use-cases/story-arc/get-story-arcs"
import { updateStoryArcUseCase } from "@/server/api/use-cases/story-arc/update-story-arc"
import { z } from "zod"

export const storyArcRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await getStoryArcsUseCase()
  }),

  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await getStoryArcByIdUseCase(input)
  }),

  create: publicProcedure
    .input(
      z.object({
        mangaId: z.string(),
        title: z.string(),
        startedAt: z.date(),
        completedAt: z.date().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await createStoryArcUseCase(input)
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        mangaId: z.string(),
        title: z.string(),
        startedAt: z.date(),
        completedAt: z.date().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await updateStoryArcUseCase(input)
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await deleteStoryArcUseCase(input)
  }),
})
