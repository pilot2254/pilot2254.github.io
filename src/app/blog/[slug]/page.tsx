/**
 * Individual Blog Post Page
 * Displays a single blog post with full content
 */

import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react"
import { getAllPostSlugs, getPostBySlug, formatDate } from "@/lib/blog"
import { BlogContent } from "@/components/blog/blog-content"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { blogConfig } from "@/config/blog"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} - Michal Flaška`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Back Navigation */}
      <section className="py-6 bg-background border-b">
        <div className="container px-4 md:px-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <article className="max-w-4xl mx-auto">
            <header className="space-y-6">
              {/* Title and Featured Badge */}
              <div className="space-y-4">
                {post.featured && (
                  <Badge variant="default" className="w-fit">
                    Featured Post
                  </Badge>
                )}
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  {post.title}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Post Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </div>
                
                {blogConfig.showAuthor && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                )}
                
                {blogConfig.showReadingTime && post.readingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {blogConfig.showTags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Separator className="my-8" />
            </header>

            {/* Article Content */}
            <div className="mt-8">
              <BlogContent 
                content={post.content} 
                className="prose-lg sm:prose-xl"
              />
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  Published on {formatDate(post.date)} by {post.author}
                </div>
                <Button variant="outline" asChild>
                  <Link href="/blog">
                    ← Back to all posts
                  </Link>
                </Button>
              </div>
            </footer>
          </article>
        </div>
      </section>
    </div>
  )
}