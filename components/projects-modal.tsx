"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { projects } from "@/lib/profile"

interface ProjectsModalProps { isOpen: boolean; onClose: () => void }

export function ProjectsModal({ isOpen, onClose }: ProjectsModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={open => { if (!open) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[61] max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-black/10 bg-white p-6 text-gray-900 shadow-2xl sm:p-8 dark:border-white/15 dark:bg-zinc-950 dark:text-white">
          <div className="flex items-start justify-between gap-4">
            <Dialog.Title className="text-2xl font-bold">Project details</Dialog.Title>
            <Dialog.Close className="rounded-lg border border-current/20 px-3 py-2 text-sm">Close</Dialog.Close>
          </div>
          <Dialog.Description className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">Academic, personal and hackathon projects. Commercial work at Stack8s is described in my experience section.</Dialog.Description>
          <div className="mt-6 space-y-6">
            {projects.map(project => (
              <article key={project.title} className="rounded-2xl border border-black/10 p-5 dark:border-white/15">
                <p className="text-xs text-gray-600 dark:text-gray-400">{project.context}</p>
                <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{project.description}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{project.details.map(item => <li key={item}>{item}</li>)}</ul>
                {project.source ? <a href={project.source} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium underline underline-offset-4">View source on GitHub</a> : null}
              </article>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
