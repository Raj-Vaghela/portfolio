"use client"

import { ArrowLeft, ChevronUp, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Drawer } from "vaul"
import { GlassOptics } from "./glass-optics"
import { PortfolioContent } from "./portfolio-content"
import { ProjectDetails } from "./projects-modal"

export function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const start = useRef<{ x: number; y: number } | null>(null)
  const scroll = useRef<HTMLDivElement>(null)
  const projectsTrigger = useRef<HTMLButtonElement | null>(null)
  const projectsHeading = useRef<HTMLHeadingElement>(null)
  const savedScroll = useRef(0)

  useEffect(() => {
    const media = window.matchMedia("(min-width: 64rem)")
    const closeOnDesktop = () => {
      if (media.matches) setIsOpen(false)
    }
    media.addEventListener("change", closeOnDesktop)
    return () => media.removeEventListener("change", closeOnDesktop)
  }, [])

  function openPortfolio() {
    setShowProjects(false)
    setIsOpen(true)
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => open ? openPortfolio() : setIsOpen(false)} autoFocus>
      <div
        className="absolute inset-0 touch-none"
        aria-hidden="true"
        onPointerDown={(event) => {
          start.current = { x: event.clientX, y: event.clientY }
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerUp={(event) => {
          if (start.current) {
            const distance = start.current.y - event.clientY
            if (distance > 50 && distance > Math.abs(start.current.x - event.clientX)) openPortfolio()
          }
          start.current = null
        }}
        onPointerCancel={() => { start.current = null }}
      />

      <Drawer.Trigger className="portfolio-wallpaper-open">
        <ChevronUp size={20} aria-hidden="true" />
        <span>Explore portfolio</span>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="portfolio-notification-overlay" />
        <Drawer.Content className="portfolio-notification-drawer">
          <div className="portfolio-drawer-header">
            <Drawer.Handle className="portfolio-drawer-handle" />
            <div className="portfolio-drawer-toolbar glass-lens-host">
              <GlassOptics surface="portrait" backdropSelector="#portfolio-mobile-portrait" />
              <Drawer.Title ref={projectsHeading} tabIndex={-1}>{showProjects ? "All projects" : "Portfolio"}</Drawer.Title>
              {showProjects && (
                <button
                  className="portfolio-drawer-back"
                  aria-label="Back to portfolio"
                  onClick={() => {
                    setShowProjects(false)
                    requestAnimationFrame(() => {
                      scroll.current?.scrollTo(0, savedScroll.current)
                      projectsTrigger.current?.focus({ preventScroll: true })
                    })
                  }}
                >
                  <ArrowLeft size={19} aria-hidden="true" />
                </button>
              )}
              <Drawer.Close className="portfolio-drawer-close" aria-label="Close portfolio"><X size={18} aria-hidden="true" /></Drawer.Close>
            </div>
            <Drawer.Description className="sr-only">Raj Vaghela’s work, projects, education and background.</Drawer.Description>
          </div>

          <div ref={scroll} className="portfolio-notification-scroll">
            {showProjects ? (
              <ProjectDetails />
            ) : (
              <PortfolioContent
                mobile
                projectsButtonRef={projectsTrigger}
                onOpenProjectsModal={() => {
                  savedScroll.current = scroll.current?.scrollTop ?? 0
                  setShowProjects(true)
                  requestAnimationFrame(() => {
                    scroll.current?.scrollTo(0, 0)
                    projectsHeading.current?.focus({ preventScroll: true })
                  })
                }}
              />
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
