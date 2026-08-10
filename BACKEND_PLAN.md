# Lumora Treks — Backend / CMS Plan (Strapi = "walktailcms")

Strapi is the **block-based page builder** for the travel-agency site. It provides the **admin portal**, a **database**, and an **auto-generated API**. It owns **editorial/marketing content only** — **package data lives in the company SDK**, not here (see [`PLAN.md`](./PLAN.md) boundary rule).

← Back to [`PLAN.md`](./PLAN.md) · Frontend: [`FRONTEND_PLAN.md`](./FRONTEND_PLAN.md)

---

## 1. Stack

| Concern | Choice |
|---------|--------|
| CMS | **Strapi (latest, TypeScript)** |
| Runtime | Node.js LTS |
| Database | **SQLite** (dev) → **PostgreSQL** (prod) |
| API | REST (default); GraphQL optional |
| Media | Local (dev) → Cloudinary/S3 (prod) |
| Access | Admin users (editors) + read-only API token (frontend) |

---

## 2. Setup

```bash
npx create-strapi-app@latest backend --quickstart   # SQLite, opens admin
```
Create the first admin at http://localhost:1337/admin. Restart with `npm run develop`.

---

## 3. Core concept: Page + Dynamic Zone + Components

The whole CMS is built around **composability**:

- **`Page`** (collection type) — has `title`, `slug`, `seo` (component), and a **Dynamic Zone** field `blocks`.
- **Dynamic Zone** — lets editors add/reorder any registered **component (block)**.
- Each **block** is a Strapi **component** in the `blocks` category (e.g. `blocks.hero`).

Editors build a page by stacking blocks; the frontend renders them in order (see `BlockRenderer` in [`FRONTEND_PLAN.md`](./FRONTEND_PLAN.md)).

```
Page
├── title, slug
├── seo (component)
└── blocks (Dynamic Zone)  ← editors add any of these:
    ├── blocks.hero
    ├── blocks.package-grid
    ├── blocks.testimonials
    └── ...
```

---

## 4. Component (block) library to register

> Category prefix `blocks.` for all. Each maps 1:1 to a React block in the frontend.

| Component (`__component`) | Fields |
|--------------------------|--------|
| `blocks.hero` | title, subtitle, media (image/video), ctaLabel, ctaLink, align |
| `blocks.header-card` | title, subtitle, image, ctaLabel, ctaLink |
| `blocks.package-grid` | title, subtitle, **packageIds (JSON/list)** or filters, columns, showPrice | 
| `blocks.package-carousel` | title, packageIds, autoplay |
| `blocks.testimonials` | title, entries (repeatable component: name, avatar, quote, rating) |
| `blocks.gallery` | title, images (multiple media) |
| `blocks.features` | title, items (repeatable: icon, heading, text) |
| `blocks.faq` | title, items (repeatable: question, answer) |
| `blocks.cta-banner` | heading, text, ctaLabel, ctaLink, background |
| `blocks.rich-text` | body (rich text) |
| `blocks.stats` | items (repeatable: value, label) |
| `blocks.lead-form` | heading, fields config, submitLabel, destination |

**Reusable shared components:**
| Component | Fields |
|-----------|--------|
| `shared.seo` | metaTitle, metaDescription, shareImage, keywords |
| `shared.cta` | label, link, style |

> **Package data note:** `blocks.package-grid` / `package-carousel` store only **references** (SDK package ids or filter criteria) + presentational options. The frontend fetches the actual package data from the SDK. Strapi never stores package details/pricing.

---

## 5. Other content types

| Type | Kind | Purpose |
|------|------|---------|
| `Page` | collection | composable pages (home, about, landings) |
| `Global` | single | site-wide: nav links, footer, logo, social |
| `Redirect` (optional) | collection | URL redirects |

> No `Trek`/`Package` content type — packages come from the SDK.

---

## 6. Permissions & access

- **Public role:** enable `find`/`findOne` on `Page` and `Global` (read-only).
- Prefer a **read-only API Token** (Settings → API Tokens) used server-side by Next.js.
- **CORS** (`config/middlewares.ts`): allow `http://localhost:3000` (dev) and the prod frontend domain.

---

## 7. How registering a block works (both sides must match)

1. Admin → **Content-Type Builder** → *Create new component* → category `blocks`, name e.g. `Hero`.
2. Add its fields. Save (Strapi writes schema to `src/components/blocks/hero.json`).
3. Add it as an allowed component in the `Page` **Dynamic Zone**.
4. **Frontend:** create `src/blocks/Hero.tsx` and add `'blocks.hero': Hero` to `block-registry.ts`.
5. Editor adds a Hero block to a page, fills it, publishes → frontend renders it.

> Steps 1–3 are backend; step 4 is frontend. Keep them in lockstep — a registered CMS block with no React counterpart renders nothing.

---

## 8. Folder structure (Strapi-generated)

```
backend/
├── config/            # database, server, middlewares (CORS)
├── src/
│   ├── api/page/      # Page collection type
│   ├── api/global/    # Global single type
│   └── components/
│       ├── blocks/    # hero.json, package-grid.json, ...
│       └── shared/    # seo.json, cta.json
├── public/uploads/
└── .env
```

---

## 9. Build order (backend)

- [ ] Scaffold Strapi, create admin user
- [ ] Create `shared.seo`, `shared.cta` components
- [ ] Create first blocks: `blocks.hero`, `blocks.rich-text`, `blocks.cta-banner`
- [ ] Create `Page` type with `blocks` Dynamic Zone + `seo`
- [ ] Set Public read permissions / create read-only API token + CORS
- [ ] Build a sample "home" page from blocks, publish
- [ ] Register the full block library (package-grid, testimonials, gallery, faq, features, stats, lead-form)
- [ ] Create `Global` single type (nav, footer)
- [ ] (Prod) PostgreSQL + Cloudinary/S3, deploy to Railway/Render

---

## 10. Gotchas

- Entries are **Draft** until **Published** — unpublished pages/blocks won't return from the API.
- Dynamic Zones + nested components/media need **deep populate** on the frontend fetch.
- Package-related blocks hold **references only** — never store package details in the CMS.
- Keep write tokens secret; frontend uses read-only.
- Use **PostgreSQL in production** (SQLite struggles with concurrent writes).
