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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80" />

      <div
        className="relative w-full max-w-md dark:bg-black bg-white border-[5px] border-black dark:border-white shadow-[10px_10px_0_rgba(0,0,0,1)] dark:shadow-[10px_10px_0_rgba(255,255,255,1)] p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 w-10 h-10 bg-brutalist-yellow dark:bg-brutalist-cyan border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all hover:bg-brutalist-yellow dark:hover:bg-brutalist-cyan"
        >
          <X className="w-5 h-5 text-black dark:text-white" />
        </Button>

        <h2 className="text-3xl font-black dark:text-white text-black mb-6 uppercase">Get in Touch</h2>

        <div className="space-y-4">
          <a
            href="mailto:vaghela.raj2581@gmail.com"
            className="flex items-start gap-4 p-4 dark:bg-white/5 bg-black/5 border-[3px] border-black dark:border-white shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0_rgba(255,255,255,1)] transition-all group"
          >
            <div className="w-12 h-12 bg-brutalist-magenta border-[3px] border-black dark:border-white flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm dark:text-white/70 text-black/70 mb-1 font-bold uppercase">Email</p>
              <p className="dark:text-white text-black font-bold break-all">vaghela.raj2581@gmail.com</p>
            </div>
          </a>

          <a
            href="tel:+447741896244"
            className="flex items-start gap-4 p-4 dark:bg-white/5 bg-black/5 border-[3px] border-black dark:border-white shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0_rgba(255,255,255,1)] transition-all group"
          >
            <div className="w-12 h-12 bg-brutalist-cyan border-[3px] border-black dark:border-white flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-black dark:text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm dark:text-white/70 text-black/70 mb-1 font-bold uppercase">Phone</p>
              <p className="dark:text-white text-black font-bold">(+44) 7741 896244</p>
            </div>
          </a>

          <div className="flex items-start gap-4 p-4 dark:bg-white/5 bg-black/5 border-[3px] border-black dark:border-white shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(255,255,255,1)]">
            <div className="w-12 h-12 bg-brutalist-green border-[3px] border-black dark:border-white flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-black dark:text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm dark:text-white/70 text-black/70 mb-1 font-bold uppercase">Location</p>
              <p className="dark:text-white text-black font-bold">Leicester, UK</p>
            </div>
          </div>

          <div className="pt-4 border-t-[3px] border-black dark:border-white">
            <p className="text-sm dark:text-white/70 text-black/70 mb-3 font-bold uppercase">Connect on social</p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com/in/raj-vaghela"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 p-3 bg-brutalist-yellow dark:bg-brutalist-cyan border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all"
              >
                <Linkedin className="w-5 h-5 text-black dark:text-white" />
                <span className="text-sm dark:text-white text-black font-black uppercase">LinkedIn</span>
              </a>
              <a
                href="https://github.com/Raj-Vaghela"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 p-3 bg-brutalist-magenta border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all"
              >
                <Github className="w-5 h-5 text-white" />
                <span className="text-sm text-white font-black uppercase">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
