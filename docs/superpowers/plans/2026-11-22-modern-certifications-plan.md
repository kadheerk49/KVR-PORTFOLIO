# Modern Certifications Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the Certifications section UI with modern glassmorphism credential cards, official brand logos (Claude, n8n, Python), live verification beacons, validated skills chips, and dual direct-action buttons.

**Architecture:**
- Extend `CertificationItem` in `src/data/portfolio.ts` with skills tags and brand color accents.
- Update `src/sections/Projects.tsx` with a responsive 3-column card grid, official brand icon rendering (`SiClaude`, `SiN8N`, `SiPython`), glowing interactive border badges, and clean dual-action links.
- Bump cache-bust version in `index.html` to `v18` and deploy.

---

### Task 1: Enhance `portfolio.ts` Certification Items
**Files:**
- Modify: `src/data/portfolio.ts`
- [ ] Add `skills?: string[]` and `brandColor?: string` to `CertificationItem`.
- [ ] Populate skill tags and brand colors for each certificate.

### Task 2: Redesign Certifications Grid in `src/sections/Projects.tsx`
**Files:**
- Modify: `src/sections/Projects.tsx`
- [ ] Import `SiClaude`, `SiN8N`, `SiPython` from `react-icons/si`.
- [ ] Implement the modern Glassmorphic Credential card layout (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`).
- [ ] Add glowing brand medallion, verified status indicator, skills chips, and dual actions.

### Task 3: Quality Check, Lint & Build
- [ ] Run `npm run lint` and `npm run build`.
- [ ] Bump cache-bust version in `index.html` to `v18`.

### Task 4: Commit, Push & Deploy
- [ ] Commit and push to `origin main`.
- [ ] Watch GitHub Actions deployment.
- [ ] Verify live site on GitHub Pages.
