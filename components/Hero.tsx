import { config } from "@/lib/config";

export default function Hero() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-32">
      <h1 className="text-4xl font-bold mb-6">{config.name}</h1>
      <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
        <p>{config.about.description}</p>
        <div className="flex gap-6 text-sm">
          <a href={config.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            GitHub
          </a>
          <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            LinkedIn
          </a>
          <a href={`mailto:${config.email}`} className="hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
