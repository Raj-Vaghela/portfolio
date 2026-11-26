"use client"

import { useEffect, useRef } from "react"
import { dimFor, luminance, luminance8, parseColor, type RGB } from "@/lib/glass-contrast"
import { glassChangeEvent } from "@/lib/glass-appearance"

/**
 * Adaptive legibility for liquid glass.
 *
 * Apple's answer to Liquid Glass legibility was a glass that adapts to what is behind it,
 * a frosted "regular" variant for text, a dimming layer for the clear variant, and a
 * Clear/Tinted choice for people who want more contrast. This does the same on the web,
 * but measures instead of guessing: every surface samples the backdrop beneath it and sets
 * the least tint that keeps its dimmest text at a WCAG contrast target (AA when clear, AAA
 * when tinted or when the visitor asks for more contrast), plus a frost that rises with how
 * busy the backdrop is. Over calm, dark areas the glass stays clear; over bright or busy
 * areas it thickens just enough.
 */

/**
 * "reading" surfaces hold paragraphs and get frost; "control" surfaces hold an icon or label;
 * "text" is type set straight on the backdrop, protected by a soft scrim instead of glass.
 */
export type GlassKind = "reading" | "control" | "text"

interface Surface {
  kind: GlassKind
  backdrop: string
  visible: boolean
  onFrost?: (px: number) => void
  ink?: RGB
  tint?: RGB
  dim?: number
  frost?: number
}

interface Field {
  width: number
  height: number
  pixels: Uint8ClampedArray
}

const CELL = 8
const BINS = 32
const surfaces = new Map<HTMLElement, Surface>()
const fields = new Map<string, Field | null>()
let observer: IntersectionObserver | null = null
let frame = 0
let burstUntil = 0
let started = false

const media = (query: string) => typeof window !== "undefined" && window.matchMedia(query).matches

function mode() {
  const tinted = document.documentElement.dataset.glass === "tinted" || media("(prefers-contrast: more)")
  return { tinted, reduced: media("(prefers-reduced-transparency: reduce)") }
}

/** Draws the backdrop behind `selector` into a small viewport-aligned map, one pixel per cell. */
function buildField(selector: string): Field | null {
  const target = document.querySelector(selector)
  if (!target) return null
  const width = Math.max(1, Math.ceil(window.innerWidth / CELL))
  const height = Math.max(1, Math.ceil(window.innerHeight / CELL))
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext("2d", { willReadFrequently: true })
  if (!context) return null
  context.imageSmoothingQuality = "high"
  context.fillStyle = getComputedStyle(document.body).backgroundColor || "#101116"
  context.fillRect(0, 0, width, height)

  const source = target instanceof HTMLCanvasElement || target instanceof HTMLImageElement ? target : target.querySelector("img")
  if (!source) return null
  const rect = source.getBoundingClientRect()

  if (source instanceof HTMLCanvasElement) {
    context.drawImage(source, rect.left / CELL, rect.top / CELL, rect.width / CELL, rect.height / CELL)
  } else {
    if (!source.complete || !source.naturalWidth) return null
    // Reproduce object-fit: cover and object-position, which is how the wallpaper is drawn.
    const style = getComputedStyle(source)
    const [px, py] = style.objectPosition.split(" ").map((part) => (part.endsWith("%") ? Number.parseFloat(part) / 100 : 0.5))
    const scale = style.objectFit === "cover"
      ? Math.max(rect.width / source.naturalWidth, rect.height / source.naturalHeight)
      : Math.min(rect.width / source.naturalWidth, rect.height / source.naturalHeight)
    const drawWidth = source.naturalWidth * scale
    const drawHeight = source.naturalHeight * scale
    const x = rect.left + (rect.width - drawWidth) * (px ?? 0.5)
    const y = rect.top + (rect.height - drawHeight) * (py ?? 0.5)
    context.save()
    context.beginPath()
    context.rect(rect.left / CELL, rect.top / CELL, rect.width / CELL, rect.height / CELL)
    context.clip()
    context.drawImage(source, x / CELL, y / CELL, drawWidth / CELL, drawHeight / CELL)
    context.restore()
  }

  try {
    return { width, height, pixels: context.getImageData(0, 0, width, height).data }
  } catch {
    // A cross-origin backdrop cannot be read; those surfaces keep their static tint.
    return null
  }
}

