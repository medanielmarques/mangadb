import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    SUPABASE_STORAGE_REGION: z.string(),
    SUPABASE_STORAGE_ACCESS_KEY_ID: z.string(),
    SUPABASE_STORAGE_SECRET_ACCESS_KEY: z.string(),
    SUPABASE_STORAGE_BUCKET_NAME: z.string(),
    SUPABASE_STORAGE_ENDPOINT: z.string(),
  },

  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,

    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,

    SUPABASE_STORAGE_REGION: process.env.SUPABASE_STORAGE_REGION,
    SUPABASE_STORAGE_ACCESS_KEY_ID: process.env.SUPABASE_STORAGE_ACCESS_KEY_ID,
    SUPABASE_STORAGE_SECRET_ACCESS_KEY:
      process.env.SUPABASE_STORAGE_SECRET_ACCESS_KEY,
    SUPABASE_STORAGE_BUCKET_NAME: process.env.SUPABASE_STORAGE_BUCKET_NAME,
    SUPABASE_STORAGE_ENDPOINT: process.env.SUPABASE_STORAGE_ENDPOINT,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
