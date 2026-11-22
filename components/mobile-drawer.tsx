"use client"

import { ArrowLeft, ChevronUp, X } from "lucide-react"
import { useEffect, useRef, useState, type PointerEvent } from "react"
import { Drawer } from "vaul"
import { GlassOptics } from "./glass-optics"
import { PortfolioContent } from "./portfolio-content"
import { ProjectDetails } from "./projects-modal"

const sectionLinks = new Set(["experience", "projects", "education"])

export function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [linkedSection, setLinkedSection] = useState<string | null>(null)
  const start = useRef<{ x: number; y: number } | null>(null)
  const didSwipe = useRef(false)
  const scroll = useRef<HTMLDivElement>(null)
  const projectsTrigger = useRef<HTMLButtonElement | null>(null)
  const projectsHeading = useRef<HTMLHeadingElement>(null)
  const savedScroll = useRef(0)

  useEffect(() => {
    const media = window.matchMedia("(min-width: 64rem)")
    function openLinkedSection() {
      if (media.matches) return
      const section = window.location.hash.slice(1)
      if (!sectionLinks.has(section)) return
      setLinkedSection(section)
      setShowProjects(false)
      setIsOpen(true)
    }
    function handleLayoutChange() {
      if (media.matches) setIsOpen(false)
      else openLinkedSection()
    }
    const frame = requestAnimationFrame(openLinkedSection)
    window.addEventListener("hashchange", openLinkedSection)
    media.addEventListener("change", handleLayoutChange)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("hashchange", openLinkedSection)
      media.removeEventListener("change", handleLayoutChange)
    }
  }, [])

  useEffect(() => {
    if (!isOpen || !linkedSection || showProjects) return
    const frame = requestAnimationFrame(() => {
      const section = document.getElementById("mobile-" + linkedSection)
      section?.scrollIntoView({ block: "start" })
      setLinkedSection(null)
    })
    return () => cancelAnimationFrame(frame)
  }, [isOpen, linkedSection, showProjects])

  function openPortfolio() {
    setLinkedSection(null)
    setShowProjects(false)
    setIsOpen(true)
  }

  function startGesture(event: PointerEvent<HTMLElement>) {
    if (!event.isPrimary || event.button !== 0) return
    didSwipe.current = false
    start.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function finishGesture(event: PointerEvent<HTMLElement>) {
    if (!event.isPrimary || !start.current) return
    const distance = start.current.y - event.clientY
    const horizontalDistance = Math.abs(start.current.x - event.clientX)
    start.current = null

    if (distance > 50 && distance > horizontalDistance) {
      didSwipe.current = true
      openPortfolio()
    }
  }

  function cancelGesture() {
    start.current = null
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => open ? openPortfolio() : setIsOpen(false)} autoFocus>
      <div
        className="absolute inset-0 touch-none"
        aria-hidden="true"
        onPointerDown={startGesture}
        onPointerUp={finishGesture}
        onPointerCancel={cancelGesture}
      />

      <Drawer.Trigger
        className="portfolio-wallpaper-hint"
        onPointerDown={startGesture}
        onPointerUp={finishGesture}
        onPointerCancel={cancelGesture}
        onClick={(event) => {
          if (event.detail > 0 && didSwipe.current) event.preventDefault()
        }}
      >
        <ChevronUp size={19} aria-hidden="true" />
        <span>Swipe up to explore<span className="sr-only"> the portfolio</span></span>
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
              <ProjectDetails wallpaper />
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