function field(selector: string) {
  if (!fields.has(selector) || fields.get(selector) === null) fields.set(selector, buildField(selector))
  return fields.get(selector) ?? null
}

/** The colour to protect: whichever of the surface's text colours contrasts least with its tint. */
function inkFor(element: HTMLElement, tint: RGB, kind: GlassKind) {
  const style = getComputedStyle(element)
  const candidates = [parseColor(style.color)]
  if (kind === "reading") candidates.push(parseColor(style.getPropertyValue("--portfolio-muted")))
  const tintLuminance = luminance(tint)
  let weakest: RGB | null = null
  let gap = Infinity
  for (const colour of candidates) {
    if (!colour) continue
    const distance = Math.abs(luminance(colour) - tintLuminance)
    if (distance < gap) {
      gap = distance
      weakest = colour
    }
  }
  return weakest
}

function evaluate(element: HTMLElement, surface: Surface, settings: ReturnType<typeof mode>) {
  if (element.closest("[data-glass-static]")) return
  const map = field(surface.backdrop)
  if (!map) return

  surface.tint ??= parseColor(getComputedStyle(element).getPropertyValue("--glass-tint")) ?? (surface.kind === "text" ? ([0, 0, 0] as RGB) : undefined)
  if (!surface.tint) return
  surface.ink ??= inkFor(element, surface.tint, surface.kind) ?? undefined
  if (!surface.ink) return

  const rect = element.getBoundingClientRect()
  if (rect.width < 4 || rect.height < 4) return
  // Ignore the rim, where refraction rather than text lives.
  const inset = Math.min(10, rect.width / 4, rect.height / 4)
  const x0 = Math.max(0, Math.floor((rect.left + inset) / CELL))
  const x1 = Math.min(map.width, Math.ceil((rect.right - inset) / CELL))
  const y0 = Math.max(0, Math.floor((rect.top + inset) / CELL))
  const y1 = Math.min(map.height, Math.ceil((rect.bottom - inset) / CELL))
  if (x1 <= x0 || y1 <= y0) return

  const counts = new Uint32Array(BINS)
  const sums = new Float64Array(BINS * 3)
  let total = 0
  let sum = 0
  let sumSquares = 0
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (y * map.width + x) * 4
      const r = map.pixels[i]
      const g = map.pixels[i + 1]
      const b = map.pixels[i + 2]
      const l = luminance8(r, g, b)
      const bin = Math.min(BINS - 1, Math.floor(l * BINS))
      counts[bin]++
      sums[bin * 3] += r
      sums[bin * 3 + 1] += g
      sums[bin * 3 + 2] += b
      total++
      sum += l
      sumSquares += l * l
    }
  }
  if (!total) return

  // The worst 6% of the backdrop decides: brightest under light text, darkest under dark text.
  const lightInk = luminance(surface.ink) > luminance(surface.tint)
  const budget = Math.max(1, Math.round(total * 0.06))
  let seen = 0
  let worst: RGB = [0, 0, 0]
  for (let step = 0; step < BINS; step++) {
    const bin = lightInk ? BINS - 1 - step : step
    if (!counts[bin]) continue
    seen += counts[bin]
    worst = [sums[bin * 3] / counts[bin] / 255, sums[bin * 3 + 1] / counts[bin] / 255, sums[bin * 3 + 2] / counts[bin] / 255]
    if (seen >= budget) break
  }

  const reading = surface.kind === "reading"
  const text = surface.kind === "text"
  const target = settings.tinted ? 7 : 4.5
  // Floors keep clear glass at least as legible as the site's original fixed tint (about 0.75)
  // only where the backdrop asks for it: calm, dark areas may drop to 0.62 and look more liquid.
