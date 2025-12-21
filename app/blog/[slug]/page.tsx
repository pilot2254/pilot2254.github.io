import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import Link from "next/link"
import { MarkdownContent } from "@/components/markdown-content"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export const dynamicParams = false

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article>
      <Link
        href="/"
        className="text-zinc-500 hover:text-white transition-colors text-sm mb-8 inline-block"
      >
        ← Back
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{post.title}</h1>
        <time className="text-zinc-500 text-sm">{post.date}</time>
      </header>

      <MarkdownContent content={post.content} />
    </article>
  )
}
