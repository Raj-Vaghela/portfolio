"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20" />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group relative w-10 h-10 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/20 transition-all flex items-center justify-center overflow-hidden"
      aria-label="Toggle theme"
    >
      <Sun className="w-5 h-5 text-amber-500 absolute transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="w-5 h-5 text-blue-300 absolute transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </button>
  )
}

