"use client"

import { X, Github, ExternalLink } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface Project {
  title: string
  description: string
  technologies: string[]
  details: string[]
  githubUrl: string
  liveUrl?: string
}

interface ProjectsModalProps {
  isOpen: boolean
  onClose: () => void
}

const projects: Project[] = [
  {
    title: "Job Recruiter Assistant",
    description: "RAG-powered assistant with semantic matching, CV OCR, and SendGrid outreach automation",
    technologies: ["FastAPI", "Next.js", "Supabase", "pgvector", "Gemini", "OCR", "SendGrid"],
    githubUrl: "https://github.com/Raj-Vaghela/job-recruiter-assistant",
    details: [
      "Designed a recruiter-facing assistant with RAG over candidate/job data; 5-table schema and a match_candidates RPC to return semantically similar profiles with evidence-linked answers",
      "Built an ingestion pipeline: CV validation → storage → background OCR → embeddings → index; kept the chat path sub-few-seconds while CV parsing completes asynchronously",
      "Implemented safe function-calling for outreach (draft → preview → approve) before send via SendGrid; surfaced per-recipient delivery results",
      "Delivered a full-stack UX (chat + candidate records, auth, Swagger docs) with conservative fallbacks when evidence is thin",
    ],
  },
  {
    title: "Medical Screening Assistant",
    description: "AI triage chatbot with RAG+CAG pipeline, multimodal STT/TTS, and NHS documentation OCR",
    technologies: ["Gemini", "OpenAI", "RAG", "CAG", "Supabase", "FastAPI", "Whisper", "ElevenLabs", "OCR"],
    githubUrl: "https://github.com/Raj-Vaghela/NurseChat",
    details: [
      "Dual pipeline (RAG + constrained knowledge) grounded in NHS/hospital docs; top-k semantic retrieval with similarity thresholding and cache refresh",
      "Multimodal flow: streaming STT for hands-free triage; natural TTS; OCR of PDFs/JPG/PNG into structured Markdown so the model can cite sections in chat",
      "Admin & ops: versioned hospital policies; single-active source enforcement; scheduled activations; role-based access so staff can update info safely",
      "Hierarchical context inclusion (live ward data and user uploads ranked above background medical content) and recency-aware turn selection",
    ],
  },
  {
    title: "Crypto FM — Agentic AI 'Crypto Radio'",
    description: "Agentic AI crypto radio with real-time market analysis and voice narration",
    technologies: ["Node.js", "Express", "Gemini", "Google Cloud TTS", "CoinGecko", "Whale Alert", "CryptoPanic"],
    githubUrl: "https://github.com/Raj-Vaghela/CryptoFM",
    liveUrl: "https://encode2025.vercel.app",
    details: [
      "Orchestrated data collectors → analyst agent → voice pipeline to narrate market signals; refreshed scripts every ~60s",
      "Implemented segment queue + resilient autoplay with retry/backoff to keep playback smooth during spikes and network hiccups",
      "Production-lean: quota-aware collectors, structured logs, graceful shutdown and auto-restart",
      "Stable live demo; teammates could clone-and-run in minutes",
    ],
  },
  {
    title: "30-Day Readmission Prediction (Diabetes)",
    description: "Risk-scoring pipeline on a 100k+ multi-hospital dataset to flag likely 30-day readmissions",
    technologies: ["Python", "pandas", "scikit-learn", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/Raj-Vaghela/Patient-Readmission-Prediction-Google-Colab",
    details: [
      "Risk-scoring pipeline on a 100k+ multi-hospital dataset to flag likely 30-day readmissions",
      "Addressed severe class imbalance; added simple patient segmentation (K-means → logistic regression)",
      "Lifted precision from ~0.40 to ~0.70 with improved AUC; reproducible notebooks and tidy feature pipeline",
    ],
  },
]

export function ProjectsModal({ isOpen, onClose }: ProjectsModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
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
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
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
          {projects.map((project, index) => (
            <div
              key={index}
              className="rounded-2xl sm:rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 p-5 sm:p-6 hover:bg-white/60 dark:hover:bg-white/10 transition-colors shadow-sm"
            >
              <div className="flex items-start justify-between gap-3 mb-3 sm:mb-2">
                <h3 className="text-lg sm:text-xl font-bold dark:text-white text-black leading-tight">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/20 transition-all group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-5 h-5 dark:text-white/70 text-slate-700 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/20 transition-all group"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-5 h-5 dark:text-white/70 text-slate-700 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                  </a>
                </div>
              </div>

              <p className="dark:text-white/80 text-slate-700 text-sm sm:text-sm mb-4 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
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
                strokeDasharray={`${2 * Math.PI * 16}`}
                strokeDashoffset={`${2 * Math.PI * 16 * (1 - scrollProgress / 100)}`}
                className="dark:text-emerald-400 text-emerald-600 transition-all duration-300"
                strokeLinecap="round"
              />
            </svg>
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-[10px] font-bold dark:text-white text-slate-800 transition-opacity duration-200 ${isScrolling ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                {Math.round(scrollProgress)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
