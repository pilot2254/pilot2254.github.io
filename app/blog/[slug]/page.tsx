import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"
import Link from "next/link"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold text-white mt-8 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold text-white mt-6 mb-3" {...props} />,
  p: (props: any) => <p className="text-zinc-300 leading-7 mb-4" {...props} />,
  a: (props: any) => <a className="text-white hover:text-zinc-400 underline transition-colors" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside text-zinc-300 mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside text-zinc-300 mb-4 space-y-2" {...props} />,
  code: (props: any) => <code className="bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5 font-mono text-sm text-zinc-200" {...props} />,
  pre: (props: any) => <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mb-4 font-mono text-sm" {...props} />,
  table: (props: any) => <div className="overflow-x-auto mb-4"><table className="w-full border-collapse border border-zinc-800" {...props} /></div>,
  th: (props: any) => <th className="border border-zinc-800 bg-zinc-900 px-4 py-2 text-left font-medium text-white" {...props} />,
  td: (props: any) => <td className="border border-zinc-800 px-4 py-2 text-zinc-300" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-zinc-700 pl-4 italic text-zinc-400 my-4" {...props} />,
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)

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

      <div className="prose prose-invert prose-zinc max-w-none">
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  )
}
