import Link from "next/link"
import { siteConfig } from "@/config/site"

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 py-8">
      <div className="max-w-2xl mx-auto px-6 flex items-center justify-between text-sm text-zinc-500">
        <div>
          {siteConfig.name}{" "}
          <a
            href={siteConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            (@{siteConfig.author.twitter.replace('@', '')})
          </a>
        </div>

        <Link
          href="https://github.com/yourusername/portfolio"
          target="_blank"
          className="hover:text-zinc-300 transition-colors"
        >
          Source
        </Link>
      </div>
    </footer>
  )
}
