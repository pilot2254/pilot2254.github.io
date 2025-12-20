import { aboutConfig } from "@/config/about"

export function About() {
  return (
    <section id="about" className="container py-16 md:py-24">
      <div className="mx-auto max-w-[800px]">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          {aboutConfig.about.title}
        </h2>
        <p className="text-lg text-muted-foreground whitespace-pre-line">
          {aboutConfig.about.description}
        </p>
      </div>
    </section>
  )
}
