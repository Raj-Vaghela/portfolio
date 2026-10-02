"use client"

import { ArrowUpRight } from "lucide-react"
import { profile, projects, stack8sWork } from "@/lib/profile"

interface PortfolioContentProps {
  idPrefix?: string
  onOpenProjectsModal: () => void
}

const card = "rounded-2xl border border-black/10 bg-white/60 p-5 sm:p-6 dark:border-white/15 dark:bg-white/5"
const heading = "mb-6 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl dark:text-white"
const body = "text-base leading-relaxed text-gray-800 dark:text-gray-200"
const section = "scroll-mt-6 px-5 py-10 sm:px-8 md:px-12"

export function PortfolioContent({ onOpenProjectsModal, idPrefix = "" }: PortfolioContentProps) {
  return (
    <div className="mx-auto max-w-4xl pb-12">
      <section id={`${idPrefix}me`} className={section}>
        <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">{profile.role} at {profile.employer} · {profile.location}</p>
        <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl dark:text-white">{profile.summary}</h2>
        <div className="space-y-4">
          <p className={body}>At Stack8s, I work across AI features, cloud pricing pipelines and internal tools. My work spans model and compute recommendations, GPU availability tracking and Supabase operations.</p>
          <p className={body}>I build with Python, FastAPI, TypeScript and Next.js, using PostgreSQL and pgvector for data and retrieval. I hold an MSc in Advanced Computer Science with Distinction from the University of Leicester.</p>
        </div>
        <dl className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["22", "cloud providers in pricing pipelines"],
            ["~3 min", "GPU availability check interval"],
            ["End to end", "AI, backend, frontend and data ownership"],
          ].map(([value, label]) => (
            <div key={label} className={card}>
              <dt className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{label}</dt>
              <dd className="mt-2 text-2xl font-semibold text-gray-950 dark:text-white">{value}</dd>
            </div>
          ))}
        </dl>
        <nav aria-label="Portfolio sections" className="mt-7 flex flex-wrap gap-3">
          {[['experience', 'Experience'], ['projects', 'Selected projects'], ['education', 'Education']].map(([id, label]) => (
            <a key={id} href={`#${idPrefix}${id}`} className="rounded-lg border border-black/15 px-4 py-2 text-sm font-medium text-gray-950 hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-white/20 dark:text-white dark:hover:bg-white/10">{label}</a>
          ))}
        </nav>
      </section>

      <section id={`${idPrefix}experience`} className={section}>
        <h2 className={heading}>Experience</h2>
        <div className="space-y-5">
          <article className={card}>
            <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">Jan 2026 to present · Remote, UK</p>
            <h3 className="text-xl font-bold text-gray-950 dark:text-white">Stack8s</h3>
            <p className="mb-5 font-medium text-gray-800 dark:text-gray-200">AI Systems Engineer</p>
            <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
              {stack8sWork.map(item => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className={card}>
            <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">Jan 2023 to Apr 2023 · Bardoli, India</p>
            <h3 className="text-xl font-bold text-gray-950 dark:text-white">Direction Infosystems</h3>
            <p className="mb-3 font-medium text-gray-800 dark:text-gray-200">Web Development Intern</p>
            <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">Built and maintained websites with PHP, Laravel, MySQL, Bootstrap and jQuery. Assisted with interface design, deployment and handover in a team environment.</p>
          </article>
          <details className={card}>
            <summary className="cursor-pointer font-semibold text-gray-950 dark:text-white">Earlier internship and training programmes</summary>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
              <p><strong>Elsner Technologies, summer internship</strong> · Jun to Jul 2022<br />Built a basic Android to-do application with Java and completed foundational development tasks.</p>
              <p><strong>IBM virtual internship programme</strong> · Jun to Jul 2023<br />Practised Python data cleaning, visualisation, preprocessing and baseline machine learning evaluation.</p>
              <p><strong>Microsoft Future Ready Talent virtual internship</strong> · Apr to Jun 2023<br />Explored Azure hosting and deployed sample applications using GitHub CI/CD.</p>
            </div>
          </details>
        </div>
      </section>

      <section id={`${idPrefix}projects`} className={section}>
        <h2 className={heading}>Selected projects</h2>
        <p className={`${body} mb-6`}>Personal and academic work in retrieval, agent workflows and machine learning. My current commercial work is described in the experience section.</p>
        <div className="grid gap-5">
          {projects.map(project => (
            <article key={project.title} className={card}>
              <p className="mb-2 text-xs font-medium text-gray-700 dark:text-gray-300">{project.context}</p>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold text-gray-950 dark:text-white">{project.title}</h3>
                {project.source ? <a href={project.source} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source on GitHub`} className="shrink-0 rounded-lg border border-black/15 p-2 text-gray-950 hover:bg-white/70 dark:border-white/20 dark:text-white dark:hover:bg-white/10"><ArrowUpRight className="h-4 w-4" /></a> : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-800 dark:text-gray-200">{project.description}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                {project.details.map(detail => <li key={detail}>{detail}</li>)}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map(tag => <span key={tag} className="rounded-full bg-black/5 px-3 py-1 text-xs text-gray-800 dark:bg-white/10 dark:text-gray-200">{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
        <button onClick={onOpenProjectsModal} className="mt-6 rounded-xl border border-black/15 px-5 py-3 text-sm font-medium text-gray-950 hover:bg-white/70 dark:border-white/20 dark:text-white dark:hover:bg-white/10">Explore project details</button>
      </section>

      <section id={`${idPrefix}education`} className={section}>
        <h2 className={heading}>Education and highlights</h2>
        <div className="space-y-5">
          <article className={card}>
            <h3 className="text-xl font-bold text-gray-950 dark:text-white">MSc Advanced Computer Science</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-800 dark:text-gray-200">University of Leicester · Distinction · Jan 2024 to Jul 2025</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-800 dark:text-gray-200">Dissertation: Medical Screening Assistant, a chatbot to help nurses. Modules included Big Data and Predictive Analytics, C++, and Technology and Innovation Management.</p>
          </article>
          <article className={card}>
            <h3 className="text-xl font-bold text-gray-950 dark:text-white">BE Computer Science and Engineering</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-800 dark:text-gray-200">S.N. Patel Institute of Technology and Research Centre · 8.55/10 · Jun 2019 to Jun 2023</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-800 dark:text-gray-200">Artificial Intelligence, Machine Learning, Data Mining and Software Engineering.</p>
          </article>
          <article className={card}>
            <h3 className="mb-4 text-xl font-bold text-gray-950 dark:text-white">Highlights</h3>
            <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
              <li>Huawei Tech Arena finalist, top 8 of 100+ teams. Led a four-person team to a proof of concept and board pitch.</li>
              <li>Built Crypto FM at Encode AI London 2025.</li>
              <li>University peer mentor, course representative and Leicester 100 participant.</li>
              <li>MYSY Merit Scholarship recipient.</li>
            </ul>
          </article>
        </div>
        <p className={`${body} mt-8`}>Interested in my work? <a href={`mailto:${profile.email}`} className="font-medium underline underline-offset-4">Get in touch</a> or <a href={profile.resume} className="font-medium underline underline-offset-4">download my CV</a>.</p>
      </section>
    </div>
  )
}
