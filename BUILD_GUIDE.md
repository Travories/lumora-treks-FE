# Lumora Treks — Build Guide (read this first)

Authoritative guide for building this frontend from Figma. A fresh session should be able to build **any page from a Figma link** using only this file. Auto-loaded via `CLAUDE.md` (`@BUILD_GUIDE.md`).

> The **reusable, project-agnostic** version of the Figma→code method lives in `FIGMA_TO_CODE.md` (repo) and the portable **`figma-to-code` skill** (`~/.claude/skills/`). This file = the Lumora-specific facts (tokens, registry, node ids, routes).

## What this repo is
- **Frontend only** — Next.js 16 (App Router) + TypeScript + Tailwind v4, app at the **repo root** (not `frontend/`).
- **CMS = Django + Wagtail in a SEPARATE repo.** Never scaffold/plan the backend here; this frontend only consumes the Wagtail API (block-based StreamField; every block also gets a React block + `block-registry` entry when we wire it — not yet built).
- **Figma is the single source of truth.** Build **pixel-by-pixel** to exact Figma values (spacing, sizes, colors, fonts, tracking).

## Figma
- File key: **`wQqFmHdPd7V19J9OCypUHI`** (file "tumora-treks"). Pages: `34:781` lumora (main), `0:1` inspirations, `59:1992` components.
- Known frames: landing `34:921`; below-hero container `59:1713`; packages page `81:473`. Component node ids are recorded per-component in the registry below and in `PACKAGES_PAGE_PLAN.md`.

## How to build a page/section from a Figma link (workflow)
1. **Load the skill** `figma-design-to-code` (Skill tool) BEFORE any Figma read tool.
2. **`get_design_context({ nodeId, fileKey, skillNames:"figma-design-to-code" })`** — returns reference React/Tailwind + screenshot + tokens. Treat as REFERENCE; adapt to this stack. For very large pages it returns the full structure (may truncate raw code) — still enough to get child node ids.
3. If the output says **"contains animated nodes"** → **`get_motion_context({ nodeId, fileKey, recursive:true })`**. The top frame is usually empty; child nodes hold the keyframes/easing.
4. **Access layers** yourself with **`get_metadata({ nodeId, fileKey })`** (layer tree: ids, names, types, sizes). Quirk: the frame currently *selected* in the Figma app returns shallow — drill via a child id or `get_design_context` instead. You do NOT need the user to list layers.
5. **Reuse first** (see registry). Only build new when nothing fits. Keep it **modular** (`ui/` primitives, `sections/` sections, `layout/` chrome).
6. **Images:** download ONLY real imagery to `public/images/` (`curl` the asset URL; they're valid ~7 days). Icons/dots/arrows/small decor → Iconify/CSS, never downloaded. (Figma serves JPEG bytes even for `.png` names — Next `<Image>` decodes by content, so it's fine.)
7. **Verify:** `npx next build` (from repo root) after each section; keep tsc + lint clean.
8. Update this file's **registry** + the page's plan when you add a reusable component.

