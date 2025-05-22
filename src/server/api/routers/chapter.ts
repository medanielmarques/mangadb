import { syncChapters } from "@/server/api/services/chapters-sync"
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { createChapterUseCase } from "@/server/api/use-cases/chapter/create-chapter"
import { deleteChapterUseCase } from "@/server/api/use-cases/chapter/delete-chapter"
import { getChapterByIdUseCase } from "@/server/api/use-cases/chapter/get-chapter-by-id"
import { getChaptersUseCase } from "@/server/api/use-cases/chapter/get-chapters"
import { updateChapterUseCase } from "@/server/api/use-cases/chapter/update-chapter"
import { z } from "zod"

export const chapterRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        storyArcId: z.string().optional(),
        volumeId: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      return await getChaptersUseCase(input)
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await getChapterByIdUseCase(input)
    }),

  create: publicProcedure
    .input(
      z.object({
        number: z.number(),
        volumeId: z.string(),
        storyArcId: z.string(),
        title: z.string(),
        publishedAt: z.date(),
      }),
    )
    .mutation(async ({ input }) => await createChapterUseCase(input)),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        number: z.number().optional(),
        volumeId: z.string().optional(),
        storyArcId: z.string().optional(),
        title: z.string().optional(),
        publishedAt: z.date().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      await updateChapterUseCase(input)
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await deleteChapterUseCase(input)
    }),

  sync: publicProcedure.query(async () => {
    return await syncChapters()
  }),
})
