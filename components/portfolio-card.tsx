import type { HTMLAttributes } from "react"
import { GlassOptics } from "@/components/glass-optics"

interface PortfolioCardProps extends HTMLAttributes<HTMLElement> {
  wallpaper?: boolean
}

export function PortfolioCard({ wallpaper = false, className, children, ...props }: PortfolioCardProps) {
  return (
    <article className={className ? "portfolio-card " + className : "portfolio-card"} {...props}>
      <GlassOptics
        surface={wallpaper ? "portraitCard" : "card"}
        backdropSelector={wallpaper ? "#portfolio-mobile-portrait" : undefined}
      />
      {children}
    </article>
  )
}
