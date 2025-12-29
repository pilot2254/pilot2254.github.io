# TODO

## Critical Fixes

- [ ] Fix scroll restoration on page navigation (currently stays scrolled when going back)
- [ ] Add proper meta tags (OpenGraph/Twitter cards are incomplete)
- [ ] Create sitemap.xml for better SEO/indexing
- [ ] Fix code block spacing/overlap on mobile
- [ ] Add robots.txt file
- [ ] Add favicon (currently using Next.js defaults)

## SEO & Performance

- [ ] Add canonical URLs to all pages
- [ ] Optimize images before deployment (use sharp or similar)
- [ ] Consider adding dates to blog post URLs (e.g., `/blog/2025-12-23-post-name`)
- [ ] Add missing fields to siteConfig (ogImage, email)
- [ ] Update GitHub workflow to include image optimization and sitemap generation

## Mobile Issues

- [ ] Fix project modal images overflowing on small screens
- [ ] Fix code blocks scrolling horizontally forever (add max-width or better line breaking)
- [ ] Add more padding/spacing to navigation links on mobile

## Features Worth Adding

- [ ] RSS feed for blog
- [ ] Simple client-side search (Fuse.js or just basic filter)
- [ ] Related posts section at bottom of blog posts (2-3 posts based on tags/date)
- [ ] GitHub-style callouts/alerts for blog posts (`> [!NOTE]` syntax)

## Content Improvements

- [ ] Rewrite About page - add what i'm currently building, why people should care, best projects
- [ ] Write "How I reverse engineered [specific game]" post with code/screenshots
- [ ] Write "My first Unity vs Unreal project comparison" post
- [ ] Write "Breaking down a simple crackme step-by-step" post (the video I mentioned)
- [ ] Delete the Boiled Water bullshit - either list it publicly or delete it (currently wasted in /unlisted)
- [ ] Write more blog posts in general - this is more important than technical features
- [x] Syntax highlighting (you have react-syntax-highlighter with oneDark theme)
- [x] LaTeX math support

## Things I won't add (waste of time and resources)

- [ ] ~~Task list checkboxes~~ - Blog posts don't need this
- [ ] ~~Mermaid diagrams~~ - I won't actually use this for my content
- [ ] ~~Collapsible sections~~ - Unnecessary for my blog style
- [ ] ~~Comments section~~ - Won't moderate it, spam will destroy it
- [ ] ~~Newsletter signup~~ - I'm not writing a newsletter
- [ ] ~~Social share buttons~~ - Nobody uses these anymore
- [ ] ~~Heavy analytics~~ - Keep it simple with what GitHub Pages offers

## Priority Order

1. Fix scroll restoration (most annoying UX issue)
2. Add sitemap.xml and robots.txt (easy SEO wins)
3. Fix mobile issues (project modals, code blocks, navigation)
4. Add callouts for blog posts (actually useful for technical writing)
5. Write more content (more valuable than any technical feature)
6. Everything else when I have time
