import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h1 className="text-6xl font-bold text-white">404</h1>
      <p className="text-xl text-zinc-400">Page not found</p>
      <p className="text-sm text-zinc-500 max-w-md text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-4 text-white hover:text-zinc-400 transition-colors underline"
      >
        Go back home
      </Link>
    </div>
  )
}
