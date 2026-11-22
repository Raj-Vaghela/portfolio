"use client"

import { useEffect, useState } from "react"

export function PortfolioWelcome() {
  const [width, setWidth] = useState<number | null>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const key = "portfolio-welcome-seen"
    try {
      if (sessionStorage.getItem(key)) return
    } catch {
      return
    }

    const measure = () => setWidth(window.innerWidth)
    const frame = window.requestAnimationFrame(() => {
      try {
        sessionStorage.setItem(key, "1")
        measure()
        window.addEventListener("resize", measure)
      } catch {
        // The homepage stays visible if storage is disabled.
      }
    })
    const dismiss = () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("resize", measure)
      setWidth(null)
    }
    const timeout = window.setTimeout(dismiss, 1950)
    window.addEventListener("pointerdown", dismiss)
    window.addEventListener("keydown", dismiss)
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
      window.removeEventListener("resize", measure)
      window.removeEventListener("pointerdown", dismiss)
      window.removeEventListener("keydown", dismiss)
    }
  }, [])

  if (!width) return null

  const letterWidth = Math.min(280, Math.max(135, width * .35))
  const viewWidth = Math.round(width * 200 / letterWidth)
  const left = Math.round((200 - viewWidth) / 2)
  const right = left + viewWidth

  return (
    <div className="portfolio-welcome" aria-hidden="true">
      <svg viewBox={`${left} 12 ${viewWidth} 132`} fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round">
        <path pathLength="1" d={`
          M ${left - 3} 95
          C ${Math.round(left * .54)} 95 -16 98 18 79
          C 30 72 42 59 44 48
          C 47 35 35 36 33 48
          C 31 60 45 64 58 58
          C 51 68 42 83 45 89
          C 49 99 62 88 74 75
          C 88 60 102 59 112 66
          C 105 55 94 59 83 70
          C 72 81 69 93 77 96
          C 86 99 103 86 114 65
          C 109 77 103 91 110 95
          C 118 100 133 83 145 70
          C 154 61 157 55 156 49
          C 155 43 149 44 148 50
          C 146 54 152 58 159 55
          C 154 71 146 91 136 108
          C 124 129 112 137 104 131
          C 94 123 108 108 132 100
          C 154 92 172 83 188 77
          C 215 67 ${Math.round(right * .82)} 76 ${right + 3} 76
        `} />
      </svg>
    </div>
  )
}
