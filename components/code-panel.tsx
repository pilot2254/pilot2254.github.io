"use client"

import { useCodePanel, MIN_PANEL_WIDTH, MAX_PANEL_WIDTH } from "./code-panel-context"
import { X, Copy, Check } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

// Shared font size for all code blocks
const CODE_FONT_SIZE = "0.875rem"

export function CodePanel() {
  const { panel, panelWidth, setPanelWidth, closePanel } = useCodePanel()
  const [copied, setCopied] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  const handleCopy = async () => {
    await navigator.clipboard.writeText(panel.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Drag resize — manipulate DOM directly during drag, commit to state on mouseup
  // This avoids React re-renders on every mousemove which caused the lag
  const onDragStart = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = panelWidth

    document.body.style.userSelect = "none"
    document.body.style.cursor = "col-resize"

    const onMouseMove = (e: MouseEvent) => {
      const delta = startX - e.clientX
      const newWidth = Math.min(MAX_PANEL_WIDTH, Math.max(MIN_PANEL_WIDTH, startWidth + delta))
      // Directly mutate DOM — no React state, no re-render
      if (panelRef.current) {
        panelRef.current.style.width = `${newWidth}px`
      }
    }

    const onMouseUp = (e: MouseEvent) => {
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
      // Commit final width to state once
      const delta = startX - e.clientX
      const finalWidth = Math.min(MAX_PANEL_WIDTH, Math.max(MIN_PANEL_WIDTH, startWidth + delta))
      setPanelWidth(finalWidth)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
  }

  if (!panel.isOpen) return null

  // ── Mobile: bottom sheet ──────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-40 flex flex-col bg-card border-t border-border shadow-2xl rounded-t-xl"
        style={{ height: "70vh" }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-2 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted shrink-0">
          <span className="text-xs font-mono text-muted-foreground">{panel.language || "text"}</span>
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="Copy code">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <button onClick={closePanel} className="text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="Close panel">
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
            customStyle={{ margin: 0, borderRadius: 0, background: "var(--color-card)", minHeight: "100%", fontSize: CODE_FONT_SIZE }}
            codeTagProps={{ style: { background: "transparent" } }}
          >
            {panel.code}
          </SyntaxHighlighter>
        </div>
      </div>
    )
  }

  // ── Desktop: side panel ───────────────────────────────────────────────────
  return (
    <div
      ref={panelRef}
      className="fixed top-0 right-0 h-screen bg-card border-l border-border flex flex-col z-40 shadow-2xl"
      style={{ width: panelWidth }}
    >
      {/* Drag handle */}
      <div
        onMouseDown={onDragStart}
        className="absolute left-0 top-0 h-full w-1 cursor-col-resize hover:bg-border transition-colors group z-10"
        aria-label="Resize panel"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="w-0.5 h-0.5 rounded-full bg-muted-foreground" />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted shrink-0">
        <span className="text-xs font-mono text-muted-foreground">{panel.language || "text"}</span>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="Copy code">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button onClick={closePanel} className="text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="Close panel">
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
          customStyle={{ margin: 0, borderRadius: 0, background: "var(--color-card)", minHeight: "100%", fontSize: CODE_FONT_SIZE }}
          codeTagProps={{ style: { background: "transparent" } }}
        >
          {panel.code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
