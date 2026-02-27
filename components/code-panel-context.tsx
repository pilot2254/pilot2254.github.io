"use client"

import { createContext, useContext, useState } from "react"

// --- Config ------------------------------------------------------------------
const DEFAULT_PANEL_WIDTH = 600  // px
const MIN_PANEL_WIDTH     = 280  // px
const MAX_PANEL_WIDTH     = 1200 // px
// -----------------------------------------------------------------------------

interface CodePanelState {
  isOpen: boolean
  language: string
  code: string
  title: string
}

interface CodePanelContextType {
  panel: CodePanelState
  panelWidth: number
  setPanelWidth: (w: number) => void
  openPanel: (code: string, language: string, title?: string) => void
  closePanel: () => void
}

const CodePanelContext = createContext<CodePanelContextType | null>(null)

export { MIN_PANEL_WIDTH, MAX_PANEL_WIDTH }

export function CodePanelProvider({ children }: { children: React.ReactNode }) {
  const [panel, setPanel] = useState<CodePanelState>({
    isOpen: false,
    language: "",
    code: "",
    title: "",
  })
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH)

  const openPanel = (code: string, language: string, title = "") => {
    setPanel({ isOpen: true, language, code, title })
  }

  const closePanel = () => {
    setPanel((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <CodePanelContext.Provider value={{ panel, panelWidth, setPanelWidth, openPanel, closePanel }}>
      {children}
    </CodePanelContext.Provider>
  )
}

export function useCodePanel() {
  const ctx = useContext(CodePanelContext)
  if (!ctx) throw new Error("useCodePanel must be used inside CodePanelProvider")
  return ctx
}
