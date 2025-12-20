"use client";

import { config } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof config.projects[0] | null>(null);

  return (
    <section id="projects" className="container py-24">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Projects</h2>
          <p className="text-muted-foreground">
            Check out some of my recent work
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {config.projects.map((project) => (
              <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="border rounded-lg overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      onClick={() => setSelectedProject(project)}
                      className="w-full"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedProject?.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {selectedProject && selectedProject.images.length > 0 && (
              <Carousel className="w-full">
                <CarouselContent>
                  {selectedProject.images.map((img, idx) => (
                    <CarouselItem key={idx}>
                      <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={img}
                          alt={`${selectedProject.title} screenshot ${idx + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
            <p>{selectedProject?.longDescription}</p>
            <div className="flex gap-4">
              {selectedProject?.github && (
                <Button asChild variant="outline">
                  <Link href={selectedProject.github} target="_blank">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Link>
                </Button>
              )}
              {selectedProject?.demo && (
                <Button asChild>
                  <Link href={selectedProject.demo} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
