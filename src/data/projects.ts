/**
 * Projects data configuration
 * Centralized project information for easy maintenance
 */

import type { Project } from "@/types"

export const projects: Project[] = [
  {
    id: "redfox-studios",
    title: "RedFox Studios",
    description: "A company website built with Next.js and TypeScript",
    tags: ["React", "Next.js", "TypeScript", "shadcn/ui"],
    demoLink: "https://redfox-studios.org",
    githubLink: "https://github.com/pilot2254/redfox-studios",
    image: "/placeholder.png",
    featured: true,
    status: "completed",
  },
  {
    id: "contrast-bot",
    title: "Contrast Bot",
    description: "Fully functional discord bot with economy, gambling, and more",
    tags: ["Node.js", "Typescript", "Discord.js", "SQLite", "Slash Commands"],
    githubLink: "https://github.com/contrast-bot/contrast-bot",
    image: "/placeholder.png",
    featured: true,
    status: "completed",
  },
  {
    id: "calculator",
    title: "Calculator",
    description: "Simple and heavily configurable calculator made in electron",
    tags: ["Electron", "JavaScript", "Customization", "Calculator"],
    githubLink: "https://github.com/pilot2254/calculator",
    image: "/placeholder.png",
    status: "completed",
  },
  {
    id: "guitar-tone-finder",
    title: "Guitar Tone Finder",
    description:
      "A clean, minimalist web application designed to help guitar students practice identifying tones on the fretboard.",
    tags: ["HTML", "CSS", "TailwindCSS", "JavaScript"],
    demoLink: "https://pilot2254.github.io/guitar-tone-finder/",
    githubLink: "https://github.com/pilot2254/guitar-tone-finder",
    image: "/placeholder.png",
    status: "completed",
  },
  {
    id: "steam-playtime-farmer",
    title: "Steam Playtime Farmer",
    description: "A simple Node.js application for farming playtime across multiple Steam games simultaneously.",
    tags: ["NodeJS", "JavaScript", "Steam API"],
    githubLink: "https://github.com/pilot2254/steam-playtime-farmer",
    image: "/placeholder.png",
    status: "completed",
  },
  {
    id: "more-projects",
    title: "See More Projects",
    description: "See more of my projects on GitHub",
    tags: ["See", "More", "Projects", "On", "My", "GitHub"],
    githubLink: "https://github.com/pilot2254?tab=repositories",
    image: "/placeholder.png",
    status: "completed",
  },
]

/**
 * Get featured projects
 */
export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured)
}

/**
 * Get projects by status
 */
export const getProjectsByStatus = (status: Project["status"]): Project[] => {
  return projects.filter((project) => project.status === status)
}