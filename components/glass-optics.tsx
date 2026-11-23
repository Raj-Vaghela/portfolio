"use client"

import { memo, useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { useTheme } from "next-themes"
import LiquidGlass from "simple-liquid-glass"
import { adaptGlass } from "@/lib/glass-legibility"

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
  button: {
    radius: 48,
    displacement: 36,
    dark: "rgba(20, 27, 45, 0.26)",
    light: "rgba(247, 252, 255, 0.30)",
  },
  photoButton: {
    radius: 48,
    displacement: 34,
    dark: "rgba(14, 21, 33, 0.26)",
    light: "rgba(14, 21, 33, 0.26)",
  },
  pill: {
    radius: 32,
    displacement: 20,
    dark: "rgba(16, 32, 54, 0.34)",
    light: "rgba(245, 251, 255, 0.35)",
  },
}

const rim = { depth: .26, curvature: .57, bend: .46, bendWidth: .18, sheen: 1, specular: 1 }


const readingRim = { depth: .12, curvature: .28, bend: .47, bendWidth: .08, sheen: .88, specular: 1 }
const buttonRim = { depth: .28, curvature: .52, bend: .56, bendWidth: .19, sheen: 1, specular: 1 }

const layerStyle: CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%", minHeight: 0 }

interface GlassOpticsProps {
  surface: keyof typeof surfaces
  backdropSelector?: string
}

export const GlassOptics = memo(function GlassOptics({
  surface,
  backdropSelector = "#portfolio-glass-backdrop",
}: GlassOpticsProps) {
  const { forcedTheme, resolvedTheme } = useTheme()
  const [reducedTransparency, setReducedTransparency] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-transparency: reduce)")
    const update = () => setReducedTransparency(query.matches)
    query.addEventListener("change", update)
    update()
    return () => query.removeEventListener("change", update)
  }, [])

  const dark = (forcedTheme ?? resolvedTheme) !== "light"
  const design = surfaces[surface]
  const isReadingSurface = surface === "card" || surface === "portraitCard"
  const isButton = surface === "button" || surface === "photoButton"
  const lensOptions = isReadingSurface ? readingRim : isButton ? buttonRim : rim
  // Text-bearing panes get Apple's "regular" treatment (frosted lens); controls stay clear with a dimming layer.
  const holdsText = isReadingSurface || surface === "sheet" || surface === "window"
  const layer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = layer.current?.parentElement
    if (!host || host.classList.contains("portfolio-glass-button--blue")) return
    return adaptGlass(host, holdsText ? "reading" : "control", backdropSelector)
  }, [backdropSelector, holdsText])

  return (
    <div ref={layer} className="glass-optics" aria-hidden="true" data-portfolio-optics={surface}>
      <LiquidGlass
        material="clear"
        refraction="lens"
        renderer="auto"
        lensOptions={lensOptions}
        radius={design.radius}
        displacementScale={design.displacement}
        aberrationIntensity={isReadingSurface ? 0 : isButton ? .015 : .22}
        blur={0}
        frost={0}
        iosBlurMode="off"
        maxScale={1}
        backdropSelector={backdropSelector}
        backdropVersion={dark ? "dark" : "light"}
        glassColor={dark ? design.dark : design.light}
        borderColor={isReadingSurface || isButton ? "transparent" : dark ? "rgba(218, 238, 255, 0.34)" : "rgba(255, 255, 255, 0.8)"}
        effectMode={reducedTransparency ? "off" : "auto"}
        reveal="immediate"
        className="absolute inset-0 size-full"
        style={layerStyle}
      />
      {!isReadingSurface && <div className="glass-dim" />}
    </div>
  )
})
