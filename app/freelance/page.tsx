import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { GradientBackground } from "@/components/gradient-background"
import { PortfolioCard } from "@/components/portfolio-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { raykdi } from "@/lib/freelance"
import { profile } from "@/lib/profile"

const title = "Freelance Portfolio | Raj Vaghela"
const description = "Website design and development by Raj Vaghela, including the Raykdi Indian Tapas Bar website concept."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/freelance" },
  openGraph: { title, description, url: "/freelance", type: "website" },
  twitter: { card: "summary", title, description },
}

export default function FreelancePage() {
  const inquiry = "mailto:" + profile.email + "?subject=" + encodeURIComponent("Freelance website enquiry")

  return (
    <main className="portfolio-freelance-page h-dvh overflow-y-auto overscroll-contain">
      <GradientBackground />
      <div className="mx-auto max-w-4xl px-5 pb-14 pt-6 sm:px-10 sm:pt-10">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-slate-700 hover:underline dark:text-slate-200">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Raj Vaghela
          </Link>
          <div className="hidden lg:block"><ThemeToggle /></div>
        </header>

        <div className="mb-9 mt-12 sm:mt-16">
          <h1 className="text-5xl font-semibold tracking-[-.075em] sm:text-7xl">Freelance portfolio</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            I design and build websites for small businesses. Here’s an example of how I approach a hospitality website, from the first impression to the menu.
          </p>
        </div>

        <PortfolioCard id={raykdi.id} aria-labelledby="raykdi-title" className="portfolio-freelance-feature scroll-mt-6">
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{raykdi.status}</p>
          <h2 id="raykdi-title" className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{raykdi.title}</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-slate-600 dark:text-slate-300">{raykdi.summary}</p>

          <dl className="mt-7 grid gap-5 border-y border-slate-200 py-6 sm:grid-cols-3 dark:border-white/15">
            {raykdi.highlights.map((highlight) => (
              <div key={highlight.title}>
                <dt className="font-medium">{highlight.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{highlight.description}</dd>
              </div>
            ))}
          </dl>

          <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
            {raykdi.technologies.map((technology) => (
              <li key={technology} className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 dark:border-white/15 dark:text-slate-200">
                {technology}
              </li>
            ))}
          </ul>

          <a href={inquiry} className="portfolio-primary mt-6">
            <Mail className="size-4" aria-hidden="true" />
            Discuss a project or request a walkthrough
          </a>
        </PortfolioCard>
      </div>
    </main>
  )
}
