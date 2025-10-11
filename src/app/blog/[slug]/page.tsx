import { getPostBySlug, getAllPostSlugs } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container py-16 md:py-24">
      <div className="mx-auto max-w-[800px]">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <article>
          <header className="mb-8">
            <time className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mt-2 mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">{post.description}</p>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {post.content.split("\n").map((line, i) => {
              if (line.startsWith("# ")) {
                return (
                  <h1 key={i} className="text-3xl font-bold mt-8 mb-4">
                    {line.slice(2)}
                  </h1>
                )
              }
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-bold mt-6 mb-3">
                    {line.slice(3)}
                  </h2>
                )
              }
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-xl font-bold mt-4 mb-2">
                    {line.slice(4)}
                  </h3>
                )
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={i} className="ml-4">
                    {line.slice(2)}
                  </li>
                )
              }
              if (line.match(/^\d+\. /)) {
                return (
                  <li key={i} className="ml-4">
                    {line.replace(/^\d+\. /, "")}
                  </li>
                )
              }
              if (line.trim() === "") {
                return <br key={i} />
              }
              return (
                <p key={i} className="mb-4">
                  {line}
                </p>
              )
            })}
          </div>
        </article>
      </div>
    </div>
  )
}
