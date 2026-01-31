"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/about", label: "About" },
    { href: "/", label: "Blog" },
    { href: "/projects", label: "Projects" },
  ]

  return (
    <nav className={cn(
      "w-full border-b border-border",
      siteConfig.navigation.sticky && "sticky top-0 bg-background/80 backdrop-blur-sm z-50"
    )}>
      <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-foreground font-medium hover:text-muted-foreground transition-colors"
        >
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors",
                pathname === link.href && link.href !== "/"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
