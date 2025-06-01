import Image from "next/image"
import { ExternalLink, Github } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  demoLink?: string
  githubLink: string
}

export function ProjectCard({
  title,
  description,
  tags,
  image,
  demoLink,
  githubLink,
}: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full card-hover overflow-hidden">
      <CardHeader className="flex-none">
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="relative aspect-project mb-4 overflow-hidden rounded-md bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-medium">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-none gap-2">
        {demoLink && (
          <Button asChild variant="default" className="flex-1">
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>Live Demo</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
        <Button asChild variant="outline" className="flex-1">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Github className="h-4 w-4" />
            <span>Code</span>
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}