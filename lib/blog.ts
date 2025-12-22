import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/blog")

// Check if directory exists, if not create it
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
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      // Calculate reading time (avg 200 words/min)
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
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    let fileContents: string

    try {
      fileContents = fs.readFileSync(fullPath, "utf8")
    } catch {
      const mdPath = path.join(postsDirectory, `${slug}.md`)
      fileContents = fs.readFileSync(mdPath, "utf8")
    }

    const { data, content } = matter(fileContents)

    // Calculate reading time
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
    }
  } catch {
    return null
  }
}
