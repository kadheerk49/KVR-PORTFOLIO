# Design Specification: Mobile 3D Touch Carousel + Desktop Cinematic 3D Stack

**Date:** 2026-11-03  
**Status:** Approved by User  
**Target:** `src/sections/Projects.tsx`, `src/components/ProjectCarouselMobile.tsx` (new)

---

## 1. Problem Statement & Root Cause
In mobile browsers (such as Brave Mobile, Safari, Chrome), the previous implementation nested a scrollable container (`max-h-[calc(100dvh-5rem)] overflow-y-auto`) inside a sticky vertical scroll stack (`ScrollStack`). When users swiped to scroll down the page, their touches landed on the cards and got trapped in the card's inner scroll container. This caused scroll chaining locks, erratic momentum scroll, and perceived "stuck" page movement.

---

## 2. Proposed Architecture

### A. Mobile View (`< md`, < 768px): Native Touch 3D Carousel
- **Zero Vertical Jamming**: Vertical scrolling down the page is completely native and untrapped. There is NO `overflow-y-auto` or `max-h` constraint inside any card.
- **Horizontal 3D Swipe Carousel**:
  - Implemented using native CSS touch scroll-snap (`snap-x snap-mandatory overflow-x-auto no-scrollbar`) combined with scroll listener / intersection observer to detect the active card.
  - Active card indicator: sleek segmented pill progress (e.g., `01 / 04`) with interactive dots that animate and scroll to card on tap.
  - Quick action controls: left/right floating chevrons for tap navigation.
  - Card anatomy tailored for mobile:
    - Status pill with pulsing indicator (`Ongoing`, `Completed`, `Shipped`).
    - Domain badge and project number.
    - Title and gradient tagline.
    - Concise description.
    - 2x2 grid of key metrics.
    - Stack chip list with SVG icons.
    - Full-width touch-friendly CTA buttons (Live Project & GitHub code).
- **Smooth Peek Effect**: The carousel shows a peek of the next card (`peeking 12-16px` on the edges) so users immediately recognize it is swipeable, accompanied by a subtle "Swipe to explore →" prompt that fades out upon interaction.

### B. Desktop View (`>= md`, >= 768px): Cinematic 3D Sticky Scroll Stack
- Retains the multi-card physical 3D card deck effect via `ScrollStack`.
- **Eliminate Inner Scroll Trap**: Remove `max-h-[calc(100dvh-5rem)] overflow-y-auto` so the desktop cards render naturally at their full height, with sticky top offsets (`85px + index * 20px`) and depth recession scaling (`scale` and `brightness` reduction as subsequent cards slide over).
- Cursor hover spotlight and specular action buttons remain fully interactive.

---

## 3. Component Breakdown

1. **`src/components/ProjectCarouselMobile.tsx` (New Component)**:
   - Encapsulates the mobile touch carousel, scroll-snap container, active index tracking, progress dots, and prev/next buttons.
   - Clean, lightweight, zero runtime bloat, powered by Tailwind and Framer Motion.

2. **`src/sections/Projects.tsx` (Modified)**:
   - Renders `<ProjectCarouselMobile projects={portfolioData.projects} />` inside `<div className="block md:hidden">`.
   - Renders the desktop `<ScrollStack>` inside `<div className="hidden md:block">`.
   - Preserves `#certifications` anchor, Patents section, Certifications section, and Contact section.

3. **`index.html`**:
   - Bump cache-bust version from `v11` to `v12` to ensure mobile browsers instantly fetch the new build.

---

## 4. Verification & Testing Criteria
1. **Zero Inner Scroll**: Verify that no card on either mobile or desktop contains `overflow-y-auto` or trapped vertical scrolling.
2. **Touch Swipe**: On mobile viewports (375px - 430px width), horizontal swipe between cards is smooth, snaps cleanly to each project card, and updates the active progress indicator.
3. **Desktop Deck**: On desktop viewports (>= 768px), cards stack and recess smoothly with scale and brightness transitions during vertical page scroll.
4. **Lint & Build**: `npm run lint` passes with 0 errors/warnings; `npm run build` completes successfully.
5. **Live Deployment**: Git commit, push to `main`, GitHub Actions workflow deployment success, and live validation.
