# Implementation Plan: Interactive 3D Credential Fan Deck

**Date:** 2026-11-22  
**Target:** Replace simple certifications grid with `CredentialFanDeck` component

---

### Step 1: Create `src/components/CredentialFanDeck.tsx`
- Implement 3D physical card deck with `framer-motion`:
  - 3 luxury cards with authentic metallic detailing (EMV smart chip, security micro-lines, brand logos `SiClaude`, `SiN8N`, `SiPython`, holographic security seal).
  - 3D perspective fan calculations (`rotateZ`, `x`, `y`, `z`, `scale`) for normal, hovered, and selected states.
  - Interactive right-side dossier inspector for the active credential.
  - Mobile touch-adaptive deck with 1-click pill switcher.
  - Full keyboard accessibility and reduced-motion support.

### Step 2: Integrate into `src/sections/Projects.tsx`
- Import `CredentialFanDeck`.
- Replace the existing certifications block with `<CredentialFanDeck certifications={portfolioData.certifications} onOpenCert={(index) => setOpenCert(index)} />`.
- Clean up unused local constants if no longer needed.

### Step 3: Bump Cache-Bust in `index.html`
- Update cache-bust version from `v18` to `v19`.

### Step 4: Verification & Build
- `npm run lint` (0 errors, 0 warnings).
- `npm run build` (confirm successful TypeScript compilation).

### Step 5: Deploy & Live Test
- Commit and push to `origin main`.
- Track GitHub Actions run.
- Verify live site via Lightpanda MCP tool.
