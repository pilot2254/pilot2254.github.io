import { ReactNode } from "react"

export interface TimelineItem {
  id: string
  title: string
  year: number
  description?: string
  tags?: string[]
}

interface TimelineProps {
  items: TimelineItem[]
  renderItem: (item: TimelineItem) => ReactNode
}

export function Timeline({ items, renderItem }: TimelineProps) {
  const byYear = items.reduce((acc, item) => {
    if (!acc[item.year]) acc[item.year] = []
    acc[item.year].push(item)
    return acc
  }, {} as Record<number, TimelineItem[]>)

  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a)

  return (
    <div className="relative">
      <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-border" />
      <div className="space-y-8">
        {years.map((year) => (
          <div key={year} className="relative">
            <div className="flex items-start gap-4">
              <span className="text-muted-foreground text-sm font-mono tabular-nums w-12 pt-0.5">
                {year}
              </span>
              <div className="flex-1 space-y-6">
                {byYear[year].map((item) => (
                  <div key={item.id}>{renderItem(item)}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
