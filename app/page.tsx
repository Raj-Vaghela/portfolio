"use client"

import { GradientBackground } from "@/components/gradient-background"
import { Mail, Github, Linkedin, FileText } from "lucide-react"
import { ContactModal } from "@/components/contact-modal"
import { useEffect, useRef, useState } from "react"

export default function Page() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("me")
  const [isScrolling, setIsScrolling] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
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
    <main className="relative h-screen flex items-center justify-start overflow-hidden p-8 md:p-12 lg:p-16">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/20" />

      {/* Large frosted glass background container - everything lives inside */}
      <div className="fixed inset-8 md:inset-12 lg:inset-16 bg-black/30 backdrop-blur-xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden p-8">
        
        {/* Image card - positioned inside frosted glass with proper spacing */}
        <div className="absolute left-8 top-8 bottom-8 w-full max-w-[280px] rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Image fills entire space */}
        <img src="/pic.jpg" alt="Raj Vaghela" className="absolute inset-0 w-full h-full object-cover" />
        
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Available for work badge - top right */}
        <div className="absolute top-6 right-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]" />
            <span className="text-white text-xs font-medium">Available for work</span>
          </div>
        </div>

        {/* Content at bottom left with equal spacing */}
        <div className="absolute bottom-4 left-4 space-y-3">
          <div>
            <h1 className="text-4xl font-bold text-white">Raj Vaghela</h1>
            <p className="text-white/80 text-sm mt-1">AI Engineer</p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Raj-Vaghela"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Github className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://linkedin.com/in/raj-vaghela"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-white" />
            </a>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Mail className="w-4 h-4 text-white" />
            </button>
            <a
              href="/cv.pdf"
              download
              className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <FileText className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>

        {/* Vertical Slider Navigation - Right side inside glass */}
        <nav className="absolute right-8 top-1/2 -translate-y-1/2 z-50">
          <div className="flex items-center gap-3">
            <div 
              ref={sliderRef}
              className="w-px h-32 bg-white/20 relative cursor-pointer hover:w-1 transition-all duration-200 group"
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
                  className={`absolute right-3 text-white text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${isScrolling || isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
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
        <div className="absolute z-20 top-0 bottom-0 left-[calc(2rem+280px)] overflow-hidden group px-4">
        <div className="skills-marquee-wrapper">
          <div className="skills-marquee-content">
            {/* Add spacing before first word */}
            <div className="h-3" />
            {marqueeSkills.map((s, i) => (
              <div key={`${s}-${i}`} className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-3">
                  {s.toUpperCase().split("").map((ch, idx) => (
                    <span key={idx} className="text-white/80 text-[6px] uppercase leading-tight font-[family-name:var(--font-press-start)]">{ch}</span>
                  ))}
                </div>
                <span className="w-1 h-1 rounded-full bg-white/40" />
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
                    <span key={idx} className="text-white/80 text-[6px] uppercase leading-tight font-[family-name:var(--font-press-start)]">{ch}</span>
                  ))}
                </div>
                <span className="w-1 h-1 rounded-full bg-white/40" />
              </div>
            ))}
          </div>
        </div>
      </div>

        {/* Scrollable Content Area - Right side inside glass */}
        <div
          ref={scrollContainerRef}
          className="absolute z-5 top-0 bottom-0 right-0 left-[calc(2rem+280px+4rem)] overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide"
      >
        {/* Me Section */}
        <section id="me" className="min-h-[600px] flex items-center justify-center p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-white mb-6">About Me</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Welcome to my portfolio. I'm an AI Engineer passionate about building intelligent systems
              and solving complex problems with cutting-edge technology.
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-[600px] flex items-center justify-center p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-white mb-6">Education</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Educational background and achievements go here.
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-[600px] flex items-center justify-center p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-white mb-6">Experience</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Professional experience and roles go here.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-[600px] flex items-center justify-center p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-white mb-6">Projects highlights</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Highlighted projects and achievements go here.
            </p>
          </div>
        </section>
        </div>

      </div>
      {/* End of frosted glass container */}

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

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
