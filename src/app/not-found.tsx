"use client"

import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex-1 flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto relative overflow-hidden border-muted-foreground/20">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-transparent" />
        <CardContent className="pt-16 pb-8 text-center relative z-10">
          <h1 className="text-8xl font-bold mb-4 bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-xl font-semibold mb-2 text-foreground/80">Page not found</h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-center gap-3 pb-8 relative z-10">
          <Button variant="default" size="lg" className="w-full sm:w-auto min-w-[160px] gap-2" asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-w-[160px] gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
