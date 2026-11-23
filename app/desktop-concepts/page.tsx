"use client"

import { ArrowDown, ArrowUpRight, FileText, Github, Linkedin, MapPin } from "lucide-react"
import { useState } from "react"
import { GlassOptics } from "@/components/glass-optics"
import { ProfileImage } from "@/components/profile-image"
import { raykdi } from "@/lib/freelance"
import { profile, projects } from "@/lib/profile"
import css from "./concepts.module.css"

const layouts = {
  studio: { name: "Glass Studio", description: "A portrait sidebar and a project-first workspace." },
  gallery: { name: "Glass Gallery", description: "A London panorama, floating portrait and bottom navigation." },
  editorial: { name: "Glass Editorial", description: "An asymmetric reading layout with light, clear glass." },
} as const

type Layout = keyof typeof layouts
const portrait = process.env.NEXT_PUBLIC_IMAGE_URL || process.env.NEXT_PUBLIC_GOOGLE_DRIVE_IMAGE_URL ||
  "https://drive.google.com/thumbnail?id=11_y_Hb7WRRTNzu0eoevbvoAgYThSmWKY&sz=w2000"
const featured = [projects[0], projects[1]]

export default function DesktopConcepts() {
  const [layout, setLayout] = useState<Layout>("studio")
  return (
    <main className={css.preview}>
      <header className={css.switcher}>
        <div><p>Desktop concepts</p><span>{layouts[layout].description}</span></div>
        <div className={css.options} role="group" aria-label="Choose a desktop layout">
          {(Object.keys(layouts) as Layout[]).map(key => (
            <button key={key} type="button" aria-pressed={layout === key} onClick={() => setLayout(key)}>
              {layouts[key].name}
            </button>
          ))}
        </div>
      </header>

      <div className={css.stage} data-layout={layout}>
        <div className={css.wallpaper} id="concept-backdrop" aria-hidden="true" />
        <div className={css.composition}>
          <nav className={css.nav} aria-label="Portfolio">
            <GlassOptics surface="pill" backdropSelector="#concept-backdrop" />
            <a className={css.monogram} href="#concept-intro" aria-label="Raj Vaghela, introduction">RV</a>
            <div className={css.navLinks}>
              <a href="#concept-work">Work</a>
              <a href="#concept-projects">Projects</a>
              <a href="#raykdi-concept">Freelance</a>
            </div>
            <a className={css.navContact} href={`mailto:${profile.email}`}>Contact <ArrowUpRight size={15} /></a>
          </nav>

          <section className={css.intro} id="concept-intro" aria-labelledby="concept-heading">
            <p className={css.role}>{profile.role} <span>at {profile.employer}</span></p>
            <h1 id="concept-heading">Raj <span>Vaghela</span></h1>
            <p className={css.summary}>{profile.summary}</p>
            <a className={css.cta} href="#concept-projects">Explore projects <ArrowDown size={17} /></a>
          </section>

          <aside className={css.profile} aria-label="Profile links">
            <div className={css.portrait}>
              <ProfileImage src={portrait} alt={profile.name} className="size-full" sizes="(min-width: 1024px) 340px, 100vw" priority />
            </div>
            <div className={css.profileBar}>
              <p><MapPin size={14} /> {profile.location}</p>
              <div>
                <a href="https://github.com/Raj-Vaghela" aria-label="GitHub"><Github size={17} /></a>
                <a href="https://linkedin.com/in/raj-vaghela" aria-label="LinkedIn"><Linkedin size={17} /></a>
                <a href={profile.resume} aria-label="CV"><FileText size={17} /></a>
              </div>
            </div>
          </aside>

          <section className={css.work} id="concept-work" aria-labelledby="concept-work-heading">
            <GlassOptics surface="card" backdropSelector="#concept-backdrop" />
            <p className={css.eyebrow}>Current work</p>
            <h2 id="concept-work-heading">{profile.employer}</h2>
            <p>I build interfaces and APIs across the frontend and backend, and review code with both teams.</p>
            <a href="https://uk.linkedin.com/company/kordinlabs" aria-label="Kordin Labs on LinkedIn"><ArrowUpRight size={18} /></a>
          </section>

          <section className={css.projects} id="concept-projects" aria-labelledby="concept-projects-heading">
            <h2 id="concept-projects-heading">Selected projects</h2>
            <div className={css.projectList}>
              {featured.map(project => (
                <article className={css.tile} key={project.title}>
                  <GlassOptics surface="card" backdropSelector="#concept-backdrop" />
                  <p className={css.eyebrow}>{project.context}</p>
                  <h3>{project.title}</h3><p>{project.description}</p>
                  <ul>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                </article>
              ))}
              <article className={`${css.tile} ${css.freelance}`} id="raykdi-concept">
                <GlassOptics surface="card" backdropSelector="#concept-backdrop" />
                <p className={css.eyebrow}>Freelance · {raykdi.status}</p>
                <h3>{raykdi.title}</h3><p>{raykdi.summary}</p>
                <a href="https://www.rajvaghela.dev/freelance#raykdi">Case study <ArrowUpRight size={15} /></a>
              </article>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
