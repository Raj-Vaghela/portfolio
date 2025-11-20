"use client"

import { useState, useEffect } from "react"
import { User } from "lucide-react"
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
            {/* Placeholder / Fallback */}
            {(isLoading || hasError) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-xy">
                    <span className="text-white font-bold text-4xl md:text-6xl opacity-90 font-[family-name:var(--font-instrument-serif)]">
                        RV
                    </span>
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
        </div>
    )
}
