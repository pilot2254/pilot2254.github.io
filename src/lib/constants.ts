/**
 * Application constants
 * Centralized constant values used throughout the app
 */

export const APP_CONSTANTS = {
  SCROLL_OFFSET: 80,
  RESPONSE_TIME: "24 hours",
  ANIMATION_DURATION: 200,
  SKILL_LEVEL_THRESHOLDS: {
    EXPERT: 80,
    ADVANCED: 60,
    INTERMEDIATE: 40,
    BEGINNER: 20,
  },
} as const

export const EXTERNAL_LINKS = {
  NEXTJS: "https://nextjs.org",
  SHADCN: "https://ui.shadcn.com",
  GITHUB_REPOS: "https://github.com/pilot2254?tab=repositories",
} as const

export const ARIA_LABELS = {
  TOGGLE_THEME: "Toggle theme",
  TOGGLE_MENU: "Toggle navigation menu",
  SCROLL_TO_TOP: "Scroll to top",
  EXTERNAL_LINK: "Opens in new tab",
} as const