## Stack & conventions
- **Tailwind v4** — design tokens live in `src/app/globals.css` `@theme` (NOT a JS config). Add tokens there.
- **Motion:** `framer-motion`. Reproduce Figma motion faithfully, BUT: Figma boomerang/`repeat` loops → implement as **play-once on load**; long timelines (e.g. 4s) → **compress to a snappy ~0.8–1.5s**. Where Figma has no motion, add subtle **`whileInView` fade-up** reveals (`initial opacity:0,y:24 → whileInView opacity:1,y:0`, `viewport once`). Motion/hook components need `"use client"`.
- **Icons:** Iconify (`@iconify/react`) using the exact glyph names Figma references (`proicons:location`, `iconoir:calendar`, `mingcute:search-line`, `ic:round-star`, `iconoir:nav-arrow-*`, `iconoir:arrow-up-right`, `mdi:facebook/instagram/whatsapp`, `prime:twitter`). Lucide (`lucide-react`) is the fallback — not yet installed; add if needed.
- **Data:** Redux Toolkit + **RTK Query** (`src/store/`, `src/features/*Api.ts`) + **zustand** (`src/store/useUIStore.ts`, e.g. `isMobileNavOpen`). `packagesApi` returns dummy data — the seam for Travories SDK / Wagtail. (Plan's "native fetch in server components" is superseded by RTK Query.)
- **Structure:** `src/app/<route>/page.tsx` routes · `src/components/layout` (Navbar, Footer) · `src/components/sections` (one file per section) · `src/components/ui` (reusable primitives).

## Design tokens (globals.css @theme — match Figma exactly)
| Figma hex | Token / usage |
|---|---|
| `#1e1e1e` | `text-foreground`, `bg-foreground` (dark) |
| `#f5f5f5` | `bg-background`, `text-background` |
| `#e0e4e8` | `border` |
| `#47586e` | `text-text-secondary` |
| `#39ff14` | `text/bg-primary-accent` (neon CTA green) |
| `#909dad`, `#3d4c5e`, `#ebffe8`, `#c2ffb6` | inline for now (tokenize `#909dad` → `--color-text-faint` in cleanup) |

**Fonts** (`next/font` in `layout.tsx`): Plus Jakarta Sans = `font-sans` (default) · Poppins = `font-body-alt` · Pattaya = `font-script`. Tracking is negative — use exact `tracking-[…]` (≈ -0.04em body, -0.06em headings) where it matters.

## Reusable components registry
Reuse these before building anything new. Update this table whenever a new reusable component is added.

### Layout (`src/components/layout/`)
| Component | Figma | Purpose / notes |
|---|---|---|
| `Navbar` | 69:873 | Floating nav (absolute over hero); active route via `usePathname` (green dot); mobile menu via `useUIStore`. Reused on every page. |
| `Footer` | 73:464 | Forest bg + logo/tagline/socials + links + "Lumora Treks" watermark that rises on scroll. Reused on every page. |

### UI primitives (`src/components/ui/`)
| Component | Purpose | Key props |
|---|---|---|
| `PackageCard` | Image + white info box (title, desc, `$/Days/★rating` badges) | `image, title, description, price, duration, rating` |
| `DestinationCard` | Image + bottom gradient + title/arrow + "Starting from $X" | `image, title, price?, className?` |
| `CarouselNav` | Prev (`bg-background`) / next (`bg-primary-accent`) circular arrows | `onPrev?, onNext?, className?` |
| `SearchBar` | Location + Date fields + neon search button (shared by landing + packages hero) | `className?` |
| `FilterTabs` | Pill tabs, active = dark; presentational | `tabs, defaultTab?, onChange?, className?` |
| `Pagination` | `‹ 1 2 3 ›`; presentational | `pages?, className?` |
| `StarRating` | Row of `ic:round-star` glyphs, `rating` of `max` filled (dark filled / light-gray empty) | `rating, max?, starSize?, className?, filledClass?, emptyClass?` |
| `ReviewCard` | Avatar + name/time + `StarRating` + text + "View reply"/"No reply yet" | `name, avatar, timeAgo, rating, text, reply?` |

### Sections (`src/components/sections/`)
- **Landing:** `Hero` (104:1763, uses `SearchBar`) · `IntroStats` (49:561) · `PopularPackages` (84:938) · `ExperienceSection` (49:449) · `WhyChooseUs` (83:919, "Why Lumora Treks?") · `DestinationsBento` (34:1417) · `AuthenticExperiences` (63:399) · `CTABand` (59:2049, "Create memories" — bg/foreground layering like the hero) · `FAQSection` (49:654, interactive accordion).
- **Shared:** `PageHero` (reusable puzzle-image + heading + subtitle + `SearchBar` hero; props `title, image, imageAlt?, imageWidth?, imageHeight?, subtitle?`) — used by Packages & Destinations pages.
- **Packages:** `PackagesHero` (118:5899 — thin preset of `PageHero`) · `PopularPackagesGrid` (83:656, `FilterTabs` + 6 `PackageCard` + `Pagination`) · `CulturalDayTours` (84:1278, 3 `PackageCard`). Reuses `IntroStats` verbatim.
- **Destinations:** `DestinationsGrid` (84:1575, `FilterTabs` + 3 `DestinationCard`). Reuses `PageHero`, `IntroStats`, `ExperienceSection`.
- **Contact:** `ContactHero` (75:646, editorial typographic block + puzzle image) · `ContactForm` (75:690, contact info + "Leave your message" form, presentational submit). Reuses `WhyChooseUs`, `AuthenticExperiences` (with new `reversed` prop → image on right), `FAQSection`.
- **Checkout:** `Checkout` (118:4743 layout / **118:5161 "PaymentFlow"** — interactive stepped accordion: Your Information → Payment Method → Payment Amount, each Done collapses to a summary w/ Change; agreement enables "Continue & pay $X" → /checkout/success; right = order summary; reuses `StarRating`; Fonepay icon `fonepay.png`) · `PaymentSuccess` (118:4814, "booking confirmed" success state + booking summary card).
- **Package detail:** `PackageDetail` (150:10819 — overview+key facts · 2+3 gallery · things included · booking card · itinerary day-tabs + map · reviews breakdown + `ReviewCard`). Own layout, NOT the destination detail.
- **Destination detail:** `DestinationDetail` (141:3123 — breadcrumb + header w/ `StarRating` · overview + 7-image gallery · hours + sticky booking card · reviews w/ breakdown bars + `ReviewCard` list). Reuses `CulturalDayTours` verbatim below it.

## Pages
- **Landing** `src/app/page.tsx` — order: Navbar(float) → Hero → IntroStats → PopularPackages → ExperienceSection → WhyChooseUs → DestinationsBento → AuthenticExperiences → **CTABand** (59:2049) → FAQSection → Footer. COMPLETE.
- **Packages** `src/app/packages/page.tsx` (`/packages`) — BUILT. Navbar (in-flow, not floating — hero is on white) → PackagesHero → PopularPackagesGrid → IntroStats(reuse) → CulturalDayTours → Footer. See `PACKAGES_PAGE_PLAN.md`.
- **Destination detail** `src/app/destinations/[slug]/page.tsx` (`/destinations/[slug]`) — BUILT (Figma 141:3109). Navbar (in-flow) → DestinationDetail → CulturalDayTours(reuse) → Footer. Content dummy (Kathmandu Durbar Square); the seam for Wagtail/Travories.
- **Package detail** `src/app/packages/[id]/page.tsx` (`/packages/[id]`) — BUILT with its OWN design (Figma **150:10819** `PackageDetail`): header+rating, Overview+Key Facts, 2+3 gallery, Things Included + booking card (Reserve Now → `/checkout`), Itinerary (day tabs + map `pkgd-map.png`), Reviews (breakdown bars + `ReviewCard`). Distinct from `DestinationDetail` (which `/destinations/[slug]` still uses). Reuses `StarRating`, `ReviewCard`, `kds-*.png`.
- **Enquiry** `src/app/enquiry/page.tsx` (`/enquiry`) — BUILT (no Figma; ContactForm/Checkout design language). `PackageEnquiry` section = no-payment enquiry form + summary + inline success. Reached from the generic navbar + CTA-band "Reserve Now". (Package detail's "Reserve Now" → `/checkout` instead.)
- **Destinations listing** `src/app/destinations/page.tsx` (`/destinations`) — BUILT (Figma 84:1535). Navbar(in-flow) → PageHero("Our Destinations") → DestinationsGrid → IntroStats(reuse) → ExperienceSection(reuse) → Footer.
- **CMS demo** `src/app/cms/[slug]/page.tsx` (`/cms/home`) — Wagtail block pipeline on mock data: `lib/cms.ts` (server `getPage`) → `lib/block-registry.ts` (block `type`→section) → `components/BlockRenderer.tsx`. Swap `getPage` for Wagtail API v2 in Phase C. See `INTEGRATION_PLAN.md`.
- **Checkout / payment** `src/app/checkout/page.tsx` (`/checkout`) — BUILT (Figma 118:4743). Navbar(in-flow) → Checkout → Footer. Reached from a package's Reserve Now; presentational form. Route could nest under `/packages/[id]/checkout` later.
- **Payment success** `src/app/checkout/success/page.tsx` (`/checkout/success`) — BUILT (Figma 118:4814). Navbar → PaymentSuccess → Footer. Reuses `checkout-thumb.png` (no new image).
- **Contact** `src/app/contact/page.tsx` (`/contact`) — BUILT (Figma 75:144). Navbar(in-flow) → ContactHero → ContactForm → WhyChooseUs(reuse) → AuthenticExperiences(reuse, `reversed`) → FAQSection(reuse) → Footer. New image `public/images/contact-hero.png`.

## Known Figma copy placeholders / typos (kept faithful unless told otherwise)
Lorem-ipsum + `$400`/`4 Days`/`4.9` on cards · "Cured Destinations" (likely "Curated") · "Journeyfinder" (should be Lumora) · "with with" double word (Experience heading).

## Related docs
`PLAN.md` (overview) · `FRONTEND_PLAN.md` (frontend/CMS block architecture) · `PACKAGES_PAGE_PLAN.md` (packages page spec) · **`INTEGRATION_PLAN.md`** (CTAs, RTK Query, API contract, Wagtail registration — the "make it functional" phase; decisions: mocks-first, hybrid CMS-server/data-client fetch, defer auth). `AGENTS.md` = modified-Next.js note (read `node_modules/next/dist/docs/` before writing Next code).
