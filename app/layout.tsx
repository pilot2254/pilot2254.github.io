import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} bg-[#0a0a0a] text-zinc-300 font-sans`}>
        <Navigation />
        <main className="min-h-screen max-w-2xl mx-auto px-6 py-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
