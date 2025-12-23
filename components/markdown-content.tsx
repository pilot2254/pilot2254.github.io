"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

interface MarkdownContentProps {
  content: string
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
          a: ({ ...props }) => <a className="text-foreground hover:text-muted-foreground underline transition-colors" {...props} />,
          ul: ({ ...props }) => <ul className="list-disc list-inside text-foreground mb-4 space-y-2" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal list-inside text-foreground mb-4 space-y-2" {...props} />,
          code: ({ inline, ...props }: { inline?: boolean } & React.HTMLAttributes<HTMLElement>) =>
            inline ? (
              <code className="bg-muted border border-border rounded px-1.5 py-0.5 font-mono text-sm text-foreground" {...props} />
            ) : (
              <code className="font-mono text-sm text-foreground" {...props} />
            ),
          pre: ({ ...props }) => <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto mb-4 font-mono text-sm" {...props} />,
          hr: ({ ...props }) => <hr className="my-12 border-border" {...props} />,
          table: ({ ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-border" {...props} />
            </div>
          ),
          th: ({ ...props }) => <th className="border border-border bg-muted px-4 py-2 text-left font-medium text-foreground" {...props} />,
          td: ({ ...props }) => <td className="border border-border px-4 py-2 text-foreground" {...props} />,
          blockquote: ({ ...props }) => <blockquote className="border-l-4 border-muted-foreground pl-4 italic text-muted-foreground my-4" {...props} />,
          img: ({ ...props }) => <img className="rounded-lg my-4 max-w-full" {...props} alt={props.alt || ""} />,
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
