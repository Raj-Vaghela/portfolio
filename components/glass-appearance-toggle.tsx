"use client"

import { Droplet } from "lucide-react"
import { GlassOptics } from "@/components/glass-optics"
import { setGlassAppearance, useGlassAppearance } from "@/lib/glass-appearance"

interface GlassAppearanceToggleProps {
  className?: string
  surface?: "button" | "photoButton"
  backdropSelector?: string
}

/** Clear or Tinted glass, the same choice iOS 26.1 added to Display & Brightness. */
export function GlassAppearanceToggle({ className = "", surface = "button", backdropSelector }: GlassAppearanceToggleProps) {
  const appearance = useGlassAppearance()
  if (!appearance) return <span className={className} aria-hidden="true" />

  const tinted = appearance === "tinted"
  return (
    <button
      type="button"
      className={`portfolio-glass-button portfolio-glass-toggle ${className}`}
      aria-pressed={tinted}
      aria-label="Tinted glass"
      title={tinted ? "Glass: Tinted. Switch to Clear" : "Glass: Clear. Switch to Tinted for more contrast"}
      onClick={() => setGlassAppearance(tinted ? "clear" : "tinted")}
    >
      <GlassOptics surface={surface} backdropSelector={backdropSelector} />
      <Droplet size={18} aria-hidden="true" fill={tinted ? "currentColor" : "none"} />
    </button>
  )
}
