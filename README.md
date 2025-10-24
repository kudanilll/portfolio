# Hi 👋 Welcome to My Digital Playground!

![Portfolio Preview](https://github.com/kudanilll/portfolio/blob/master/public/assets/images/og.webp)

<p align="left">
  <a href="https://nextjs.org/"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?logo=next.js"></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white"></a>
  <a href="https://greensock.com/gsap/"><img alt="GSAP" src="https://img.shields.io/badge/GSAP-3.x-88CE02?logo=greensock&logoColor=white"></a>
  <a href="https://www.framer.com/motion/"><img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-11.x-0055FF?logo=framer&logoColor=white"></a>
</p>

## 🚀 About This Portfolio

This is my personal portfolio built with **Next.js 15**. It’s a living space for my work, ideas, and experiments.
All motion is handcrafted with **GSAP** and **Framer Motion** for smooth micro-interactions and delightful transitions.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Animations**: GSAP (scroll/parallax/timelines), Framer Motion (mount/unmount, gestures, layout)
- **Deploy**: Vercel

## ▶️ Getting Started

> **Requirements:** Node.js 18.18+ or 20+, and your favorite package manager (npm/pnpm/yarn/bun).

```bash
# 1) Install deps
npm install

# 2) Start dev server
npm dev

# 3) Build & preview
npm build
npm start
```

> Common scripts you might find:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## 🧩 Motion Notes (GSAP × Framer Motion)

- Use GSAP for scroll/parallax/timeline-dense animations and Framer Motion for mount/unmount transitions, gestures, and layout.

- Avoid double-owning transforms on the same element. If GSAP controls transform, let Framer Motion handle opacity/clipPath (or wrap the element).

- Add will-change only where needed; clear on animation end to avoid raster cache bloat.

- Respect users with prefers-reduced-motion and offer non-animated fallbacks.

## 🤝 Feedback & Contributions

Your input is valuable!

- Found a bug or have an idea? [Open an issue](https://github.com/kudanilll/your-repo/issues)

- PRs are welcome — please keep commits clear (Conventional Commits preferred)

## 📞 Get In Touch

Want to collaborate or just say hi? I'm always open to interesting conversations!

- **Email**: <achmad24daniel@gmail.com>

- **LinkedIn**: [Achmad Daniel](https://www.linkedin.com/in/achmad-daniel-syahputra-72a241268/)

## ☕ Support

If you find value in my projects, consider [buying me a coffee](https://www.buymeacoffee.com/kudanil)! Your support fuels my passion and helps me continue creating.

Made with ❤️ and ☕ by Achmad Daniel
