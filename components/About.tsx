import { config } from "@/lib/config";

export default function About() {
  return (
    <section id="about" className="max-w-2xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8">About</h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>{config.about.description}</p>
      </div>
    </section>
  );
}
