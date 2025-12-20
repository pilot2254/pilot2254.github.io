import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container py-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-muted-foreground">
            Thoughts, tutorials, and insights about web development
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block border rounded-lg p-6 hover:border-primary transition-colors"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-muted-foreground">{post.excerpt}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
