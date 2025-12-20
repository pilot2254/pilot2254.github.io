"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { config } from "@/lib/config";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "About" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className="border-b">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold hover:text-muted-foreground transition-colors">
          {config.name}
        </Link>

        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
