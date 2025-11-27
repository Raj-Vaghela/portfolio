"use client"

import { MessageCircle } from "lucide-react"

interface ChatButtonProps {
  onClick: () => void
}

export function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="h-10 px-4 bg-brutalist-purple border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] flex items-center gap-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none group"
      title="Chat with AI Assistant"
    >
      <MessageCircle className="w-4 h-4 text-white transition-transform group-hover:scale-110" />
      <span className="text-white text-xs font-bold uppercase whitespace-nowrap">Chat AI</span>
    </button>
  )
}
