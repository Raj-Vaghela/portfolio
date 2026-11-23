"use client"

import { useState } from "react"
import styles from "./footer-directions.module.css"

type Direction = "editorial" | "letter" | "signal"
const choices: { id: Direction; name: string; note: string }[] = [
  { id: "editorial", name: "01 · Afterword", note: "Confident editorial typography, deep midnight, understated details." },
  { id: "letter", name: "02 · The Letter", note: "Warm paper, personal correspondence, a quieter finish." },
  { id: "signal", name: "03 · Glass Horizon", note: "Layered sapphire glass, precise lines, a bold final gesture." },
]

export default function FooterDirections() {
  const [direction, setDirection] = useState<Direction>("editorial")
  return (
    <main className={styles.lab}>
      <header className={styles.top}>
        <a href="/" className={styles.returnLink}>rajvaghela.dev <span>↗</span></a>
        <p>DESIGN STUDY / MOBILE FOOTER</p>
      </header>
      <div className={styles.intro}>
        <span className={styles.overline}>Three closing statements</span>
        <h1>How should the story <em>end?</em></h1>
        <p>Each direction uses its own opaque surface, so the text never sits over your face. These are experiments, not a change to your live site.</p>
      </div>
      <div className={styles.switcher} role="group" aria-label="Choose footer design direction">
        {choices.map(choice => (
          <button key={choice.id} type="button" aria-pressed={direction === choice.id} onClick={() => setDirection(choice.id)}>
            <span>{choice.name}</span>
          </button>
        ))}
      </div>
      <div className={styles.previewFrame}>
        <div className={styles.mockContent}>
          <span>PORTFOLIO / THE FINAL SCROLL</span>
          <p>Selected work. Experience. Ideas still taking shape.</p>
          <div aria-hidden="true" className={styles.mockRule} />
        </div>
        {direction === "editorial" && (
          <footer className={styles.editorial}>
            <div className={styles.editorialTop}><span>AN AFTERWORD</span><span>RV / 01</span></div>
            <div className={styles.editorialText}>The next good idea<br />starts with <em>hello.</em></div>
            <p>I build things, ask questions, and enjoy good conversations. Have one in mind?</p>
            <a className={styles.editorialLink} href="mailto:vaghela.raj2581@gmail.com?subject=Hello%20Raj">
              <span>Start a conversation</span><span className={styles.lineArrow}>↗</span>
            </a>
            <div className={styles.editorialBottom}><span>LEICESTER, UK</span><span className={styles.signature}>raj.</span></div>
          </footer>
        )}
        {direction === "letter" && (
          <footer className={styles.letter}>
            <div className={styles.letterMeta}><span>A PERSONAL NOTE</span><span>RAJ VAGHELA</span></div>
            <h2>Thanks for<br /><em>looking around.</em></h2>
            <p>There is always more to a person than their portfolio. If any part of mine made you curious, my inbox is open.</p>
            <a className={styles.letterLink} href="mailto:vaghela.raj2581@gmail.com?subject=Hello%20Raj">Write to me <span>↗</span></a>
            <div className={styles.letterFooter}><span>From Leicester, with curiosity.</span><strong>raj.</strong></div>
          </footer>
        )}
        {direction === "signal" && (
          <footer className={styles.signal}>
            <div className={styles.signalHalo} aria-hidden="true" />
            <span className={styles.signalOverline}>END OF PAGE. NOT THE CONVERSATION.</span>
            <h2>What's next<br /><em>isn't written.</em></h2>
            <p>Let's find out.</p>
            <a className={styles.signalLink} href="mailto:vaghela.raj2581@gmail.com?subject=Let's%20build%20something">
              <span>Get in touch</span><b aria-hidden="true">↗</b>
            </a>
            <div className={styles.signalBottom}><span>RAJ VAGHELA</span><span>LEICESTER · UK</span></div>
          </footer>
        )}
      </div>
      <div className={styles.guidance}>
        <div><span>SELECTED DIRECTION</span><strong>{choices.find(choice => choice.id === direction)?.name}</strong></div>
        <p>{choices.find(choice => choice.id === direction)?.note}</p>
        <p>Choose the one you want refined for the actual mobile drawer. The desktop and original V1 remain separate.</p>
      </div>
    </main>
  )
}
