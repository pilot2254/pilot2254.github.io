import { ProjectCard } from "@/components/project-card"
// import { projects } from "@/config/projects"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"
import { projectsWithImages as projects } from "@/config/projects"

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
  // Group projects by year
  const projectsByYear = projects.reduce((acc, project) => {
    if (!acc[project.year]) {
      acc[project.year] = []
    }
    acc[project.year].push(project)
    return acc
  }, {} as Record<number, typeof projects>)

  const years = Object.keys(projectsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Projects</h1>

      <div className="relative">
        {/* Vertical timeline */}
        <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-8">
          {years.map((year) => (
            <div key={year} className="relative">
              <div className="flex items-start gap-4">
                <span className="text-muted-foreground text-sm font-mono tabular-nums w-12 pt-0.5">
                  {year}
                </span>
                <div className="flex-1 space-y-6">
                  {projectsByYear[year].map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
