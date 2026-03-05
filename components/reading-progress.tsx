"use client"

import { useState, useEffect } from "react"
import { siteConfig } from "@/config/site"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }

    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  if (!siteConfig.features.readingProgressBar) return null

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-0.5 bg-muted-foreground transition-all duration-75"
      style={{ width: `${progress}%` }}
    />
  )
}
