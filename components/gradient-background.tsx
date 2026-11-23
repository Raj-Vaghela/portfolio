"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function GradientBackground({ desktopArtwork = false, onReady }: { desktopArtwork?: boolean; onReady?: () => void }) {
  const surface = useRef<HTMLCanvasElement>(null)
  const { forcedTheme, resolvedTheme } = useTheme()
  const dark = (forcedTheme ?? resolvedTheme) !== "light"

  useEffect(() => {
    const canvas = surface.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const desktop = window.matchMedia("(min-width: 64rem)")
    const artwork = desktopArtwork ? new Image() : null
    let signalled = false
    const ready = () => { if (!signalled) { signalled = true; onReady?.() } }

    const draw = () => {
      const width = Math.max(1, canvas.clientWidth)
      const height = Math.max(1, canvas.clientHeight)
      canvas.width = width
      canvas.height = height

      context.fillStyle = dark ? "#101116" : "#f5f5f7"
      context.fillRect(0, 0, width, height)

      if (!artwork?.naturalWidth || !desktop.matches) {
        const light = context.createRadialGradient(width * .75, height * .16, 0, width * .75, height * .16, width * .62)
        light.addColorStop(0, dark ? "#242b3d" : "#e9ecf6")
        light.addColorStop(1, dark ? "#242b3d00" : "#e9ecf600")
        context.fillStyle = light
        context.fillRect(0, 0, width, height)
      } else {
        const sceneWidth = width * .58
        const cropX = Math.round(artwork.naturalWidth * .43)
        const cropWidth = artwork.naturalWidth - cropX
        const sceneHeight = sceneWidth * artwork.naturalHeight / cropWidth

        const sceneTop = Math.max(height - sceneHeight, height * .77 - sceneHeight * .48)
        context.save()
        context.globalAlpha = dark ? .78 : .52
        context.drawImage(artwork, cropX, 0, cropWidth, artwork.naturalHeight, 0, sceneTop, sceneWidth, sceneHeight)
        context.restore()

        const base = dark ? "16 17 22" : "245 245 247"
        const sky = context.createLinearGradient(0, height * .46, 0, height * .89)
        sky.addColorStop(0, `rgb(${base})`)
        sky.addColorStop(.48, `rgb(${base} / 80%)`)
        sky.addColorStop(1, `rgb(${base} / 0%)`)
        context.fillStyle = sky
        context.fillRect(0, 0, sceneWidth, height)

        const edge = context.createLinearGradient(width * .32, 0, sceneWidth, 0)
        edge.addColorStop(0, `rgb(${base} / 0%)`)
        edge.addColorStop(.63, `rgb(${base} / 55%)`)
        edge.addColorStop(1, `rgb(${base})`)
        context.fillStyle = edge
        context.fillRect(width * .32, 0, sceneWidth - width * .32, height)
      }
      if (!desktop.matches || !desktopArtwork || artwork?.complete) ready()
    }

    const loadArtwork = () => {
      if (artwork && desktop.matches && !artwork.getAttribute("src")) {
        artwork.src = "/desktop-london.webp"
      }
      draw()
    }
    artwork?.addEventListener("load", draw)
    artwork?.addEventListener("error", ready)
    if (desktopArtwork) desktop.addEventListener("change", loadArtwork)
    loadArtwork()
    const observer = new ResizeObserver(draw)
    observer.observe(canvas)
    return () => {
      observer.disconnect()
      artwork?.removeEventListener("load", draw)
      artwork?.removeEventListener("error", ready)
      if (desktopArtwork) desktop.removeEventListener("change", loadArtwork)
    }
  }, [dark, desktopArtwork, onReady])

  return <canvas ref={surface} id="portfolio-glass-backdrop" aria-hidden="true" className="portfolio-backdrop" />
}
