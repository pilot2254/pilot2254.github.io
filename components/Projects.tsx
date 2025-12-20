"use client";

import { config } from "@/lib/config";
import { useState } from "react";
import Link from "next/link";

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <section id="projects" className="max-w-2xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8">Projects</h2>
      <div className="space-y-2">
        {config.projects.map((project) => (
          <div key={project.id}>
            <button
              onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
              className="w-full text-left py-3 flex items-center justify-between hover:text-foreground transition-colors group"
            >
              <span className="font-medium">{project.title}</span>
              <span className="text-sm text-muted-foreground group-hover:text-foreground">
                {expandedProject === project.id ? "−" : "+"}
              </span>
            </button>
            {expandedProject === project.id && (
              <div className="pb-4 pl-4 space-y-3 text-sm text-muted-foreground">
                <p>{project.longDescription}</p>
                <div className="flex gap-4">
                  {project.github && (
                    <Link href={project.github} target="_blank" className="hover:text-foreground">
                      GitHub
                    </Link>
                  )}
                  {project.demo && (
                    <Link href={project.demo} target="_blank" className="hover:text-foreground">
                      Demo
                    </Link>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
