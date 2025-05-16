"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { supabase } from "@/lib/supabase"
import { TRPCReactProvider } from "@/trpc/react"
import { SessionContextProvider } from "@supabase/auth-helpers-react"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
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
