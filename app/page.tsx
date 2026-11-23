"use client"

import Link from "next/link"
import { ArrowDown, FileText, Github, Linkedin, Mail, Sparkles } from "lucide-react"
import { useCallback, useEffect, useState, type ReactNode } from "react"
import dynamic from "next/dynamic"
import { GlassOptics } from "@/components/glass-optics"
import { GradientBackground } from "@/components/gradient-background"
import { MobileDrawer } from "@/components/mobile-drawer"
import { PortfolioContent } from "@/components/portfolio-content"
import { PortfolioWelcome } from "@/components/portfolio-welcome"
import { ProfileImage } from "@/components/profile-image"
import { ThemeToggle } from "@/components/theme-toggle"
import { profile } from "@/lib/profile"
import { wallpaperShade } from "@/lib/wallpaper"

const ChatModal = dynamic(() => import("@/components/chat-modal").then((m) => m.ChatModal), { ssr: false })
const ContactModal = dynamic(() => import("@/components/contact-modal").then((m) => m.ContactModal), { ssr: false })
const ProjectsModal = dynamic(() => import("@/components/projects-modal").then((m) => m.ProjectsModal), { ssr: false })

const github = "https://github.com/Raj-Vaghela"
const linkedin = "https://linkedin.com/in/raj-vaghela"
const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || process.env.NEXT_PUBLIC_GOOGLE_DRIVE_IMAGE_URL || ""

function WallpaperGlassIcon({ children }: { children: ReactNode }) {
  return (
    <span className="portfolio-glass-button portfolio-wallpaper-control wallpaper-glass-icon" aria-hidden="true">
      {children}
    </span>
  )
}

export default function Page() {
  const [isContactOpen, setContactOpen] = useState(false)
  const [isProjectsOpen, setProjectsOpen] = useState(false)
  const [isChatOpen, setChatOpen] = useState(false)
  const [desktop, setDesktop] = useState<boolean | null>(null)
  const [mobilePortraitReady, setMobilePortraitReady] = useState(false)
  const [desktopPortraitReady, setDesktopPortraitReady] = useState(false)
  const [backdropReady, setBackdropReady] = useState(false)
  const [loadTimeoutReached, setLoadTimeoutReached] = useState(false)
  const markMobileReady = useCallback(() => setMobilePortraitReady(true), [])
  const markDesktopReady = useCallback(() => setDesktopPortraitReady(true), [])
  const markBackdropReady = useCallback(() => setBackdropReady(true), [])

  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)")
    const update = () => setDesktop(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  // A slow or unavailable image must never trap visitors behind the intro.
  // The loader is a progressive enhancement, not a blocking dependency.
  useEffect(() => {
    const timeout = window.setTimeout(() => setLoadTimeoutReached(true), 2600)
    return () => window.clearTimeout(timeout)
  }, [])

  const assetsReady = backdropReady && (desktop ? desktopPortraitReady : mobilePortraitReady)
  const landingReady = loadTimeoutReached || (desktop !== null && assetsReady)

  return (
    <main className="portfolio-home" data-landing-ready={landingReady ? "true" : "false"} aria-busy={!landingReady}>
      <GradientBackground desktopArtwork onReady={markBackdropReady} />
      <PortfolioWelcome ready={landingReady} />

      <div className="portfolio-desktop-shell hidden lg:block">
        <header className="portfolio-toolbar glass-lens-host">
          <GlassOptics surface="pill" />
          <a className="portfolio-wordmark" href="#home">Raj Vaghela</a>
          <nav aria-label="Portfolio" className="portfolio-nav">
            <a href="#experience">Work</a>
            <a href="#projects">Projects</a>
            <Link href="/freelance">Freelance</Link>
          </nav>
          <ThemeToggle optical />
        </header>

        <div className="portfolio-desktop" id="home">
          <section className="portfolio-hero" aria-labelledby="portfolio-name">
            <div>
              <p className="portfolio-kicker">{profile.role} at {profile.employer}</p>
              <h1 id="portfolio-name" className="portfolio-name">Raj Vaghela</h1>
              <p className="portfolio-summary">{profile.summary}</p>
              <div className="portfolio-hero-actions">
                <a className="portfolio-primary portfolio-glass-button portfolio-glass-button--blue" href="#projects"><GlassOptics surface="button" />Explore projects <ArrowDown size={17} aria-hidden="true" /></a>
                <button className="portfolio-secondary portfolio-glass-button" onClick={() => setContactOpen(true)}><GlassOptics surface="button" />Get in touch</button>
              </div>
              <div className="portfolio-portrait-actions" aria-label="Profile links">
                <a className="portfolio-glass-button" href={github} target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub"><GlassOptics surface="button" /><Github size={17} aria-hidden="true" /></a>
                <a className="portfolio-glass-button" href={linkedin} target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn"><GlassOptics surface="button" /><Linkedin size={17} aria-hidden="true" /></a>
                <a className="portfolio-glass-button" href="/cv.pdf" target="_blank" rel="noreferrer"><GlassOptics surface="button" /><FileText size={17} aria-hidden="true" /> CV</a>
                <button className="portfolio-glass-button" onClick={() => setChatOpen(true)}><GlassOptics surface="button" /><Sparkles size={17} aria-hidden="true" /> Chat with AI</button>
              </div>
            </div>

            <div className="portfolio-portrait-frame">
              <ProfileImage src={imageUrl} alt="Raj Vaghela" className="size-full" onReady={markDesktopReady} sizes="(min-width: 1280px) 460px, 38vw" />
            </div>
          </section>

          <div className="desktop-portfolio-content">
            <PortfolioContent onOpenProjectsModal={() => setProjectsOpen(true)} />
          </div>
        </div>
      </div>

      <div className="portfolio-wallpaper lg:hidden">
        <div id="portfolio-mobile-photo" className="absolute inset-0">
          <ProfileImage id="portfolio-mobile-portrait" src={imageUrl} alt="" className="size-full" priority onReady={markMobileReady} sizes="(max-width: 1023px) 100vw, 1px" />
          <div className="portfolio-wallpaper-shade" style={{ backgroundImage: wallpaperShade }} aria-hidden="true" />
        </div>

        <div className="portfolio-wallpaper-heading">
          <p className="portfolio-wallpaper-role">{profile.role} at {profile.employer}</p>
          <h1>Raj Vaghela</h1>
        </div>

        <div className="portfolio-wallpaper-actions" aria-label="Quick actions">
          <button onClick={() => setContactOpen(true)}><WallpaperGlassIcon><Mail size={20} /></WallpaperGlassIcon><span>Contact</span></button>
          <button onClick={() => setChatOpen(true)}><WallpaperGlassIcon><Sparkles size={20} /></WallpaperGlassIcon><span>Chat with AI</span></button>
          <a href={linkedin} target="_blank" rel="noreferrer"><WallpaperGlassIcon><Linkedin size={20} /></WallpaperGlassIcon><span>LinkedIn</span></a>
          <a href="/cv.pdf" target="_blank" rel="noreferrer"><WallpaperGlassIcon><FileText size={20} /></WallpaperGlassIcon><span>CV</span></a>
        </div>

        <MobileDrawer />
      </div>

      {isContactOpen && <ContactModal isOpen onClose={() => setContactOpen(false)} />}
      {isProjectsOpen && <ProjectsModal isOpen onClose={() => setProjectsOpen(false)} />}
      {isChatOpen && <ChatModal isOpen onClose={() => setChatOpen(false)} />}
    </main>
  )
}
