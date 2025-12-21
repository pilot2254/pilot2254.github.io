"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mt-8 mb-4" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-white mt-6 mb-3" {...props} />,
        p: ({ node, ...props }) => <p className="text-zinc-300 leading-7 mb-4" {...props} />,
        a: ({ node, ...props }) => <a className="text-white hover:text-zinc-400 underline transition-colors" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc list-inside text-zinc-300 mb-4 space-y-2" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-zinc-300 mb-4 space-y-2" {...props} />,
        code: ({ node, inline, ...props }: any) =>
          inline ? (
            <code className="bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5 font-mono text-sm text-zinc-200" {...props} />
          ) : (
            <code className="font-mono text-sm text-zinc-200" {...props} />
          ),
        pre: ({ node, ...props }) => <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mb-4 font-mono text-sm" {...props} />,
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-zinc-800" {...props} />
          </div>
        ),
        th: ({ node, ...props }) => <th className="border border-zinc-800 bg-zinc-900 px-4 py-2 text-left font-medium text-white" {...props} />,
        td: ({ node, ...props }) => <td className="border border-zinc-800 px-4 py-2 text-zinc-300" {...props} />,
        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-zinc-700 pl-4 italic text-zinc-400 my-4" {...props} />,
        img: ({ node, ...props }) => <img className="rounded-lg my-4 max-w-full" {...props} alt={props.alt || ""} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
