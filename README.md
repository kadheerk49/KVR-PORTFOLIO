# 👋 KADHEER VEL RAJ N — Interactive Portfolio

> Data Science Creator — Intelligent Automation · n8n AI Workflows · Quantitative Financial Market Systems

**🔗 Live Site: [kadheerk49.github.io/KVR-PORTFOLIO](https://kadheerk49.github.io/KVR-PORTFOLIO/)**

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub_Pages-181717?style=for-the-badge&logo=github&logoColor=white)

---

## ✨ Features

| Section | What's inside |
|---------|---------------|
| 🎬 **Hero** | Giant kinetic headline, floating 3D avatar with ambient glow, cascading-chevron scroll cue |
| 🧭 **Navbar** | Particle-burst active pill (goo shader effect), dock-magnify links, IntersectionObserver scroll-spy, auto-hides on the hero |
| 🧠 **Skills** | Tabbed explorer — 10 categories, 90+ skills, real brand icons (Simple Icons + Lucide) |
| 🛠️ **Services** | Bento card grid with gradient icon tiles and hover glow |
| 👤 **About** | Interactive black-&-white portrait gallery with thumbnail switcher, icon tag pills |
| 💼 **Projects** | GPU-accelerated sticky scroll-stack cards with image galleries |
| ✉️ **Contact** | Two-column layout inside an animated electric border — message form, contact details, social profile pills (GitHub · Reddit · Email · Telegram) |

## 🎨 Design System

- **Custom WebGL effects** — aurora shader background (`ogl`), specular light-tracing buttons with shortest-path angle physics
- **Glassmorphism** — frosted cards, backdrop blur, layered borders on a deep-dark canvas
- **Motion** — Framer Motion springs/staggers everywhere, tuned for `prefers-reduced-motion`

## 🛠️ Tech Stack

- **Framework** — React 19 + TypeScript + Vite
- **Styling** — Tailwind CSS with a custom dark design system
- **Graphics & Motion** — WebGL (`ogl`) · Framer Motion · Canvas 2D
- **Icons** — Lucide + Simple Icons (`react-icons`)
- **Testing** — Vitest (shader-math regression tests)
- **CI/CD** — GitHub Actions → GitHub Pages on every push to `main`

## 📂 Project Structure

```
src/
├── components/     # Aurora, Navbar, SpecularButton, ElectricBorder, SkillIcon…
├── sections/       # Hero, About, Skills, Services, Projects
├── data/           # portfolio.ts — all content lives here (edit-friendly)
└── utils/          # shader math helpers + tests
public/images/      # processed portraits & project artwork
```

## 🚀 Getting Started

```bash
npm install --legacy-peer-deps
npm run dev        # local dev server
npm run build      # production build (tsc + vite)
npm run preview    # preview the production build
```

Pushes to `main` are built and deployed to GitHub Pages automatically.

---

© 2026 **KADHEER VEL RAJ N** — All rights reserved.
