"use client"

import { useEffect, useRef } from "react"

function lensOffset(x: number, y: number, width: number, radius: number) {
  const centerX = Math.max(radius, Math.min(x, width - radius))
  const normalX = centerX - x
  const normalY = Math.max(0, radius - y)
  const length = Math.hypot(normalX, normalY)
  // Follow the inward normal of the top edge and its rounded corners.
  const depth = y >= radius ? Math.min(x, width - x) : radius - length
  const strength = Math.min(25, radius * .85) * (1 - Math.max(0, Math.min(1, depth / radius)))
  return length ? [strength * normalX / length, strength * normalY / length] : [0, 0]
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
      const [positionX, positionY] = getComputedStyle(photo).objectPosition.split(" ").map(parseFloat)
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
