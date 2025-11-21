"use client"

import { X, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md dark:bg-[hsl(210,25%,18%)] bg-[hsl(200,50%,70%)] dark:bg-opacity-95 bg-opacity-95 backdrop-blur-md border dark:border-white/30 border-white/40 rounded-3xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br dark:before:from-white/10 before:from-white/15 before:via-transparent before:to-transparent before:pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 dark:text-white/70 text-slate-600 hover:dark:text-white hover:text-slate-900 hover:bg-white/10 rounded-full"
        >
          <X className="w-5 h-5" />
        </Button>

        <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-black mb-6">Get in Touch</h2>

        <div className="space-y-4">
          <a
            href="mailto:vaghela.raj2581@gmail.com"
            className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur border dark:border-white/10 border-white/30 hover:bg-white/10 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 dark:text-white text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm dark:text-white/60 text-slate-600 mb-1">Email</p>
              <p className="dark:text-white text-black font-medium break-all">vaghela.raj2581@gmail.com</p>
            </div>
          </a>

          <a
            href="tel:+447741896244"
            className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur border dark:border-white/10 border-white/30 hover:bg-white/10 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 dark:text-white text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm dark:text-white/60 text-slate-600 mb-1">Phone</p>
              <p className="dark:text-white text-black font-medium">(+44) 7741 896244</p>
            </div>
          </a>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur border dark:border-white/10 border-white/30">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 dark:text-white text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm dark:text-white/60 text-slate-600 mb-1">Location</p>
              <p className="dark:text-white text-black font-medium">Leicester, UK</p>
            </div>
          </div>

          <div className="pt-4 border-t dark:border-white/10 border-white/30">
            <p className="text-sm dark:text-white/60 text-slate-600 mb-3">Connect on social</p>
            <div className="flex gap-2">
              <a
                href="https://linkedin.com/in/raj-vaghela"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border dark:border-white/10 border-white/30 hover:bg-white/10 transition-colors"
              >
                <Linkedin className="w-4 h-4 dark:text-white text-black" />
                <span className="text-sm dark:text-white text-black font-medium">LinkedIn</span>
              </a>
              <a
                href="https://github.com/Raj-Vaghela"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border dark:border-white/10 border-white/30 hover:bg-white/10 transition-colors"
              >
                <Github className="w-4 h-4 dark:text-white text-black" />
                <span className="text-sm dark:text-white text-black font-medium">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
