"use client"

import { useState } from "react"
import { Timeline, TimelineItem } from "@/components/timeline"
import { ProjectCard } from "@/components/project-card"
import { Project } from "@/config/projects"

function normalize(s: string) { return s.toLowerCase() }

export function ProjectList({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("")

  const items: TimelineItem[] = projects
    .filter((p) => {
      if (!query.trim()) return true
      const q = normalize(query)
      return (
        normalize(p.title).includes(q) ||
        normalize(p.description).includes(q) ||
        p.tags.some((t) => normalize(t).includes(q))
      )
    })
    .map((p) => ({ ...p }))

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
          <ProjectCard
            project={projects.find((p) => p.id === item.id)!}
          />
        )}
      />
    </div>
  )
}
