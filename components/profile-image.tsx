"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ProfileImageProps {
  src: string
  id?: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
  onReady?: () => void
}

export function ProfileImage({ src, id, alt, className, priority = false, sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw", onReady }: ProfileImageProps) {
  const [loadedSrc, setLoadedSrc] = useState("")
  const [failedSrc, setFailedSrc] = useState("")
  const idMatch = src.includes("drive.google.com") ? src.match(/\/d\/([^/]+)|id=([^&]+)/) : null
  const driveId = idMatch ? (idMatch[1] || idMatch[2]) : null
  const imageSrc = driveId ? `https://drive.google.com/thumbnail?id=${driveId}&sz=w2000` : src
  const hasError = !imageSrc || failedSrc === imageSrc
  const isLoading = !!imageSrc && loadedSrc !== imageSrc && !hasError
  useEffect(() => { if (hasError) onReady?.() }, [hasError, onReady])

  return (
    <div id={id} className={cn("relative overflow-hidden bg-zinc-100 dark:bg-zinc-800", className)}>
      {/* Passive failure fallback, not a second animated loading screen. */}
      {hasError && (
        <div className="absolute inset-0 grid place-items-center bg-slate-900">
          <span className="font-[family-name:var(--font-instrument-serif)] text-5xl text-white/70">RV</span>
        </div>
      )}

      {/* Actual Image */}
      {!hasError && imageSrc && (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes={sizes}
          className={cn(
            "object-cover transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => { setLoadedSrc(imageSrc); onReady?.() }}
          onError={() => { setFailedSrc(imageSrc); onReady?.() }}
          priority={priority}
          quality={90}
        />
      )}

    </div>
  )
}
