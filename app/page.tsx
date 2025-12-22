import { getAllPosts } from "@/lib/blog"
import Link from "next/link"

export default async function Home() {
  const posts = await getAllPosts()

  // Group posts by year
  const postsByYear = posts.reduce((acc, post) => {
    if (!acc[post.year]) {
      acc[post.year] = []
    }
    acc[post.year].push(post)
    return acc
  }, {} as Record<number, typeof posts>)

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Blog</h1>

      <div className="relative">
        {/* Vertical timeline */}
        <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-8">
          {years.map((year) => (
            <div key={year} className="relative">
              <div className="flex items-start gap-4">
                <span className="text-muted-foreground text-sm font-mono tabular-nums w-12 pt-0.5">
                  {year}
                </span>
                <div className="flex-1 space-y-6">
                  {postsByYear[year].map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block"
                    >
                      <h3 className="text-foreground group-hover:text-muted-foreground transition-colors mb-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <span>{post.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
