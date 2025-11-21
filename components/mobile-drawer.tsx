"use client"

import { Drawer } from "vaul"
import { useState, useRef } from "react"
import { ScrollIndicator } from "./scroll-indicator"

interface MobileDrawerProps {
    children: React.ReactNode
    isAnyModalOpen?: boolean
}

export function MobileDrawer({ children, isAnyModalOpen = false }: MobileDrawerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const touchStart = useRef<number | null>(null)

    const minSwipeDistance = 50

    const onTouchStart = (e: React.TouchEvent) => {
        touchStart.current = e.targetTouches[0].clientY
    }

    const onTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart.current) return

        const touchEndY = e.changedTouches[0].clientY
        const distance = touchStart.current - touchEndY
        const isUpSwipe = distance > minSwipeDistance

        if (isUpSwipe) {
            setIsOpen(true)
        }
    }

    return (
        <>
            {/* Full-screen swipe area */}
            <div
                className="fixed inset-0 z-0"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            />

            <Drawer.Root shouldScaleBackground open={isOpen} onOpenChange={setIsOpen}>
                {/* Scroll indicator - only show when drawer and modals are closed */}
                {!isOpen && !isAnyModalOpen && (
                    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center z-[100] pointer-events-none">
                        <ScrollIndicator />
                    </div>
                )}

                <Drawer.Trigger asChild>
                    <button className="sr-only">Open drawer</button>
                </Drawer.Trigger>

                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                    <Drawer.Content className="bg-black/20 dark:bg-black/20 backdrop-blur-xl border-t border-white/10 flex flex-col rounded-t-[2rem] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-50 outline-none">
                        <div className="p-4 bg-transparent rounded-t-[2rem] flex-1 flex flex-col min-h-0">
                            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-white/30 mb-8" />
                            <div className="max-w-md mx-auto w-full flex-1 overflow-y-auto pb-20">
                                {children}
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </>
    )
}
