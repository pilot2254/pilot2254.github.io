# Modern Portfolio Website

A sleek, responsive portfolio website built with Next.js 14, Tailwind CSS, and shadcn/ui components. Features a modern design with dark mode support, smooth scrolling, and optimized performance.

![Portfolio Preview](/public/screenshot1.png)
![Portfolio Preview2](/public/screenshot2.png)

## ✨ Features

- 🎨 Modern and clean design
- 🌓 Dark mode support
- 📱 Fully responsive layout
- 🚀 Fast page loads with Next.js 14
- 🎯 Smooth scrolling to sections
- 💅 Styled with Tailwind CSS
- 🧩 Reusable shadcn/ui components
- 🎭 Custom 404 page
- 🔍 SEO optimized

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/RedFox-Studios/skyro-portfolio.git
```

2. Navigate to the project directory:
```bash
cd skyro-portfolio
```

3. Install the dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Project Structure

```
skyro-portfolio/
├── public/
│   └── ...
├── README.md
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ...
│   │   └── ui/
│   │       ├── ...
│   ├── hooks/
│   │   ├── ...
│   └── lib/
│       └── ...
├── .gitignore
├── tailwind.config.ts
├── tsconfig.json
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
└── postcss.config.mjs
```

## 📝 Usage

### Components

The project includes several reusable components:

- `Navbar`: Responsive navigation with mobile menu
- `ProjectCard`: Card component for showcasing projects
- `ThemeProvider`: Handles dark/light mode switching
- `shadcn/ui`: All of shadcn/ui components

### Build

To build your application run one of these commands:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## 🚀 Deployment

The easiest way to deploy your portfolio is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/yourusername/portfolio/issues).

## 👏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Lucide](https://lucide.dev/) for the icons
- [Next.js](https://nextjs.org/) team for the amazing framework

---

Made with ❤️ by Michal Flaška & RedFox Studios