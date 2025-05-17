import Navbar from "@/components/navbar"
import Providers from "@/components/providers"
import "@/styles/globals.css"
import { type Metadata } from "next"
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  title: "MangaDB - Track and Rate Your Favorite Manga",
  description: "Discover, track, and rate your favorite manga series",
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📖</text></svg>"
      />
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
