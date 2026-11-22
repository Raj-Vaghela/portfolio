"use client"

import { memo, useEffect, useState } from "react"
import type { CSSProperties } from "react"
import { useTheme } from "next-themes"
import LiquidGlass from "simple-liquid-glass"

const surfaces = {
  window: {
    radius: 48,
    displacement: 74,
    dark: "rgba(8, 21, 39, 0.34)",
    light: "rgba(245, 251, 255, 0.47)",
  },
  sheet: {
    radius: 32,
    displacement: 52,
    dark: "rgba(8, 20, 36, 0.72)",
    light: "rgba(246, 251, 255, 0.77)",
  },
  portrait: {
    radius: 32,
    displacement: 24,
    dark: "rgba(8, 16, 27, 0.39)",
    light: "rgba(245, 249, 255, 0.72)",
  },
  card: {
    radius: 28,
    displacement: 34,
    dark: "rgba(255, 255, 255, 0.04)",
    light: "rgba(255, 255, 255, 0.07)",
  },
  portraitCard: {
    radius: 23,
    displacement: 30,
    dark: "rgba(14, 17, 22, 0.04)",
    light: "rgba(14, 17, 22, 0.04)",
  },
  pill: {
    radius: 32,
    displacement: 20,
    dark: "rgba(16, 32, 54, 0.34)",
    light: "rgba(245, 251, 255, 0.35)",
  },
}

const rim = { depth: .26, curvature: .57, bend: .46, bendWidth: .18, sheen: 1, specular: 1 }

const portraitRim = { depth: .14, curvature: .22, bend: .24, bendWidth: .13, sheen: .62, specular: .7 }

const readingRim = { depth: .12, curvature: .28, bend: .47, bendWidth: .08, sheen: .76, specular: .87 }

const layerStyle: CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%", minHeight: 0 }

interface GlassOpticsProps {
  surface: keyof typeof surfaces
  backdropSelector?: string
}

export const GlassOptics = memo(function GlassOptics({
  surface,
  backdropSelector = "#portfolio-glass-backdrop",
}: GlassOpticsProps) {
  const { resolvedTheme } = useTheme()
  const [reducedTransparency, setReducedTransparency] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-transparency: reduce)")
    const update = () => setReducedTransparency(query.matches)
    query.addEventListener("change", update)
    update()
    return () => query.removeEventListener("change", update)
  }, [])

  const dark = resolvedTheme !== "light"
  const design = surfaces[surface]
  const isPortrait = surface === "portrait" || surface === "portraitCard"
  const isReadingSurface = surface === "card" || surface === "portraitCard"
  const lensOptions = isReadingSurface ? readingRim : isPortrait ? portraitRim : rim

  return (
    <div className="glass-optics" aria-hidden="true" data-portfolio-optics={surface}>
      <LiquidGlass
        material="clear"
        refraction="lens"
        renderer={surface === "portrait" ? "webgl" : "auto"}
        lensOptions={lensOptions}
        radius={design.radius}
        displacementScale={design.displacement}
        aberrationIntensity={isReadingSurface ? 0 : isPortrait ? .015 : .22}
        blur={0}
        frost={0}
        iosBlurMode="off"
        maxScale={1}
        backdropSelector={backdropSelector}
        backdropVersion={dark ? "dark" : "light"}
        glassColor={dark ? design.dark : design.light}
        borderColor={isReadingSurface ? "transparent" : dark ? "rgba(218, 238, 255, 0.34)" : "rgba(255, 255, 255, 0.8)"}
        effectMode={reducedTransparency ? "off" : "auto"}
        reveal="immediate"
        className="absolute inset-0 size-full"
        style={layerStyle}
      />
    </div>
  )
})
