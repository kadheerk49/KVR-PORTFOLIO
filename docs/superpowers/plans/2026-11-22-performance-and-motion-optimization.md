# Performance, Bundle Trimming, and Motion Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimize bundle size below 500 kB through code-splitting/lazy-loading and optimize Framer Motion animations for 60/120Hz ProMotion displays without breaking any visual effects or interactions.

**Architecture:**
1. Extract the heavy PDF viewer modal components (`PatentViewerModal.tsx` & `CertViewerModal.tsx`) and lazy load them via `React.lazy` and `Suspense`, so PDF iframes and modal chrome are fetched only when the user clicks "View PDF".
2. Configure Rollup `manualChunks` in `vite.config.ts` to cleanly partition vendor code into vendor-react, vendor-motion, vendor-ogl, and vendor-icons chunks, ensuring no single JS file exceeds 200 kB.
3. Audit Framer Motion throughout the portfolio for high refresh rate optimization:
   - Ensure hardware acceleration on animating elements (`transform`, `opacity`, `will-change`).
   - Replace unnecessary full re-renders with transform-only animations.
   - Retain full `<MotionConfig reducedMotion="user">` accessibility.

**Tech Stack:** React 19, Vite 8, Framer Motion, TypeScript, Tailwind CSS

---

### Task 1: Code-split PDF Viewer Modals
**Files:**
- Create: `src/components/PdfViewerModal.tsx`
- Modify: `src/sections/Projects.tsx`

- [ ] **Step 1: Create standalone `PdfViewerModal.tsx`**
Create clean modal component for viewing patent and certification PDFs.

- [ ] **Step 2: Lazy-load modal in `src/sections/Projects.tsx`**
Import `PdfViewerModal` with `React.lazy()` and wrap in `<Suspense>`.

- [ ] **Step 3: Run lint & build to verify zero errors**
Run: `npm run lint && npm run build`
Expected: PASS

---

### Task 2: Configure Rollup `manualChunks` in `vite.config.ts`
**Files:**
- Modify: `vite.config.ts`

- [ ] **Step 1: Add chunk splitting rules**
Split `framer-motion`, `ogl`, `react-icons`/`lucide-react`, and `react`/`react-dom`.

- [ ] **Step 2: Verify chunk sizes**
Run: `npm run build`
Expected: ALL chunks < 200 kB (no chunk > 500 kB warning).

---

### Task 3: Motion & GPU Optimization Audit
**Files:**
- Modify: `src/components/CredentialFanDeck.tsx`
- Modify: `src/components/CardSwap.tsx`
- Modify: `src/components/BorderGlow.tsx`

- [ ] **Step 1: Audit and tune spring damping & hardware acceleration**
Ensure `will-change: transform` and transform-only transitions on 3D card tilt and fan deck.

- [ ] **Step 2: Verify tests and lint**
Run: `npm test && npm run lint && npm run build`
Expected: ALL PASS with 0 warnings.

---

### Task 4: Deploy & Live Production Verification
- [ ] **Step 1: Bump cache-bust version in `index.html`**
- [ ] **Step 2: Commit and push to `origin main`**
- [ ] **Step 3: Verify live site using Lightpanda**
