import { getAllPosts } from "@/lib/blog"
import Link from "next/link"

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <div className="space-y-12">
      {posts.map((post) => (
        <div key={post.slug} className="group">
          <div className="flex items-baseline gap-4">
            <span className="text-zinc-600 text-sm tabular-nums">
              {post.year}
            </span>
            <Link
              href={`/blog/${post.slug}`}
              className="text-white hover:text-zinc-400 transition-colors"
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
