# My personal website

A modern, responsive portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui components. Features dark mode support, smooth scrolling navigation, high configurability and optimized performance.

## Features

- **Modern Design**: Clean and professional layout with attention to detail
- **Dark Mode**: Seamless light/dark theme switching with system preference detection
- **Fully Responsive**: Optimized for all devices from mobile to desktop
- **Performance Optimized**: Fast loading with Next.js static generation
- **Smooth Navigation**: Animated scrolling to sections with proper offset handling
- **Component Library**: Built with shadcn/ui for consistent, accessible components
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML
- **Type Safe**: Full TypeScript implementation for better development experience
- **Blog System**: Markdown-based blog with static generation and full configurability

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Components**: [shadcn/ui](https://ui.shadcn.com/) - High-quality, accessible React components
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful, customizable icons
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Deployment**: [GitHub Pages](https://pages.github.com/) - Static site hosting

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/pilot2254/pilot2254.github.io.git
   cd pilot2254.github.io
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Customization

### Personal Information

Update your personal details in:

- `src/config/site.ts` - Site metadata, contact info, social links
- `src/data/` - Projects, skills, experience, and testimonials

### Styling

- `src/app/globals.css` - Global styles and CSS custom properties
- `tailwind.config.ts` - Tailwind CSS configuration
- Component-level styling using Tailwind classes

### Content Sections

- **Hero**: Main landing section with introduction
- **About**: Experience, education, and achievements tabs
- **Services**: Professional services offered
- **Skills**: Technical skills organized by category
- **Projects**: Portfolio projects with live demos and source code
- **Blog**: Markdown-based blog posts with full configurability
- **Testimonials**: Client feedback and recommendations
- **Contact**: Contact information and social links

### Blog Posts

Create new blog posts by adding Markdown files to `src/data/blog/`:

```markdown
---
title: "Your Post Title"
description: "Brief description"
date: "2024-01-30"
author: "Your Name"
tags: ["tag1", "tag2"]
featured: true
published: true
---

# Your Content Here

Write your blog post content in Markdown...
```

## Deployment

The site is configured for [GitHub Pages deployment](./.github/workflows/deploy.yml) with static export:

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   - Push to the `main` branch
   - GitHub Actions will automatically build and deploy
   - Site will be available at `https://pilot2254.github.io`

### Manual Deployment

For other hosting providers:

```bash
npm run build
# Upload the 'out' directory to your hosting provider
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Code Quality

- **ESLint**: Code linting with Next.js recommended rules
- **Prettier**: Code formatting for consistency
- **TypeScript**: Type checking for better code quality

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/pilot2254/pilot2254.github.io/issues).

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide](https://lucide.dev/) for the comprehensive icon set
- [Next.js](https://nextjs.org/) team for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- My friend [Maty](https://github.com/maty7253) for help with Nextjs
- AI assistents [Bolt](https://bolt.new/), [v0](https://v0.dev/) & [ChatGPT](https://chat.openai.com/) for fixing bugs and optimizing the website.