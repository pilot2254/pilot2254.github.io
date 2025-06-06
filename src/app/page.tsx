import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Github,
  Mail,
  Twitter,
  Linkedin,
  ExternalLink,
  Code2,
  AlertCircle,
  Trophy,
  Briefcase,
  GraduationCap,
  Joystick,
  Server,
  Star,
  CheckCircle,
  Clock,
  Archive,
} from "lucide-react"

// Import data
import { skills, getSkillLevelDescription } from "@/data/skills"
import { projects } from "@/data/projects"
import { testimonials } from "@/data/testimonials"
import { experiences, education, achievements } from "@/data/experience"
import { services } from "@/data/services"
import { siteConfig, skillCategories } from "@/config/site"
import { APP_CONSTANTS, EXTERNAL_LINKS, ARIA_LABELS } from "@/lib/constants"
import { formatDate } from "@/lib/utils"

// Icon mapping for services
const iconMap = {
  Code2,
  Joystick,
  Server,
} as const

// Status icon mapping for projects
const statusIconMap = {
  completed: CheckCircle,
  "in-progress": Clock,
  archived: Archive,
} as const

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to my portfolio
              </h1>
              <div className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Front End Developer & UI/UX Designer
              </div>
            </div>
            <div className="flex space-x-4">
              <Button size="lg" className="inline-flex items-center" asChild>
                <a href="#contact" className="inline-flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </a>
              </Button>
              <Button variant="outline" size="lg" className="inline-flex items-center" asChild>
                <a href="#projects" className="inline-flex items-center">
                  View Projects
                </a>
              </Button>
            </div>
            <div className="flex space-x-4">
              <TooltipProvider>
                {siteConfig.social.map((social) => {
                  const IconComponent =
                    social.platform === "GitHub" ? Github : social.platform === "LinkedIn" ? Linkedin : Twitter
                  return (
                    <Tooltip key={social.platform}>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center"
                            aria-label={`Follow on ${social.platform} ${ARIA_LABELS.EXTERNAL_LINK}`}
                          >
                            <IconComponent className="h-5 w-5" />
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>Follow on {social.platform}</span>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </TooltipProvider>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
              <div className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Creating beautiful and functional web applications.
              </div>
            </div>
            <div className="w-full max-w-4xl mt-8">
              <Tabs defaultValue="experience" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="experience">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Experience
                  </TabsTrigger>
                  <TabsTrigger value="education">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Education
                  </TabsTrigger>
                  <TabsTrigger value="achievements">
                    <Trophy className="mr-2 h-4 w-4" />
                    Achievements
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="experience">
                  <Card>
                    <CardHeader>
                      <CardTitle>Experience</CardTitle>
                      <CardDescription>My journey in software development</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="scroll-area-sm pr-4">
                        <div className="space-y-8">
                          {experiences.map((exp) => (
                            <div key={exp.id} className="relative pl-6 border-l">
                              <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary -translate-x-[5px]" />
                              <h3 className="font-semibold">{exp.title}</h3>
                              <div className="text-sm text-muted-foreground">
                                {exp.company} • {exp.period}
                                {exp.current && (
                                  <Badge variant="secondary" className="ml-2">
                                    Current
                                  </Badge>
                                )}
                              </div>
                              <ul className="mt-2 space-y-1">
                                {exp.description.map((item, i) => (
                                  <li key={i} className="text-sm text-muted-foreground">
                                    • {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="education">
                  <Card>
                    <CardHeader>
                      <CardTitle>Education</CardTitle>
                      <CardDescription>Academic background and certifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="scroll-area-sm pr-4">
                        <div className="space-y-8">
                          {education.map((edu) => (
                            <div key={edu.id} className="relative pl-6 border-l">
                              <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary -translate-x-[5px]" />
                              <h3 className="font-semibold">{edu.title}</h3>
                              <div className="text-sm text-muted-foreground">
                                {edu.institution} • {edu.period}
                              </div>
                              {edu.description && (
                                <ul className="mt-2 space-y-1">
                                  {edu.description.map((item, i) => (
                                    <li key={i} className="text-sm text-muted-foreground">
                                      • {item}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="achievements">
                  <Card>
                    <CardHeader>
                      <CardTitle>Achievements</CardTitle>
                      <CardDescription>Awards and recognitions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="scroll-area-sm pr-4">
                        <div className="space-y-8">
                          {achievements.map((ach) => (
                            <div key={ach.id} className="relative pl-6 border-l">
                              <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary -translate-x-[5px]" />
                              <h3 className="font-semibold">{ach.title}</h3>
                              <div className="text-sm text-muted-foreground">
                                {ach.company} • {ach.year}
                              </div>
                              {ach.description && (
                                <div className="text-sm text-muted-foreground mt-1">{ach.description}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Services</h2>
              <div className="text-muted-foreground">Specialized solutions I offer</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-6">
              {services.map((service) => {
                const IconComponent = iconMap[service.icon as keyof typeof iconMap]
                return (
                  <Card key={service.id} className="flex flex-col h-full">
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-md bg-primary/10">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-1">
                      <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                      {service.features && service.features.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">What's included:</h4>
                          <ul className="space-y-1 ml-4">
                            {service.features.map((feature, index) => (
                              <li key={index} className="text-xs text-muted-foreground list-disc">
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills</h2>
              <div className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Technologies and tools I work with
              </div>
            </div>
            <div className="w-full max-w-4xl mt-8">
              <Tabs defaultValue="Frontend" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  {skillCategories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {skillCategories.map((category) => (
                  <TabsContent key={category} value={category}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{category} Skills</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-6">
                        {skills
                          .filter((skill) => skill.category === category)
                          .map((skill) => (
                            <div key={skill.name} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">{skill.name}</h4>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {getSkillLevelDescription(skill.level)}
                                  </Badge>
                                  <span className="text-muted-foreground text-sm">{skill.level}%</span>
                                </div>
                              </div>
                              <Progress value={skill.level} className="h-2" />
                              {skill.description && (
                                <div className="text-sm text-muted-foreground mt-1">{skill.description}</div>
                              )}
                            </div>
                          ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Projects</h2>
              <div className="text-muted-foreground">Some of my recent work</div>
            </div>
            <div className="w-full max-w-3xl mt-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {projects.map((project) => {
                    const StatusIcon = project.status ? statusIconMap[project.status] : null
                    return (
                      <CarouselItem key={project.id}>
                        <Card className={`border-0 ${project.featured ? "bg-accent/50" : ""}`}>
                          <CardHeader className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg flex items-center gap-2">
                                  {project.title}
                                  {project.featured && (
                                    <Badge variant="secondary" className="text-xs">
                                      Featured
                                    </Badge>
                                  )}
                                </CardTitle>
                                <CardDescription className="text-sm">{project.description}</CardDescription>
                              </div>
                              {StatusIcon && project.status && (
                                <div className="flex items-center gap-1 ml-2">
                                  <StatusIcon className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground capitalize">
                                    {project.status.replace("-", " ")}
                                  </span>
                                </div>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="relative h-[150px] mb-4 rounded-md overflow-hidden bg-muted">
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={`${project.title} project screenshot`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0 gap-2">
                            {project.demoLink && (
                              <Button variant="default" size="sm" className="flex-1" asChild>
                                <a
                                  href={project.demoLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center gap-2"
                                  aria-label={`View live demo of ${project.title} ${ARIA_LABELS.EXTERNAL_LINK}`}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  <span>Demo</span>
                                </a>
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="flex-1" asChild>
                              <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                                aria-label={`View ${project.title} source code ${ARIA_LABELS.EXTERNAL_LINK}`}
                              >
                                <Github className="h-4 w-4" />
                                <span>Code</span>
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <div className="hidden sm:flex">
                  <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12" />
                  <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Testimonials</h2>
              <div className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                What people say about my work
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>
                          {testimonial.role}
                          {testimonial.company && ` at ${testimonial.company}`}
                        </CardDescription>
                        {testimonial.date && (
                          <div className="text-xs text-muted-foreground mt-1">{formatDate(testimonial.date)}</div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-muted-foreground">{testimonial.content}</div>
                    {testimonial.rating && (
                      <div className="flex items-center gap-1 mt-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating! ? "fill-teal-500 text-teal-500" : "text-muted-foreground/60"
                            }`}
                            aria-hidden={i > 0}
                          />
                        ))}
                        <span className="sr-only">{testimonial.rating} out of 5 stars</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h2>
              <div className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Feel free to reach out for collaborations or just a friendly hello
              </div>
            </div>
            <Card className="w-full max-w-md mt-8">
              <CardHeader>
                <CardTitle>Contact Options</CardTitle>
                <CardDescription>Choose your preferred way to reach me</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Quick Response</AlertTitle>
                  <AlertDescription>I typically respond within {APP_CONSTANTS.RESPONSE_TIME}.</AlertDescription>
                </Alert>
                <div className="grid gap-4">
                  <Button className="w-full" asChild>
                    <a href={`mailto:${siteConfig.contact.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </a>
                  </Button>
                  {siteConfig.social.map((social) => {
                    const IconComponent =
                      social.platform === "GitHub" ? Github : social.platform === "LinkedIn" ? Linkedin : Twitter
                    return (
                      <Button key={social.platform} variant="outline" className="w-full" asChild>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Connect on ${social.platform} ${ARIA_LABELS.EXTERNAL_LINK}`}
                        >
                          <IconComponent className="mr-2 h-4 w-4" />
                          Connect on {social.platform}
                        </a>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with{" "}
            <a
              href={EXTERNAL_LINKS.NEXTJS}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Next.js
            </a>{" "}
            and{" "}
            <a
              href={EXTERNAL_LINKS.SHADCN}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn/ui
            </a>
            . All rights reserved.
          </div>
          <div className="flex gap-4">
            <TooltipProvider>
              {siteConfig.social.slice(0, 2).map((social) => {
                const IconComponent = social.platform === "GitHub" ? Github : Twitter
                return (
                  <Tooltip key={social.platform}>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Follow on ${social.platform} ${ARIA_LABELS.EXTERNAL_LINK}`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Follow on {social.platform}</span>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </TooltipProvider>
          </div>
        </div>
      </footer>
    </div>
  )
}
