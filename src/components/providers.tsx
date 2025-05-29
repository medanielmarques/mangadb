"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { createClient } from "@/lib/supabase/client"
import { TRPCReactProvider } from "@/trpc/react"
import { SessionContextProvider } from "@supabase/auth-helpers-react"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={createClient}>
      <TRPCReactProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </TRPCReactProvider>
    </SessionContextProvider>
  )
}
