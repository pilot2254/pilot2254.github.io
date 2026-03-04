"use client"

import { useState } from "react"
import { Timeline, TimelineItem } from "@/components/timeline"
import Link from "next/link"
import { Post } from "@/lib/blog"

function normalize(s: string) { return s.toLowerCase() }

export function BlogList({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("")

  const items: TimelineItem[] = posts
    .filter((p) => {
      if (!query.trim()) return true
      const q = normalize(query)
      return (
        normalize(p.title).includes(q) ||
        (p.description && normalize(p.description).includes(q))
      )
    })
    .map((p) => ({ ...p, id: p.slug }))

  return (
    <div className="space-y-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full bg-transparent border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      />
      <Timeline
        items={items}
        renderItem={(item) => (
          <Link href={`/blog/${item.id}`} className="group block">
            <h3 className="text-foreground group-hover:text-muted-foreground transition-colors mb-2">
              {item.title}
            </h3>
            <span className="text-muted-foreground text-sm">
              {posts.find((p) => p.slug === item.id)?.readTime}
            </span>
          </Link>
        )}
      />
    </div>
  )
}
