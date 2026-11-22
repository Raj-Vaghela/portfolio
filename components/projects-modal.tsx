"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { PortfolioCard } from "@/components/portfolio-card"
import { ProjectLinks, ProjectSourceStatus } from "@/components/profile-link"
import { projects } from "@/lib/profile"

interface ProjectsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetails({ wallpaper = false }: { wallpaper?: boolean }) {
  return (
    <div className="portfolio-project-details">
      {projects.map((project) => (
        <PortfolioCard key={project.title} wallpaper={wallpaper}>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
            <ProjectLinks project={project} />
          </div>
          <p className="mt-1 text-xs text-inherit opacity-85">{project.context}</p>
          <p className="mt-2 text-sm leading-relaxed">{project.description}</p>
          <ProjectSourceStatus project={project} />
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tags.map((tech) => <li key={tech} className="portfolio-tag">{tech}</li>)}
          </ul>
          <ul className="mt-4 list-disc space-y-2 border-t border-current/15 pt-4 pl-4 text-sm leading-relaxed">
            {project.details.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </PortfolioCard>
      ))}
    </div>
  )
}

export function ProjectsModal({ isOpen, onClose }: ProjectsModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="portfolio-dialog-overlay" />
        <Dialog.Content className="portfolio-project-dialog portfolio-modal">
          <header>
            <Dialog.Title>All projects</Dialog.Title>
            <Dialog.Description className="sr-only">Project summaries, technologies and source links.</Dialog.Description>
            <Dialog.Close className="portfolio-dialog-close" aria-label="Close projects"><X size={19} aria-hidden="true" /></Dialog.Close>
          </header>
          <ProjectDetails />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
