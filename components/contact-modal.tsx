"use client"

import { X, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="portfolio-dialog-overlay" />
        <Dialog.Content className="portfolio-modal fixed top-1/2 left-1/2 z-[90] max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[2rem] p-6 sm:p-8">
          <Dialog.Close asChild>
            <Button variant="ghost" size="icon" aria-label="Close contact details" className="absolute top-4 right-4 rounded-full">
              <X className="size-5" aria-hidden="true" />
            </Button>
          </Dialog.Close>
          <Dialog.Title className="mb-6 pr-9 text-2xl font-semibold tracking-tight sm:text-3xl">Get in touch</Dialog.Title>
          <Dialog.Description className="sr-only">Raj Vaghela’s contact details and social profiles.</Dialog.Description>

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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
