import { siteConfig } from "@/config/site"

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-2xl mx-auto px-6 flex items-center justify-between text-sm text-muted-foreground">
        <div>
          {siteConfig.name}{" "}
          <a
            href={siteConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            (@{siteConfig.author.twitter.replace('@', '')})
          </a>
        </div>

        <a
          href={siteConfig.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Source
        </a>
      </div>
    </footer>
  )
}
