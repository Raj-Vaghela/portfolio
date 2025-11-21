"use client"

import { GradientBackground } from "@/components/gradient-background"
import { Mail, Github, Linkedin, FileText, ExternalLink } from "lucide-react"
import { ContactModal } from "@/components/contact-modal"
import { ProjectsModal } from "@/components/projects-modal"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChatButton } from "@/components/chat-button"
import { ChatModal } from "@/components/chat-modal"
import { PortfolioContent } from "@/components/portfolio-content"
import { MobileDrawer } from "@/components/mobile-drawer"
import { ProfileImage } from "@/components/profile-image"
import { useEffect, useRef, useState } from "react"

export default function Page() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("me")
  const [isScrolling, setIsScrolling] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>("")
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const sections = [
    { id: "me", label: "Me" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects highlights" },
  ]

  // Skills for the marquee loaded from /skills.json
  const [marqueeSkills, setMarqueeSkills] = useState<string[]>([])

  // Set image URL on client side to avoid hydration mismatch
  useEffect(() => {
    // Support both old and new env variable names for backward compatibility
    const url = process.env.NEXT_PUBLIC_IMAGE_URL || process.env.NEXT_PUBLIC_GOOGLE_DRIVE_IMAGE_URL || ""
    setImageUrl(url)
  }, [])

  useEffect(() => {
    fetch("/skills.json")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMarqueeSkills(data as string[])
        } else if (data && Array.isArray((data as any).skills)) {
          setMarqueeSkills((data as any).skills as string[])
        }
      })
      .catch(() => {
        // ignore; fallback skills will be used
      })
  }, [])


  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      const scrollPosition = container.scrollTop + container.clientHeight / 2

      // Show label while scrolling
      setIsScrolling(true)

      // Hide label after scrolling stops
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 500)

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    container.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => {
      container.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element && scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const offsetTop = element.offsetTop
      container.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
  }

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current
    if (!container || isDragging) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const percentage = clickY / rect.height

    const scrollHeight = container.scrollHeight - container.clientHeight
    container.scrollTo({ top: scrollHeight * percentage, behavior: "smooth" })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current || !scrollContainerRef.current) return

      e.preventDefault()

      const rect = sliderRef.current.getBoundingClientRect()
      const mouseY = e.clientY - rect.top
      const percentage = Math.max(0, Math.min(1, mouseY / rect.height))

      const container = scrollContainerRef.current
      const scrollHeight = container.scrollHeight - container.clientHeight

      container.scrollTop = scrollHeight * percentage
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.body.style.userSelect = ''
    }

    if (isDragging) {
      document.body.style.userSelect = 'none'
      document.addEventListener('mousemove', handleMouseMove, { passive: false })
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <main className="relative h-screen flex items-center justify-start overflow-hidden p-8 lg:p-12 xl:p-16">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/20 dark:bg-black/20" />

      {/* Theme Toggle - Top Right on desktop, aligned with action buttons on mobile */}
      <div className="fixed top-4 lg:top-12 xl:top-16 right-4 lg:right-12 xl:right-16 z-50">
        <ThemeToggle />
      </div>

      {/* Large frosted glass background container - everything lives inside */}
      <div className="hidden lg:block fixed inset-4 lg:inset-12 xl:inset-16 bg-black/30 dark:bg-black/30 bg-transparent backdrop-blur-xl dark:backdrop-blur-xl backdrop-blur-none rounded-[2rem] lg:rounded-[3rem] border border-white/10 dark:border-white/10 border-white/30 shadow-2xl overflow-hidden p-4 lg:p-8 transition-colors duration-300 flex flex-col lg:block">

        {/* Image card - positioned inside frosted glass with proper spacing */}
        <div className="relative lg:absolute lg:left-8 lg:top-8 lg:bottom-8 w-full lg:max-w-[280px] h-[300px] lg:h-auto shrink-0 mb-4 lg:mb-0 rounded-3xl border border-white/20 dark:border-white/20 border-white/50 shadow-2xl overflow-hidden transition-colors duration-300 bg-zinc-800">
          <ProfileImage
            src={imageUrl}
            alt="Raj Vaghela"
            className="absolute inset-0 w-full h-full"
            priority
          />

          {/* Dark gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 dark:from-black/80 dark:via-black/40 dark:to-black/20 pointer-events-none" />

          {/* Available for work badge - top right */}
          <div className="absolute top-6 right-6 z-10">
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]" />
              <span className="text-white dark:text-white text-[10px] font-medium">Available for work</span>
            </div>
          </div>

          {/* Content at bottom left with equal spacing */}
          <div className="absolute bottom-4 left-4 space-y-3 z-10">
            <div>
              <h1 className="text-4xl font-bold dark:text-white text-white">Raj Vaghela</h1>
              <p className="dark:text-white text-white text-sm mt-1">AI Engineer</p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Raj-Vaghela"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 flex items-center justify-center hover:bg-white/20 dark:hover:bg-white/20 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-white dark:text-white" />
              </a>
              <a
                href="https://linkedin.com/in/raj-vaghela"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 flex items-center justify-center hover:bg-white/20 dark:hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-white dark:text-white" />
              </a>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="w-8 h-8 rounded-lg bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 flex items-center justify-center hover:bg-white/20 dark:hover:bg-white/20 transition-colors"
                aria-label="Get in touch"
                title="Get in touch"
              >
                <Mail className="w-3.5 h-3.5 text-white dark:text-white" />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <ChatButton onClick={() => setIsChatModalOpen(true)} />
              <a
                href="/cv.pdf"
                download
                className="h-8 px-3 rounded-lg bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 flex items-center gap-1.5 hover:bg-white/20 dark:hover:bg-white/20 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-white dark:text-white" />
                <span className="text-white dark:text-white text-[11px] font-medium whitespace-nowrap">Download CV</span>
              </a>
            </div>
          </div>
        </div>

        {/* Vertical Slider Navigation - Right side inside glass */}
        <nav className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-50">
          <div className="flex items-center gap-3">
            <div
              ref={sliderRef}
              className="w-px h-32 bg-white/20 dark:bg-white/20 bg-white/50 relative cursor-pointer hover:w-1 transition-all duration-200 group"
              onClick={handleSliderClick}
            >
              <div
                className={`absolute w-full bg-white rounded-full cursor-grab active:cursor-grabbing ${isDragging ? '' : 'transition-all duration-300'}`}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsDragging(true)
                }}
                style={{
                  height: '25%',
                  top: `${(sections.findIndex(s => s.id === activeSection) / (sections.length - 1)) * 75}%`
                }}
              >
                {/* Label positioned to the left of slider, centered with indicator */}
                <span
                  className={`absolute right-3 dark:text-white text-gray-800 text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${isScrolling || isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                >
                  {sections.find(s => s.id === activeSection)?.label || 'Me'}
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Skills vertical marquee between card and content - inside glass */}
        <div className="hidden lg:block absolute z-20 top-0 bottom-0 left-[calc(4rem+280px-3px)] overflow-hidden group px-4">
          <div className="skills-marquee-wrapper">
            <div className="skills-marquee-content">
              {/* Add spacing before first word */}
              <div className="h-3" />
              {marqueeSkills.map((s, i) => (
                <div key={`${s}-${i}`} className="flex flex-col items-center">
                  <div className="flex flex-col items-center mb-3">
                    {s.toUpperCase().split("").map((ch, idx) => (
                      <span key={idx} className="dark:text-white text-gray-800 text-[6px] uppercase leading-tight font-[family-name:var(--font-press-start)]">{ch}</span>
                    ))}
                  </div>
                  <span className="w-1 h-1 rounded-full dark:bg-white bg-slate-700" />
                </div>
              ))}
            </div>
            <div className="skills-marquee-content" aria-hidden="true">
              {/* Add spacing before first word in duplicate */}
              <div className="h-3" />
              {marqueeSkills.map((s, i) => (
                <div key={`dup-${s}-${i}`} className="flex flex-col items-center">
                  <div className="flex flex-col items-center mb-3">
                    {s.toUpperCase().split("").map((ch, idx) => (
                      <span key={idx} className="dark:text-white text-gray-800 text-[6px] uppercase leading-tight font-[family-name:var(--font-press-start)]">{ch}</span>
                    ))}
                  </div>
                  <span className="w-1 h-1 rounded-full dark:bg-white bg-slate-700" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content Area - Right side inside glass */}
        <div
          ref={scrollContainerRef}
          className="relative lg:absolute z-5 lg:top-0 lg:bottom-0 lg:right-0 lg:left-[calc(8rem+280px)] flex-1 w-full lg:w-auto overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide"
        >
          <PortfolioContent onOpenProjectsModal={() => setIsProjectsModalOpen(true)} />
        </div>

      </div>
      {/* End of frosted glass container */}

      {/* Mobile Drawer View */}
      <div className="lg:hidden">
        {/* Full screen background image */}
        <div className="fixed inset-0 z-0 bg-zinc-900">
          <ProfileImage
            src={imageUrl}
            alt="Raj Vaghela"
            className="w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 pointer-events-none" />
        </div>

        {/* Mobile Layout - Reels/Shorts Style */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {/* Name & Info - Bottom Left */}
          <div className="absolute bottom-6 left-4 flex flex-col items-start gap-2 pointer-events-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-white/90">Available for work</span>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-lg">
              Raj Vaghela
            </h1>
            <p className="text-white/80 text-sm font-medium drop-shadow-md max-w-[280px] leading-relaxed">
              Full Stack Developer building AI-powered applications
            </p>
          </div>

          {/* Action Buttons - Bottom Right Vertical Stack */}
          <div className="absolute bottom-20 right-4 flex flex-col gap-4 pointer-events-auto items-center">
            <a
              href="https://linkedin.com/in/raj-vaghela"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-0.5 group"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-800/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-zinc-700/50 transition-all active:scale-90">
                <Linkedin className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-[9px] font-medium drop-shadow-lg">LinkedIn</span>
            </a>

            <button
              onClick={() => setIsContactModalOpen(true)}
              className="flex flex-col items-center gap-0.5 group"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-800/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-zinc-700/50 transition-all active:scale-90">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-[9px] font-medium drop-shadow-lg">Contact</span>
            </button>

            <button
              onClick={() => setIsChatModalOpen(true)}
              className="flex flex-col items-center gap-0.5 group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-105 transition-all active:scale-90 shadow-lg shadow-purple-500/30">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <span className="text-white text-[9px] font-medium drop-shadow-lg">Chat AI</span>
            </button>

            <a
              href="/cv.pdf"
              download
              className="flex flex-col items-center gap-0.5 group"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-800/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-zinc-700/50 transition-all active:scale-90">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-[9px] font-medium drop-shadow-lg">Resume</span>
            </a>
          </div>
        </div>

        <MobileDrawer
          isAnyModalOpen={isContactModalOpen || isProjectsModalOpen || isChatModalOpen}
        >
          <PortfolioContent onOpenProjectsModal={() => setIsProjectsModalOpen(true)} />
        </MobileDrawer>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <ProjectsModal isOpen={isProjectsModalOpen} onClose={() => setIsProjectsModalOpen(false)} />
      <ChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />

      {/* Local styles for skills marquee and scrollbar */}
      <style jsx>{`
        .skills-marquee-wrapper {
          display: flex;
          flex-direction: column;
          animation: skills-scroll 20s linear infinite;
          transition: animation-play-state 0.3s ease;
        }
        .group:hover .skills-marquee-wrapper {
          animation-play-state: paused;
        }
        .skills-marquee-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        @keyframes skills-scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        
        /* Hide scrollbar completely */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  )
}
