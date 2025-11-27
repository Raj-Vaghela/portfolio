"use client"

import { X, Send, Bot, User, Sparkles, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! Ask me anything about Raj.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle scroll indicator visibility
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
      setShowScrollIndicator(!isNearBottom)
    }

    container.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state

    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 800 + Math.random() * 800)
  }

  // Smart bot response logic
  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("experience") || lowerInput.includes("work") || lowerInput.includes("job")) {
      return "Raj has experience with IBM, Microsoft, Direction Infosystems, and Elsner Technologies. He specializes in AI engineering, RAG systems, and full-stack development with Python, FastAPI, and React/Next.js. Would you like details about a specific role?"
    } else if (lowerInput.includes("project")) {
      return "Raj has built several impressive AI projects:\n\n🤖 Job Recruiter Assistant - RAG-powered with CV OCR & SendGrid automation\n💊 Medical Screening Assistant - AI triage with multimodal STT/TTS\n📻 Crypto FM - Agentic AI crypto radio\n📊 Readmission Prediction - ML pipeline on 100k+ dataset\n\nWhich one would you like to explore?"
    } else if (lowerInput.includes("skill") || lowerInput.includes("tech") || lowerInput.includes("stack")) {
      return "Raj's tech stack includes:\n\n🐍 Python, FastAPI, Node.js\n⚛️ React, Next.js, TypeScript\n🤖 OpenAI, Gemini, Anthropic\n🗄️ Supabase, pgvector, PostgreSQL\n🎯 RAG, embeddings, function calling\n🎤 Whisper STT, ElevenLabs TTS\n\nHe builds production-ready AI applications from backend to frontend!"
    } else if (lowerInput.includes("available") || lowerInput.includes("hire") || lowerInput.includes("looking")) {
      return "Yes! 🎉 Raj is actively looking for AI Engineer or Full-Stack Developer roles. He's based in Leicester, UK and ready to start immediately.\n\n📧 vaghela.raj2581@gmail.com\n📱 (+44) 7741 896244\n\nWould you like me to share his CV or GitHub?"
    } else if (lowerInput.includes("education") || lowerInput.includes("degree") || lowerInput.includes("study")) {
      return "🎓 Education:\n\nMSc Advanced Computer Science\nUniversity of Leicester (Distinction) - 2024-2025\n\nBE Computer Science & Engineering\nS.N. Patel Institute (85.5%) - 2019-2023\n\n🏆 Awards: Huawei Tech Arena Finalist, Cyber4Me CTF 3rd place, Encode AI London '25"
    } else if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("phone") || lowerInput.includes("reach")) {
      return "📬 Contact Raj:\n\n📧 Email: vaghela.raj2581@gmail.com\n📱 Phone: (+44) 7741 896244\n📍 Location: Leicester, UK\n\n💼 LinkedIn: linkedin.com/in/raj-vaghela\n💻 GitHub: github.com/Raj-Vaghela\n\nFeel free to reach out anytime!"
    } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      return "Hello! 👋 Great to meet you! I'm here to help you learn more about Raj's background and expertise. What would you like to know about?"
    } else if (lowerInput.includes("rag") || lowerInput.includes("retrieval")) {
      return "Raj has extensive RAG (Retrieval Augmented Generation) experience!\n\nHe's built:\n• Semantic search with pgvector\n• Document OCR & chunking pipelines\n• Evidence-linked chat responses\n• Multi-source RAG systems\n\nCheck out his Job Recruiter Assistant and Medical Screening projects for real implementations!"
    } else if (lowerInput.includes("llm") || lowerInput.includes("ai") || lowerInput.includes("gpt")) {
      return "Raj works extensively with LLMs including OpenAI (GPT-4), Google Gemini, and Anthropic Claude. He builds:\n\n🔧 Function calling systems\n💬 Streaming chat interfaces\n🎯 Prompt engineering pipelines\n🔄 Agentic workflows\n\nHis projects showcase production-ready LLM integration!"
    } else {
      return "That's a great question! I can help you learn about:\n\n💼 Experience & work history\n🚀 AI/ML projects\n🛠️ Technical skills\n🎓 Education & awards\n📧 Contact information\n💼 Job availability\n\nWhat would you like to explore?"
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Solid backdrop */}
      <div className="absolute inset-0 bg-black/80" />

      <div
        className="relative w-full max-w-2xl h-[600px] flex flex-col dark:bg-black bg-white border-[6px] border-black dark:border-white shadow-[12px_12px_0_rgba(0,0,0,1)] dark:shadow-[12px_12px_0_rgba(255,255,255,1)] animate-in zoom-in-95 duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-brutalist-yellow dark:bg-brutalist-cyan border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all"
          >
            <X className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>

        {/* Conversation */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-8 py-16 space-y-6 relative z-10 scrollbar-hide"
        >
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`animate-in fade-in slide-in-from-bottom-2 duration-300 ${message.sender === "user" ? "text-right" : ""
                }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className={`inline-block max-w-[80%] ${message.sender === "user" ? "text-right" : ""}`}>
                <div className={`inline-block px-4 py-3 border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] ${message.sender === "bot"
                  ? "dark:bg-white/5 bg-black/5"
                  : "bg-brutalist-purple"
                  }`}>
                  <p className={`text-sm leading-relaxed whitespace-pre-line font-medium ${message.sender === "bot"
                    ? "dark:text-white text-black"
                    : "text-white"
                    }`}>
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="animate-in fade-in duration-200">
              <div className="inline-block">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-black dark:bg-white animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-black dark:bg-white animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-black dark:bg-white animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />

          {/* Scroll Indicator */}
          {showScrollIndicator && (
            <div className="absolute bottom-24 right-6 z-20 animate-in fade-in duration-200">
              <div className="w-12 h-12 bg-brutalist-cyan dark:bg-brutalist-yellow border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all cursor-pointer">
                <ChevronDown className="w-6 h-6 text-black dark:text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full pl-5 pr-16 py-4 dark:bg-white/5 bg-black/5 border-[3px] border-black dark:border-white shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(255,255,255,1)] dark:text-white text-black placeholder:dark:text-white/50 placeholder:text-black/50 focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[2px_2px_0_rgba(255,255,255,1)] transition-all font-medium"
              style={{ fontSize: '16px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-brutalist-magenta border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_rgba(0,0,0,1)] dark:disabled:hover:shadow-[3px_3px_0_rgba(255,255,255,1)] transition-all flex items-center justify-center"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

