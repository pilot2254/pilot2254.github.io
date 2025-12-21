"use client"

import { useEffect, useState } from "react"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypeHighlight from "rehype-highlight"

interface MDXContentProps {
  content: string
}

export function MDXContent({ content }: MDXContentProps) {
  const [html, setHtml] = useState("")

  useEffect(() => {
    const processMarkdown = async () => {
      const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(content)

      setHtml(result.toString())
    }

    processMarkdown()
  }, [content])

  return (
    <div
      className="prose prose-invert prose-zinc max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
