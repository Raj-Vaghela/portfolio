"use client"

import { useEffect, useRef } from "react"

function smoothstep(start: number, end: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)))
  return t * t * (3 - 2 * t)
}

// Distance and inward normal of a sheet whose TOP corners alone are rounded.
// The lens is driven by the actual contour, rather than a vertical screen fade.
function edgeOptics(x: number, y: number, width: number, radius: number) {
  let distance = y
  let nx = 0
  let ny = 1

  if (x < radius && y < radius) {
    const dx = radius - x
    const dy = radius - y
    const length = Math.max(.001, Math.hypot(dx, dy))
    distance = radius - length
    nx = dx / length
    ny = dy / length
  } else if (x > width - radius && y < radius) {
    const dx = width - radius - x
    const dy = radius - y
    const length = Math.max(.001, Math.hypot(dx, dy))
    distance = radius - length
    nx = dx / length
    ny = dy / length
  } else if (x < radius && x < distance) {
    distance = x
    nx = 1
    ny = 0
  } else if (x > width - radius && width - x < distance) {
    distance = width - x
    nx = -1
    ny = 0
  }

  // A pronounced thin lip, followed by a subtle counter-bend that makes
  // wallpaper details appear to wrap underneath the thickness of the edge.
  const lip = Math.pow(1 - smoothstep(0, 17, Math.max(0, distance)), 1.3)
  const counterbend = smoothstep(7, 16, distance) * (1 - smoothstep(16, 32, distance))
  const strength = 19 * lip - 5.2 * counterbend
  return [nx * strength, ny * strength] as const
}

function roundedSheetPath(ctx: CanvasRenderingContext2D, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height)
  ctx.beginPath()
  ctx.moveTo(0, height)
  ctx.lineTo(0, r)
  ctx.quadraticCurveTo(0, 0, r, 0)
  ctx.lineTo(width - r, 0)
  ctx.quadraticCurveTo(width, 0, width, r)
  ctx.lineTo(width, height)
  ctx.closePath()
}

function highlightRim(ctx: CanvasRenderingContext2D, width: number, radius: number) {
  // A caustic, a hairline, and an inset reflection follow the SAME contour.
  const topLight = ctx.createLinearGradient(0, 0, width, 0)
  topLight.addColorStop(0, "rgba(242,248,255,.68)")
  topLight.addColorStop(.13, "rgba(250,253,255,.40)")
  topLight.addColorStop(.44, "rgba(231,244,255,.25)")
  topLight.addColorStop(.72, "rgba(233,244,255,.35)")
  topLight.addColorStop(.94, "rgba(255,255,255,.75)")
  topLight.addColorStop(1, "rgba(215,235,255,.52)")

  function line(inset: number) {
    const r = Math.max(2, radius - inset)
    ctx.beginPath()
    ctx.moveTo(inset, radius + 15)
    ctx.lineTo(inset, radius)
    ctx.quadraticCurveTo(inset, inset, radius, inset)
    ctx.lineTo(width - radius, inset)
    ctx.quadraticCurveTo(width - inset, inset, width - inset, radius)
    ctx.lineTo(width - inset, radius + 15)
  }

  ctx.save()
  line(2)
  ctx.strokeStyle = "rgba(10,23,42,.52)"
  ctx.lineWidth = 6
  ctx.shadowColor = "rgba(0,10,29,.32)"
  ctx.shadowBlur = 12
  ctx.stroke()
  ctx.restore()

  ctx.save()
  line(1.3)
  ctx.strokeStyle = topLight
  ctx.lineWidth = 1.65
  ctx.shadowBlur = 5
  ctx.shadowColor = "rgba(202,233,255,.44)"
  ctx.stroke()
  ctx.restore()

  // A second, faint line supplies the thickness that the original rim lacked.
  ctx.save()
  line(5.7)
  ctx.strokeStyle = "rgba(223,243,255,.21)"
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.restore()
}

