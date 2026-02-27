import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BASE_URL = "https://pilot2254.github.io"
const BLOG_DIR = path.join(process.cwd(), "content/blog")
const OUTPUT   = path.join(process.cwd(), "public/sitemap.xml")

// Static pages and their approximate update frequency
const STATIC_PAGES = [
  { url: "/",         priority: "1.0", changefreq: "weekly"  },
  { url: "/about",    priority: "0.7", changefreq: "monthly" },
  { url: "/projects", priority: "0.8", changefreq: "weekly"  },
]

function getBlogSlugs(dir: string): { slug: string; date: string }[] {
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => (f.endsWith(".md") || f.endsWith(".mdx")) && !f.startsWith("."))
    .map((f) => {
      const content = fs.readFileSync(path.join(dir, f), "utf8")
      const { data } = matter(content)
      return {
        slug: f.replace(/\.mdx?$/, ""),
        date: data.date ?? new Date().toISOString().split("T")[0],
      }
    })
}

function buildSitemap(): string {
  const posts = getBlogSlugs(BLOG_DIR)

  const staticEntries = STATIC_PAGES.map(
    ({ url, priority, changefreq }) => `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join("")

  const postEntries = posts.map(
    ({ slug, date }) => `
  <url>
    <loc>${BASE_URL}/blog/${slug}/</loc>
    <lastmod>${date}</lastmod>
    <changefreq>never</changefreq>
    <priority>0.6</priority>
  </url>`
  ).join("")

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${postEntries}
</urlset>`
}

const sitemap = buildSitemap()
fs.writeFileSync(OUTPUT, sitemap, "utf8")
console.log(`✓ sitemap.xml generated (${sitemap.match(/<url>/g)?.length ?? 0} URLs)`)
