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
        {/* Balanced blurred backdrop */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/35" style={{ backdropFilter: 'blur(20px) saturate(115%)' }} />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.8' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
      />

        <div
          className="relative w-full max-w-2xl h-[600px] flex flex-col rounded-[2rem] dark:bg-[hsl(210,25%,8%)] bg-[hsl(200,50%,70%)] dark:bg-opacity-95 bg-opacity-85 border dark:border-white/5 border-white/60 animate-in zoom-in-95 slide-in-from-bottom-8 duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          backdropFilter: 'blur(40px) saturate(150%)',
          boxShadow: '0 30px 120px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.12) inset',
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br dark:from-white/[0.08] from-white/25 dark:via-white/[0.02] via-white/10 to-transparent pointer-events-none rounded-[2rem]" />
        
        {/* Grain texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.18] dark:opacity-[0.1] pointer-events-none mix-blend-overlay rounded-[2rem]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '140px 140px',
          }}
        />
        
        
        {/* Simple Close Button */}
        <div className="absolute top-4 right-4 z-30">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/8 border dark:border-white/10 border-white/40 flex items-center justify-center transition-all hover:scale-110 active:scale-90 backdrop-blur-md"
            >
              <X className="w-3.5 h-3.5 dark:text-white/60 text-slate-600" />
            </button>
        </div>

        {/* Pure Conversation */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-8 py-16 space-y-6 relative z-10 scrollbar-hide"
        >
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                message.sender === "user" ? "text-right" : ""
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className={`inline-block max-w-[80%] ${message.sender === "user" ? "text-right" : ""}`}>
                  <div className={`inline-block px-3 py-2 rounded-lg ${
                    message.sender === "bot"
                      ? "bg-white/5 dark:bg-white/2 border border-white/10 dark:border-white/5"
                      : "bg-white/15 dark:bg-white/5 border border-white/20 dark:border-white/8"
                  }`}>
                  <p className={`text-sm leading-relaxed whitespace-pre-line ${
                    message.sender === "bot"
                      ? "dark:text-white/85 text-black/85"
                      : "dark:text-white/95 text-black/95"
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
                  <div className="w-1.5 h-1.5 rounded-full dark:bg-white/40 bg-black/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full dark:bg-white/40 bg-black/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full dark:bg-white/40 bg-black/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
          
          {/* Scroll Indicator */}
          {showScrollIndicator && (
            <div className="absolute bottom-24 right-6 z-20 animate-in fade-in duration-200">
              <div className="w-10 h-10 rounded-full bg-white/15 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
                <ChevronDown className="w-5 h-5 text-white dark:text-white opacity-90" />
              </div>
            </div>
          )}
        </div>

        {/* Floating Pill Input */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full pl-5 pr-14 py-4 rounded-full bg-white/20 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 dark:text-white text-black placeholder:dark:text-white/40 placeholder:text-slate-600 focus:outline-none focus:border-white/50 dark:focus:border-white/20 transition-all shadow-lg hover:shadow-xl"
              style={{ fontSize: '14px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 dark:bg-white/8 backdrop-blur-md border border-white/50 dark:border-white/15 hover:bg-white/40 dark:hover:bg-white/12 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all flex items-center justify-center shadow-md"
            >
              <Send className="w-4 h-4 text-white dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

