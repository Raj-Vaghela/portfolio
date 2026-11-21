
"use client"

import { X, Home } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Drawer } from "vaul"
import { useIsMobile } from "@/hooks/use-mobile"
import { ProjectLinks, ProjectSourceStatus } from "@/components/profile-link"
import { projects } from "@/lib/profile"

interface ProjectsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectsModal({ isOpen, onClose }: ProjectsModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isOpen && !isMobile) { // Only control body overflow for desktop modal
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, isMobile])

  useEffect(() => {
    if (isMobile) return; // Only apply scroll progress for desktop modal

    const container = scrollContainerRef.current
    if (!container) return

    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight - container.clientHeight
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      setScrollProgress(progress)
      setIsScrolling(true)

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 1000)
    }

    container.addEventListener('scroll', handleScroll)
    return () => {
      container.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [isOpen, isMobile])

  if (!isOpen) return null

  if (isMobile) {
    return (
      <Drawer.Root shouldScaleBackground open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={onClose} />
          <Drawer.Content className="bg-black/20 dark:bg-black/20 backdrop-blur-xl border-t border-white/10 flex flex-col rounded-t-[2rem] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-[110] outline-none">
            <div className="p-4 bg-transparent rounded-t-[2rem] flex-1 flex flex-col min-h-0">
              {/* Handle / Scroll Indicator */}
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-white/30 mb-8" />

              <div className="max-w-md mx-auto w-full flex-1 overflow-y-auto pb-20 scrollbar-hide">
                <div className="flex items-center justify-between mb-6">
                  <Drawer.Title className="text-2xl font-bold dark:text-white text-black">Featured Projects</Drawer.Title>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Home className="w-5 h-5 dark:text-white text-black" />
                  </button>
                </div>

                <div className="space-y-6">
                  {projects.map((project) => (
                    <div
                      key={project.title}
                      className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6 hover:bg-white/10 transition-colors shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-xl font-bold dark:text-white text-black leading-tight">{project.title}</h3>
                        <ProjectLinks project={project} appearance="drawer" />
                      </div>

                      <p className="text-xs dark:text-white/70 text-slate-700 mb-1">{project.context}</p>
                      <p className="dark:text-white/80 text-slate-700 text-sm mb-4 leading-relaxed">{project.description}</p>
                      <ProjectSourceStatus project={project} />

                      <div className="mt-4 flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-white/10 dark:text-white text-slate-800 text-xs font-medium border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2 bg-black/20 rounded-xl p-3">
                        {project.details.map((detail, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start">
                            <span className="dark:text-emerald-400/70 text-emerald-600/70 text-xs mt-1.5">•</span>
                            <p className="dark:text-white/70 text-slate-600 text-sm leading-relaxed">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        ref={scrollContainerRef}
        className="relative w-full h-full sm:h-auto sm:max-h-[85vh] max-w-4xl overflow-y-scroll scrollbar-hide bg-[hsl(200,50%,95%)] dark:bg-[hsl(210,25%,18%)] sm:rounded-3xl dark:bg-opacity-95 bg-opacity-95 backdrop-blur-md border-none sm:border dark:border-white/30 border-white/40 shadow-2xl animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-[hsl(200,50%,95%)] dark:from-[hsl(210,25%,18%)] via-[hsl(200,50%,95%)]/95 dark:via-[hsl(210,25%,18%)]/95 to-transparent pb-6">
          <h2 className="text-xl sm:text-2xl font-bold dark:text-white text-black">Featured Projects</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 sm:w-10 sm:h-10 rounded-full sm:rounded-xl bg-black/5 dark:bg-white/10 backdrop-blur border border-black/10 dark:border-white/20 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 dark:text-white text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 pb-24 sm:pb-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl sm:rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 p-5 sm:p-6 hover:bg-white/60 dark:hover:bg-white/10 transition-colors shadow-sm"
            >
              <div className="flex items-start justify-between gap-3 mb-3 sm:mb-2">
                <h3 className="text-lg sm:text-xl font-bold dark:text-white text-black leading-tight">{project.title}</h3>
                <ProjectLinks project={project} appearance="dialog" />
              </div>

              <p className="text-xs dark:text-white/70 text-slate-700 mb-1">{project.context}</p>
              <p className="dark:text-white/80 text-slate-700 text-sm sm:text-sm mb-4 leading-relaxed">{project.description}</p>
              <ProjectSourceStatus project={project} />

              <div className="mt-4 flex flex-wrap gap-2 mb-4">
                {project.tags.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 dark:text-white text-slate-800 text-xs font-medium border border-black/5 dark:border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-2 bg-black/5 dark:bg-black/20 rounded-xl p-3 sm:p-0 sm:bg-transparent sm:dark:bg-transparent sm:rounded-none sm:p-0">
                {project.details.map((detail, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <span className="dark:text-emerald-400/70 text-emerald-600/70 text-xs sm:text-sm mt-1.5">•</span>
                    <p className="dark:text-white/70 text-slate-600 text-sm leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Circular Progress Ring - Sticky at Bottom Right */}
        <div className="sticky bottom-6 right-6 pointer-events-none flex justify-end px-6 pb-6">
          <div className="relative w-10 h-10 group pointer-events-auto opacity-60 hover:opacity-100 transition-opacity duration-300 bg-white/10 dark:bg-black/40 backdrop-blur-md rounded-full shadow-lg">
            {/* Background Circle */}
            <svg className="transform -rotate-90 w-10 h-10">
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="dark:text-white/10 text-slate-400/30"
              />
              {/* Progress Circle */}
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 16} `}
                strokeDashoffset={`${2 * Math.PI * 16 * (1 - scrollProgress / 100)} `}
                className="dark:text-emerald-400 text-emerald-600 transition-all duration-300"
                strokeLinecap="round"
              />
            </svg>
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text - [10px] font - bold dark: text - white text - slate - 800 transition - opacity duration - 200 ${isScrolling ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} `}>
                {Math.round(scrollProgress)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
