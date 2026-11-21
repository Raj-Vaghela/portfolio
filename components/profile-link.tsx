import { ExternalLink, Github, Linkedin } from "lucide-react"
import type { Project } from "@/lib/profile"

const linkIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  "Live demo": ExternalLink,
}

interface ProfileLinkProps {
  href: string
  label: keyof typeof linkIcons
  description: string
}

export function ProfileLink({ href, label, description }: ProfileLinkProps) {
  const Icon = linkIcons[label]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={description}
      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-900/15 bg-white/40 px-3 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-white/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-white/25 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:focus-visible:outline-emerald-400"
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      {label}
    </a>
  )
}

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {project.source ? (
        <ProfileLink href={project.source} label="GitHub" description={"View " + project.title + " on GitHub"} />
      ) : (
        <span className="text-sm text-slate-700 dark:text-white/75">
          {project.privateSource ? "Private repository" : "Source unavailable"}
        </span>
      )}
      {project.liveUrl && (
        <ProfileLink href={project.liveUrl} label="Live demo" description={"Open the " + project.title + " demo"} />
      )}
    </div>
  )
}