export function DrawerRim() {
  const surface = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = surface.current
    const wrapper = canvas?.parentElement
    const context = canvas?.getContext("2d")
    if (!canvas || !wrapper || !context) return

    const reduceTransparency = window.matchMedia("(prefers-reduced-transparency: reduce)")
    let frame = 0
    let previousGeometry = ""

    function render() {
      frame = requestAnimationFrame(render)
      const photo = document.querySelector<HTMLImageElement>("#portfolio-mobile-portrait img")
      if (!photo?.naturalWidth || !canvas || !wrapper || !context) return

      const bounds = canvas.getBoundingClientRect()
      const imageBounds = photo.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      if (bounds.width <= 0 || bounds.height <= 0 || imageBounds.width <= 0 || imageBounds.height <= 0) return

      const geometry = [bounds.left, bounds.top, bounds.width, bounds.height, imageBounds.left,
        imageBounds.top, imageBounds.width, imageBounds.height, photo.currentSrc, dpr].join("|")
      if (geometry === previousGeometry) return
      previousGeometry = geometry

      const cover = Math.max(imageBounds.width / photo.naturalWidth, imageBounds.height / photo.naturalHeight)
      const positions = getComputedStyle(photo).objectPosition.trim().split(/\s+/)
      const percent = (token: string | undefined, fallback: number) => {
        if (!token || token === "center") return 50
        if (token === "left" || token === "top") return 0
        if (token === "right" || token === "bottom") return 100
        const value = Number.parseFloat(token)
        return Number.isFinite(value) ? value : fallback
      }
      const imageLeft = imageBounds.left + (imageBounds.width - photo.naturalWidth * cover) * percent(positions[0], 50) / 100
      const imageTop = imageBounds.top + (imageBounds.height - photo.naturalHeight * cover) * percent(positions[1], 50) / 100

      const w = Math.ceil(bounds.width * dpr)
      const h = Math.ceil(bounds.height * dpr)
      const radius = Number.parseFloat(getComputedStyle(wrapper).borderTopLeftRadius) || 30
      if (canvas.width !== w) canvas.width = w
      if (canvas.height !== h) canvas.height = h
      context.clearRect(0, 0, w, h)

      const xOrigin = bounds.left - imageLeft
      const yOrigin = bounds.top - imageTop
      const rowStep = Math.max(1, Math.ceil(dpr))
      const edgePixels = Math.min(Math.ceil((radius + 36) * dpr), Math.floor(w / 2))
      const colStep = Math.max(3, Math.ceil(2 * dpr))

      function sample(left: number, right: number, row: number, band: number) {
        if (right <= left || !context || !photo) return
        const x1 = left / dpr
        const x2 = right / dpr
        const y = row / dpr
        const [dx1, dy1] = edgeOptics(x1, y, bounds.width, radius)
        const [dx2, dy2] = edgeOptics(x2, y, bounds.width, radius)
        const sourceWidth = Math.max(.2, x2 - x1 + dx2 - dx1)
        try {
          context.drawImage(photo, (xOrigin + x1 + dx1) / cover,
            (yOrigin + y + (dy1 + dy2) / 2) / cover,
            sourceWidth / cover, band / (dpr * cover),
            left, row, right - left, band)
        } catch {
          // An image source may change during navigation; try again next frame.
          previousGeometry = ""
        }
      }

      for (let row = 0; row < h; row += rowStep) {
        const band = Math.min(rowStep, h - row)
        sample(edgePixels, w - edgePixels, row, band)
        for (let x = 0; x < edgePixels; x += colStep) {
          const end = Math.min(x + colStep, edgePixels)
          sample(x, end, row, band)
          sample(w - end, w - x, row, band)
        }
      }

      context.save()
      context.scale(dpr, dpr)
      context.globalCompositeOperation = "destination-in"
      roundedSheetPath(context, bounds.width, bounds.height, radius)
      context.fill()
      context.globalCompositeOperation = "source-over"
      roundedSheetPath(context, bounds.width, bounds.height, radius)
      context.clip()

      // Very light material tint, not a black fade. The dark interior of the
      // drawer belongs to its contents, while this lens is mainly transparent.
      const tint = context.createLinearGradient(0, 0, 0, bounds.height)
      tint.addColorStop(0, "rgba(12, 26, 47, .14)")
      tint.addColorStop(.55, "rgba(15, 31, 53, .08)")
      tint.addColorStop(1, "rgba(15, 31, 53, 0)")
      context.fillStyle = tint
      context.fillRect(0, 0, bounds.width, bounds.height)
      highlightRim(context, bounds.width, radius)
      context.restore()
    }

    function updateTransparency() {
      cancelAnimationFrame(frame)
      previousGeometry = ""
      if (!reduceTransparency.matches) frame = requestAnimationFrame(render)
    }
    updateTransparency()
    reduceTransparency.addEventListener("change", updateTransparency)
    return () => {
      cancelAnimationFrame(frame)
      reduceTransparency.removeEventListener("change", updateTransparency)
    }
  }, [])

  return <div className="portfolio-drawer-rim" aria-hidden="true"><canvas ref={surface} /></div>
}
