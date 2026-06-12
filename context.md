# Clix — project context

Premium, cinematic marketing site for an AI implementation agency. RTL Hebrew. This doc captures the current state so anyone (human or AI) can pick up quickly.

## Stack
- **Next.js 16.2.6** (App Router, Turbopack) · **TypeScript** · **Tailwind v4**
- **Framer Motion**, **GSAP** (animation) · **three.js** + **@react-three/fiber** + **drei** (3D)
- **Lenis** smooth scroll (`src/components/ui/smooth-scroll.tsx`, wraps the app in `layout.tsx`)
- Live palette is **blue/navy** (not the warm-purple in CLAUDE.md): `--accent #3B7BF5`, `--bg #F7F9FC`, `--ink-warm #0F1A2E` (see `src/app/globals.css`).

## Repos / git
- `origin` → `github.com/okimchi123/clix-website-main`
- `clix-info` → `github.com/TheSuperShyy/clix-info` (public; **local `main` tracks this one**)
- Home hero shipped via **PR #1**, merged to `main` (commit `8ca3bb9`). `VideoHero.tsx` is kept untouched (revert = one-line swap in `page.tsx`).

## Dev
- `npm run dev` (currently on **http://localhost:3000**; falls back to 3001 if 3000 is busy).
- `/clix-logo.png` (in `public/`) is the brand mark; the particle systems sample its **leftmost square** (the mark, not the wordmark).

## Home hero (LIVE) — `src/components/three/ParticleLogo.tsx` + `ParticleHero.tsx`
A GPU-driven particle field that forms the **Clix mark**.
- **GPU vertex shader** does all per-particle motion (no per-frame JS loop / buffer upload).
- Assembles on load, **scroll-driven build** (formed/centred at ~40% scroll coverage), idle build/scatter cycle, **free drag-orbit** w/ inertia, bright on-theme blue palette.
- **Sticky-pinned** so the page content (`page.tsx` `<div className="relative z-10 bg-background">`) slides up over it.
- Lazy-loaded (`ssr:false`), **reduced-motion** static fallback, **mobile tier** (fewer particles, lower DPR, smaller mark, touch = scroll).

## Lab (EXPERIMENT) — `/lab` route, `src/components/three/ParticleLogoLab.tsx` + `ParticleHeroLab.tsx`
Separate, noindex test page so the live hero stays untouched while iterating. Current behavior:
- **Intro:** super-compressed dot at center → expands into the logo (`REVEAL` 1.5s), held centred, then a **looping "clock tumble"**: center → 11 → 3 → 5 → 8 o'clock → center → … Each direction is a **dramatic ~0.1s snap** with a long hold (`CLOCK_STEP` 2.5s, `CLOCK_A` ~1.0 ≈ 57° tilt).
- **Shapes** morph: **logo → donut → diamond → triangle → logo** (`STAGE` 22s, `HOLD` 6s — super slow).
  - Shapes are **hollow + thin in-plane but thick in Z**: thin outline from the front, real **volume** when rotated. Donut = a cylinder ring-wall; square is tilted 45° (**diamond**); edges bow slightly **inward**.
  - **Logo is the exception** — full readable mark with **wide Z volume**.
- **Color:** ONE color for all particles, **cycling every 10s** (`COLOR_EVERY`) through 8 vivid hues (hold + crossfade).
- **Float** (gentle X/Y bob), **heavy/smooth drag-orbit**, **scroll down → morphs to the Clix logo** and settles front-facing.
- Sizes (desktop): `WORLD` 25 (logo), donut `R` 9.6, diamond `H` 10.2, triangle `Rt` 12.2, `DEPTH` 4.4, `WALL` 0.45.
- **Status:** uncommitted, still iterating; not yet promoted to the home hero.

## Performance work (done)
- Hero: GPU shader, DPR cap (≤1.5 desktop / 1.25 mobile), **pause when scrolled off-screen**.
- `src/components/three/Scene.tsx`: **viewport-gates** all 3D scenes (unmounts off-screen canvases — frees WebGL contexts; big mobile win).
- `src/components/IntegrationsSection.tsx` ("stack" collage): float loops gated to in-view; dropped redundant per-card `blur()` filters.
- Fixed a per-frame `StreamRibbon.tsx` `getPointAt` exception (was throwing every frame on the Process/CTA canvases).

## Conventions / preferences
- **For big changes: build on a `/lab` test page first, and ask before doing so.** Keep the live/main components unchanged until approved. (Also stored in project memory.)
- All site copy is Hebrew/RTL. Dark sections use `--ink-warm`, never pure black per CLAUDE.md (the particle hero is the intentional exception — pure black stage).

## Key files
| Area | Files |
|---|---|
| Live hero | `src/components/ParticleHero.tsx`, `src/components/three/ParticleLogo.tsx` |
| Lab hero | `src/app/lab/page.tsx`, `src/components/ParticleHeroLab.tsx`, `src/components/three/ParticleLogoLab.tsx` |
| Smooth scroll | `src/components/ui/smooth-scroll.tsx` |
| Page / layout | `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css` |
| 3D scene router | `src/components/three/Scene.tsx` |
| Design doc | `hero-planning.md` |
