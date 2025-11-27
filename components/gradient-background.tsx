"use client"

export function GradientBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Neo-brutalist geometric pattern background */}
      <div className="absolute inset-0 dark:bg-black bg-white">
        {/* Diagonal stripes pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="brutalist-stripes" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="40" height="80" className="fill-brutalist-yellow dark:fill-brutalist-cyan" />
              <rect x="40" y="0" width="40" height="80" className="fill-brutalist-magenta dark:fill-brutalist-yellow" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#brutalist-stripes)" transform="rotate(45 50 50)" />
        </svg>

        {/* Geometric shapes scattered */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-brutalist-yellow dark:bg-brutalist-cyan opacity-20 rotate-12" />
        <div className="absolute top-1/4 right-20 w-24 h-24 bg-brutalist-magenta dark:bg-brutalist-yellow opacity-20 -rotate-6" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-brutalist-cyan dark:bg-brutalist-magenta opacity-20 rotate-45" />
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-brutalist-green dark:bg-brutalist-orange opacity-20 -rotate-12" />
      </div>
    </div>
  )
}
