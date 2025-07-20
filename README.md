# Michal Flaška Portfolio

A modern, responsive portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui components. Features a clean design with dark mode support, smooth scrolling navigation, and optimized performance.

## ✨ Features

- **Modern Design**: Clean and professional layout with attention to detail
- **Dark Mode**: Seamless light/dark theme switching with system preference detection
- **Fully Responsive**: Optimized for all devices from mobile to desktop
- **Performance Optimized**: Fast loading with Next.js static generation
- **Smooth Navigation**: Animated scrolling to sections with proper offset handling
- **Component Library**: Built with shadcn/ui for consistent, accessible components
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML
- **Type Safe**: Full TypeScript implementation for better development experience

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Components**: [shadcn/ui](https://ui.shadcn.com/) - High-quality, accessible React components
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful, customizable icons
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Deployment**: [GitHub Pages](https://pages.github.com/) - Static site hosting

## 🚀 Getting Started

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

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx          # Main portfolio page
│   └── not-found.tsx     # Custom 404 page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation component
│   ├── project-card.tsx  # Project showcase card
│   └── theme-provider.tsx # Theme context provider
├── config/               # Configuration files
│   └── site.ts          # Site metadata and settings
├── data/                # Static data
│   ├── projects.ts      # Project information
│   ├── skills.ts        # Skills and expertise
│   ├── services.ts      # Services offered
│   ├── testimonials.ts  # Client testimonials
│   └── experience.ts    # Work experience and education
├── hooks/               # Custom React hooks
├── lib/                # Utility functions
│   ├── utils.ts        # General utilities
│   └── constants.ts    # App constants
└── types/              # TypeScript type definitions
    └── index.ts        # Shared interfaces
```

## 🎨 Customization

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
- **Testimonials**: Client feedback and recommendations
- **Contact**: Contact information and social links

## 🚀 Deployment

The site is configured for GitHub Pages deployment with static export:

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

## 🔧 Development

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

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/pilot2254/pilot2254.github.io/issues).

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide](https://lucide.dev/) for the comprehensive icon set
- [Next.js](https://nextjs.org/) team for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

**Built with ❤️ by [Michal Flaška](https://github.com/pilot2254)**

*This website is open source and available on [GitHub](https://github.com/pilot2254/pilot2254.github.io)*