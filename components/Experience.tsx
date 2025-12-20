import { config } from "@/lib/config";

export default function Experience() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8">Experience</h2>
      <div className="space-y-12">
        {config.experience.map((exp, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold">{exp.position}</h3>
              <span className="text-sm text-muted-foreground">{exp.period}</span>
            </div>
            <p className="text-muted-foreground">{exp.company}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {exp.achievements.map((achievement, i) => (
                <li key={i}>— {achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
