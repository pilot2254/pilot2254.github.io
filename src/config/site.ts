/**
 * Site-wide configuration
 * Centralized place for all site metadata and settings
 */

import type { SiteConfig } from "@/types"

export const siteConfig: SiteConfig = {
  name: "Michal Flaška Portfolio",
  title: "Michal Flaška | Full Stack Developer & UI/UX Designer",
  description:
    "Portfolio of Michal Flaška, showcasing web development, mobile applications, and UI/UX design projects.",
  url: "https://pilot2254.github.io",
  author: {
    name: "Michal Flaška",
    email: "michal.flaska@redfox-studios.org",
    twitter: "@pilot2254",
    github: "pilot2254",
    linkedin: "pilot2254",
  },
  social: [
    {
      platform: "GitHub",
      url: "https://github.com/pilot2254",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/pilot2254",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/pilot2254",
    },
  ],
  contact: {
    email: "michal.flaska@redfox-studios.org",
    availability: "Available for freelance work",
  },
}

export const navigationItems = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const

export const skillCategories = ["Frontend", "Backend", "Languages", "Other"] as const
