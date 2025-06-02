/**
 * Professional experience data
 * Work history and achievements
 */

import type { Experience, Education, Achievement } from "@/types"

export const experiences: Experience[] = [
  {
    id: "redfox-studios-ceo",
    title: "Founder & CEO",
    company: "RedFox Studios",
    period: "2021 - Present",
    current: true,
    description: [
      "Led development of multiple Projects",
      "Mentored junior developers",
      "Built a complete website using Next.js, shadcn/ui and React",
      "4x Top Employee of the Year",
      "Implemented CI/CD pipelines",
    ],
  },
  {
    id: "flegy-frontend",
    title: "Front-End Developer",
    company: "Flegy.sk",
    period: "2023 - Present",
    current: true,
    description: [
      "Developed a Beautifully looking portfolio",
      "Worked with TailwindCSS, HTML, CSS, TailwindCSS, JS",
      "Significantly improved visuals of the website",
    ],
  },
  {
    id: "retry-games-manager",
    title: "Discord Server Manager",
    company: "Retry Games",
    period: "2024 - 2025",
    description: [
      "Successfully created and managed a discord server for Retry Games. And helped make the community better",
      "Worked with Regexes, Discord API, And Discord Bots",
      "Improved User satisfaction metrics by 30%",
    ],
  },
  {
    id: "moonforge-helper",
    title: "Front-End Developer",
    company: "Moonforge Studios",
    period: "2024 - 2025",
    description: [
      "Helped the team to switch to Next.js, Shadcn/ui and assisted with web development",
      "Worked with React, Node.js, Shadcn/ui and Git",
      "Improved application performance by 40%",
    ],
  },
]

export const education: Education[] = [
  {
    id: "elementary-school",
    title: "ZŠ Železničná in Bratislava - Slovakia",
    institution: "Elementary School",
    period: "2015 - 2024",
  },
  {
    id: "algorithmics",
    title: "Algorithmics Academy",
    institution: "IT Technology Course",
    period: "2022 - 2023",
  },
  {
    id: "skyro-camp",
    title: "Skyro Academy",
    institution: "IT Technology Camp",
    period: "2023 - 2024",
  },
  {
    id: "skyro-high-school",
    title: "Skyro.ai",
    institution: "High School",
    period: "2024 - Present",
  },
  {
    id: "certifications",
    title: "Various Certifications",
    institution: "Multiple Providers",
    period: "2022 - Present",
    description: [
      "Algorithmics Academy Certificate",
      "Skyro Academy",
      "Best Portfolio 2024 Awards Winner - Hobbyist Category",
      "Gamejam 2024 - Participant",
      "ArcadeWatch Gamejam 2024 - Participant",
    ],
  },
]

export const achievements: Achievement[] = [
  {
    id: "best-website-design",
    title: "Best Website Design",
    company: "Algorithmics Academy",
    year: 2022,
  },
  {
    id: "top-project-skyro",
    title: "2x Top Project",
    company: "Skyro Academy",
    year: "2023, 2024",
  },
  {
    id: "employee-year-redfox",
    title: "4x Employee of the Year",
    company: "RedFox Studios",
    year: "2021, 2022, 2023, 2024",
  },
  {
    id: "best-portfolio-2024",
    title: "Best Portfolio 2024 Awards - Hobbyist Category",
    company: "N/A",
    year: 2024,
  },
]
