// Shared public facts used by the portfolio and its profile guide.
export const profile = {
  name: "Raj Vaghela",
  role: "AI Systems Engineer",
  summary: "I build AI applications and the data systems behind them.",
  employer: "Stack8s",
  email: "vaghela.raj2581@gmail.com",
  location: "Leicester, UK",
  resume: "/cv.pdf",
} as const

export const stack8sWork = [
  "Build and maintain pricing pipelines across 22 cloud providers, with daily ingestion, standardisation and validation.",
  "Develop an agentic assistant that recommends compute instances, AI models and application stacks, owning the implementation from backend to interface.",
  "Ingest AI model metadata from Hugging Face and NVIDIA NIMs for model discovery and comparison.",
  "Build a GPU availability tracker that checks providers approximately every three minutes.",
  "Create internal dashboards for analytics, pricing and margin changes, including controlled writeback workflows.",
  "Own Supabase authentication, PostgreSQL databases and storage, and troubleshoot issues across the application and data layers.",
] as const

export const projects = [
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
    // A public source link is added only when the repository is available.
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
] satisfies Array<{ title: string; context: string; description: string; details: string[]; tags: string[]; source?: string }>
