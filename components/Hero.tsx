import { config } from "@/lib/config";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container py-24 md:py-32">
      <div className="flex flex-col items-center text-center gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Hi, I'm {config.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {config.title}
          </p>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {config.about.description}
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="#projects">View Projects</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={`mailto:${config.email}`}>Contact Me</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
