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
    id: "game-development",
    title: "Game Development",
    description: "Creating cross-platform games in Unreal Engine and Unity",
    icon: "Joystick",
    features: [
      "2D & 3D Game Development",
      "Cross-platform Deployment",
      "Game Mechanics Design",
      "Performance Optimization",
    ],
  },
  {
    id: "discord-server-building",
    title: "Discord Server Building",
    description: "Building a powerful and comfortable Discord Servers",
    icon: "Server",
    features: ["Custom Bot Development", "Server Setup & Configuration", "Community Management", "Moderation Systems"],
  },
]
