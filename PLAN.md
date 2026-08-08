# Lumora Treks — Project Plan (Overview)

A **travel agency website** built on two content sources:

1. **Strapi (CMS, "walktailcms")** — a **block-based page builder**. Every frontend section is a registered component; editors compose pages by stacking blocks. Owns **editorial / marketing content**.
2. **Company SDK (Travories)** — the **source of truth for package data**. Package listings and detail pages come from the SDK / external API, not from the CMS.

- Frontend plan: [`FRONTEND_PLAN.md`](./FRONTEND_PLAN.md)
- Backend/CMS plan: [`BACKEND_PLAN.md`](./BACKEND_PLAN.md)

---

## 1. Architecture (two data sources, one frontend)

```
        ┌──────────────────────────────┐
        │        Strapi CMS            │   Editorial / marketing content
        │  (block-based page builder)  │   Home, About, Landing pages
        │  Dynamic Zone of components  │   Hero, PackageGrid, Testimonials…
        └──────────────┬───────────────┘
                       │  REST/JSON (pages + blocks)
                       ▼
        ┌──────────────────────────────┐
        │      Next.js Frontend        │
        │  <BlockRenderer> maps each   │
        │  registered block → React    │
        │  component and renders pages │
        └──────────────┬───────────────┘
                       │  SDK calls (package data)
                       ▼
        ┌──────────────────────────────┐
        │     Company SDK (Travories)  │   Package listings, detail,
        │     / external package API   │   pricing, availability, itinerary
        └──────────────────────────────┘
```

**Boundary rule:**
- **CMS pages/sections** (anything an editor arranges) → Strapi blocks.
- **Package data** (listings, detail pages, prices, availability) → the SDK.
- The two meet on the frontend: a CMS "Package Grid" block may hold *which* packages to feature (by SDK id), and the frontend fetches the actual package data from the SDK.

---

## 2. The block-based CMS pattern (register ALL components)

Instead of hardcoded pages, we register a **library of components** in Strapi. A `Page` content type has a **Dynamic Zone** — an ordered list where editors add/reorder any registered block. The frontend's `<BlockRenderer>` maps each block type to its React component.

```
Strapi Page (Dynamic Zone)          Next.js <BlockRenderer />
──────────────────────────          ──────────────────────────
[ Hero            ]            →      <Hero />
[ Package Grid    ]            →      <PackageGrid /> ── fetches from SDK
[ Testimonials    ]            →      <Testimonials />
[ Gallery         ]            →      <Gallery />
[ FAQ             ]            →      <FAQ />
[ CTA Banner      ]            →      <CTABanner />
   editor reorders freely            renders in that exact order
```

Registering a component = (a) define it in Strapi (its editable fields) **and** (b) build the matching React component + register it in the block renderer map. Both must be kept in sync — see the block registry in [`FRONTEND_PLAN.md`](./FRONTEND_PLAN.md) and the component library in [`BACKEND_PLAN.md`](./BACKEND_PLAN.md).

---

## 3. Tech stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Frontend | **Next.js (App Router) + TypeScript** | SEO, fast pages, block rendering |
| Styling | **Tailwind CSS** | Utility-first, consistent |
| CMS | **Strapi** (Dynamic Zones + components) | Block-based page builder out of the box |
| Package data | **Company SDK (Travories)** | Source of truth for packages/booking |
| CMS database | **SQLite** (dev) → **PostgreSQL** (prod) | Easy start, robust prod |
| Media | Strapi media library → Cloudinary/S3 | CMS images |
| Hosting | Frontend: Vercel · CMS: Railway/Render | Simple, free tiers |

---

## 4. Component / block library (shared contract)

Full field lists in [`BACKEND_PLAN.md`](./BACKEND_PLAN.md); renderer map in [`FRONTEND_PLAN.md`](./FRONTEND_PLAN.md).

- **Hero** — big banner (title, subtitle, image/video, CTA)
- **Header Card** — smaller banner/intro card
- **Package Grid** — featured packages (references SDK package ids) + layout options
- **Package Carousel** — scrollable package highlights
- **Testimonials** — customer reviews
- **Gallery** — image grid
- **Feature/Benefits** — icon + text list ("Why travel with us")
- **FAQ** — accordion
- **CTA Banner** — call-to-action strip
- **Rich Text** — freeform content
- **Stats/Counters** — numbers (trips, customers)
- **Contact/Lead form** — enquiry capture
- **SEO** (component, per page) — meta title/description/share image

> Every one of these is registered in **both** Strapi and the frontend renderer.

---

## 5. Milestones

- [ ] **M1 — CMS up:** Strapi running, `Page` content type + Dynamic Zone, first 3 blocks registered (Hero, Rich Text, CTA)
- [ ] **M2 — Renderer:** Next.js running, `<BlockRenderer>` renders a CMS page end-to-end
- [ ] **M3 — Block library:** Register the full component library (both sides)
- [ ] **M4 — SDK integration:** Wire the company SDK; Package Grid + package detail page render live package data
- [ ] **M5 — Pages:** Home, About, Packages listing, Package detail assembled from blocks + SDK
- [ ] **M6 — Polish:** SEO, responsive, loading/error states, image optimization
- [ ] **M7 — Deploy:** CMS + frontend hosted, env + SDK keys wired

---

## 6. Repository layout (proposed)

```
lumora/
├── PLAN.md · FRONTEND_PLAN.md · BACKEND_PLAN.md
├── frontend/            # Next.js app (block renderer + SDK integration)
└── backend/             # Strapi app (block-based CMS)
```

> The SDK is consumed inside `frontend/` (installed as a dependency). Its config/keys live in `frontend/.env.local`.

---

## 7. Open items to confirm as we build

- **SDK package name & docs** — how it's installed (`npm i ...`), how it's initialized, and the methods for listing/fetching a package. Needed for M4.
- **Auth/keys** the SDK requires (API key, base URL).
- Whether the CMS should store any package metadata (e.g. featured order, marketing copy) or reference SDK ids only.
