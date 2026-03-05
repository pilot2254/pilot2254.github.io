"use client"

import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeRaw from "rehype-raw"
import rehypeKatex from "rehype-katex"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useState } from "react"
import { Check, Copy, Maximize2 } from "lucide-react"
import { ImageModal } from "./image-modal"
import { useCodePanel } from "./code-panel-context"

const PANEL_LINE_THRESHOLD = 50
const CODE_FONT_SIZE = "0.875rem"

interface MarkdownContentProps {
  content: string
}

function preprocessCallouts(content: string): string {
  return content.replace(
    /^((?:> .*\n?)+)/gm,
    (block) => {
      const lines = block.split("\n").filter(Boolean)
      const firstLine = lines[0].replace(/^> /, "").trim()
      const match = firstLine.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]$/)

      if (!match) return block

      const body = lines
        .slice(1)
        .map((l) => l.replace(/^> ?/, ""))
        .join("\n")

      return `<callout type="${match[1]}">\n\n${body}\n\n</callout>\n`
    }
  )
}

function CodeBlock({ language, filename, value }: { language: string; filename: string; value: string }) {
  const [copied, setCopied] = useState(false)
  const { openPanel } = useCodePanel()

  const lineCount = value.split("\n").length
  const isLong = lineCount > PANEL_LINE_THRESHOLD

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLong) {
    return (
      <div className="rounded-lg border border-border bg-muted my-4 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-xs text-muted-foreground font-mono">{filename}</span>
            )}
            {filename && (
              <span className="text-xs text-muted-foreground">·</span>
            )}
            <span className="text-xs text-muted-foreground font-mono">{language || "text"}</span>
          </div>
          <span className="text-xs text-muted-foreground">{lineCount} lines</span>
        </div>

        <div className="relative overflow-hidden" style={{ maxHeight: "8rem" }}>
          <SyntaxHighlighter
            language={language || "text"}
            style={oneDark}
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              background: "var(--color-muted)",
              fontSize: CODE_FONT_SIZE,
              pointerEvents: "none",
              userSelect: "none",
            }}
            codeTagProps={{ style: { background: "transparent" } }}
          >
            {value.split("\n").slice(0, 6).join("\n")}
          </SyntaxHighlighter>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-muted to-transparent" />
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/60">
          <span className="text-xs text-muted-foreground">{lineCount - 6} more lines</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copy code"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => openPanel(value, language, filename)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded px-2 py-1 hover:bg-accent"
              aria-label="Open in panel"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Open in panel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-muted border border-border rounded-t-lg px-4 py-2">
        <div className="flex items-center gap-1">
          {filename && (
            <span className="text-xs text-muted-foreground font-mono">{filename}</span>
          )}
          {filename && (
            <span className="text-xs text-muted-foreground">-</span>
          )}
          <span className="text-xs text-muted-foreground font-mono">{language || "text"}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || "text"}
        style={oneDark}
        showLineNumbers={false}
        customStyle={{
          margin: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
          background: "var(--color-muted)",
          border: "1px solid var(--color-border)",
          borderTop: "none",
        }}
        codeTagProps={{
          style: {
            background: "transparent",
            fontSize: CODE_FONT_SIZE,
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
}

const calloutTypes: Record<string, { label: string; className: string }> = {
  NOTE:      { label: "Note",      className: "border-blue-500/50 bg-blue-500/5 text-blue-400" },
  TIP:       { label: "Tip",       className: "border-green-500/50 bg-green-500/5 text-green-400" },
  IMPORTANT: { label: "Important", className: "border-purple-500/50 bg-purple-500/5 text-purple-400" },
  WARNING:   { label: "Warning",   className: "border-yellow-500/50 bg-yellow-500/5 text-yellow-400" },
  CAUTION:   { label: "Caution",   className: "border-red-500/50 bg-red-500/5 text-red-400" },
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const processed = preprocessCallouts(content)

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          // @ts-expect-error - custom HTML element via rehype-raw
          callout: ({ node, children }: { node?: { properties?: { type?: string } }; children?: React.ReactNode }) => {
            const type = node?.properties?.type?.toString().toUpperCase() ?? ""
            const t = calloutTypes[type]
            if (!t) return <div>{children}</div>
            return (
              <div className={`border-l-4 rounded-r-md px-4 py-3 my-4 ${t.className}`}>
                <p className="text-sm font-semibold mb-2">{t.label}</p>
                <div className="text-sm [&_strong]:font-semibold [&_a]:underline [&_p]:mb-0">
                  {children}
                </div>
              </div>
            )
          },
          h1: ({ ...props }) => <h1 className="text-3xl font-bold text-foreground mt-8 mb-4" {...props} />,
          h2: ({ ...props }) => <h2 className="text-2xl font-bold text-foreground mt-8 mb-4" {...props} />,
          h3: ({ ...props }) => <h3 className="text-xl font-bold text-foreground mt-6 mb-3" {...props} />,
          p: ({ ...props }) => <p className="text-foreground leading-7 mb-4" {...props} />,
          a: ({ href, ...props }) => {
            const isExternal = href?.startsWith("http") && !href.includes("pilot2254.github.io")
            return (
              <a
                className="text-foreground hover:text-muted-foreground underline transition-colors"
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                {...props}
              />
            )
          },
          ul: ({ ...props }) => <ul className="list-disc list-outside ml-6 text-foreground mb-4 space-y-2" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal list-outside ml-6 text-foreground mb-4 space-y-2" {...props} />,
          code: ({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => {
            const match = /language-([^:]+)(?::(.+))?/.exec(className || "")
            const language = match?.[1] ?? ""
            const filename = match?.[2] ?? ""
            const value = String(children).replace(/\n$/, "")
            const forceInline = !className && value.length < 50 && !value.includes("\n")

            return !inline && !forceInline ? (
              <div className="my-4 font-light">
                <CodeBlock language={language} filename={filename} value={value} />
              </div>
            ) : (
              <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm text-foreground font-light" {...props}>
                {children}
              </code>
            )
          },
          hr: ({ ...props }) => <hr className="my-8 border-border" {...props} />,
          table: ({ ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-border" {...props} />
            </div>
          ),
          th: ({ ...props }) => <th className="border border-border bg-muted px-4 py-2 text-left font-medium text-foreground" {...props} />,
          td: ({ ...props }) => <td className="border border-border px-4 py-2 text-foreground" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-3 border-muted pl-4 italic text-muted-foreground [&_*]:text-muted-foreground my-4"
              {...props}
            />
          ),
          img: ({ src, alt }) => (
            <ImageModal src={String(src || "")} alt={String(alt || "")} />
          ),
        }}
      >
        {processed}
      </ReactMarkdown>

      <style jsx>{`
        .markdown-content :global(iframe) {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  )
}
