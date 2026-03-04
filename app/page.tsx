import { getAllPosts } from "@/lib/blog"
import { BlogList } from "@/components/blog-list"

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Blog</h1>
      <BlogList posts={posts} />
    </div>
  )
}
