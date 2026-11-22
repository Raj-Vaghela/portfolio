"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { ArrowUp, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { chatLimits, type ChatTurn } from "@/lib/chat"
import { GlassOptics } from "@/components/glass-optics"

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<ChatTurn[]>([])
  const [input, setInput] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const inFlight = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const viewport = scrollRef.current
    if (isOpen && viewport) viewport.scrollTop = viewport.scrollHeight
  }, [isOpen, messages, pending, error])

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const question = input.trim()
    if (inFlight.current || !question) return

    inFlight.current = true
    setPending(true)
    setError("")
    const userTurn: ChatTurn = { role: "user", content: question }
    const nextMessages = [...messages, userTurn]
    setMessages(nextMessages)
    setInput("")

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-chatLimits.turns) }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || typeof result?.answer !== "string" || !result.answer.trim()) {
        throw new Error(typeof result?.error === "string" ? result.error : "The reply couldn’t load. Try again.")
      }
      setMessages([...nextMessages, { role: "assistant", content: result.answer }])
    } catch (failure) {
      setMessages(messages)
      setInput((current) => current || question)
      setError(failure instanceof Error ? failure.message : "The reply couldn’t load. Try again.")
    } finally {
      inFlight.current = false
      setPending(false)
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="portfolio-dialog-overlay" />
        <Dialog.Content
          className="portfolio-modal fixed inset-x-3 top-1/2 z-[100] mx-auto flex h-[min(38rem,calc(100dvh-1.5rem))] max-w-xl -translate-y-1/2 flex-col overflow-hidden rounded-[2rem] text-slate-900 dark:text-slate-50"
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            inputRef.current?.focus()
          }}
        >
          <header className="flex items-start justify-between gap-4 border-b border-slate-500/15 px-5 py-4 sm:px-7 dark:border-white/10">
            <div>
              <Dialog.Title className="font-semibold tracking-tight">Chat with AI</Dialog.Title>
              <Dialog.Description className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Ask about Raj’s experience, projects or freelance work.
              </Dialog.Description>
            </div>
            <Dialog.Close className="liquid-glass-control flex size-8 shrink-0 items-center justify-center rounded-full" aria-label="Close chat">
              <X className="size-4" aria-hidden="true" />
            </Dialog.Close>
          </header>

          <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7" role="log" aria-label="Chat messages">
            <p className="mb-4 max-w-[90%] rounded-2xl rounded-bl-md bg-white/45 px-4 py-3 text-sm dark:bg-white/8">
              Hi, I’m Raj’s portfolio assistant. What would you like to know?
            </p>
            {messages.map((message, index) => (
              <div key={index} className={"mb-3 flex " + (message.role === "user" ? "justify-end" : "justify-start")}>
                <p className={"max-w-[90%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-relaxed " + (
                  message.role === "user"
                    ? "rounded-br-md bg-sky-950/10 dark:bg-sky-300/15"
                    : "rounded-bl-md bg-white/45 dark:bg-white/8"
                )}>
                  <span className="sr-only">{message.role === "user" ? "You: " : "AI assistant: "}</span>
                  {message.content}
                </p>
              </div>
            ))}
            {pending && <p className="text-sm text-slate-600 dark:text-slate-300" role="status">Thinking…</p>}
          </div>

          <div className="px-4 pb-4 pt-2 sm:px-6 sm:pb-6">
            {error && <p className="mb-2 px-2 text-sm text-rose-800 dark:text-rose-200" role="alert">{error}</p>}
            <form onSubmit={sendMessage} className="glass-lens-host glass-pill-rim relative flex items-center gap-2 rounded-full p-1.5 pl-4 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-sky-500">
              <GlassOptics surface="pill" />
              <input
                ref={inputRef}
                aria-label="Ask about Raj"
                placeholder="Ask about Raj…"
                value={input}
                maxLength={chatLimits.questionCharacters}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-slate-600 sm:text-sm dark:placeholder:text-slate-300"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={pending || !input.trim()}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-700 disabled:opacity-35 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                <ArrowUp className="size-5" aria-hidden="true" />
              </button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
