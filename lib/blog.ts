import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/blog")
const unlistedDirectory = path.join(postsDirectory, "unlisted")

if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

export interface Post {
  slug: string
  title: string
  date: string
  year: number
  description?: string
  content: string
  readTime: string
  related?: string[] // slugs of related posts
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => {
      if (fileName === "unlisted" || fileName.startsWith(".")) return false
      return fileName.endsWith(".mdx") || fileName.endsWith(".md")
    })
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      const wordCount = content.split(/\s+/).length
      const readTime = Math.ceil(wordCount / 200)

      return {
        slug,
        title: data.title,
        date: data.date,
        year: new Date(data.date).getFullYear(),
        description: data.description,
        content,
        readTime: `${readTime} min read`,
        related: data.related ?? [],
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    let fileContents: string

    try {
      fileContents = fs.readFileSync(path.join(postsDirectory, `${slug}.mdx`), "utf8")
    } catch {
      try {
        fileContents = fs.readFileSync(path.join(postsDirectory, `${slug}.md`), "utf8")
      } catch {
        try {
          fileContents = fs.readFileSync(path.join(unlistedDirectory, `${slug}.mdx`), "utf8")
        } catch {
          fileContents = fs.readFileSync(path.join(unlistedDirectory, `${slug}.md`), "utf8")
        }
      }
    }

    const { data, content } = matter(fileContents)
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)

    return {
      slug,
      title: data.title,
      date: data.date,
      year: new Date(data.date).getFullYear(),
      description: data.description,
      content,
      readTime: `${readTime} min read`,
      related: data.related ?? [],
    }
  } catch {
    return null
  }
}

export async function getAllUnlistedPosts(): Promise<Post[]> {
  if (!fs.existsSync(unlistedDirectory)) return []

  const fileNames = fs.readdirSync(unlistedDirectory)
  return fileNames
    .filter((f) => !f.startsWith(".") && (f.endsWith(".mdx") || f.endsWith(".md")))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "")
      const fullPath = path.join(unlistedDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      const wordCount = content.split(/\s+/).length
      const readTime = Math.ceil(wordCount / 200)

      return {
        slug,
        title: data.title,
        date: data.date,
        year: new Date(data.date).getFullYear(),
        description: data.description,
        content,
        readTime: `${readTime} min read`,
        related: data.related ?? [],
      }
    })
}

// Resolves related slugs to full Post objects (skips any invalid slugs silently)
export async function getRelatedPosts(slugs: string[]): Promise<Post[]> {
  if (!slugs || slugs.length === 0) return []

  const results = await Promise.all(slugs.map((slug) => getPostBySlug(slug)))
  return results.filter((p): p is Post => p !== null)
}
