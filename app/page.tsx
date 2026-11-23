"use client"

import Link from "next/link"
import { ArrowDown, FileText, Github, Linkedin, Mail, Sparkles } from "lucide-react"
import { useState, type ReactNode } from "react"
import { ChatModal } from "@/components/chat-modal"
import { ContactModal } from "@/components/contact-modal"
import { GlassOptics } from "@/components/glass-optics"
import { GradientBackground } from "@/components/gradient-background"
import { MobileDrawer } from "@/components/mobile-drawer"
import { PortfolioContent } from "@/components/portfolio-content"
import { PortfolioWelcome } from "@/components/portfolio-welcome"
import { ProfileImage } from "@/components/profile-image"
import { ProjectsModal } from "@/components/projects-modal"
import { ThemeToggle } from "@/components/theme-toggle"
import { GlassAppearanceToggle } from "@/components/glass-appearance-toggle"
import { profile } from "@/lib/profile"
import { wallpaperShade } from "@/lib/wallpaper"

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

  return (
    <main className="portfolio-home">
      <GradientBackground desktopArtwork />
      <PortfolioWelcome />

      <div className="portfolio-desktop-shell hidden lg:block">
        <div className="portfolio-scroll-edge" aria-hidden="true" />
        <header className="portfolio-toolbar glass-lens-host">
          <GlassOptics surface="pill" />
          <a className="portfolio-wordmark" href="#home">Raj Vaghela</a>
          <nav aria-label="Portfolio" className="portfolio-nav">
            <a href="#experience">Work</a>
            <a href="#projects">Projects</a>
            <Link href="/freelance">Freelance</Link>
          </nav>
          <div className="portfolio-toolbar-actions">
            <GlassAppearanceToggle className="size-10 rounded-full" />
            <ThemeToggle optical />
          </div>
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
              <ProfileImage src={imageUrl} alt="Raj Vaghela" className="size-full" priority sizes="(min-width: 1280px) 460px, 38vw" />
            </div>
          </section>

          <div className="desktop-portfolio-content">
            <PortfolioContent onOpenProjectsModal={() => setProjectsOpen(true)} />
          </div>
        </div>
      </div>

      <div className="portfolio-wallpaper lg:hidden">
        <div id="portfolio-mobile-photo" className="absolute inset-0">
          <ProfileImage id="portfolio-mobile-portrait" src={imageUrl} alt="" className="size-full" priority sizes="(max-width: 1023px) 100vw, 1px" />
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

        <MobileDrawer onOpenChat={() => setChatOpen(true)} />
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setContactOpen(false)} />
      <ProjectsModal isOpen={isProjectsOpen} onClose={() => setProjectsOpen(false)} />
      <ChatModal isOpen={isChatOpen} onClose={() => setChatOpen(false)} />
    </main>
  )
}
