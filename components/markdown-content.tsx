"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { ImageModal } from './image-modal'

interface MarkdownContentProps {
  content: string
}

function CodeBlock({ language, value }: { language: string; value: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-muted border border-border rounded-t-lg px-4 py-2">
        <span className="text-xs text-muted-foreground font-mono">{language || 'text'}</span>
        <button
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: '0.5rem',
          borderBottomRightRadius: '0.5rem',
          background: 'var(--color-muted)',
          border: '1px solid var(--color-border)',
          borderTop: 'none',
        }}
        codeTagProps={{
          style: {
            background: 'transparent',
            fontSize: '0.875rem',
          }
        }}
      >
        {value}
    </SyntaxHighlighter>
    </div>
  )
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ ...props }) => <h1 className="text-3xl font-bold text-foreground mt-8 mb-4" {...props} />,
          h2: ({ ...props }) => <h2 className="text-2xl font-bold text-foreground mt-8 mb-4" {...props} />,
          h3: ({ ...props }) => <h3 className="text-xl font-bold text-foreground mt-6 mb-3" {...props} />,
          p: ({ ...props }) => <p className="text-foreground leading-7 mb-4" {...props} />,
          a: ({ href, ...props }) => {
            const isExternal = href?.startsWith('http') && !href.includes('pilot2254.github.io')
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
          ul: ({ ...props }) => <ul className="list-disc list-inside text-foreground mb-4 space-y-2" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal list-inside text-foreground mb-4 space-y-2" {...props} />,
          code: ({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            const value = String(children).replace(/\n$/, '')

            // Force inline rendering if there's no language class and content is short
            const forceInline = !className && value.length < 50 && !value.includes('\n')

            return (!inline && !forceInline) ? (
              <div className="my-4 font-light">
                <CodeBlock language={language} value={value} />
              </div>
            ) : (
              <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm text-foreground font-light" {...props}>
                {children}
              </code>
            )
          },
          // pre: ({ ...props }) => <div className="mb-4" {...props} />,
          hr: ({ ...props }) => <hr className="my-8 border-border" {...props} />,
          table: ({ ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-border" {...props} />
            </div>
          ),
          th: ({ ...props }) => <th className="border border-border bg-muted px-4 py-2 text-left font-medium text-foreground" {...props} />,
          td: ({ ...props }) => <td className="border border-border px-4 py-2 text-foreground" {...props} />,
          blockquote: ({ ...props }) => <blockquote className="border-l-4 border-muted-foreground pl-4 italic text-muted-foreground [&_*]:text-muted-foreground my-4" {...props} />,
          // img: ({ ...props }) => <img className="rounded-lg my-4 max-w-full" {...props} alt={props.alt || ""} />,
          img: ({ src, alt, ...props }) => (
            <ImageModal src={String(src || "")} alt={String(alt || "")} />
          ),
        }}
      >
        {content}
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
