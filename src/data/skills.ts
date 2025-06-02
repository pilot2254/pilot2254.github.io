/**
 * Skills data configuration
 * Easy to maintain and update skill levels and categories
 */

import type { Skill } from "@/types"

export const skills: Skill[] = [
  // Frontend Skills
  {
    name: "React",
    level: 30,
    category: "Frontend",
    description: "Building interactive user interfaces with React hooks and components",
  },
  {
    name: "Next.js",
    level: 30,
    category: "Frontend",
    description: "Full-stack React framework with SSR and static generation",
  },
  {
    name: "TailwindCSS",
    level: 60,
    category: "Frontend",
    description: "Utility-first CSS framework for rapid UI development",
  },
  {
    name: "shadcn/ui",
    level: 30,
    category: "Frontend",
    description: "Modern React component library built on Radix UI",
  },

  // Backend Skills
  {
    name: "NodeJS",
    level: 20,
    category: "Backend",
    description: "Server-side JavaScript runtime for building scalable applications",
  },
  {
    name: "SQLite",
    level: 10,
    category: "Backend",
    description: "Lightweight relational database for small to medium applications",
  },

  // Programming Languages
  {
    name: "HTML",
    level: 90,
    category: "Languages",
    description: "Semantic markup language for web content structure",
  },
  {
    name: "CSS",
    level: 80,
    category: "Languages",
    description: "Styling language for web presentation and layout",
  },
  {
    name: "JavaScript",
    level: 40,
    category: "Languages",
    description: "Dynamic programming language for web development",
  },
  {
    name: "TypeScript",
    level: 30,
    category: "Languages",
    description: "Typed superset of JavaScript for better development experience",
  },

  // Other Tools
  {
    name: "nmap",
    level: 20,
    category: "Other",
    description: "Network discovery and security auditing tool",
  },
  {
    name: "Cheat Engine",
    level: 10,
    category: "Other",
    description: "Memory scanner and debugger for reverse engineering",
  },
  {
    name: "Flipper Zero Dev",
    level: 15,
    category: "Other",
    description: "Hardware hacking and penetration testing device",
  },
]

/**
 * Get skills by category
 */
export const getSkillsByCategory = (category: string): Skill[] => {
  return skills.filter((skill) => skill.category === category)
}

/**
 * Get skill level description
 */
export const getSkillLevelDescription = (level: number): string => {
  if (level >= 80) return "Expert"
  if (level >= 60) return "Advanced"
  if (level >= 40) return "Intermediate"
  if (level >= 20) return "Beginner"
  return "Learning"
}
