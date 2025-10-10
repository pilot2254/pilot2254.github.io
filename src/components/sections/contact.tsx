import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { DiscordButton } from "@/components/discord-button"

export function Contact() {
  return (
    <section id="contact" className="container py-16 md:py-24">
      <div className="mx-auto max-w-[600px] text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Get in Touch
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Feel free to reach out to me on any of the platforms below.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {siteConfig.links.github && (
            <Button asChild variant="outline" size="lg">
              <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Link>
            </Button>
          )}
          {siteConfig.links.linkedin && (
            <Button asChild variant="outline" size="lg">
              <Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </Link>
            </Button>
          )}
          {siteConfig.links.twitter && (
            <Button asChild variant="outline" size="lg">
              <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
                <Twitter className="mr-2 h-5 w-5" />
                Twitter
              </Link>
            </Button>
          )}
          {siteConfig.links.discord && <DiscordButton />}
        </div>
      </div>
    </section>
  )
}
