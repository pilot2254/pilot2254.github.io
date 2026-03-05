"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useCodePanel } from "./code-panel-context"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { Navigation } from "./navigation"
import { Footer } from "./footer"

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const { panel, panelWidth, closePanel } = useCodePanel()
  const pathname = usePathname()
  const isMobile = useIsMobile()

  useEffect(() => {
    closePanel()
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="transition-[padding] duration-300"
      style={{ paddingRight: panel.isOpen && !isMobile ? panelWidth : 0 }}
    >
      <Navigation />
      <main className="min-h-screen max-w-2xl mx-auto px-6 py-24">
        {children}
      </main>
      <Footer />
    </div>
  )
}
