import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { createReviewUseCase } from "@/server/api/use-cases/review/create-review"
import { deleteReviewUseCase } from "@/server/api/use-cases/review/delete-review"
import { getReviewByIdUseCase } from "@/server/api/use-cases/review/get-review-by-id"
import { getReviewsUseCase } from "@/server/api/use-cases/review/get-reviews"
import { updateReviewUseCase } from "@/server/api/use-cases/review/update-review"
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

  create: publicProcedure
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
      return await createReviewUseCase(input)
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        rating: z.number(),
        comment: z.string().optional(),
        spoiler: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await updateReviewUseCase(input)
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await deleteReviewUseCase(input)
  }),
})
