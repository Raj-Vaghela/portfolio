"use client"

import { useSyncExternalStore } from "react"
import { glassStorageKey as storageKey } from "@/lib/glass-bootstrap"

/** "clear" is the default liquid glass; "tinted" trades transparency for contrast, as in iOS 26.1. */
export type GlassAppearance = "clear" | "tinted"


const changeEvent = "portfolio-glass-change"

export function readGlassAppearance(): GlassAppearance {
  return document.documentElement.dataset.glass === "tinted" ? "tinted" : "clear"
}

export function setGlassAppearance(next: GlassAppearance) {
  const root = document.documentElement
  if (next === "tinted") root.dataset.glass = "tinted"
  else delete root.dataset.glass
  try {
    localStorage.setItem(storageKey, next)
  } catch {
    // Private browsing: the choice still applies for this visit.
  }
  window.dispatchEvent(new Event(changeEvent))
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== storageKey) return
    setGlassAppearance(event.newValue === "tinted" ? "tinted" : "clear")
  }
  window.addEventListener(changeEvent, onChange)
  window.addEventListener("storage", onStorage)
  return () => {
    window.removeEventListener(changeEvent, onChange)
    window.removeEventListener("storage", onStorage)
  }
}

/** The current glass appearance, or null during server rendering. */
export function useGlassAppearance() {
  return useSyncExternalStore<GlassAppearance | null>(subscribe, readGlassAppearance, () => null)
}

export const glassChangeEvent = changeEvent
