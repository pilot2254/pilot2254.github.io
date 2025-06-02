/**
 * Core TypeScript interfaces for the portfolio application
 * Provides type safety and better developer experience
 */

export interface Skill {
  name: string
  level: number
  category: "Frontend" | "Backend" | "Languages" | "Other"
  description?: string
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
  demoLink?: string
  githubLink: string
  featured?: boolean
  status?: "completed" | "in-progress" | "archived"
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  avatar: string
  rating?: number
  date?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string[]
  current?: boolean
}

export interface Education {
  id: string
  title: string
  institution: string
  period: string
  description?: string[]
  grade?: string
}

export interface Achievement {
  id: string
  title: string
  company: string
  year: string | number
  description?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features?: string[]
}

export interface SocialLink {
  platform: string
  url: string
  username?: string
}

export interface ContactInfo {
  email: string
  phone?: string
  location?: string
  availability?: string
}

export interface SiteConfig {
  name: string
  title: string
  description: string
  url: string
  author: {
    name: string
    email: string
    twitter?: string
    github?: string
    linkedin?: string
  }
  social: SocialLink[]
  contact: ContactInfo
}
