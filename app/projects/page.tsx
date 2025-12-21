import { ProjectCard } from "@/components/project-card"
import { projects } from "@/config/projects"

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold text-white">Projects</h1>

      <div className="space-y-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
