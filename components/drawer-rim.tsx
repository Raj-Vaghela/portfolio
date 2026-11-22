"use client"

import { useEffect, useRef } from "react"

export function DrawerRim() {
  const surface = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = surface.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const transparency = window.matchMedia("(prefers-reduced-transparency: reduce)")
    let frame = 0
    let previousGeometry = ""

    function draw() {
      frame = requestAnimationFrame(draw)
      const photo = document.querySelector<HTMLImageElement>("#portfolio-mobile-portrait img")
      if (!photo?.naturalWidth || !canvas || !context) return

      const rim = canvas.getBoundingClientRect()
      const backdrop = photo.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio, 2)
      if (!rim.width || !rim.height || !backdrop.width || !backdrop.height) return

      const geometry = [rim.x, rim.y, rim.width, rim.height, backdrop.x, backdrop.y,
        backdrop.width, backdrop.height, pixelRatio, photo.currentSrc].join("|")
      if (geometry === previousGeometry) return
      previousGeometry = geometry

      const coverScale = Math.max(backdrop.width / photo.naturalWidth, backdrop.height / photo.naturalHeight)
      const [positionX, positionY] = getComputedStyle(photo).objectPosition.split(" ").map(parseFloat)
      const imageLeft = backdrop.left + (backdrop.width - photo.naturalWidth * coverScale) * positionX / 100
      const imageTop = backdrop.top + (backdrop.height - photo.naturalHeight * coverScale) * positionY / 100
      const width = Math.ceil(rim.width * pixelRatio)
      const height = Math.ceil(rim.height * pixelRatio)
      if (canvas.width !== width) canvas.width = width
      if (canvas.height !== height) canvas.height = height
      context.clearRect(0, 0, width, height)

      // Sample the same cover crop as the wallpaper, bending it most just inside the bevel.
      const step = Math.ceil(pixelRatio)
      for (let row = 0; row < height; row += step) {
        const distance = row / pixelRatio
        const bevel = Math.sin(Math.PI * Math.min(1, (distance + 2) / 30))
        const sampleWidth = rim.width / (coverScale * (1 + .045 * bevel))
        const sampleX = (rim.left + rim.width / 2 - imageLeft) / coverScale - sampleWidth / 2
        const sampleY = (rim.top + distance + 23 * bevel - imageTop) / coverScale
        const band = Math.min(step, height - row)
        context.drawImage(photo, sampleX, sampleY, sampleWidth, band / (pixelRatio * coverScale), 0, row, width, band)
      }
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
