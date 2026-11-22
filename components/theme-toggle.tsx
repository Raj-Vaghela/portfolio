"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useMounted } from "@/lib/use-mounted"
import { GlassOptics } from "@/components/glass-optics"

export function ThemeToggle({ optical = false, backdropSelector }: { optical?: boolean; backdropSelector?: string }) {
  const mounted = useMounted()
  const { theme, setTheme } = useTheme()


  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20" />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={"group relative flex size-10 items-center justify-center overflow-hidden rounded-full transition-all " + (optical ? "portfolio-glass-button" : "liquid-glass-control")}
      aria-label="Toggle theme"
    >
      {optical && <GlassOptics surface={backdropSelector ? "photoButton" : "button"} backdropSelector={backdropSelector} />}
      <Sun className="w-5 h-5 text-amber-500 absolute transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="w-5 h-5 text-blue-300 absolute transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </button>
  )
}

