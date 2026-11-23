"use client"

import { useEffect, useRef } from "react"
import { wallpaperShadeStops } from "@/lib/wallpaper"

function lensOffset(x: number, y: number, width: number, radius: number) {
  const centerX = Math.max(radius, Math.min(x, width - radius))
  const normalX = centerX - x
  const normalY = Math.max(0, radius - y)
  const length = Math.hypot(normalX, normalY)
  // Follow the inward normal of the top edge and its rounded corners.
  const depth = y >= radius ? Math.min(x, width - x) : radius - length
  const strength = Math.min(30, radius * 1.02) * (1 - Math.max(0, Math.min(1, depth / radius)))
  return length ? [strength * normalX / length, strength * normalY / length] : [0, 0]
}

function drawRimHighlights(context: CanvasRenderingContext2D, width: number, radius: number) {
  const light = context.createLinearGradient(0, 0, width, 0)
  light.addColorStop(0, "rgba(225, 241, 255, .25)")
  light.addColorStop(.075, "rgba(246, 251, 255, .79)")
  light.addColorStop(.4, "rgba(228, 240, 255, .18)")
  light.addColorStop(.84, "rgba(228, 240, 255, .28)")
  light.addColorStop(.955, "rgba(248, 252, 255, .7)")
  light.addColorStop(1, "rgba(225, 241, 255, .22)")

  for (const inset of [1, 3.6]) {
    context.beginPath()
    context.moveTo(inset, radius + 8)
    context.arcTo(inset, inset, radius, inset, radius - inset)
    context.arcTo(width - inset, inset, width - inset, radius, radius - inset)
    context.lineTo(width - inset, radius + 8)
    context.strokeStyle = light
    context.globalAlpha = inset === 1 ? 1 : .23
    context.lineWidth = inset === 1 ? 1.1 : 2.2
    context.stroke()
  }
}

export function DrawerRim() {
  const surface = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = surface.current
    const rimSurface = canvas?.parentElement
    const context = canvas?.getContext("2d")
    if (!canvas || !rimSurface || !context) return

    const transparency = window.matchMedia("(prefers-reduced-transparency: reduce)")
    let frame = 0
    let previousGeometry = ""

    function draw() {
      frame = requestAnimationFrame(draw)
      const photo = document.querySelector<HTMLImageElement>("#portfolio-mobile-portrait img")
      if (!photo?.naturalWidth || !canvas || !rimSurface || !context) return

      const rim = canvas.getBoundingClientRect()
      const backdrop = photo.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio, 2)
      if (!rim.width || !rim.height || !backdrop.width || !backdrop.height) return

      const geometry = [rim.x, rim.y, rim.width, rim.height, backdrop.x, backdrop.y,
        backdrop.width, backdrop.height, pixelRatio, photo.currentSrc].join("|")
      if (geometry === previousGeometry) return
      previousGeometry = geometry

      const coverScale = Math.max(backdrop.width / photo.naturalWidth, backdrop.height / photo.naturalHeight)
      // CSS object-position accepts keywords (e.g. "center 46%"), not just percentages.
      // parseFloat("center") is NaN and previously broke the entire canvas refraction.
      const positionTokens = getComputedStyle(photo).objectPosition.trim().split(/\\s+/)
      const positionPercent = (value: string | undefined, fallback: number) => {
        if (!value) return fallback
        if (value === "center") return 50
        if (value === "left" || value === "top") return 0
        if (value === "right" || value === "bottom") return 100
        const parsed = Number.parseFloat(value)
        return Number.isFinite(parsed) ? parsed : fallback
      }
      const positionX = positionPercent(positionTokens[0], 50)
      const positionY = positionPercent(positionTokens[1], 50)
      const imageLeft = backdrop.left + (backdrop.width - photo.naturalWidth * coverScale) * positionX / 100
      const imageTop = backdrop.top + (backdrop.height - photo.naturalHeight * coverScale) * positionY / 100
      const width = Math.ceil(rim.width * pixelRatio)
      const height = Math.ceil(rim.height * pixelRatio)
      const radius = parseFloat(getComputedStyle(rimSurface).borderTopLeftRadius)
      if (canvas.width !== width) canvas.width = width
      if (canvas.height !== height) canvas.height = height
      context.clearRect(0, 0, width, height)

      const step = Math.ceil(pixelRatio)
      const cornerWidth = Math.min(Math.ceil((radius + 12) * pixelRatio), Math.floor(width / 2))
      const columnStep = 3 * step
      const originX = rim.left - imageLeft
      const originY = rim.top - imageTop

      function drawBand(left: number, right: number, row: number, height: number) {
        if (right <= left || !context || !photo) return
        const x = left / pixelRatio
        const y = row / pixelRatio
        const [leftX, leftY] = lensOffset(x, y, rim.width, radius)
        const [rightX, rightY] = lensOffset(right / pixelRatio, y, rim.width, radius)
        const sourceWidth = (right - left) / pixelRatio + rightX - leftX
        context.drawImage(photo,
          (originX + x + leftX) / coverScale, (originY + y + (leftY + rightY) / 2) / coverScale,
          sourceWidth / coverScale, height / (pixelRatio * coverScale),
          left, row, right - left, height)
      }

      for (let row = 0; row < height; row += step) {
        const band = Math.min(step, height - row)
        drawBand(cornerWidth, width - cornerWidth, row, band)
        for (let edge = 0; edge < cornerWidth; edge += columnStep) {
          const end = Math.min(edge + columnStep, cornerWidth)
          drawBand(edge, end, row, band)
          drawBand(width - end, width - edge, row, band)
        }
      }

      context.save()
      context.scale(pixelRatio, pixelRatio)
      // Apply the same lighting as the wallpaper so the lens reads as clear glass.
      const shade = context.createLinearGradient(0, backdrop.top - rim.top, 0, backdrop.bottom - rim.top)
      for (const [position, opacity] of wallpaperShadeStops) {
        shade.addColorStop(position, `rgba(0, 0, 0, ${opacity})`)
      }
      context.globalCompositeOperation = "source-atop"
      context.fillStyle = shade
      context.fillRect(0, 0, rim.width, rim.height)
      context.globalCompositeOperation = "source-over"
      drawRimHighlights(context, rim.width, radius)
      context.restore()
    }

    function updateTransparency() {
      cancelAnimationFrame(frame)
      previousGeometry = ""
      if (!transparency.matches) frame = requestAnimationFrame(draw)
    }

    updateTransparency()
    transparency.addEventListener("change", updateTransparency)
    return () => {
      cancelAnimationFrame(frame)
      transparency.removeEventListener("change", updateTransparency)
    }
  }, [])

  return <div className="portfolio-drawer-rim" aria-hidden="true"><canvas ref={surface} /></div>
}
