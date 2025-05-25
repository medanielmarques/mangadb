"use client"

export default function LogEnvVarsTest() {
  console.log("process.env", process.env)
  console.log("VERCEL_BRANCH_URL", process.env.VERCEL_BRANCH_URL)
  console.log("VERCEL_URL", process.env.VERCEL_URL)
  console.log("VERCEL_ENV", process.env.VERCEL_ENV)

  return null
}
