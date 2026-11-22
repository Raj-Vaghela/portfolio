export const wallpaperShadeStops = [
  [0, .51],
  [.28, .13],
  [.48, 0],
  [.77, .63],
  [1, .83],
] as const

export const wallpaperShade = `linear-gradient(180deg, ${wallpaperShadeStops
  .map(([position, opacity]) => `rgb(0 0 0 / ${opacity}) ${position * 100}%`)
  .join(", ")})`
