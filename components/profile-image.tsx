"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ProfileImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export function ProfileImage({ src, alt, className, priority = false }: ProfileImageProps) {
  const [imageSrc, setImageSrc] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!src) {
      setHasError(true)
      setIsLoading(false)
      return
    }

    // Helper to convert Google Drive links to direct embed links
    const getDirectUrl = (url: string) => {
      try {
        // Check if it's a Google Drive link
        if (url.includes("drive.google.com")) {
          // Extract ID - handle trailing slash
          const idMatch = url.match(/\/d\/([^\/]+)|id=([^&]+)/)
          const id = idMatch ? (idMatch[1] || idMatch[2]) : null

          if (id) {
            return `https://drive.google.com/thumbnail?id=${id}&sz=w2000`
          }
        }
        return url
      } catch (e) {
        return url
      }
    }

    const directUrl = getDirectUrl(src)
    setImageSrc(directUrl)
    setIsLoading(true)
    setHasError(false)
  }, [src])

  return (
    <div className={cn("relative overflow-hidden bg-zinc-100 dark:bg-zinc-800", className)}>
      {/* Placeholder / Fallback - Flat brutalist colors */}
      {(isLoading || hasError) && (
        <div className="absolute inset-0 bg-brutalist-yellow dark:bg-brutalist-cyan z-10">
          {/* Flat geometric shapes - no blur */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-brutalist-magenta dark:bg-brutalist-yellow opacity-40" />
            <div className="absolute top-1/4 right-20 w-24 h-24 bg-brutalist-cyan dark:bg-brutalist-magenta opacity-40" />
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-brutalist-green dark:bg-brutalist-orange opacity-40" />
          </div>

          {/* Initials */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-black dark:text-white font-black text-6xl md:text-8xl font-[family-name:var(--font-instrument-serif)]">
              RV
            </span>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {!hasError && imageSrc && (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "object-cover transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
          priority={priority}
          quality={90}
        />
      )}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}