// Clear mode keeps a visible, refractive scene behind text. Dynamic contrast protection
  // still increases tint where the sampled wallpaper requires it; Tinted keeps its stronger floor.
  const floor = text ? 0 : settings.reduced ? 0.95 : reading ? (settings.tinted ? 0.8 : 0.32) : (settings.tinted ? 0.45 : 0.12)
  const dim = Math.round(dimFor(surface.ink, surface.tint, worst, target, floor, text ? 0.8 : 0.95) * 100) / 100

  const mean = sum / total
  const detail = Math.sqrt(Math.max(0, sumSquares / total - mean * mean))
  // Busy backdrops (lights, faces, edges) cost legibility even when bright pixels are rare,
  // so frost grows with the spread of luminance behind the text.
  const frost = !reading || settings.reduced ? 0 : Math.round(Math.min(settings.tinted ? 18 : 12, (settings.tinted ? 8 : 4) + detail * 160))

  if (dim !== surface.dim) {
    surface.dim = dim
    element.style.setProperty("--glass-dim", String(dim))
  }
  // Frost feeds the lens's own blur, so steps of 3px with a little hysteresis keep it from churning.
  const stepped = Math.round(frost / 3) * 3
  if (surface.frost === undefined || Math.abs(stepped - surface.frost) >= 3) {
    surface.frost = stepped
    element.style.setProperty("--glass-frost", `${stepped}px`)
    surface.onFrost?.(stepped)
  }
}

function run() {
  frame = 0
  const settings = mode()
  for (const [element, surface] of surfaces) {
    if (surface.visible) evaluate(element, surface, settings)
  }
  document.documentElement.dataset.scrolled = window.scrollY > 24 ? "true" : "false"
  // Keep following surfaces while a drawer or modal animates into place.
  if (performance.now() < burstUntil) frame = requestAnimationFrame(run)
}

function schedule(burst = 0) {
  if (burst) burstUntil = Math.max(burstUntil, performance.now() + burst)
  if (!frame) frame = requestAnimationFrame(run)
}

/** Forget measurements that depend on theme, size or the chosen appearance. */
function invalidate(rebuildFields: boolean) {
  if (rebuildFields) fields.clear()
  for (const surface of surfaces.values()) {
    surface.ink = undefined
    surface.tint = undefined
  }
  schedule(700)
}

function start() {
  if (started || typeof window === "undefined") return
  started = true

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const surface = surfaces.get(entry.target as HTMLElement)
      if (surface) surface.visible = entry.isIntersecting
    }
    schedule(700)
  })

  document.addEventListener("scroll", () => schedule(), { capture: true, passive: true })
  let resizeTimer = 0
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => invalidate(true), 150)
  })
  window.addEventListener(glassChangeEvent, () => invalidate(false))
  window.addEventListener("load", () => invalidate(true))
  // Images and the desktop artwork arrive late; pick them up when they do.
  document.addEventListener("load", (event) => {
    if (event.target instanceof HTMLImageElement) invalidate(true)
  }, { capture: true })
  for (const query of ["(prefers-contrast: more)", "(prefers-reduced-transparency: reduce)"]) {
    window.matchMedia(query).addEventListener("change", () => invalidate(false))
  }
  // Theme switches repaint the desktop backdrop canvas a frame later.
  new MutationObserver(() => window.setTimeout(() => invalidate(true), 120))
    .observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
  window.setTimeout(() => invalidate(true), 1200)
}

/** Start adapting `element` to whatever `backdrop` shows behind it. Returns an unregister function. */
export function adaptGlass(element: HTMLElement, kind: GlassKind, backdrop: string, onFrost?: (px: number) => void) {
  start()
  surfaces.set(element, { kind, backdrop, visible: false, onFrost })
  observer?.observe(element)
  return () => {
    observer?.unobserve(element)
    surfaces.delete(element)
    element.style.removeProperty("--glass-dim")
    element.style.removeProperty("--glass-frost")
  }
}

/** Protects type set directly on a photo with a scrim whose strength follows the measured backdrop. */
export function useLegibleText<T extends HTMLElement>(backdrop: string) {
  const ref = useRef<T>(null)
  useEffect(() => (ref.current ? adaptGlass(ref.current, "text", backdrop) : undefined), [backdrop])
  return ref
}
