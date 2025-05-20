import { chapterRouter } from "@/server/api/routers/chapter"
import { mangaRouter } from "@/server/api/routers/manga"
import { reviewRouter } from "@/server/api/routers/review"
import { storyArcRouter } from "@/server/api/routers/story-arc"
import { userRouter } from "@/server/api/routers/user"
import { volumeRouter } from "@/server/api/routers/volume"
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"

export const appRouter = createTRPCRouter({
  user: userRouter,
  manga: mangaRouter,
  volume: volumeRouter,
  chapter: chapterRouter,
  storyArc: storyArcRouter,
  review: reviewRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
