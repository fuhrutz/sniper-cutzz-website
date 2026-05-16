# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Stack

Next.js 16.2.4 · React 19 · TypeScript · Tailwind CSS 4 · Three.js

> **Breaking changes warning (from AGENTS.md):** This Next.js version differs from standard docs. Read `node_modules/next/dist/docs/` before writing Next.js-specific code.

## Commands

```bash
npm run dev     # development server
npm run build   # production build
npm start       # start production server
npm run lint    # ESLint (eslint-config-next, core-web-vitals)
```

## Architecture

Single-page marketing site for Sniper Cutzz barbershop. App Router with:

- `src/app/layout.tsx` + `src/app/page.tsx` — shell and page composition
- `src/components/` — Navbar, Hero3D, Hero, Services, Portfolio, Products, Reviews, Booking, About, Footer, FAB, Cursor
- `src/components/three/` — Three.js scene components: HeroScene, LogoMesh, LogoPlane, ParticleField, ScissorsObject
- `src/lib/context.tsx` — `AppProvider` (global state via React Context: booking modal open, active section, language)
- `src/lib/lenis.tsx` — Lenis smooth scroll setup
- `src/lib/translations.ts` — i18n strings

All interactive and 3D components are `'use client'`. State flows down from `AppProvider`. The hero section uses `Hero3D.tsx` which composes Three.js scene components via `@react-three/fiber` + `@react-three/drei`.

`src-backup-v1/` and `src-backup-20260424/` are manual snapshots — do not edit them.

## Path Aliases

`@/*` maps to `src/*` (configured in `tsconfig.json`).
