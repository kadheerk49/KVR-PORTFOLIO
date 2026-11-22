# Design Specification: Interactive 3D Credential Fan Deck for Certifications

**Date:** 2026-11-22  
**Status:** Approved by User  
**Target Files:** `src/components/CredentialFanDeck.tsx`, `src/sections/Projects.tsx`, `index.html`

---

## 1. Problem Statement & Anti-Slop Directive
The previous 3-column equal grid layout was deemed "too simple and AI slop" because it mirrored generic boilerplate templates (equal boxes, generic tags, flat arrangement).

The new design implements a physical **Interactive 3D Credential Fan Deck** — an elite executive pass / security credential deck inspired by high-end physical cards (Apple Wallet, metallic developer passes, holographic security cards).

---

## 2. Visual & Interaction Architecture

### A. Desktop Experience (Interactive 3D Perspective Stage)
- **Asymmetric Split Layout**:
  - **Left (3D Fan Deck Stage)**:
    - 3 physical matte carbon & metallic cards sitting in a 3D perspective viewport (`perspective: 1200px`).
    - At rest, cards are angled in a natural physical fanned deck:
      - Card 0 (Claude MCP): `-10deg` rotation, shifted left.
      - Card 1 (n8n QS101): `0deg` rotation, centered, elevated.
      - Card 2 (VIT Python): `+10deg` rotation, shifted right.
    - When hovered or active:
      - Deck expands horizontally, revealing all three credential cards in parallel.
      - The active card lifts forward in 3D (`translateZ(60px)`, `scale(1.05)`, `rotateZ(0deg)`, glowing metallic border).
      - Card anatomy:
        - Matte black obsidian surface with brushed radial highlight.
        - Gold/platinum EMV smart chip simulation with circuit lines.
        - High-contrast official brand emblem (`SiClaude`, `SiN8N`, `SiPython`).
        - Monospace laser-etched security serial and registration code.
        - Iridescent holographic authenticity seal.
  - **Right (Active Credential Dossier & Inspector)**:
    - Real-time synchronised telemetry panel for the active credential.
    - Live verified status beacon with pulsing indicator.
    - Prominent typographic title, issuer, issuing school, and completion period.
    - Validated competency pills.
    - High-craft action triggers:
      - Primary action: "View Certificate PDF" (opens modal viewer).
      - Secondary action: "Verify Badge ↗" (when official `verifyUrl` is present).
    - Quick-switch selector pills for fast 1-click selection (`[01 Claude MCP] [02 n8n QS101] [03 VIT Python]`).

### B. Mobile Experience (Tactile Touch Deck)
- Responsive mobile stage with horizontal snap carousel / 1-tap deck switcher:
  - Cards render as full tactile luxury passes without awkward vertical scroll obstruction.
  - Quick-switch pill navigation allows immediate switching between credentials.
  - Direct touch targets for "View PDF" and "Verify".

---

## 3. Verification Criteria
1. `npm run lint`: 0 warnings, 0 errors.
2. `npm run build`: successful Vite compile and typecheck.
3. Responsive check on both mobile (< 640px) and desktop.
4. Git commit and push to `origin main`, followed by live GitHub Pages verification via Lightpanda.
