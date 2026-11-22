"use client"

import { useSyncExternalStore, type ReactNode } from "react"
import { ThemeProvider } from "next-themes"

const mobile = "(width < 64rem)"

function subscribe(onChange: () => void) {
  const query = window.matchMedia(mobile)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

function isMobile() {
  return window.matchMedia(mobile).matches
}

export function PortfolioTheme({ children }: { children: ReactNode }) {
  const useDarkTheme = useSyncExternalStore(subscribe, isMobile, () => false)

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      forcedTheme={useDarkTheme ? "dark" : undefined}
    >
      {children}
    </ThemeProvider>
  )
}
