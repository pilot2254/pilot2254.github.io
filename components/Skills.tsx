"use client";

import { config } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<typeof config.skills[0] | null>(null);

  return (
    <section id="skills" className="container py-24">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Skills & Technologies</h2>
          <p className="text-muted-foreground">
            Click on a skill to learn more about my experience
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {config.skills.map((skill) => (
            <Badge
              key={skill.id}
              variant="secondary"
              className="cursor-pointer text-base px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedSkill(skill)}
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedSkill} onOpenChange={() => setSelectedSkill(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedSkill?.name}</DialogTitle>
            <DialogDescription>{selectedSkill?.category}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>{selectedSkill?.description}</p>
            <div>
              <p className="font-semibold">Experience:</p>
              <p className="text-muted-foreground">
                {selectedSkill?.yearsOfExperience} years
              </p>
            </div>
            <div>
              <p className="font-semibold">Used in projects:</p>
              <ul className="list-disc list-inside text-muted-foreground">
                {selectedSkill?.projects.map((project, idx) => (
                  <li key={idx}>{project}</li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
