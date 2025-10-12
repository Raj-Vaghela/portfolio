"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

interface Project {
  title: string
  description: string
  technologies: string[]
  details: string[]
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
    details: [
      "Risk-scoring pipeline on a 100k+ multi-hospital dataset to flag likely 30-day readmissions",
      "Addressed severe class imbalance; added simple patient segmentation (K-means → logistic regression)",
      "Lifted precision from ~0.40 to ~0.70 with improved AUC; reproducible notebooks and tidy feature pipeline",
    ],
  },
]

export function ProjectsModal({ isOpen, onClose }: ProjectsModalProps) {
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

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 bg-black/40 backdrop-blur-xl border-b border-white/10">
          <h2 className="text-lg sm:text-2xl font-bold text-white">Featured Projects</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-4 sm:p-6 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-base sm:text-xl font-bold text-white mb-1.5 sm:mb-2">{project.title}</h3>
              <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 text-white text-xs border border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                {project.details.map((detail, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-white/50 text-xs sm:text-sm mt-0.5 sm:mt-1">•</span>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
