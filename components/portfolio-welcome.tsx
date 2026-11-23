"use client"

import { useEffect, useId, useState } from "react"

const coinRim = "M -2.65 -9.9 H 2.65 L 7.25 -7.25 9.9 -2.65 V 2.65 L 7.25 7.25 2.65 9.9 H -2.65 L -7.25 7.25 -9.9 2.65 V -2.65 L -7.25 -7.25 Z"
const poundStamp = "M 3.1 -3.85 C 2.4 -5.35 .25 -5.65 -1.1 -4.5 C -2.5 -3.35 -1.8 -1.25 -1.48 .2 C -1.15 1.9 -1.9 3.1 -3.2 4.25 H 3.45 M -3.2 -.1 H 1.65"

export function PortfolioWelcome({ ready }: { ready: boolean }) {
  const id = useId()
  const [width, setWidth] = useState(390)
  useEffect(() => {
    const measure = () => setWidth(window.innerWidth)
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

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
    <div className="portfolio-welcome" data-ready={ready ? "true" : "false"} role="status" aria-label={ready ? "Portfolio ready" : "Loading portfolio"} aria-live="polite">
      <svg viewBox={`${left} 12 ${viewWidth} 132`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id={id + "-glass"} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="36" y2="119">
            <stop offset="0" stopColor="var(--welcome-top)" />
            <stop offset=".34" stopColor="var(--welcome-core)" />
            <stop offset=".57" stopColor="var(--welcome-glint)" />
            <stop offset=".72" stopColor="var(--welcome-core)" />
            <stop offset="1" stopColor="var(--welcome-bottom)" />
          </linearGradient>
          <linearGradient id={id + "-shine"} x1="0%" x2="0%" y1="0%" y2="100%">
            <stop stopColor="var(--welcome-glint)" stopOpacity=".92" />
            <stop offset="1" stopColor="var(--welcome-glint)" stopOpacity=".2" />
          </linearGradient>
          <linearGradient id={id + "-sweep"} gradientUnits="userSpaceOnUse" x1="-56" x2="56">
            <stop stopColor="#fff" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".88" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from={`${left - 56} 0`}
              to={`${right + 56} 0`}
              begin="0.18s"
              dur="1.47s"
              fill="freeze"
            />
          </linearGradient>
          <linearGradient id={id + "-coin-rim"} x1="14%" y1="4%" x2="89%" y2="91%">
            <stop stopColor="#fff0b3" />
            <stop offset=".27" stopColor="#e7b85d" />
            <stop offset=".48" stopColor="#b07726" />
            <stop offset=".69" stopColor="#f8d37b" />
            <stop offset="1" stopColor="#93571e" />
          </linearGradient>
          <linearGradient id={id + "-coin-core"} x1="20%" y1="4%" x2="75%" y2="93%">
            <stop stopColor="#fff9de" />
            <stop offset=".55" stopColor="#e2d2aa" />
            <stop offset="1" stopColor="#aa9569" />
          </linearGradient>
          <radialGradient id={id + "-coin-shadow"}>
            <stop stopColor="#38200b" stopOpacity=".55" />
            <stop offset="1" stopColor="#38200b" stopOpacity="0" />
          </radialGradient>
          <path id={id + "-stroke"} d={stroke} />
          <mask id={id + "-draw"} maskUnits="userSpaceOnUse" x={left} y="12" width={viewWidth} height="132">
            <path d={stroke} pathLength="1" className="portfolio-welcome-trace" stroke="white" strokeWidth="16" />
          </mask>
        </defs>
        <g mask={`url(#${id}-draw)`}>
          <use href={"#" + id + "-stroke"} stroke="var(--welcome-depth)" strokeWidth="11" transform="translate(0,1.5)" />
          <use href={"#" + id + "-stroke"} stroke="var(--welcome-edge)" strokeWidth="10.6" />
          <use href={"#" + id + "-stroke"} stroke={`url(#${id}-glass)`} strokeWidth="7.8" />
          <use href={"#" + id + "-stroke"} stroke={`url(#${id}-shine)`} strokeWidth="1.7" transform="translate(0,-2.25)" />
          <use href={"#" + id + "-stroke"} stroke={`url(#${id}-sweep)`} strokeWidth="2.1" transform="translate(0,-1.9)" />
        </g>
        <g transform="translate(165.5 39.5)">
          <g className="portfolio-welcome-coin">
            <g className="portfolio-welcome-coin-face">
              <ellipse cy="9.4" rx="11" ry="3.7" fill={`url(#${id}-coin-shadow)`} />
              <path d={coinRim} transform="translate(0 1.55)" fill="#815024" stroke="#583717" strokeWidth=".55" />
              <path d="M -5.1 9.25 L -4 10 M -2.7 10.4 V 11.05 M 0 10.4 V 11.05 M 2.7 10.4 V 11.05 M 5.1 9.25 L 4 10" stroke="#e9b362" strokeOpacity=".65" strokeWidth=".42" />
              <path d={coinRim} fill={`url(#${id}-coin-rim)`} stroke="#6b441c" strokeWidth=".55" />
              <path d="M -8.85 -2.55 L -6.48 -6.48 -2.5 -8.83 H 2.5 L 6.48 -6.48" stroke="#fff8d4" strokeOpacity=".85" strokeWidth=".65" />
              <circle r="6.95" fill={`url(#${id}-coin-core)`} stroke="#8b642e" strokeWidth=".56" />
              <path d="M 5.94 2.7 A 6.53 6.53 0 0 1 -3.1 5.72" stroke="#fff5d5" strokeOpacity=".58" strokeWidth=".48" />
              <path d={poundStamp} transform="translate(0 .55)" stroke="#fff4ce" strokeOpacity=".7" strokeWidth="1.65" />
              <path d={poundStamp} stroke="#69431f" strokeWidth="1.46" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
