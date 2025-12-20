import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-8">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="block group space-y-2">
              <div className="flex justify-between items-baseline">
                <h2 className="font-semibold group-hover:text-muted-foreground transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-muted-foreground">
                  {new Date(post.date).getFullYear()}
                </time>
              </div>
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
