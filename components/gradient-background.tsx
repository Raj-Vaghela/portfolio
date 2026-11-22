"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function GradientBackground() {
  const surface = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = surface.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const dark = resolvedTheme !== "light"
    const draw = () => {
      const width = Math.max(1, canvas.clientWidth)
      const height = Math.max(1, canvas.clientHeight)
      canvas.width = width
      canvas.height = height

      context.fillStyle = dark ? "#101116" : "#f5f5f7"
      context.fillRect(0, 0, width, height)

      const light = context.createRadialGradient(width * .75, height * .16, 0, width * .75, height * .16, width * .62)
      light.addColorStop(0, dark ? "#242b3d" : "#e9ecf6")
      light.addColorStop(1, dark ? "#242b3d00" : "#e9ecf600")
      context.fillStyle = light
      context.fillRect(0, 0, width, height)
    }

    draw()
    const observer = new ResizeObserver(draw)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [resolvedTheme])

  return <canvas ref={surface} id="portfolio-glass-backdrop" aria-hidden="true" className="portfolio-backdrop" />
}
