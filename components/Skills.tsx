"use client";

import { config } from "@/lib/config";
import { useState } from "react";

export default function Skills() {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="max-w-2xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8">Skills</h2>
      <div className="space-y-2">
        {config.skills.map((skill) => (
          <div key={skill.id}>
            <button
              onClick={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
              className="w-full text-left py-3 flex items-center justify-between hover:text-foreground transition-colors group"
            >
              <span className="font-medium">{skill.name}</span>
              <span className="text-sm text-muted-foreground group-hover:text-foreground">
                {expandedSkill === skill.id ? "−" : "+"}
              </span>
            </button>
            {expandedSkill === skill.id && (
              <div className="pb-4 pl-4 space-y-2 text-sm text-muted-foreground">
                <p>{skill.description}</p>
                <p>{skill.yearsOfExperience} years experience</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
