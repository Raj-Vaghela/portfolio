"use client"

import { GradientBackground } from "@/components/gradient-background"
import { Mail, Github, Linkedin, FileText, ExternalLink } from "lucide-react"
import { ContactModal } from "@/components/contact-modal"
import { ProjectsModal } from "@/components/projects-modal"
import { useEffect, useRef, useState } from "react"

export default function Page() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false)
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
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]" />
            <span className="text-white text-[10px] font-medium">Available for work</span>
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
        <div className="absolute z-20 top-0 bottom-0 left-[calc(4rem+280px-3px)] overflow-hidden group px-4">
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
          className="absolute z-5 top-0 bottom-0 right-0 left-[calc(8rem+280px)] overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide"
      >
        {/* Me Section */}
        <section id="me" className="min-h-[600px] flex items-center justify-center p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-bold text-white mb-8">About Me</h2>
            <div className="space-y-6">
              <p className="text-white/90 text-lg leading-relaxed">
                I'm an <span className="text-white font-semibold">MSc Advanced Computer Science</span> student at the University of Leicester (Distinction), 
                specializing in applied AI and Large Language Models.
              </p>
              <p className="text-white/80 text-base leading-relaxed">
                I build <span className="text-white/90 font-medium">retrieval-augmented systems</span> with embeddings and pgvector, 
                robust <span className="text-white/90 font-medium">FastAPI/Node back ends</span>, and modern <span className="text-white/90 font-medium">React/Next.js UIs</span>. 
                I'm comfortable with multimodal STT/TTS/OCR, function calling, and streaming UX. Strong in Python and 
                software engineering fundamentals — I ship testable services with telemetry, retries, and graceful shutdowns.
              </p>
              <p className="text-white/80 text-base leading-relaxed">
                Looking to help teams turn LLM prototypes into reliable, user-centered products.
              </p>
              
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-white/60 text-sm mb-1">Location</div>
                  <div className="text-white font-medium">Leicester, UK</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-white/60 text-sm mb-1">Status</div>
                  <div className="text-white font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Available for work
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-[600px] flex items-center justify-center p-8 md:p-12">
          <div className="max-w-3xl w-full">
            <h2 className="text-5xl font-bold text-white mb-8">Education</h2>
            <div className="space-y-6">
              {/* Master's Degree */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Master of Science (M.Sc.)</h3>
                    <p className="text-white/90 text-lg">Advanced Computer Science</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                    <span className="text-green-400 text-sm font-medium">Distinction</span>
                  </div>
                </div>
                <p className="text-white/70 text-base mb-3">University of Leicester, UK</p>
                <p className="text-white/60 text-sm mb-4">Jan 2024 – Jul 2025</p>
                <div className="space-y-2">
                  <p className="text-white/80 text-sm">
                    <span className="text-white/90 font-medium">Key modules:</span> Big Data & Predictive Analytics, C++, Cybersecurity, Technology & Innovation Management
                  </p>
                </div>
              </div>

              {/* Bachelor's Degree */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Bachelor of Engineering (B.E.)</h3>
                    <p className="text-white/90 text-lg">Computer Science & Engineering</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
                    <span className="text-blue-400 text-sm font-medium">8.55/10 (85.5%)</span>
                  </div>
                </div>
                <p className="text-white/70 text-base mb-3">S.N. Patel Institute of Technology & Research Centre, India</p>
                <p className="text-white/60 text-sm mb-4">Jun 2019 – Jun 2023</p>
                <div className="space-y-2">
                  <p className="text-white/80 text-sm">
                    <span className="text-white/90 font-medium">Key modules:</span> Artificial Intelligence, Computer Networks, Data Mining, Machine Learning, Software Engineering
                  </p>
                </div>
              </div>

              {/* Highlights & Awards */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
                <h4 className="text-lg font-bold text-white mb-4">Highlights & Awards</h4>
                <div className="grid gap-3">
                  <div className="flex gap-3">
                    <span className="text-yellow-400 mt-0.5">🏆</span>
                    <p className="text-white/80 text-sm"><span className="font-medium text-white">Huawei Tech Arena</span> — Finalist (Top 8/100+ teams)</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-yellow-400 mt-0.5">🥉</span>
                    <p className="text-white/80 text-sm"><span className="font-medium text-white">Cyber4Me CTF</span> — 3rd place (University of Wolverhampton)</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-blue-400 mt-0.5">🎯</span>
                    <p className="text-white/80 text-sm"><span className="font-medium text-white">Encode AI London '25</span> — "Crypto Radio"</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-purple-400 mt-0.5">👥</span>
                    <p className="text-white/80 text-sm"><span className="font-medium text-white">University leadership:</span> Peer Mentor, Course Rep, Leicester 100 (policy review for 10,000+ students)</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-green-400 mt-0.5">🎓</span>
                    <p className="text-white/80 text-sm"><span className="font-medium text-white">Scholarships:</span> MYSY Merit Scholarship, State Aptitude Test Winner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-[600px] flex items-center justify-center p-8 md:p-12">
          <div className="max-w-3xl w-full">
            <h2 className="text-5xl font-bold text-white mb-8">Experience</h2>
            <div className="space-y-6">
              {/* IBM */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white">IBM</h3>
                    <p className="text-white/80 text-base">Virtual Intern</p>
                  </div>
                  <span className="text-white/60 text-sm whitespace-nowrap">Jun 2023 – Jul 2023</span>
                </div>
                <ul className="space-y-2 mt-4">
                  <li className="flex gap-2 text-white/80 text-sm">
                    <span className="text-white/50">•</span>
                    <span>Prototyped data cleaning & visualisation in Python, cutting exploratory cycle time by ~30% on sample datasets.</span>
                  </li>
                  <li className="flex gap-2 text-white/80 text-sm">
                    <span className="text-white/50">•</span>
                    <span>Evaluated classical ML models (precision/recall/AUC) and documented trade-offs for baseline selection.</span>
                  </li>
                  <li className="flex gap-2 text-white/80 text-sm">
                    <span className="text-white/50">•</span>
                    <span>Automated preprocessing (imputation/encoding/scaling) into reusable snippets for consistency across notebooks.</span>
                  </li>
                </ul>
              </div>

              {/* Microsoft */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Microsoft</h3>
                    <p className="text-white/80 text-base">Virtual Intern</p>
                  </div>
                  <span className="text-white/60 text-sm whitespace-nowrap">Apr 2023 – Jun 2023</span>
                </div>
                <p className="text-white/70 text-sm mb-3">AICTE approved Virtual Internship under the Future Ready Talent initiative</p>
                <ul className="space-y-2">
                  <li className="flex gap-2 text-white/80 text-sm">
                    <span className="text-white/50">•</span>
                    <span>Explored Azure (Static Web Apps, Front Door, CDN) and deployed sample apps with CI/CD from GitHub (100% green builds).</span>
                  </li>
                  <li className="flex gap-2 text-white/80 text-sm">
                    <span className="text-white/50">•</span>
                    <span>Practised Git/GitHub workflows (branching, PR reviews, issues), reducing merge conflicts on small team projects.</span>
                  </li>
                  <li className="flex gap-2 text-white/80 text-sm">
                    <span className="text-white/50">•</span>
                    <span>Built mini-demos connecting Azure front ends to simple APIs with notes on cost, latency, reliability trade-offs.</span>
                  </li>
                </ul>
              </div>

              {/* Direction Infosystems */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Direction Infosystems</h3>
                    <p className="text-white/80 text-base">Intern</p>
                  </div>
                  <span className="text-white/60 text-sm whitespace-nowrap">Jan 2023 – Apr 2023</span>
                </div>
                <p className="text-white/70 text-sm mb-3">Bardoli</p>
                <ul className="space-y-2">
                  <li className="flex gap-2 text-white/80 text-sm">
                    <span className="text-white/50">•</span>
                    <span>Built and maintained websites using PHP, Laravel, MySQL, Bootstrap, and jQuery in a team setting.</span>
                  </li>
                  <li className="flex gap-2 text-white/80 text-sm">
                    <span className="text-white/50">•</span>
                    <span>Assisted in UI design and code deployment, ensuring smooth handover and compatibility with in-house tools.</span>
                  </li>
                </ul>
              </div>

              {/* Elsner Technologies */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Elsner Technologies Pvt. Ltd.</h3>
                    <p className="text-white/80 text-base">Summer Internship</p>
                  </div>
                  <span className="text-white/60 text-sm whitespace-nowrap">Jun 2022 – Jul 2022</span>
                </div>
                <p className="text-white/70 text-sm mb-3">Ahmedabad</p>
                <ul className="space-y-2">
                  <li className="flex gap-2 text-white/80 text-sm">
                    <span className="text-white/50">•</span>
                    <span>Developed a basic Android-based To-Do list app using Java.</span>
                  </li>
                  <li className="flex gap-2 text-white/80 text-sm">
                    <span className="text-white/50">•</span>
                    <span>Completed foundational coding tasks while gaining exposure to agile teamwork and app development principles.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-[600px] flex items-center justify-center p-8 md:p-12">
          <div className="max-w-3xl w-full">
            <h2 className="text-5xl font-bold text-white mb-8">Project Highlights</h2>
            <div className="space-y-6">
              <p className="text-white/80 text-lg leading-relaxed">
                From RAG-powered assistants to agentic AI systems, I build full-stack applications that combine cutting-edge AI with production-ready engineering.
              </p>
              
              {/* Quick Project Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <h4 className="text-lg font-bold text-white mb-2">Job Recruiter Assistant</h4>
                  <p className="text-white/70 text-sm mb-3">RAG-powered with semantic matching, CV OCR, and SendGrid automation</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">FastAPI</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">Supabase</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">pgvector</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <h4 className="text-lg font-bold text-white mb-2">Medical Screening Assistant</h4>
                  <p className="text-white/70 text-sm mb-3">AI triage chatbot with RAG+CAG pipeline and multimodal STT/TTS</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">Gemini</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">OpenAI</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">Whisper</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <h4 className="text-lg font-bold text-white mb-2">Crypto FM</h4>
                  <p className="text-white/70 text-sm mb-3">Agentic AI crypto radio with real-time market analysis</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">Node.js</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">Gemini</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">Google TTS</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <h4 className="text-lg font-bold text-white mb-2">30-Day Readmission Prediction</h4>
                  <p className="text-white/70 text-sm mb-3">ML pipeline on 100k+ dataset to flag readmissions</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">Python</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">scikit-learn</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">pandas</span>
                  </div>
                </div>
              </div>

              {/* View All Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setIsProjectsModalOpen(true)}
                  className="group px-6 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <span className="text-white font-medium">View All Projects</span>
                  <ExternalLink className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>
        </div>

      </div>
      {/* End of frosted glass container */}

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <ProjectsModal isOpen={isProjectsModalOpen} onClose={() => setIsProjectsModalOpen(false)} />

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
