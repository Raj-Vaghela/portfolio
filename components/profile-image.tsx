"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

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
            {/* Placeholder / Fallback - Modern mesh gradient with shimmer */}
            {(isLoading || hasError) && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                    {/* Animated mesh gradient overlay */}
                    <div className="absolute inset-0 opacity-50">
                        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
                        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
                        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
                    </div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

                    {/* Initials */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold text-4xl md:text-6xl opacity-90 font-[family-name:var(--font-instrument-serif)] drop-shadow-2xl">
                            RV
                        </span>
                    </div>
                </div>
            )}

            {/* Actual Image */}
            {!hasError && imageSrc && (
                <img
                    src={imageSrc}
                    alt={alt}
                    className={cn(
                        "w-full h-full object-cover transition-opacity duration-500",
                        isLoading ? "opacity-0" : "opacity-100"
                    )}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false)
                        setHasError(true)
                    }}
                    loading={priority ? "eager" : "lazy"}
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
