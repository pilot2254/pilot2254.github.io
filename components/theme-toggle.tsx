"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { siteConfig } from "@/config/site"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-5 h-5" />
  }

  const toggle = () => {
    if (siteConfig.features.themeTransition) {
      document.documentElement.setAttribute("data-theme-transitioning", "true")
      setTimeout(() => {
        document.documentElement.removeAttribute("data-theme-transitioning")
      }, 300)
    }
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={toggle}
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  )
}
