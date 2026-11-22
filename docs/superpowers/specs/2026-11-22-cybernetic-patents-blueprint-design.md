# Design Specification: Cybernetic Blueprint & Architectural Schematics for Patents

**Date:** 2026-11-22  
**Status:** Approved by User  
**Target Files:** `src/components/PatentBlueprintCard.tsx`, `src/sections/Projects.tsx`, `src/data/portfolio.ts`

---

## 1. Problem Statement
The current Patents section consists of two standard dark text boxes with BorderGlow. For deep-tech inventions (quantum-classical chiplets on silicon interposers and computer-vision gaze tracking IoT systems), a plain box fails to communicate the engineering weight, intellectual property rigor, and hardware/AI architecture of the inventions.

---

## 2. Design Architecture: Cybernetic Blueprint Schematics

### A. Visual Identity & Materiality
- **CAD Technical Blueprint Aesthetics**:
  - Ultra-dark drafting slate (`#070B12` to `#0B1220`) overlaid with a technical blueprint grid / coordinate axes (`grid-cols-[repeat(auto-fill,minmax(24px,1fr))]`).
  - Blueprint schematic header with official **Indian Patent Office (IPO)** registration badge (`IN202641047700 A` & `IN202641065411 A`), filing status tag (`Published`), and official institution seal (`Vellore Institute of Technology`).
  - Engineering corner alignment ticks (`+` markers at card edges like CAD schematics).

### B. Interactive System Diagram Architecture Nodes
Each patent gets an interactive schematic diagram preview tailored to its technical novelty:
1. **Patent 01: Quantum-Classical Chiplet Architecture**:
   - Visual architectural pipeline:
     `[Classical Host CPU]` ↔ `[Silicon Interposer & Thermal Barrier]` ↔ `[Cryogenic Spectral Veto]` ↔ `[Superconducting QPU]`
   - Technical parameter tags: `Silicon Interposer`, `Cryogenic Control`, `Spectral Noise Veto`, `Qubit Thermal Barrier`.
   - Dynamic schematic accent: Deep Cyan / Quantum Blue (`#00F0FF` / `#38BDF8`).

2. **Patent 02: Adaptive Lighting Computer Vision Focus Detection**:
   - Visual architectural pipeline:
     `[HD Video Sensor]` → `[Facial & Gaze Vectorizer]` → `[ML Cognitive Focus Classifier]` → `[Adaptive IoT LED Controller]`
   - Technical parameter tags: `Gaze Orientation Vector`, `Facial Landmark Mesh`, `Ambient Flux Compensation`, `Closed-Loop IoT PWM`.
   - Dynamic schematic accent: Amber / Cyber Gold (`#F59E0B` / `#FCD34D`).

### C. Technical Metrics & Timeline Blueprint Readout
- Monospace drafting table displaying:
  - **Application No.** & **Publication No.**
  - **Filing Date** & **Publication Date**
  - **Applicant**: Vellore Institute of Technology
  - **Inventor Role**: Co-inventor
- **Action Trigger**:
  - "Inspect Official Patent PDF" with blueprints icon and external viewer modal trigger.

---

## 3. Data Schema Enhancements in `portfolio.ts`
Enrich `PatentItem` with:
- `subsystem`: string (e.g., `Semiconductor Packaging & Quantum Interconnect` / `Computer Vision & Embedded IoT`)
- `schematicSteps`: array of `{ label: string; desc: string; icon: string }`
- `specs`: array of string (key engineering highlights)
- `accentColor`: string (cyan / amber)

---

## 4. Verification Criteria
1. `npm run lint`: 0 warnings, 0 errors.
2. `npm test`: vitest suite passes 100%.
3. `npm run build`: chunk sizes remain under threshold.
4. Live site verified via Lightpanda MCP tool.
