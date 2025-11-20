"use client"

export function ScrollIndicator() {
  return (
    <div className="relative w-12 h-12 flex items-end justify-center pb-1">
      {/* Chevron Stack - smaller and at bottom */}
      <div className="flex flex-col gap-0">
        {/* First chevron */}
        <svg
          className="w-4 h-4 text-white animate-fade-slide-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
        </svg>

        {/* Second chevron */}
        <svg
          className="w-4 h-4 text-white animate-fade-slide-2 -mt-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
        </svg>

        {/* Third chevron */}
        <svg
          className="w-4 h-4 text-white animate-fade-slide-3 -mt-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
        </svg>
      </div>

      {/* Fade and slide up animation */}
      <style jsx>{`
        @keyframes fade-slide-up {
          0% {
            transform: translateY(4px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-4px);
            opacity: 0;
          }
        }
        
        .animate-fade-slide-1 {
          animation: fade-slide-up 1.2s ease-in-out infinite;
          animation-delay: 0s;
        }
        
        .animate-fade-slide-2 {
          animation: fade-slide-up 1.2s ease-in-out infinite;
          animation-delay: 0.15s;
        }
        
        .animate-fade-slide-3 {
          animation: fade-slide-up 1.2s ease-in-out infinite;
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  )
}
