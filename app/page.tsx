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
  const [resumeUrl, setResumeUrl] = useState<string>("")
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
    setResumeUrl(process.env.NEXT_PUBLIC_RESUME_URL || "/cv.pdf")
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
      const scrollPosition = container.scrollLeft + container.clientWidth / 2

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
          const offsetLeft = element.offsetLeft
          const offsetWidth = element.offsetWidth
          if (
            scrollPosition >= offsetLeft &&
            scrollPosition < offsetLeft + offsetWidth
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
      const offsetLeft = element.offsetLeft
      container.scrollTo({ left: offsetLeft, behavior: "smooth" })
    }
  }

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current
    if (!container || isDragging) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width

    const scrollWidth = container.scrollWidth - container.clientWidth
    container.scrollTo({ left: scrollWidth * percentage, behavior: "smooth" })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current || !scrollContainerRef.current) return

      e.preventDefault()

      const rect = sliderRef.current.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, mouseX / rect.width))

      const container = scrollContainerRef.current
      const scrollWidth = container.scrollWidth - container.clientWidth

      container.scrollLeft = scrollWidth * percentage
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
    <main className="relative h-[100dvh] w-full flex items-center justify-start overflow-hidden overscroll-none p-0 lg:p-12 xl:p-16">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/20 dark:bg-black/20" />

      {/* Theme Toggle - Top Right on desktop, aligned with action buttons on mobile */}
      <div className="fixed top-4 lg:top-12 xl:top-16 right-4 lg:right-12 xl:right-16 z-50">
        <ThemeToggle />
      </div>

      {/* Neo-brutalist container - solid background with thick border and hard shadow */}
      <div className="hidden lg:block fixed inset-4 lg:inset-12 xl:inset-16 dark:bg-black bg-white border-[6px] border-black dark:border-white shadow-[12px_12px_0_rgba(0,0,0,1)] dark:shadow-[12px_12px_0_rgba(255,255,255,1)] overflow-hidden p-4 lg:p-8 transition-colors duration-300 flex flex-col lg:block">

        {/* Profile card - brutalist style */}
        <div className="relative lg:absolute lg:left-8 lg:top-8 lg:bottom-8 w-full lg:max-w-[280px] h-[300px] lg:h-auto shrink-0 mb-4 lg:mb-0 border-[5px] border-black dark:border-white shadow-[8px_8px_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_rgba(255,255,255,1)] overflow-hidden transition-colors duration-300 bg-brutalist-yellow dark:bg-brutalist-cyan">
          <ProfileImage
            src={imageUrl}
            alt="Raj Vaghela"
            className="absolute inset-0 w-full h-full"
            priority
          />

          {/* Solid overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

          {/* Available for work badge - brutalist style */}
          <div className="absolute top-4 right-4 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brutalist-green border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)]">
              <div className="w-2 h-2 bg-black dark:bg-white animate-[pulse_2s_ease-in-out_infinite]" />
              <span className="text-black dark:text-white text-[11px] font-bold uppercase">Available</span>
            </div>
          </div>

          {/* Content at bottom left */}
          <div className="absolute bottom-4 left-4 space-y-3 z-10">
            <div>
              <h1 className="text-4xl font-black dark:text-white text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">Raj Vaghela</h1>
              <p className="dark:text-white text-white text-sm mt-1 font-bold">AI Engineer</p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Raj-Vaghela"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white dark:bg-black border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
              >
                <Github className="w-4 h-4 text-black dark:text-white" />
              </a>
              <a
                href="https://linkedin.com/in/raj-vaghela"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white dark:bg-black border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
              >
                <Linkedin className="w-4 h-4 text-black dark:text-white" />
              </a>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="w-10 h-10 bg-white dark:bg-black border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                aria-label="Get in touch"
                title="Get in touch"
              >
                <Mail className="w-4 h-4 text-black dark:text-white" />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <ChatButton onClick={() => setIsChatModalOpen(true)} />
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 bg-brutalist-magenta border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] flex items-center gap-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
              >
                <FileText className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-bold uppercase whitespace-nowrap">Download CV</span>
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal Slider Navigation - Bottom inside container */}
        <nav className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div className="flex flex-col items-center gap-3">
            <div
              ref={sliderRef}
              className="h-1 w-64 bg-black dark:bg-white relative cursor-pointer hover:h-2 transition-all duration-200 group border-[2px] border-black dark:border-white"
              onClick={handleSliderClick}
            >
              <div
                className={`absolute h-full bg-brutalist-yellow dark:bg-brutalist-cyan cursor-grab active:cursor-grabbing border-[2px] border-black dark:border-white ${isDragging ? '' : 'transition-all duration-300'}`}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsDragging(true)
                }}
                style={{
                  width: '25%',
                  left: `${(sections.findIndex(s => s.id === activeSection) / (sections.length - 1)) * 75}%`
                }}
              >
                {/* Label positioned above slider, centered with indicator */}
                <span
                  className={`absolute bottom-4 left-1/2 -translate-x-1/2 dark:text-white text-black text-sm font-black whitespace-nowrap uppercase transition-opacity duration-200 ${isScrolling || isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
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
                  <span className="w-2 h-2 bg-black dark:bg-white" />
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
                      <span key={idx} className="dark:text-white text-black text-[6px] uppercase leading-tight font-[family-name:var(--font-press-start)]">{ch}</span>
                    ))}
                  </div>
                  <span className="w-2 h-2 bg-black dark:bg-white" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content Area - Horizontal scroll */}
        <div
          ref={scrollContainerRef}
          className="relative lg:absolute z-5 lg:top-0 lg:bottom-0 lg:right-0 lg:left-[calc(8rem+280px)] flex-1 w-full lg:w-auto overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide"
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
          <div className="absolute bottom-10 left-4 flex flex-col items-start gap-2 pointer-events-auto">
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
          <div className="absolute bottom-28 right-4 flex flex-col gap-5 pointer-events-auto items-center">
            <a
              href="https://linkedin.com/in/raj-vaghela"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 group"
            >
              <div className="w-12 h-12 bg-brutalist-yellow dark:bg-brutalist-cyan border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">
                <Linkedin className="w-5 h-5 text-black dark:text-white" />
              </div>
              <span className="text-white text-[10px] font-black drop-shadow-[2px_2px_0_rgba(0,0,0,1)] uppercase">LinkedIn</span>
            </a>

            <button
              onClick={() => setIsContactModalOpen(true)}
              className="flex flex-col items-center gap-1 group"
            >
              <div className="w-12 h-12 bg-brutalist-green border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">
                <Mail className="w-5 h-5 text-black dark:text-white" />
              </div>
              <span className="text-white text-[10px] font-black drop-shadow-[2px_2px_0_rgba(0,0,0,1)] uppercase">Contact</span>
            </button>

            <button
              onClick={() => setIsChatModalOpen(true)}
              className="flex flex-col items-center gap-1 group"
            >
              <div className="w-12 h-12 bg-brutalist-purple border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <span className="text-white text-[10px] font-black drop-shadow-[2px_2px_0_rgba(0,0,0,1)] uppercase">Chat AI</span>
            </button>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 group"
            >
              <div className="w-12 h-12 bg-brutalist-magenta border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-[10px] font-black drop-shadow-[2px_2px_0_rgba(0,0,0,1)] uppercase">Resume</span>
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
