import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { createUserUseCase } from "@/server/api/use-cases/create-user"
import { z } from "zod"

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ id: z.string().uuid(), email: z.string().email() }))
    .mutation(async ({ input }) => await createUserUseCase(input)),
})
