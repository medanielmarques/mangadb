import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { deleteReviewUseCase } from "@/server/api/use-cases/review/delete-review"
import { getChapterReviewUseCase } from "@/server/api/use-cases/review/get-chapter-review"
import { getMangaReviewUseCase } from "@/server/api/use-cases/review/get-manga-review"
import { getReviewByIdUseCase } from "@/server/api/use-cases/review/get-review-by-id"
import { getReviewsUseCase } from "@/server/api/use-cases/review/get-reviews"
import { upsertReviewUseCase } from "@/server/api/use-cases/review/upsert-review"
import { z } from "zod"

export const reviewRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        mangaId: z.string().optional(),
        storyArcId: z.string().optional(),
        chapterId: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      return await getReviewsUseCase(input)
    }),

  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await getReviewByIdUseCase(input)
  }),

  getMangaReview: publicProcedure
    .input(z.object({ mangaId: z.string(), userId: z.string() }))
    .query(async ({ input }) => {
      return await getMangaReviewUseCase(input)
    }),

  getChapterReview: publicProcedure
    .input(z.object({ chapterId: z.string(), userId: z.string() }))
    .query(async ({ input }) => {
      return await getChapterReviewUseCase(input)
    }),

  upsert: publicProcedure
    .input(
      z.object({
        mangaId: z.string().optional(),
        storyArcId: z.string().optional(),
        chapterId: z.string().optional(),
        review: z.object({
          userId: z.string(),
          rating: z.number(),
          comment: z.string().optional(),
          spoiler: z.boolean().optional(),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      return await upsertReviewUseCase(input)
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await deleteReviewUseCase(input)
  }),
})
