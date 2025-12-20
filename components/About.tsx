import { config } from "@/lib/config";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="container py-24 bg-muted/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden bg-muted">
            <Image
              src={config.about.image}
              alt={config.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{config.about.title}</h2>
            <p className="text-lg text-muted-foreground">
              {config.about.description}
            </p>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <p><span className="font-semibold">Email:</span> {config.email}</p>
              <p><span className="font-semibold">GitHub:</span> <a href={config.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline">{config.github}</a></p>
              <p><span className="font-semibold">LinkedIn:</span> <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline">{config.linkedin}</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
