"use client"

import { useEffect, useState } from "react"

export function PortfolioWelcome() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const key = "portfolio-welcome-seen"
    try {
      if (sessionStorage.getItem(key)) return
    } catch {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      try {
        sessionStorage.setItem(key, "1")
        setVisible(true)
      } catch {
        // The homepage stays visible if storage is disabled.
      }
    })
    const dismiss = () => {
      window.cancelAnimationFrame(frame)
      setVisible(false)
    }
    const timeout = window.setTimeout(dismiss, 1520)
    window.addEventListener("pointerdown", dismiss)
    window.addEventListener("keydown", dismiss)
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
      window.removeEventListener("pointerdown", dismiss)
      window.removeEventListener("keydown", dismiss)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="portfolio-welcome" aria-hidden="true">
      <svg viewBox="0 0 256 130" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
        <path pathLength="1" d="M24 78c13-7 25-22 31-39 3-10-8-11-12-1-5 13 12 19 28 15-9 14-16 30-5 31 8 1 17-8 26-18 12-14 27-24 38-14-3-7-9-8-16-5-14 6-25 23-22 33 4 12 22 1 36-18-4 13-3 22 6 22 10 0 23-13 38-27-11 29-27 58-45 62-11 3-16-6-10-14 8-12 34-17 56-25 22-8 41-19 57-32" />
        <path className="portfolio-welcome-dot" d="M177 40h.1" />
      </svg>
    </div>
  )
}
