import { getPostBySlug, getAllPosts } from "@/lib/markdown";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
        ← Back
      </Link>

      <article className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>•</span>
            <time>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </header>

        <div className="prose prose-zinc dark:prose-invert max-w-none
          prose-headings:font-semibold prose-headings:mt-8 prose-headings:mb-4
          prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
          prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-foreground prose-a:underline hover:prose-a:text-muted-foreground
          prose-ul:my-4 prose-ol:my-4 prose-li:my-1
          prose-strong:font-semibold">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
