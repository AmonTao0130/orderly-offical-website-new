# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Orderly Network website (orderly.network), exported from Figma via Figma Make and being converted to a production-ready project. The goal is to preserve the exact UI & styling from the Figma design.

Figma source: https://www.figma.com/design/c1AvT6vfKmZeY58SSRhKp8/Orderly-Website-2026

## Commands

- `npm install` — install dependencies
- `npm run dev` — start Vite dev server
- `npm run build` — production build

## Tech Stack

- **React 18** + **TypeScript** with **Vite 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin, configured in `src/styles/`)
- **React Router v7** for routing (`src/app/routes.ts`)
- **Radix UI** primitives + **shadcn/ui** components (`src/app/components/ui/`)
- **Framer Motion** (`motion/react`) for animations
- **MUI** (Material UI) for some icons

## Architecture

### Rendering Approach — ScaledFrame
The site uses a **pixel-perfect scaling** strategy (`ScaledFrame` in `src/app/pages/Home.tsx`). The Figma canvas (1440×6500 desktop, 375px mobile) is rendered at its native pixel dimensions and CSS-transformed (`transform: scale()`) to fit the viewport. This is inherited from Figma Make — the production conversion should move toward responsive layouts.

### Key Layout
- `src/app/pages/Home.tsx` — Main page. Detects viewport size and renders either the desktop `Frame1618872018` or mobile `MobileHomePage` wrapped in `ScaledFrame`.
- `src/app/pages/Root.tsx` — Layout wrapper with `<Outlet />`.
- `src/app/pages/FAQ.tsx` — FAQ page.
- `src/app/routes.ts` — Route definitions: `/` (Home), `/faq` (FAQ).

### Figma-Generated Code
- `src/imports/` — Auto-generated components and SVGs from Figma Make. Files like `Frame1618872018.tsx` (desktop), `Frame1618872068-*.tsx` (mobile variants), `MainContainer-*.tsx`, `HeroSection-*.tsx` are large Figma exports with inline styles and absolute positioning.
- `src/imports/styles.css` — Raw CSS snippets from Figma (not imported as a stylesheet, just reference).
- `src/imports/svg-*.ts` — SVG path data as TypeScript constants.

### Custom / Production Code
- `src/app/components/MobileHomePage.tsx` — Hand-built mobile layout reusing desktop modals (`PartnershipModal`, `BuyOrderModal` from `Frame1618872018`) and shared data.
- `src/app/shared/orderly.ts` — Single source of truth for URLs, nav links, footer nav, social links, and DEX card data. Both desktop and mobile import from here.

### Styling
- **Fonts**: Atyp BL Variable (Adobe Fonts/Typekit) and DM Mono (Google Fonts), loaded in `src/styles/fonts.css`.
- **Font mapping**: `src/styles/theme.css` contains CSS attribute selectors (`[class*="Atyp_BL:Bold"]`) that remap Figma's weight-specific family names to the variable font with correct `font-variation-settings`. This is critical for visual fidelity.
- **Theme tokens**: CSS custom properties in `src/styles/theme.css` following shadcn/ui conventions (light + dark mode).
- **Tailwind config**: `src/styles/tailwind.css` uses Tailwind v4's `@import 'tailwindcss' source(none)` with `@source` directive.

### Path Alias
`@` maps to `./src` (configured in `vite.config.ts`).

## Important Conventions

- Shared data (URLs, nav items, footer sections) lives in `src/app/shared/orderly.ts` — never duplicate these values.
- Desktop modals (`PartnershipModal`, `BuyOrderModal`) are exported from `src/imports/Frame1618872018.tsx` and reused on mobile.
- SVG assets in `src/imports/` are included via Vite's raw import (`assetsInclude` in vite config), not as React components (except some like `CamelotLogo.tsx`).
- React and React DOM are **peer dependencies** (not direct deps) — the consuming environment must provide them.
