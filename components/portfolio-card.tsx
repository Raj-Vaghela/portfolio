"use client"

import { useEffect, useRef, useState, type HTMLAttributes } from "react"
import { GlassOptics } from "@/components/glass-optics"

interface PortfolioCardProps extends HTMLAttributes<HTMLElement> {
  wallpaper?: boolean
}

export function PortfolioCard({ wallpaper = false, className, children, ...props }: PortfolioCardProps) {
  const card = useRef<HTMLElement>(null)
  const [showOptics, setShowOptics] = useState(false)

  useEffect(() => {
    const node = card.current
    if (!node) return
    if (!("IntersectionObserver" in window)) {
      setShowOptics(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowOptics(true)
        observer.disconnect()
      }
    }, { rootMargin: "220px 0px" })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <article ref={card} className={className ? "portfolio-card " + className : "portfolio-card"} {...props}>
      {showOptics && (
        <GlassOptics
          surface={wallpaper ? "portraitCard" : "card"}
          backdropSelector={wallpaper ? "#portfolio-mobile-portrait img" : undefined}
        />
      )}
      {children}
    </article>
  )
}
