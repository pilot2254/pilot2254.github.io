# Portfolio Project Structure & Setup

## 1. Install Dependencies

```bash
npm install gray-matter react-markdown remark-gfm
npx shadcn@latest add dialog carousel button badge
```

## 2. Update next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
}

module.exports = nextConfig
```

## 3. Create .github/workflows/deploy.yml

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 4. Project Structure

```
portfolio/
├── app/
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/ (shadcn components)
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Education.tsx
│   ├── Projects.tsx
│   ├── Testimonials.tsx
│   └── ThemeToggle.tsx
├── lib/
│   ├── config.ts
│   └── markdown.ts
├── content/
│   └── blog/
│       ├── first-post.md
│       └── second-post.md
└── public/
    └── images/
```

I'll provide all files in the next messages.
