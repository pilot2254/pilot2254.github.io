import { projectsWithImages as projects } from "@/config/projects"
import { ProjectList } from "@/components/project-list"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Projects - ${siteConfig.name}`,
  description: "Game development, reverse engineering tools, and open-source projects by Michal Flaška.",
  openGraph: {
    title: `Projects - ${siteConfig.name}`,
    description: "Game development, reverse engineering tools, and open-source projects.",
    url: `${siteConfig.url}/projects`,
  },
}

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Projects</h1>
      <ProjectList projects={projects} />
    </div>
  )
}
