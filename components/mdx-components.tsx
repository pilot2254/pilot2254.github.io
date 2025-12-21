import Image from "next/image"
import { cn } from "@/lib/utils"

export const mdxComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn("text-3xl font-bold text-white mt-8 mb-4", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn("text-2xl font-bold text-white mt-8 mb-4", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn("text-xl font-bold text-white mt-6 mb-3", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("text-zinc-300 leading-7 mb-4", className)}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn("text-white hover:text-zinc-400 underline transition-colors", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("list-disc list-inside text-zinc-300 mb-4 space-y-2", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.OListHTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn("list-decimal list-inside text-zinc-300 mb-4 space-y-2", className)}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5 font-mono text-sm text-zinc-200",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mb-4 font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-4">
      <table
        className={cn("w-full border-collapse border border-zinc-800", className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn("border border-zinc-800 bg-zinc-900 px-4 py-2 text-left font-medium text-white", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn("border border-zinc-800 px-4 py-2 text-zinc-300", className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn("border-l-4 border-zinc-700 pl-4 italic text-zinc-400 my-4", className)}
      {...props}
    />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      {...(props as any)}
      width={800}
      height={600}
      className="rounded-lg my-4"
      alt={props.alt || ""}
    />
  ),
}
