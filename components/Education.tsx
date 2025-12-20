import { config } from "@/lib/config";

export default function Education() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8">Education</h2>
      <div className="space-y-8">
        {config.education.map((edu, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold">{edu.degree}</h3>
              <span className="text-sm text-muted-foreground">{edu.period}</span>
            </div>
            <p className="text-muted-foreground">{edu.institution}</p>
            <p className="text-sm text-muted-foreground">{edu.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
