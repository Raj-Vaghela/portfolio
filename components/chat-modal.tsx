"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react"
import { profile, stack8sWork } from "@/lib/profile"

interface ChatModalProps { isOpen: boolean; onClose: () => void }
const topics = {
  Experience: `Raj is an AI Systems Engineer at Stack8s, where he has worked since January 2026.\n\n${stack8sWork.map(item => `• ${item}`).join('\n\n')}`,
  Skills: "Python, TypeScript, SQL, Next.js, React, FastAPI and Node.js.\n\nApplied AI: RAG, embeddings, pgvector, model APIs, tool calling, voice and OCR integrations.\n\nData and infrastructure: ETL pipelines, PostgreSQL, Supabase Auth and Storage, Vercel and GitHub.\n\nUses Cursor, Codex and Claude Code alongside code review and verification.",
  Projects: "Medical Screening Assistant: nurse-supervised MSc prototype with RAG, voice and OCR.\n\nJob Recruiter Assistant: semantic matching, background CV ingestion and approved outreach.\n\nCrypto FM: Gemini-powered radio prototype built at Encode AI London 2025.\n\n30-Day Readmission Prediction: Python machine learning project.\n\nSee Selected projects for implementation details and available source links.",
  Contact: `Raj is based in ${profile.location} and currently works at Stack8s.\n\nFor role opportunities or project enquiries, email ${profile.email}. Availability and notice period can be discussed directly.\n\nHis CV is available through the Download CV button.`,
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [topic, setTopic] = useState<keyof typeof topics>("Experience")
  return (
    <Dialog.Root open={isOpen} onOpenChange={open => { if (!open) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[61] max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-white p-6 text-gray-900 shadow-2xl dark:bg-zinc-950 dark:text-white">
          <div className="flex items-start justify-between gap-4">
            <Dialog.Title className="text-2xl font-bold">Profile guide</Dialog.Title>
            <Dialog.Close className="rounded-lg border border-current/20 px-3 py-2 text-sm">Close</Dialog.Close>
          </div>
          <Dialog.Description className="mt-3 text-sm text-gray-700 dark:text-gray-300">A quick guide to my experience, skills and projects.</Dialog.Description>
          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Profile topics">
            {(Object.keys(topics) as Array<keyof typeof topics>).map(item => <button key={item} onClick={() => setTopic(item)} aria-pressed={topic === item} className={`rounded-xl border px-4 py-2 text-sm ${topic === item ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-black' : 'border-black/20 dark:border-white/20'}`}>{item}</button>)}
          </div>
          <p aria-live="polite" className="mt-6 whitespace-pre-line text-sm leading-relaxed text-gray-800 dark:text-gray-200">{topics[topic]}</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
