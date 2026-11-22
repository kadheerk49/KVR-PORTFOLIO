# Design Specification: Modern Glassmorphism Credential Badges for Certifications

**Date:** 2026-11-22  
**Status:** Approved by User  
**Target:** `src/sections/Projects.tsx`, `src/data/portfolio.ts`

---

## 1. Problem Statement
The previous certifications UI used simple stacked full-width button rows that felt flat and out-of-place next to the cinematic projects deck and glowing patent cards. It lacked brand visual identity (e.g., Anthropic Claude, n8n, Python), lacked quick dual-action capabilities (both viewing the PDF and verifying online without opening the modal), and felt understated.

---

## 2. Proposed Design & Architecture

### A. Responsive Grid Layout
- Switch from vertical stacked rows to an adaptive grid:
  - Mobile: 1 column (`grid-cols-1`) with full-bleed touch cards.
  - Desktop: 2 or 3 responsive columns (`lg:grid-cols-3` or `md:grid-cols-2 lg:grid-cols-3`) with consistent heights.

### B. Glassmorphism Credential Card Anatomy
Each certification card includes:
1. **Interactive Glow & Border**:
   - `BorderGlow` or custom cursor-following radial spotlight with subtle brand-colored gradient halos.
   - Ultra-dark frosted glass background (`bg-slate-950/85 backdrop-blur-2xl border border-white/15`).
2. **Branded Header**:
   - **Official Brand Icon**: Custom brand medallion:
     - Anthropic Claude: `SiClaude` in warm terracotta/coral glow (`#D97757`).
     - n8n: `SiN8N` in vibrant crimson-orange glow (`#EA4B71`).
     - VIT Python: `SiPython` in cyber-blue/gold glow (`#38BDF8`).
   - **Status Badge**: Glowing live beacon pill:
     - `Verified Credential` with pulsing green/emerald indicator.
   - **Credential Code Tag**: Monospace badge (e.g. `MCP`, `QS101`, `VAC2006`).
3. **Typography & Details**:
   - Title in crisp white with smooth line height.
   - Issuer and School/Org with subtle bullet separator.
   - Period / Date pill with calendar tag.
4. **Skills & Competencies Chips**:
   - Tags highlighting what the credential validates (e.g. `Model Context Protocol`, `Tool Calling`, `Workflow Automation`, `Webhooks`, `Pandas`, `Data Visualization`).
5. **Dual Quick-Action Bar**:
   - **Primary Action**: "View Certificate PDF" (triggers the modal preview with smooth spring animation).
   - **Secondary Action (when available)**: "Verify Online" with `ExternalLink` (opens official Claude Academy / verification link in new tab).

---

## 3. Data Schema Enhancements in `portfolio.ts`
- Enhance `CertificationItem` to include:
  - `skills?: string[]` (e.g. `['MCP', 'Anthropic API', 'AI Agents', 'Tool Calling']`).
  - `brandColor?: string` (accent glow color).
  - `verifyUrl?: string` (already added for Claude Academy).

---

## 4. Verification & Testing Criteria
1. **Zero Lint Errors**: Run `npm run lint` and verify 0 warnings/errors.
2. **Typecheck & Build**: Run `npm run build` to confirm TypeScript compilation.
3. **Mobile & Desktop Visual Harmony**: Ensure responsive grid looks stunning on both mobile (< 640px) and large desktop screens without horizontal overflow or clipped text.
4. **Interactive Actions**: Verify clicking PDF opens the modal preview, and clicking Verify opens official verification in a new tab.
5. **Deployment**: Push to `origin main` and verify GitHub Actions deployment.
