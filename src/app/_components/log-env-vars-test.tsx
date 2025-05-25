"use client"

export default function LogEnvVarsTest() {
  console.log("process.env", process.env)
  console.log(
    "NEXT_PUBLIC_VERCEL_BRANCH_URL",
    process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL,
  )
  console.log("NEXT_PUBLIC_VERCEL_URL", process.env.NEXT_PUBLIC_VERCEL_URL)
  console.log("NEXT_PUBLIC_VERCEL_ENV", process.env.NEXT_PUBLIC_VERCEL_ENV)

  return null
}
