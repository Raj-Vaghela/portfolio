"use client"

import { GrainGradient } from "@paper-design/shaders-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function GradientBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = !mounted || theme === "dark"

  return (
    <div className="absolute inset-0 -z-10 transition-opacity duration-500">
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack={isDark ? "hsl(0, 0%, 0%)" : "hsl(200, 80%, 95%)"}
        softness={0.76}
        intensity={isDark ? 0.25 : 0.5}
        noise={0}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={1}
        colors={
          isDark
            ? ["hsl(220, 30%, 15%)", "hsl(210, 25%, 20%)", "hsl(200, 20%, 18%)"]
            : ["hsl(200, 100%, 75%)", "hsl(210, 100%, 85%)", "hsl(190, 90%, 80%)"]
        }
      />
    </div>
  )
}
