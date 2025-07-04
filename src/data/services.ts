/**
 * Services data configuration
 * Professional services offered
 */

import type { Service } from "@/types"

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Building responsive and performant web applications",
    icon: "Code2",
    features: ["React & Next.js Applications", "Responsive Design", "Performance Optimization", "SEO Implementation"],
  },
  {
    id: "app-development",
    title: "App Development",
    description: "Creating cross-platform apps in Electron and NodeJS",
    icon: "Gamepad2",
    features: [
      "Basic productivity tools",
      "Windows, Linux and Mac support",
      "Simple calculators and utilities",
      "Development workflow tools",
    ],
  },
  {
    id: "discord-server-building",
    title: "Discord Server Building",
    description: "Building a powerful and comfortable Discord Servers",
    icon: "Server",
    features: ["Bot Setup", "Server Setup & Configuration", "Community Management", "Moderation Systems"],
  },
]