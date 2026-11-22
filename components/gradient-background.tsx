"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function GradientBackground() {
  const surface = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = surface.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    const dark = resolvedTheme !== "light"

    const draw = () => {
      const width = Math.max(1, canvas.clientWidth)
      const height = Math.max(1, canvas.clientHeight)
      const scale = Math.min(1, 1920 / width, 1200 / height)
      canvas.width = Math.round(width * scale)
      canvas.height = Math.round(height * scale)

      const w = canvas.width
      const h = canvas.height
      const base = context.createLinearGradient(0, 0, w, h)
      base.addColorStop(0, dark ? "#0b162b" : "#f3f9ff")
      base.addColorStop(.58, dark ? "#101f38" : "#d6e7fb")
      base.addColorStop(1, dark ? "#071329" : "#eef2ff")
      context.fillStyle = base
      context.fillRect(0, 0, w, h)

      const ribbon = context.createLinearGradient(0, 0, w, h)
      ribbon.addColorStop(0, dark ? "#6257bc" : "#a29bec")
      ribbon.addColorStop(.42, dark ? "#254f91" : "#8dbbef")
      ribbon.addColorStop(.74, dark ? "#176d89" : "#86d8e1")
      ribbon.addColorStop(1, dark ? "#3e5fbd" : "#a0aaf0")
      context.fillStyle = ribbon
      context.beginPath()
      context.moveTo(-.06 * w, .31 * h)
      context.bezierCurveTo(.25 * w, .22 * h, .13 * w, .78 * h, .46 * w, .84 * h)
      context.bezierCurveTo(.65 * w, .88 * h, .85 * w, .2 * h, 1.08 * w, .32 * h)
      context.lineTo(1.08 * w, .64 * h)
      context.bezierCurveTo(.86 * w, .51 * h, .73 * w, 1.09 * h, .47 * w, 1.04 * h)
      context.bezierCurveTo(.16 * w, 1.01 * h, .16 * w, .45 * h, -.06 * w, .58 * h)
      context.closePath()
      context.fill()

      context.strokeStyle = dark ? "#a8d8f080" : "#ffffffbb"
      context.lineWidth = Math.max(2, h * .007)
      context.beginPath()
      context.moveTo(-.06 * w, .31 * h)
      context.bezierCurveTo(.25 * w, .22 * h, .13 * w, .78 * h, .46 * w, .84 * h)
      context.bezierCurveTo(.65 * w, .88 * h, .85 * w, .2 * h, 1.08 * w, .32 * h)
      context.stroke()

      const topLight = context.createRadialGradient(w * .78, 0, 0, w * .78, 0, w * .42)
      topLight.addColorStop(0, dark ? "#34759b70" : "#ffffffb5")
      topLight.addColorStop(1, dark ? "#34759b00" : "#ffffff00")
      context.fillStyle = topLight
      context.fillRect(0, 0, w, h)
    }

    draw()
    const observer = new ResizeObserver(draw)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [resolvedTheme])

  return (
    <canvas
      ref={surface}
      id="portfolio-glass-backdrop"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 size-full bg-sky-50 dark:bg-slate-950"
    />
  )
}
