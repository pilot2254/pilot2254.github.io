import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Michal Flaška Portfolio | Full Stack Developer & UI/UX Designer",
  description: "Professional portfolio of Michal Flaška, showcasing web development, mobile applications, and UI/UX design projects.",
  keywords: ["web development", "full stack developer", "UI/UX design", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Michal Flaška" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pilot2254.github.io",
    title: "Michal Flaška Portfolio | Full Stack Developer & UI/UX Designer",
    description: "Professional portfolio of Michal Flaška, showcasing web development, mobile applications, and UI/UX design projects.",
    siteName: "Michal Flaška Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michal Flaška Portfolio | Full Stack Developer & UI/UX Designer",
    description: "Professional portfolio of Michal Flaška, showcasing web development, mobile applications, and UI/UX design projects.",
    creator: "@pilot2254",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div id="top" className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}