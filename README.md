# Portfolio

Minimal portfolio built with Next.js, optimized for GitHub Pages.

## Setup

```bash
npm install
npm run dev
```

## Configuration

### Site Settings
Edit `config/site.ts`

### Projects
Edit `config/projects.ts` to add your projects

### About Page
Edit `app/about/page.tsx` to update your bio.

## Content

### Blog Posts
Create markdown files in `content/blog/`:

```markdown
---
title: "Post Title"
date: "2024-12-20"
description: "Post description"
---

Your content here...
```

### Images
- Profile: `public/images/profile/avatar.jpg`
- Blog: `public/images/blog/`
- Projects: `public/images/projects/`

## Deployment

### GitHub Pages

1. Build:
```bash
npm run build
```

2. Push to GitHub:
```bash
git add .
git commit -m "Deploy"
git push
```

3. Enable GitHub Pages:
   - Go to repo Settings > Pages
   - Source: GitHub Actions
   - The workflow will deploy automatically

### Custom Domain (Optional)
Add `CNAME` file to `public/` with your domain.

## Project Structure

```
├── app/
│   ├── about/          # About page
│   ├── blog/[slug]/    # Blog post pages
│   ├── projects/       # Projects page
│   └── page.tsx        # Home (blog list)
├── components/         # React components
├── config/            
│   ├── site.ts         # Site configuration
│   └── projects.ts     # Projects data
├── content/blog/       # Blog posts (.md files)
├── lib/                # Utilities
└── public/images/      # Static images
```

## Commands

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Tech Stack

- Next.js 15 (static export)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Geist fonts
- react-markdown
