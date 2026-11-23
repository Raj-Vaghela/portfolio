/** sRGB colour with channels from 0 to 1. */
export type RGB = readonly [number, number, number]

const LINEAR = Array.from({ length: 256 }, (_, i) => {
  const c = i / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
})

const linear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)

/** WCAG relative luminance. */
export function luminance([r, g, b]: RGB) {
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
}

/** Fast luminance for 8-bit channels, used when scanning backdrop pixels. */
export function luminance8(r: number, g: number, b: number) {
  return 0.2126 * LINEAR[r] + 0.7152 * LINEAR[g] + 0.0722 * LINEAR[b]
}

/** WCAG contrast ratio between two colours. */
export function contrast(a: RGB, b: RGB) {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

/** Source-over compositing, as browsers do it: in gamma-encoded sRGB. */
export function over(top: RGB, bottom: RGB, alpha: number): RGB {
  return [
    top[0] * alpha + bottom[0] * (1 - alpha),
    top[1] * alpha + bottom[1] * (1 - alpha),
    top[2] * alpha + bottom[2] * (1 - alpha),
  ]
}

/**
 * The least tint opacity that keeps `ink` at `target` contrast over `backdrop`.
 * Contrast rises monotonically with opacity whenever the tint contrasts with the ink
 * better than the backdrop does, so a bisection finds the threshold.
 */
export function dimFor(ink: RGB, tint: RGB, backdrop: RGB, target: number, floor: number, ceiling: number) {
  if (contrast(ink, over(tint, backdrop, floor)) >= target) return floor
  if (contrast(ink, over(tint, backdrop, ceiling)) < target) return ceiling
  let low = floor
  let high = ceiling
  for (let step = 0; step < 14; step++) {
    const mid = (low + high) / 2
    if (contrast(ink, over(tint, backdrop, mid)) >= target) high = mid
    else low = mid
  }
  return high
}

/** Parses "#rrggbb", "rgb(r g b)", "rgb(r, g, b)" or a bare "r g b" triple. */
export function parseColor(value: string): RGB | null {
  const text = value.trim()
  const hex = text.match(/^#([0-9a-f]{6})$/i)
  if (hex) {
    const n = Number.parseInt(hex[1], 16)
    return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
  }
  const parts = text.replace(/^rgba?\(|\)$/g, "").split(/[\s,/]+/).filter(Boolean).slice(0, 3).map(Number)
  if (parts.length === 3 && parts.every((n) => Number.isFinite(n))) return [parts[0] / 255, parts[1] / 255, parts[2] / 255]
  return null
}
