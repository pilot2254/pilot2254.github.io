"use client"

import { createContext, useContext, useState } from "react"

interface CodePanelState {
  isOpen: boolean
  language: string
  code: string
  title: string
}

interface CodePanelContextType {
  panel: CodePanelState
  openPanel: (code: string, language: string, title?: string) => void
  closePanel: () => void
}

const CodePanelContext = createContext<CodePanelContextType | null>(null)

export function CodePanelProvider({ children }: { children: React.ReactNode }) {
  const [panel, setPanel] = useState<CodePanelState>({
    isOpen: false,
    language: "",
    code: "",
    title: "",
  })

  const openPanel = (code: string, language: string, title = "") => {
    setPanel({ isOpen: true, language, code, title })
  }

  const closePanel = () => {
    setPanel((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <CodePanelContext.Provider value={{ panel, openPanel, closePanel }}>
      {children}
    </CodePanelContext.Provider>
  )
}

export function useCodePanel() {
  const ctx = useContext(CodePanelContext)
  if (!ctx) throw new Error("useCodePanel must be used inside CodePanelProvider")
  return ctx
}
