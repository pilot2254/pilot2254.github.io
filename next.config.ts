import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: "export",

  // Disable image optimization since GitHub Pages doesn't support it
  images: {
    unoptimized: true,
  },

  // Since your repo is pilot2254.github.io, no basePath is needed
  // The site will be served directly at pilot2254.github.io

  // Ensure trailing slashes are handled consistently
  trailingSlash: true,

  // Disable server-side features that don't work with static export
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Optimize for static export
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },

  // Compress output
  compress: true,

  // Generate sitemap and robots.txt for better SEO
  generateBuildId: async () => {
    return "build"
  },
}

export default nextConfig