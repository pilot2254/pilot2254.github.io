/**
 * Blog Header Component
 * Header section for blog pages
 */

interface BlogHeaderProps {
  title: string
  description?: string
  className?: string
}

export function BlogHeader({ title, description, className }: BlogHeaderProps) {
  return (
    <div className={`text-center space-y-4 ${className || ""}`}>
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mx-auto max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl">
          {description}
        </p>
      )}
    </div>
  )
}