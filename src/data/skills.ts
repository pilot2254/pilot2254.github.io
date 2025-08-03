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
    level: 25,
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
    level: 20,
    category: "Frontend",
    description: "Modern React component library built on Radix UI",
  },
  {
    name: "Electron",
    level: 15,
    category: "Frontend",
    description: "Electron is a framework designed to create desktop applications using web technologies",
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
    level: 65,
    category: "Languages",
    description: "Semantic markup language for web content structure",
  },
  {
    name: "CSS",
    level: 65,
    category: "Languages",
    description: "Styling language for web presentation and layout",
  },
  {
    name: "JavaScript",
    level: 30,
    category: "Languages",
    description: "Dynamic programming language for web development",
  },
  {
    name: "TypeScript",
    level: 30,
    category: "Languages",
    description: "Typed superset of JavaScript for better development experience",
  },
  {
    name: "C++",
    level: 15,
    category: "Languages",
    description: "Typed superset of JavaScript for better development experience",
  },
  {
    name: "Assembly",
    level: 10,
    category: "Languages",
    description: "Low-level programming language for direct hardware manipulation",
  },

  // Other Tools
  {
    name: "Cheat Engine",
    level: 15,
    category: "Other",
    description: "Memory scanner and debugger for reverse engineering",
  },
  {
    name: "Linux",
    level: 25,
    category: "Other",
    description: "Operator system kernel for servers and desktops. It is known for its stability and security.",
  },
  {
    name: "Raspberry Pi",
    level: 20,
    category: "Other",
    description: "Small, affordable computer for DIY projects and learning programming. I use it for hosting projects and learning Linux.",
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
