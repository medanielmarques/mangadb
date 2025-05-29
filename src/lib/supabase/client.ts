import { env } from "@/env"
import { createBrowserClient } from "@supabase/ssr"

export const createClient = createBrowserClient(
  env.NEXT_PUBLIC_SUPABASE_URL!,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

// function getPreviewEnvBaseUrl() {
//   return process.env.VERCEL_URL
//     ? `https://${process.env.VERCEL_URL}`
//     : "http://localhost:3000"
// }

function getBaseUrl() {
  let url =
    process?.env?.NEXT_PUBLIC_BASE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_BRANCH_URL
  url = url?.startsWith("http") ? url : `https://${url}`
  url = url?.endsWith("/") ? url : `${url}/`
  return url
}

export async function signInWithDiscord() {
  await createClient.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: getBaseUrl(),
    },
  })
}

export async function signOut() {
  await createClient.auth.signOut()
}

export async function getUserAvatar() {
  const { data } = await createClient.auth.getSession()
  return data.session?.user.user_metadata.avatar_url as string
}
