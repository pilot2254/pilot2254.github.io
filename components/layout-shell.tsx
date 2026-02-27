"use client"

import { useCodePanel } from "./code-panel-context"
import { Navigation } from "./navigation"
import { Footer } from "./footer"

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const { panel } = useCodePanel()

  return (
    <div
      className="transition-all duration-300"
      style={{ paddingRight: panel.isOpen ? 'min(45vw, 700px)' : '0' }}
    >
      <Navigation />
      <main className="min-h-screen max-w-2xl mx-auto px-6 py-24">
        {children}
      </main>
      <Footer />
    </div>
  )
}
