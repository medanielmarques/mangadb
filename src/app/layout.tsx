import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"
import { TRPCReactProvider } from "@/trpc/react"
import { type Metadata } from "next"
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  title: "MangaDB - Track and Rate Your Favorite Manga",
  description: "Discover, track, and rate your favorite manga series",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />

            <main className="min-h-screen pt-16">{children}</main>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
