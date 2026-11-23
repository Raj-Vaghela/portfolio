"use client"

import Image from "next/image"
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react"
import { GlassOptics } from "@/components/glass-optics"
import { greetingFor, useLeicesterTime } from "@/lib/leicester-time"
import { profile } from "@/lib/profile"

const backdrop = "#portfolio-finale-city"

interface DrawerFinaleProps {
  onAskAI: () => void
  onBackToTop: () => void
}

/** London night closing scene for the mobile drawer: live greeting and three routes on liquid glass. */
export function DrawerFinale({ onAskAI, onBackToTop }: DrawerFinaleProps) {
  const { time, hour } = useLeicesterTime()

  return (
    <footer className="finale-city" aria-label="Contact">
      <Image id="portfolio-finale-city" className="finale-city-photo" src="/desktop-london.webp" alt="" fill sizes="100vw" aria-hidden="true" />
      <div className="finale-city-shade" aria-hidden="true" />

      <p className="finale-city-status">
        <span className="finale-city-live" aria-hidden="true" />
        {greetingFor(hour)} · Leicester {time}
      </p>
      <h3 className="finale-city-headline">The city’s lit.<br />Let’s build the <em>next thing.</em></h3>

      <div className="finale-glass finale-city-panel">
        <GlassOptics surface="card" backdropSelector={backdrop} />
        <nav aria-label="Ways to get in touch">
          <a className="finale-city-route" href={profile.resume}>
            <span><em>Hiring</em>Download the CV</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="finale-city-route" href="/freelance">
            <span><em>A website</em>See the freelance work</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <button type="button" className="finale-city-route" onClick={onAskAI}>
            <span><em>Curious</em>Ask the AI guide</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </nav>
        <div className="finale-city-contact">
          <a className="finale-city-hello" href={`mailto:${profile.email}?subject=Hello%20Raj`}>
            <span><strong>Say hello</strong>{profile.email}</span>
            <Mail size={18} aria-hidden="true" />
          </a>
          <div className="finale-city-foot">
            <nav aria-label="Elsewhere">
              <a href="https://www.linkedin.com/in/raj-vaghela/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/Raj-Vaghela" target="_blank" rel="noreferrer">GitHub</a>
              <button type="button" onClick={onBackToTop}>Top ↑</button>
            </nav>
            <strong aria-label="Raj">raj.</strong>
          </div>
        </div>
      </div>
    </footer>
  )
}
