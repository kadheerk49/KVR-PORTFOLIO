# Projects Mobile 3D Carousel & Desktop Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace nested vertical scroll-trapping in the projects section with a native horizontal 3D touch carousel on mobile (`< md`) and a smooth, unconstrained 3D stacking card deck on desktop (`>= md`).

**Architecture:**
- Create `src/components/ProjectCarouselMobile.tsx` dedicated to mobile touch navigation: CSS scroll-snap + touch momentum, active card tracking, progress indicator (`01 / 04`), and floating navigation arrows.
- Update `src/sections/Projects.tsx` to conditionally render `ProjectCarouselMobile` on mobile (`block md:hidden`) and `ScrollStack` on desktop (`hidden md:block`), removing all inner card `overflow-y-auto` constraints.
- Bump cache-bust version in `index.html` to `v12` and deploy to GitHub Pages.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide icons, Vite.

---

### Task 1: Create `src/components/ProjectCarouselMobile.tsx`

**Files:**
- Create: `src/components/ProjectCarouselMobile.tsx`

- [ ] **Step 1: Write `ProjectCarouselMobile.tsx`**
Implement the component with:
- Native horizontal scroll snap container (`snap-x snap-mandatory flex overflow-x-auto no-scrollbar scroll-smooth gap-4 px-4 pb-4`).
- Touch-friendly cards (`w-[88vw] max-w-[380px] shrink-0 snap-center rounded-2xl bg-slate-950/90 border border-white/20 p-5 shadow-2xl`).
- Dynamic card content:
  - Header: Number (`01`, `02`, etc.), status chip (`Ongoing`, `Completed`), and domain tag.
  - Project Title & Gradient Tagline.
  - Description.
  - Key metrics in a clean 2x2 grid.
  - Tech stack tags with `SkillIcon`.
  - Full-width action buttons: Live Project (internal route or external link) and GitHub code link.
- Interactive footer controls:
  - Previous / Next floating circular glass buttons.
  - Pill progress display (`01 / 04`) and animated active dot indicators.
  - Smooth scroll programmatic trigger when tapping dots or arrows.

- [ ] **Step 2: Verify component builds cleanly**
Run `npm run lint` and `npm run build` to verify TypeScript types and syntax.

---

### Task 2: Refactor `src/sections/Projects.tsx`

**Files:**
- Modify: `src/sections/Projects.tsx`

- [ ] **Step 1: Update Projects.tsx layout**
- Import `ProjectCarouselMobile` from `../components/ProjectCarouselMobile`.
- Wrap `ProjectCarouselMobile` in `<div className="block md:hidden">`.
- Wrap `ScrollStack` in `<div className="hidden md:block">`.
- In the desktop card (`ScrollStackItem`), remove `max-h-[calc(100dvh-5rem)] overflow-y-auto no-scrollbar` so desktop cards fit naturally and never trap scrolling.
- Ensure all other sections (`#projects`, `#certifications`, Patents, Certifications, Contact) remain fully functional and linked.

- [ ] **Step 2: Run linter and typecheck**
Run `npm run lint` to verify 0 warnings and 0 errors.

---

### Task 3: Bump Cache-Bust Version in `index.html`

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update cache-bust version**
Change `var V = 'v11';` to `var V = 'v12';`.

- [ ] **Step 2: Run production build**
Run `npm run build` and ensure bundle generated without errors.

---

### Task 4: Deploy and Verify Live

**Files:**
- All modified files

- [ ] **Step 1: Commit and push changes**
Commit with `feat: add mobile 3D touch carousel and unconstrained desktop scroll stack` and push to `origin main`.

- [ ] **Step 2: Watch GitHub Actions deployment**
Watch the deployment workflow run until completion.

- [ ] **Step 3: Verify live deployment**
Confirm production site at `https://kadheerk49.github.io/KVR-PORTFOLIO/` has `v12` bundle loaded, mobile carousel active on small screens, and no vertical scroll trap.
