"use client"

import { useState } from "react"
import { Project } from "@/config/projects"
import { ProjectModal } from "./project-modal"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="group cursor-pointer" onClick={() => setIsOpen(true)}>
        <h3 className="text-white group-hover:text-zinc-400 transition-colors mb-2">
          {project.title}
        </h3>
        <p className="text-zinc-500 text-sm">
          {project.description.length > 120
            ? `${project.description.slice(0, 120)}...`
            : project.description}
        </p>
      </div>

      <ProjectModal
        project={project}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
