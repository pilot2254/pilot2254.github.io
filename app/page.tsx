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
    <div className="relative">
      {/* Vertical timeline */}
      <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-zinc-800" />

      <div className="space-y-8">
        {years.map((year) => (
          <div key={year} className="relative">
            {/* First post with year */}
            <div className="flex items-start gap-4">
              <span className="text-zinc-600 text-sm font-mono tabular-nums w-12 pt-0.5">
                {year}
              </span>
              <div className="flex-1 space-y-2">
                {postsByYear[year].map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex items-center justify-between text-white hover:text-zinc-400 transition-colors"
                  >
                    <span>{post.title}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
