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
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-baseline gap-4">
            <span className="text-zinc-600 text-sm tabular-nums">
              {project.year}
            </span>
            <h3 className="text-white group-hover:text-zinc-400 transition-colors">
              {project.title}
            </h3>
          </div>
        </div>
        <p className="text-zinc-500 text-sm ml-[4.5rem]">
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
