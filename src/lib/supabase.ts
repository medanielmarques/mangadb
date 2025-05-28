import { env } from "@/env"
import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL!,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

function getBaseUrl() {
  let url =
    process?.env?.NEXT_PUBLIC_BASE_URL ?? process?.env?.NEXT_PUBLIC_VERCEL_URL
  url = url?.startsWith("http") ? url : `https://${url}`
  url = url?.endsWith("/") ? url : `${url}/`
  return url
}

export async function signInWithDiscord() {
  await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: getBaseUrl(),
    },
  })
}

export async function signOut() {
  await supabase.auth.signOut()
}

export async function getUserAvatar() {
  const { data } = await supabase.auth.getSession()
  return data.session?.user.user_metadata.avatar_url as string
}
