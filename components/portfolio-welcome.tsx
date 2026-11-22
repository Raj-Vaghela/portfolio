"use client"

import { useEffect, useId, useState } from "react"

export function PortfolioWelcome() {
  const id = useId()
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
    const timeout = window.setTimeout(dismiss, 2150)
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
  const stroke = `
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
    C 118 100 132 85 145 70
    C 151 63 156 58 160 56
    C 156 71 148 91 136 108
    C 124 129 112 137 104 131
    C 94 123 108 108 132 100
    C 154 92 172 83 188 77
    C 215 67 ${Math.round(right * .82)} 76 ${right + 3} 76
  `

  return (
    <div className="portfolio-welcome" aria-hidden="true">
      <svg viewBox={`${left} 12 ${viewWidth} 132`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id={id + "-glass"} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="36" y2="119">
            <stop offset="0" stopColor="var(--welcome-top)" />
            <stop offset=".4" stopColor="var(--welcome-core)" />
            <stop offset=".65" stopColor="var(--welcome-glint)" />
            <stop offset="1" stopColor="var(--welcome-bottom)" />
          </linearGradient>
          <linearGradient id={id + "-shine"} x1="0%" x2="0%" y1="0%" y2="100%">
            <stop stopColor="var(--welcome-glint)" stopOpacity=".92" />
            <stop offset="1" stopColor="var(--welcome-glint)" stopOpacity=".2" />
          </linearGradient>
          <path id={id + "-stroke"} d={stroke} />
          <mask id={id + "-draw"} maskUnits="userSpaceOnUse" x={left} y="12" width={viewWidth} height="132">
            <path d={stroke} pathLength="1" className="portfolio-welcome-trace" stroke="white" strokeWidth="10" />
          </mask>
        </defs>
        <g mask={`url(#${id}-draw)`}>
          <use href={"#" + id + "-stroke"} stroke="var(--welcome-edge)" strokeWidth="6.4" />
          <use href={"#" + id + "-stroke"} stroke={`url(#${id}-glass)`} strokeWidth="4.7" />
          <use href={"#" + id + "-stroke"} stroke={`url(#${id}-shine)`} strokeWidth="1.25" transform="translate(0,-1.15)" />
        </g>
        <circle className="portfolio-welcome-dot" cx="166" cy="42" r="2.9" fill={`url(#${id}-glass)`} stroke="var(--welcome-edge)" strokeWidth="1" />
      </svg>
    </div>
  )
}
