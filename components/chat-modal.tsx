"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { ArrowUp, ArrowUpRight, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { chatLimits, type ChatLink, type ChatTurn } from "@/lib/chat"
import { GlassOptics } from "@/components/glass-optics"

type DisplayTurn = ChatTurn & { links?: ChatLink[] }

const suggestedQuestions = [
  "What does Raj work on at Kordin Labs?",
  "Which projects can I try?",
  "Can Raj build a website for my business?",
]

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<DisplayTurn[]>([])
  const [input, setInput] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const inFlight = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [dialog, setDialog] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    const viewport = window.visualViewport
    if (!dialog || !viewport) return

    let frame = 0
    function updateViewport() {
      if (!dialog || !viewport) return
      const thread = scrollRef.current
      const followingLatest = thread && thread.scrollHeight - thread.scrollTop - thread.clientHeight < 48

      // The keyboard shrinks the visible viewport and can pan it to the focused field.
      dialog.style.setProperty("--chat-viewport-top", viewport.offsetTop + "px")
      dialog.style.setProperty("--chat-viewport-height", viewport.height + "px")
      dialog.toggleAttribute("data-compact", viewport.height < 430)

      if (followingLatest) thread.scrollTop = thread.scrollHeight
    }
    function scheduleUpdate() {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateViewport)
    }

    updateViewport()
    viewport.addEventListener("resize", scheduleUpdate)
    viewport.addEventListener("scroll", scheduleUpdate)
    window.addEventListener("resize", scheduleUpdate)
    return () => {
      window.cancelAnimationFrame(frame)
      viewport.removeEventListener("resize", scheduleUpdate)
      viewport.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
    }
  }, [dialog])

  useEffect(() => {
    const viewport = scrollRef.current
    if (isOpen && viewport) viewport.scrollTop = viewport.scrollHeight
  }, [isOpen, messages, pending, error])

  async function sendMessage(value: string) {
    const question = value.trim()
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
        body: JSON.stringify({ messages: nextMessages.slice(-chatLimits.turns).map(({ role, content }) => ({ role, content })) }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || typeof result?.answer !== "string" || !result.answer.trim()) {
        throw new Error(typeof result?.error === "string" ? result.error : "The reply couldn’t load. Try again.")
      }
      setMessages([...nextMessages, { role: "assistant", content: result.answer, links: result.links }])
    } catch (failure) {
      setMessages(messages)
      setInput((current) => current || question)
      setError(failure instanceof Error ? failure.message : "The reply couldn’t load. Try again.")
    } finally {
      inFlight.current = false
      setPending(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void sendMessage(input)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="portfolio-dialog-overlay" />
        <Dialog.Content
          ref={setDialog}
          className="portfolio-modal portfolio-chat fixed inset-x-3 z-[100] mx-auto flex max-w-xl -translate-y-1/2 flex-col overflow-hidden rounded-[2rem] text-slate-900 dark:text-slate-50"
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            if (window.matchMedia("(pointer: coarse)").matches) titleRef.current?.focus({ preventScroll: true })
            else inputRef.current?.focus({ preventScroll: true })
          }}
        >
          <header className="portfolio-chat-header flex shrink-0 items-start justify-between gap-4 border-b border-slate-500/15 px-5 py-4 sm:px-7 dark:border-white/10">
            <div>
              <Dialog.Title ref={titleRef} tabIndex={-1} className="font-semibold tracking-tight focus:outline-none">Chat with AI</Dialog.Title>
              <Dialog.Description className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Ask about Raj’s experience, projects or freelance work.
              </Dialog.Description>
            </div>
            <Dialog.Close className="portfolio-glass-button flex size-9 shrink-0 items-center justify-center rounded-full" aria-label="Close chat">
              <X className="size-4" aria-hidden="true" />
            </Dialog.Close>
          </header>

          <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7" role="log" aria-label="Chat messages">
            <p className="mb-4 max-w-[90%] rounded-2xl rounded-bl-md bg-white/45 px-4 py-3 text-sm dark:bg-white/8">
              Ask me about Raj’s work, projects or freelance services.
            </p>
            {messages.length === 0 && (
              <div className="mb-4 flex flex-wrap gap-2" aria-label="Suggested questions">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    className="rounded-full border border-slate-500/30 px-3 py-2 text-left text-xs font-medium transition-colors hover:bg-slate-500/10"
                    onClick={() => void sendMessage(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            {messages.map((message, index) => (
              <div key={index} className={"mb-3 flex " + (message.role === "user" ? "justify-end" : "justify-start")}>
                <div className={"max-w-[92%] break-words rounded-2xl px-4 py-3 text-sm leading-relaxed " + (
                  message.role === "user"
                    ? "rounded-br-md bg-sky-950/10 dark:bg-sky-300/15"
                    : "rounded-bl-md bg-white/45 dark:bg-white/8"
                )}>
                  <p className="whitespace-pre-wrap">
                    <span className="sr-only">{message.role === "user" ? "You: " : "AI assistant: "}</span>
                    {message.content}
                  </p>
                  {!!message.links?.length && (
                    <ul className="mt-2.5 flex flex-wrap gap-2" aria-label="Related portfolio links">
                      {message.links.map((link) => (
                        <li key={link.href}>
                          <a
                            className="inline-flex items-center gap-1 rounded-full bg-sky-900/8 px-2.5 py-1 text-xs font-medium text-sky-900 hover:underline dark:bg-sky-300/12 dark:text-sky-200"
                            href={link.href}
                            target={link.href.startsWith("https://") ? "_blank" : undefined}
                            rel="noreferrer"
                          >
                            {link.label}<ArrowUpRight size={13} aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
            {pending && <p className="text-sm text-slate-600 dark:text-slate-300" role="status">Thinking…</p>}
          </div>

          <div className="portfolio-chat-composer shrink-0 px-4 pb-4 pt-2 sm:px-6 sm:pb-6">
            {error && <p className="mb-2 px-2 text-sm text-rose-800 dark:text-rose-200" role="alert">{error}</p>}
            <form onSubmit={handleSubmit} className="portfolio-glass-button portfolio-chat-form flex items-center gap-2 rounded-full p-1.5 pl-4 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-sky-500">
              <GlassOptics surface="button" />
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
