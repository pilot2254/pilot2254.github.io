import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="text-xl text-muted-foreground">Page not found</p>
      <p className="text-sm text-muted-foreground max-w-md text-center">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-4 text-foreground hover:text-muted-foreground transition-colors underline"
      >
        Go back home
      </Link>
    </div>
  )
}
