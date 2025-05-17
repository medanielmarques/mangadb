import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL
}

export async function signInWithDiscord() {
  await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: getBaseUrl() || "http://localhost:3000",
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
