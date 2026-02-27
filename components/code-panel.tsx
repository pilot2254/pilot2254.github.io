"use client"

import { useCodePanel } from "./code-panel-context"
import { X, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export function CodePanel() {
  const { panel, closePanel } = useCodePanel()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(panel.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!panel.isOpen) return null

  return (
    <div className="fixed top-0 right-0 h-screen w-[45vw] max-w-[700px] min-w-[320px] bg-card border-l border-border flex flex-col z-40 shadow-2xl">
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
            style: {
              background: "transparent",
            },
          }}
        >
          {panel.code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
