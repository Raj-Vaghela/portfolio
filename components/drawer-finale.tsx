"use client"

import { Linkedin, Mail } from "lucide-react"
import { useState } from "react"
import { GlassOptics } from "@/components/glass-optics"
import { PortfolioCard } from "@/components/portfolio-card"
import { useLegibleText } from "@/lib/glass-legibility"
import { useLeicesterTime } from "@/lib/leicester-time"
import { profile } from "@/lib/profile"

type Intent = "hiring" | "website" | "curious"

const headlines: Record<Intent | "hello", [string, string]> = {
  hello: ["Say", "hello."],
  hiring: ["Let’s", "work."],
  website: ["Let’s", "build."],
  curious: ["Ask", "away."],
}

const notifications: { id: Intent; title: string; body: string; action: string; href?: string }[] = [
  { id: "hiring", title: "Hiring?", body: `${profile.role} at ${profile.employer}. Tap for the CV.`, action: "Download the CV", href: profile.resume },
  { id: "website", title: "Need a website?", body: "See how the Raykdi site came together.", action: "See the freelance work", href: "/freelance" },
  { id: "curious", title: "Just curious?", body: "The AI guide can answer questions about the portfolio.", action: "Ask the AI guide" },
]

// The drawer floats over the portrait wallpaper; every glass surface here refracts it.
const wallpaper = "#portfolio-mobile-portrait"

interface DrawerFinaleProps {
  onAskAI: () => void
  onBackToTop: () => void
}

/** Lock-screen closing scene: live Leicester time over the wallpaper, three routes as glass notifications. */
export function DrawerFinale({ onAskAI, onBackToTop }: DrawerFinaleProps) {
  const [intent, setIntent] = useState<Intent | null>(null)
  const { time, date } = useLeicesterTime()
  const [lead, word] = headlines[intent ?? "hello"]
  const clock = useLegibleText<HTMLDivElement>(wallpaper)
  const home = useLegibleText<HTMLButtonElement>(wallpaper)

  return (
    <footer className="finale-lock" aria-label="Contact">
      <div ref={clock} className="finale-lock-clock" data-legible="">
        <p className="finale-lock-date">{date ? `${date} · Leicester` : "Leicester, UK"}</p>
        <p className="finale-lock-time" aria-label={time ? `Local time in Leicester, ${time}` : undefined}>{time || " "}</p>
        <p className="finale-lock-headline" aria-live="polite">
          <span key={lead + word}>{lead} <em>{word}</em></span>
        </p>
      </div>

      <ul className="finale-lock-notes" aria-label="Notifications from Raj">
        {notifications.map((note) => {
          const open = intent === note.id
          return (
            <li key={note.id}>
              <PortfolioCard wallpaper className="finale-lock-note" data-open={open || undefined}>
                <button type="button" className="finale-lock-note-toggle" aria-expanded={open} onClick={() => setIntent(open ? null : note.id)}>
                  <span className="finale-lock-app" aria-hidden="true">raj.</span>
                  <span className="finale-lock-note-text">
                    <span className="finale-lock-note-top"><strong>{note.title}</strong><span>now</span></span>
                    <span>{note.body}</span>
                  </span>
                </button>
                {open && (
                  note.href
                    ? <a className="finale-lock-action" href={note.href}>{note.action}</a>
                    : <button type="button" className="finale-lock-action" onClick={onAskAI}>{note.action}</button>
                )}
              </PortfolioCard>
            </li>
          )
        })}
      </ul>

      <div className="finale-lock-dock">
        <a className="portfolio-glass-button finale-lock-round" href={`mailto:${profile.email}?subject=Hello%20Raj`} aria-label="Email Raj">
          <GlassOptics surface="photoButton" backdropSelector={wallpaper} />
          <Mail size={20} aria-hidden="true" />
        </a>
        <button ref={home} type="button" className="finale-lock-home" data-legible="" onClick={onBackToTop}>
          Back to top<span aria-hidden="true" />
        </button>
        <a className="portfolio-glass-button finale-lock-round" href="https://www.linkedin.com/in/raj-vaghela/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <GlassOptics surface="photoButton" backdropSelector={wallpaper} />
          <Linkedin size={20} aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
