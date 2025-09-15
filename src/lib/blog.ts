/**
 * Blog utilities
 * Functions for reading and processing blog posts
 */

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import remarkHtml from "remark-html"
import remarkGfm from "remark-gfm"
import type { BlogPost } from "@/types"
import { blogConstants } from "@/config/blog"

const postsDirectory = path.join(process.cwd(), "src/data/blog")

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter((name) => name.endsWith(".md"))
      .map((name) => name.replace(/\.md$/, ""))
  } catch (error) {
    console.warn("Error reading blog posts directory:", error)
    return []
  }
}

/**
 * Calculate reading time based on word count
 */
function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  const readingTime = Math.ceil(words / blogConstants.WORDS_PER_MINUTE)
  return Math.max(readingTime, blogConstants.MIN_READING_TIME)
}

/**
 * Process markdown content to HTML
 */
async function processMarkdown(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkGfm) // GitHub Flavored Markdown
    .use(remarkHtml, { sanitize: false })
    .process(content)
  
  return processedContent.toString()
}

/**
 * Get blog post data by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    // Process markdown to HTML
    const htmlContent = await processMarkdown(content)

    // Calculate reading time
    const readingTime = calculateReadingTime(content)

    return {
      slug,
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date || new Date().toISOString(),
      author: data.author || "Anonymous",
      tags: data.tags || [],
      content: htmlContent,
      readingTime,
      featured: data.featured || false,
      published: data.published !== false, // Default to true unless explicitly false
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

/**
 * Get all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = getAllPostSlugs()
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug)
      return post
    })
  )

  // Filter out null posts and unpublished posts
  const validPosts = posts.filter((post): post is BlogPost => 
    post !== null && post.published
  )

  // Sort posts by date (newest first)
  return validPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

/**
 * Get featured blog posts
 */
export async function getFeaturedPosts(limit?: number): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  const featuredPosts = allPosts.filter((post) => post.featured)
  
  if (limit) {
    return featuredPosts.slice(0, limit)
  }
  
  return featuredPosts
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => 
    post.tags.some((postTag) => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  )
}

/**
 * Get all unique tags from all posts
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const tags = new Set<string>()
  
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

/**
 * Format blog post date
 */
export function formatDate(date: string, format?: string): string {
  const dateObj = new Date(date)
  
  // Simple date formatting - you can enhance this with a library like date-fns if needed
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  
  return dateObj.toLocaleDateString("en-US", options)
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content: string, length: number = blogConstants.EXCERPT_LENGTH): string {
  // Remove HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, "")
  
  if (plainText.length <= length) {
    return plainText
  }
  
  return plainText.slice(0, length).trim() + "..."
}