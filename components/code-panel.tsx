"use client"

import { useCodePanel, MIN_PANEL_WIDTH, MAX_PANEL_WIDTH } from "./code-panel-context"
import { X, Copy, Check } from "lucide-react"
import { useState, useCallback, useEffect } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export function CodePanel() {
  const { panel, panelWidth, setPanelWidth, closePanel } = useCodePanel()
  const [copied, setCopied] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(panel.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const onDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)

    const startX = e.clientX
    const startWidth = panelWidth

    const onMouseMove = (e: MouseEvent) => {
      const delta = startX - e.clientX
      const newWidth = Math.min(MAX_PANEL_WIDTH, Math.max(MIN_PANEL_WIDTH, startWidth + delta))
      setPanelWidth(newWidth)
    }

    const onMouseUp = () => {
      setIsDragging(false)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
  }, [panelWidth, setPanelWidth])

  // Prevent text selection while dragging
  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = "none"
      document.body.style.cursor = "col-resize"
    } else {
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }
  }, [isDragging])

  if (!panel.isOpen) return null

  return (
    <div
      className="fixed top-0 right-0 h-screen bg-card border-l border-border flex flex-col z-40 shadow-2xl"
      style={{ width: panelWidth }}
    >
      {/* Drag handle */}
      <div
        onMouseDown={onDragStart}
        className="absolute left-0 top-0 h-full w-1 cursor-col-resize hover:bg-border transition-colors group z-10"
        aria-label="Resize panel"
      >
        {/* Visual grabber dots */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground" />
          <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground" />
          <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground" />
          <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground" />
          <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground" />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted shrink-0">
        <span className="text-xs font-mono text-muted-foreground">
          {panel.language || "text"}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="Copy code"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={closePanel}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="flex-1 overflow-auto">
        <SyntaxHighlighter
          language={panel.language || "text"}
          style={oneDark}
          showLineNumbers={true}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            background: "var(--color-card)",
            minHeight: "100%",
            fontSize: "0.8rem",
          }}
          codeTagProps={{
            style: { background: "transparent" },
          }}
        >
          {panel.code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
