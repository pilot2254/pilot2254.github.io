export interface Project {
  id: string
  title: string
  description: string
  year: number
  tags: string[]
  images: string[]
  link?: string
  github?: string
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Example Project",
    description: "Long description here...",
    year: 2024,
    tags: ["Next.js", "TypeScript", "Tailwind"],
    images: ["/images/projects/project-1-1.png", "/images/projects/project-1-2.png"],
    link: "https://example.com",
    github: "https://github.com/username/repo",
  },
  // add more projects later...
]
