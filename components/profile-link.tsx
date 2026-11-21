import { ExternalLink, Github, Linkedin } from "lucide-react"
import type { Project } from "@/lib/profile"

const linkIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  "Live demo": ExternalLink,
}

const iconLinkStyles = {
  compact: {
    link: "p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/20 transition-all",
    icon: "w-4 h-4 dark:text-white/70 text-gray-700",
  },
  drawer: {
    link: "p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 transition-all group",
    icon: "w-5 h-5 dark:text-white/70 text-slate-700 group-hover:text-emerald-400 transition-colors",
  },
  dialog: {
    link: "p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/20 transition-all group",
    icon: "w-5 h-5 dark:text-white/70 text-slate-700 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors",
  },
}

type Appearance = keyof typeof iconLinkStyles

interface ProfileLinkProps {
  href: string
  label: keyof typeof linkIcons
  description: string
  appearance?: Appearance
}

export function ProfileLink({ href, label, description, appearance = "compact" }: ProfileLinkProps) {
  const Icon = linkIcons[label]
  const styles = iconLinkStyles[appearance]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={description}
      title={description}
      className={styles.link + " inline-flex shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:focus-visible:outline-emerald-400"}
    >
      <Icon className={styles.icon} aria-hidden="true" />
    </a>
  )
}

export function ProjectLinks({ project, appearance = "compact" }: { project: Project; appearance?: Appearance }) {
  if (!project.source && !project.liveUrl) return null

  return (
    <div className={"flex shrink-0 items-center " + (appearance === "compact" ? "gap-1" : "gap-2")}>
      {project.liveUrl && (
        <ProfileLink href={project.liveUrl} label="Live demo" description={"Open the " + project.title + " demo"} appearance={appearance} />
      )}
      {project.source && (
        <ProfileLink href={project.source} label="GitHub" description={"View " + project.title + " on GitHub"} appearance={appearance} />
      )}
    </div>
  )
}

export function ProjectSourceStatus({ project }: { project: Project }) {
  if (project.source) return null

  return (
    <p className="mt-2 text-xs text-slate-700 dark:text-white/75">
      {project.privateSource ? "Private repository" : "Source unavailable"}
    </p>
  )
}
