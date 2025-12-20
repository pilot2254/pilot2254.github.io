import { config } from "@/lib/config";

export default function Experience() {
  return (
    <section className="container py-24">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Experience</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {config.experience.map((exp, idx) => (
            <div key={idx} className="border-l-2 pl-8 relative">
              <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary" />
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h3 className="font-bold text-xl">{exp.position}</h3>
                  <span className="text-sm text-muted-foreground">{exp.period}</span>
                </div>
                <p className="font-semibold text-muted-foreground">{exp.company}</p>
                <p className="text-muted-foreground">{exp.description}</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
