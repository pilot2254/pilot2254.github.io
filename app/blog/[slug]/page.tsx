import { getPostBySlug, getAllPosts, getAllUnlistedPosts, getRelatedPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import Link from "next/link"
import { MarkdownContent } from "@/components/markdown-content"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"
import { ScrollToTop } from "@/components/scroll-to-top"

export async function generateStaticParams() {
  const listedPosts = await getAllPosts()
  const unlistedPosts = await getAllUnlistedPosts()
  const allPosts = [...listedPosts, ...unlistedPosts]

  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} - ${siteConfig.name}`,
    description: post.description || post.title,
    openGraph: {
      title: post.title,
      description: post.description || post.title,
      type: "article",
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || post.title,
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const relatedPosts = await getRelatedPosts(post.related ?? [])

  return (
    <>
      <article>
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground transition-colors text-sm mb-8 inline-block"
        >
          ← Back
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{post.title}</h1>
          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            <time>{post.date}</time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <MarkdownContent content={post.content} />

        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border">
            <h2 className="text-sm font-medium text-muted-foreground mb-6">Read more</h2>
            <div className="space-y-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block"
                >
                  <h3 className="text-foreground group-hover:text-muted-foreground transition-colors mb-1">
                    {related.title}
                  </h3>
                  <span className="text-muted-foreground text-sm">{related.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
      <ScrollToTop />
    </>
  )
}
