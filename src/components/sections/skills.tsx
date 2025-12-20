import { skillsConfig } from "@/config/skills"
import { Badge } from "@/components/ui/badge"

export function Skills() {
  return (
    <section id="skills" className="container py-16 md:py-24">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
        Skills
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-xl font-semibold mb-4">Frontend</h3>
          <div className="flex flex-wrap gap-2">
            {skillsConfig.frontend.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Backend</h3>
          <div className="flex flex-wrap gap-2">
            {skillsConfig.backend.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {skillsConfig.languages.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Other</h3>
          <div className="flex flex-wrap gap-2">
            {skillsConfig.other.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
