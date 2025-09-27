/**
 * Blog configuration
 * Centralized blog settings and constants
 */

import type { BlogConfig } from "@/types"

export const blogConfig: BlogConfig = {
  postsPerPage: 6,
  showReadingTime: true,
  showAuthor: true,
  showTags: true,
  dateFormat: "MMMM dd, yyyy",
  featuredPostsCount: 3,
}

export const blogConstants = {
  WORDS_PER_MINUTE: 200,
  EXCERPT_LENGTH: 160,
  MIN_READING_TIME: 1,
} as const

export const blogSortOptions = [
  { value: "date-desc", label: "Newest First" },
  { value: "date-asc", label: "Oldest First" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
] as const