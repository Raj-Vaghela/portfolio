"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function GradientBackground({ desktopArtwork = false }: { desktopArtwork?: boolean }) {
  const surface = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = surface.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const dark = resolvedTheme !== "light"
    const desktop = window.matchMedia("(min-width: 64rem)")
    const artwork = desktopArtwork ? new Image() : null

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

      if (artwork?.naturalWidth && desktop.matches) {
        const scale = Math.max(width / artwork.naturalWidth, height / artwork.naturalHeight)
        const imageWidth = artwork.naturalWidth * scale
        const imageHeight = artwork.naturalHeight * scale
        context.save()
        if (!dark) {
          context.filter = "invert(1) hue-rotate(180deg)"
          context.globalCompositeOperation = "multiply"
          context.globalAlpha = .55
        }
        context.drawImage(artwork, width - imageWidth, (height - imageHeight) / 2, imageWidth, imageHeight)
        context.restore()

        const shade = context.createLinearGradient(0, 0, width * .72, 0)
        shade.addColorStop(0, dark ? "#080d18ef" : "#f5f5f7f0")
        shade.addColorStop(.55, dark ? "#080d1885" : "#f5f5f7bb")
        shade.addColorStop(1, dark ? "#080d1800" : "#f5f5f700")
        context.fillStyle = shade
        context.fillRect(0, 0, width, height)
      }
    }

    const loadArtwork = () => {
      if (artwork && desktop.matches && !artwork.getAttribute("src")) {
        artwork.src = "/desktop-glass.webp"
      }
      draw()
    }
    artwork?.addEventListener("load", draw)
    if (desktopArtwork) desktop.addEventListener("change", loadArtwork)
    loadArtwork()
    const observer = new ResizeObserver(draw)
    observer.observe(canvas)
    return () => {
      observer.disconnect()
      artwork?.removeEventListener("load", draw)
      if (desktopArtwork) desktop.removeEventListener("change", loadArtwork)
    }
  }, [desktopArtwork, resolvedTheme])

  return <canvas ref={surface} id="portfolio-glass-backdrop" aria-hidden="true" className="portfolio-backdrop" />
}
