"use client"

import { ArrowLeft, ChevronUp, X } from "lucide-react"
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react"
import { Drawer } from "vaul"
import { DrawerRim } from "./drawer-rim"
import { GlassOptics } from "./glass-optics"
import { PortfolioContent } from "./portfolio-content"
import { ProjectDetails } from "./projects-modal"

const sectionLinks = new Set(["experience", "projects", "education"])
type PullPhase = "tracking" | "settling" | "returning"
type PullGesture = { id: number; x: number; y: number; time: number; tracking: boolean }

export function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [linkedSection, setLinkedSection] = useState<string | null>(null)
  const [pullPhase, setPullPhase] = useState<PullPhase | null>(null)
  const start = useRef<PullGesture | null>(null)
  const pullDistance = useRef(0)
  const drawer = useRef<HTMLDivElement | null>(null)
  const didSwipe = useRef(false)
  const keyboardNavigation = useRef(false)
  const scroll = useRef<HTMLDivElement>(null)
  const projectsTrigger = useRef<HTMLButtonElement | null>(null)
  const projectsHeading = useRef<HTMLHeadingElement>(null)
  const savedScroll = useRef(0)
  const attachDrawer = useCallback((element: HTMLDivElement | null) => {
    drawer.current = element
    element?.style.setProperty("--portfolio-pull-distance", `${pullDistance.current}px`)
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(min-width: 64rem)")
    function openLinkedSection() {
      if (media.matches) return
      const section = window.location.hash.slice(1)
      if (!sectionLinks.has(section)) return
      setLinkedSection(section)
      setShowProjects(false)
      setPullPhase(null)
      setIsOpen(true)
    }
    function handleLayoutChange() {
      if (media.matches) {
        start.current = null
        setPullPhase(null)
        setIsOpen(false)
      }
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

  function openPortfolio(phase: PullPhase | null = null) {
    setLinkedSection(null)
    setShowProjects(false)
    setPullPhase(phase)
    setIsOpen(true)
  }

  function startGesture(event: PointerEvent<HTMLElement>) {
    if (!event.isPrimary || event.button !== 0) return
    didSwipe.current = false
    keyboardNavigation.current = false
    start.current = { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp, tracking: false }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function followGesture(event: PointerEvent<HTMLElement>) {
    const gesture = start.current
    if (!gesture || gesture.id !== event.pointerId) return
    const distance = gesture.y - event.clientY
    if (!gesture.tracking) {
      if (distance < 8 || distance <= Math.abs(gesture.x - event.clientX)) return
      gesture.tracking = true
      didSwipe.current = true
      pullDistance.current = Math.max(0, distance - 5)
      openPortfolio("tracking")
    }
    pullDistance.current = Math.max(0, distance - 5)
    drawer.current?.style.setProperty("--portfolio-pull-distance", `${pullDistance.current}px`)
  }

  function finishGesture(event: PointerEvent<HTMLElement>) {
    const gesture = start.current
    if (!gesture || gesture.id !== event.pointerId) return
    const distance = gesture.y - event.clientY
    start.current = null
    if (!gesture.tracking) return
    const quickFlick = distance >= 45 && event.timeStamp - gesture.time < 220
    if (distance >= 72 || quickFlick) {
      setPullPhase("settling")
      requestAnimationFrame(() => projectsHeading.current?.focus({ preventScroll: true }))
    } else {
      setPullPhase("returning")
      setIsOpen(false)
    }
  }

  function cancelGesture(event: PointerEvent<HTMLElement>) {
    const gesture = start.current
    if (!gesture || gesture.id !== event.pointerId) return
    start.current = null
    if (gesture.tracking) {
      setPullPhase("returning")
      setIsOpen(false)
    }
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => open ? openPortfolio() : setIsOpen(false)} autoFocus>
      <div
        className="absolute inset-0 touch-none"
        aria-hidden="true"
        onPointerDown={startGesture}
        onPointerMove={followGesture}
        onPointerUp={finishGesture}
        onPointerCancel={cancelGesture}
        onLostPointerCapture={cancelGesture}
      />

      <Drawer.Trigger
        className="portfolio-wallpaper-hint"
        onPointerDown={startGesture}
        onPointerMove={followGesture}
        onPointerUp={finishGesture}
        onPointerCancel={cancelGesture}
        onLostPointerCapture={cancelGesture}
        onClick={(event) => {
          keyboardNavigation.current = event.detail === 0
          if (event.detail > 0 && didSwipe.current) event.preventDefault()
        }}
      >
        <ChevronUp size={19} aria-hidden="true" />
        <span>Swipe up to explore<span className="sr-only"> the portfolio</span></span>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay
          className="portfolio-notification-overlay"
          onPointerDown={() => { keyboardNavigation.current = false }}
        />
        <Drawer.Content
          ref={attachDrawer}
          className="portfolio-notification-drawer"
          data-pull-phase={pullPhase ?? undefined}
          onPointerDownCapture={() => { keyboardNavigation.current = false }}
          onKeyDownCapture={() => { keyboardNavigation.current = true }}
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            if (!start.current?.tracking) projectsHeading.current?.focus({ preventScroll: true })
          }}
          onCloseAutoFocus={(event) => {
            if (!keyboardNavigation.current) event.preventDefault()
          }}
        >
          <DrawerRim />
          <div className="portfolio-drawer-header">
            <Drawer.Handle className="portfolio-drawer-handle" />
            <div className="portfolio-drawer-toolbar">
              <Drawer.Title ref={projectsHeading} tabIndex={-1}>{showProjects ? "All projects" : "Portfolio"}</Drawer.Title>
              {showProjects && (
                <button
                  className="portfolio-drawer-back portfolio-glass-button"
                  aria-label="Back to portfolio"
                  onClick={(event) => {
                    const returnToTrigger = event.detail === 0
                    setShowProjects(false)
                    requestAnimationFrame(() => {
                      scroll.current?.scrollTo(0, savedScroll.current)
                      const focusTarget = returnToTrigger ? projectsTrigger.current : projectsHeading.current
                      focusTarget?.focus({ preventScroll: true })
                    })
                  }}
                >
                  <GlassOptics surface="photoButton" backdropSelector="#portfolio-mobile-portrait" />
                  <ArrowLeft size={19} aria-hidden="true" />
                </button>
              )}
              <Drawer.Close className="portfolio-drawer-close portfolio-glass-button" aria-label="Close portfolio">
                <GlassOptics surface="photoButton" backdropSelector="#portfolio-mobile-portrait" />
                <X size={18} aria-hidden="true" />
              </Drawer.Close>
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
