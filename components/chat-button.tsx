"use client"

import { MessageCircle } from "lucide-react"

interface ChatButtonProps {
  onClick: () => void
}

export function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="h-8 px-3 rounded-lg bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 flex items-center gap-1.5 hover:bg-white/20 dark:hover:bg-white/20 transition-all group relative overflow-hidden"
      title="Chat with AI Assistant"
    >
      <MessageCircle className="w-3.5 h-3.5 text-white dark:text-white transition-transform group-hover:scale-110" />
      <span className="text-white dark:text-white text-[11px] font-medium whitespace-nowrap">Chat with AI</span>
      
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
    </button>
  )
}

