import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { createMangaUseCase } from "@/server/api/use-cases/manga/create-manga"
import { updateMangaUseCase } from "@/server/api/use-cases/manga/update-manga"
import {
  manga_demographic,
  manga_status,
  manga_translation_status,
} from "@/server/db/schema"
import { z } from "zod"

export const mangaRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        authors: z.array(z.string()),
        artists: z.array(z.string()),
        status: z.enum(manga_status.enumValues),
        translation_status: z.enum(manga_translation_status.enumValues),
        demographic: z.enum(manga_demographic.enumValues),
        genres: z.array(z.string()),
        themes: z.array(z.string()),
        format: z.array(z.string()),
        publishers: z.array(z.string()),
        publishedAt: z.date(),
        completedAt: z.date(),
      }),
    )
    .mutation(async ({ input }) => {
      await createMangaUseCase(input)
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        authors: z.array(z.string()).optional(),
        artists: z.array(z.string()).optional(),
        status: z.enum(manga_status.enumValues).optional(),
        translation_status: z
          .enum(manga_translation_status.enumValues)
          .optional(),
        demographic: z.enum(manga_demographic.enumValues).optional(),
        genres: z.array(z.string()).optional(),
        themes: z.array(z.string()).optional(),
        format: z.array(z.string()).optional(),
        publishers: z.array(z.string()).optional(),
        publishedAt: z.date().optional(),
        completedAt: z.date().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      await updateMangaUseCase(input)
    }),
})
