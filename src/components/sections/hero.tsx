import { aboutConfig } from "@/config/about"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="container flex flex-col items-center justify-center gap-4 py-24 md:py-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          {aboutConfig.hero.title}
        </h1>
        <p className="text-xl text-muted-foreground sm:text-2xl">
          {aboutConfig.hero.subtitle}
        </p>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {aboutConfig.hero.description}
        </p>
        <div className="flex gap-4 mt-4">
          <Button asChild size="lg">
            <Link href="#contact">Get in Touch</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#projects">View Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
