// Shared public facts used by the portfolio and its profile guide.
export const profile = {
  name: "Raj Vaghela",
  role: "AI Systems Engineer",
  summary: "I build AI applications and the data systems behind them.",
  employer: "Kordin Labs",
  roleStart: "January 2026",
  email: "vaghela.raj2581@gmail.com",
  location: "Leicester, UK",
  resume: "/cv.pdf",
} as const

export const currentWork = [
  "Develop product features across frontend and backend codebases, working with both teams on user interfaces, APIs and integrations.",
  "Take changes through implementation and review, regularly opening pull requests and reviewing teammates’ code.",
  "Built cloud pricing pipelines across 22 providers and a GPU availability tracker with roughly three-minute refreshes.",
  "Developed an AI assistant that recommends compute instances, AI models and application stacks.",
  "Built model metadata pipelines for Hugging Face and NVIDIA NIMs, developed internal pricing and analytics dashboards, and supported Supabase authentication, databases and storage.",
] as const

export type Project = {
  title: string
  context: string
  description: string
  details: string[]
  tags: string[]
  source?: string
  privateSource?: boolean
  liveUrl?: string
}

export const projects: Project[] = [
  {
    title: "Pattivo",
    privateSource: true,
    context: "Personal SaaS · In development",
    description: "A shift calendar and earnings tracker for people on rotating schedules.",
    details: [
      "Built a pattern builder for rotating schedules, with support for overnight shifts, breaks and multiple workplaces.",
      "Added pay-period earnings, payday forecasts and CSV exports for shift records.",
    ],
    tags: ["Next.js", "Supabase", "Stripe"],
  },
  {
    title: "Vaani",
    privateSource: true,
    context: "Personal project · Prototype",
    description: "A mobile-first AI speaking coach for English conversation, pronunciation and interview practice.",
    details: [
      "Built real-time voice conversations with WebRTC alongside speaking-test and mock interview modes.",
      "Combined voice conversations with phoneme-level pronunciation assessment and optional Gujarati explanations.",
    ],
    tags: ["TypeScript", "WebRTC", "Azure AI Speech"],
  },
  {
    title: "Bureaucrab",
    privateSource: true,
    context: "Personal project · Developer preview",
    description: "A local-first AI assistant for tracking projects, tasks and decisions across coding tools.",
    details: [
      "Built a Python dashboard and API backed by SQLite, with searchable activity and project history.",
      "Added conversation-export importers, coding-agent event ingestion and calendar-ready time blocks.",
    ],
    tags: ["Python", "SQLite", "AI workflows"],
  },
  {
    title: "Medical Screening Assistant",
    context: "MSc dissertation · 2025",
    description: "A nurse-supervised screening assistant combining symptom intake, document retrieval and voice interaction.",
    details: [
      "Built a Next.js interface with FastAPI services and PostgreSQL/pgvector retrieval over NHS, MedlinePlus and hospital documents.",
      "Integrated Whisper speech recognition, ElevenLabs speech synthesis and OCR for uploaded documents.",
      "Kept nurses in control of screening and department suggestions. This was an academic prototype, not a clinically validated system.",
    ],
    tags: ["Next.js", "FastAPI", "RAG", "pgvector", "Gemini"],
    source: "https://github.com/Raj-Vaghela/NurseChat",
  },
  {
    title: "Job Recruiter Assistant",
    context: "Personal project · 2025",
    description: "A recruiter workspace for CV ingestion, semantic candidate matching and answers linked to supporting evidence.",
    details: [
      "Designed a five-table Supabase schema and a database function for semantic profile matching.",
      "Processed CVs through background OCR and embedding jobs while keeping chat independent of document ingestion.",
      "Added a draft, preview and approval flow for SendGrid outreach, with per-recipient delivery results.",
    ],
    tags: ["Next.js", "FastAPI", "Supabase", "Gemini", "OCR"],
  },
  {
    title: "Crypto FM",
    context: "Encode AI London hackathon · 2025",
    description: "An AI radio prototype that turns cryptocurrency market data into narrated broadcasts.",
    details: [
      "Connected data collectors, analysis and radio script agents to Gemini and Google Cloud Text-to-Speech.",
      "Built a segment queue, quota-aware collection and retry/backoff handling for continuous playback.",
    ],
    tags: ["Node.js", "Express", "Gemini", "Google Cloud TTS"],
    source: "https://github.com/Raj-Vaghela/CryptoFM",
    liveUrl: "https://encode2025.vercel.app",
  },
  {
    title: "30-Day Readmission Prediction",
    context: "Machine learning project · 2024",
    description: "A reproducible classification pipeline exploring readmission risk in a dataset of over 100,000 hospital encounters.",
    details: [
      "Used pandas and scikit-learn for preprocessing, class imbalance handling and patient segmentation.",
      "Compared classification results in notebooks. The project explores predictive modelling and is not a clinical decision tool.",
    ],
    tags: ["Python", "pandas", "scikit-learn"],
    source: "https://github.com/Raj-Vaghela/Patient-Readmission-Prediction-Google-Colab",
  },
]
