import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/config/site"
import { CodePanelProvider } from "@/components/code-panel-context"
import { CodePanel } from "@/components/code-panel"
import { LayoutShell } from "@/components/layout-shell"

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
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background text-foreground font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CodePanelProvider>
            <LayoutShell>
              {children}
            </LayoutShell>
            <CodePanel />
          </CodePanelProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
