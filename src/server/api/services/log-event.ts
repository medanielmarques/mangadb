import { env } from "@/env"
import { TRPCError } from "@trpc/server"

type DiscordEmbed = {
  title?: string
  type?: "rich" // padrão, mas pode ser omitido
  description?: string
  url?: string
  timestamp?: string // ISO string: new Date().toISOString()
  color?: number // decimal
  footer?: {
    text: string
    icon_url?: string
    proxy_icon_url?: string
  }
  image?: {
    url: string
    proxy_url?: string
    height?: number
    width?: number
  }
  thumbnail?: {
    url: string
    proxy_url?: string
    height?: number
    width?: number
  }
  video?: {
    url?: string
    height?: number
    width?: number
  }
  provider?: {
    name?: string
    url?: string
  }
  author?: {
    name: string
    url?: string
    icon_url?: string
    proxy_icon_url?: string
  }
  fields?: {
    name: string
    value: string
    inline?: boolean
  }[]
}

export async function logEvent(message: string | DiscordEmbed) {
  let environment = process.env.NODE_ENV
  const isPreview = process.env.VERCEL_ENV === "preview"

  if (isPreview) {
    environment += ` (https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL})`
  }

  try {
    const payload =
      typeof message === "string"
        ? { content: message }
        : {
            embeds: [
              {
                ...message,
                footer: {
                  text: `Env: ${environment}`,
                },
              },
            ],
          }

    const response = await fetch(env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Discord webhook error:", errorText)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to send Discord message",
      })
    }

    return { success: true }
  } catch (error) {
    console.error("Failed to send Discord message:", error)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to send Discord message",
    })
  }
}
