/**
 * Blog Listing Page
 * Displays all blog posts in a grid layout
 */

import { Suspense } from "react"
import { getAllPosts, getFeaturedPosts } from "@/lib/blog"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogHeader } from "@/components/blog/blog-header"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { blogConfig } from "@/config/blog"

// Loading component for blog cards
function BlogCardSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-18" />
        </div>
      </div>
    </Card>
  )
}

// Blog posts grid component
async function BlogPostsGrid() {
  const [allPosts, featuredPosts] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(blogConfig.featuredPostsCount)
  ])

  if (allPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
        <p className="text-muted-foreground">
          Check back soon for new content!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          {featuredPosts.length > 0 ? "All Posts" : "Latest Posts"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <BlogHeader 
            title="Blog"
            description="Thoughts, tutorials, and insights on web development, technology, and my journey as a developer."
          />
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container px-4 md:px-6">
          <Suspense 
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <BlogPostsGrid />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

// Metadata for SEO
export const metadata = {
  title: "Blog - Michal Flaška",
  description: "Read my latest thoughts, tutorials, and insights on web development, technology, and programming.",
  keywords: ["blog", "web development", "programming", "tutorials", "technology"],
}