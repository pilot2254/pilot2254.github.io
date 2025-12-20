import { config } from "@/lib/config";

export default function Education() {
  return (
    <section className="container py-24 bg-muted/50">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Education</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {config.education.map((edu, idx) => (
            <div key={idx} className="border rounded-lg p-6 bg-background">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="font-bold text-xl">{edu.degree}</h3>
                <span className="text-sm text-muted-foreground">{edu.period}</span>
              </div>
              <p className="font-semibold text-muted-foreground mb-2">{edu.institution}</p>
              <p className="text-muted-foreground">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
