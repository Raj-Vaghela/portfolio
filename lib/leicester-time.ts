"use client"

import { useSyncExternalStore } from "react"

const zone = "Europe/London"
const interval = 30_000

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, interval)
  return () => window.clearInterval(timer)
}

// One snapshot per 30 seconds keeps renders stable between ticks.
const getSnapshot = () => Math.floor(Date.now() / interval)
const getServerSnapshot = () => null

/** Current time in Leicester. Empty on the server so markup never mismatches. */
export function useLeicesterTime() {
  const tick = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  if (tick === null) return { time: "", date: "", hour: null as number | null }

  const now = new Date(tick * interval)
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: zone })
  const date = now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: zone })
  return { time, date, hour: Number.parseInt(time.slice(0, 2), 10) }
}

export function greetingFor(hour: number | null) {
  if (hour === null) return "Hello"
  if (hour < 5) return "Up late"
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}
