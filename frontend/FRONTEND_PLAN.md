# Lumora Treks — Frontend Plan (Next.js)

The public travel-agency website. It has **two data sources**:
1. **Strapi CMS** → editorial pages assembled from **blocks** (rendered by `<BlockRenderer>`).
2. **Company SDK (Travories)** → **package data** (listings, detail pages, pricing).

← Back to [`PLAN.md`](./PLAN.md) · Backend: [`BACKEND_PLAN.md`](./BACKEND_PLAN.md)

---

## 1. Stack

| Concern | Choice |
|---------|--------|
| Framework | **Next.js (App Router) + TypeScript** |
| Styling | **Tailwind CSS** |
| CMS data | Native `fetch` (server components) |
| Package data | **Company SDK (Travories)** as an npm dependency |
| Images | `next/image` |
| Lint/format | ESLint + Prettier |

---

## 2. Setup steps

1. **Create the app**
   ```bash
   npx create-next-app@latest frontend --typescript --tailwind --eslint --app
   ```
2. **Install the SDK** (name TBD — confirm)
   ```bash
   npm install @travories/sdk   # placeholder — replace with real package
   ```
3. **Env** — `frontend/.env.local`
   ```
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   STRAPI_API_TOKEN=<read-only token>
   TRAVORIES_API_KEY=<sdk key>
   TRAVORIES_BASE_URL=<sdk base url, if needed>
   ```
4. **Allow remote images** (Strapi + SDK image hosts) in `next.config.js`.
5. **Run:** `npm run dev` → http://localhost:3000

---

## 3. Folder structure (proposed)

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # home (CMS page, by slug "home")
│   │   ├── [slug]/page.tsx          # any CMS page (about, landing, …)
│   │   ├── packages/
│   │   │   ├── page.tsx             # package listing (SDK)
│   │   │   └── [id]/page.tsx        # package detail (SDK)
│   ├── blocks/                      # one React component per CMS block
│   │   ├── Hero.tsx
│   │   ├── HeaderCard.tsx
│   │   ├── PackageGrid.tsx          # reads SDK for referenced packages
│   │   ├── Testimonials.tsx
│   │   ├── Gallery.tsx
│   │   ├── FAQ.tsx
│   │   ├── CTABanner.tsx
│   │   └── ...
│   ├── components/                  # shared UI (Navbar, Footer, PackageCard)
│   ├── lib/
│   │   ├── strapi.ts                # CMS API client
│   │   ├── sdk.ts                   # Travories SDK init + wrappers
│   │   ├── block-registry.ts        # maps block __component → React block
│   │   └── types.ts
│   └── styles/
└── .env.local
```

---

## 4. The Block Renderer (core of the CMS side)

Strapi returns a page as an ordered array of blocks, each tagged with `__component` (e.g. `"blocks.hero"`). The renderer maps that string to a React component.

`src/lib/block-registry.ts`:
```ts
import Hero from '@/blocks/Hero';
import PackageGrid from '@/blocks/PackageGrid';
import Testimonials from '@/blocks/Testimonials';
import CTABanner from '@/blocks/CTABanner';
// ...import every registered block

export const blockRegistry = {
  'blocks.hero': Hero,
  'blocks.package-grid': PackageGrid,
  'blocks.testimonials': Testimonials,
  'blocks.cta-banner': CTABanner,
  // ...one entry per Strapi component
} as const;
```

`src/components/BlockRenderer.tsx`:
```tsx
import { blockRegistry } from '@/lib/block-registry';

export default function BlockRenderer({ blocks }: { blocks: any[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockRegistry[block.__component];
        if (!Component) return null; // unknown block → skip (log in dev)
        return <Component key={`${block.__component}-${i}`} {...block} />;
      })}
    </>
  );
}
```

Rendering a CMS page (`app/[slug]/page.tsx`):
```tsx
import { fetchAPI } from '@/lib/strapi';
import BlockRenderer from '@/components/BlockRenderer';

export default async function Page({ params }: { params: { slug: string } }) {
  const { data } = await fetchAPI(
    `pages?filters[slug][$eq]=${params.slug}&populate=deep`
  );
  const page = data[0];
  return <BlockRenderer blocks={page.blocks} />;
}
```

> **Rule:** every new Strapi component must get (a) a React block in `src/blocks/` and (b) an entry in `block-registry.ts`. If they drift, unknown blocks are skipped.

---

## 5. CMS API client — `src/lib/strapi.ts`
```ts
const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;
export async function fetchAPI(path: string) {
  const res = await fetch(`${STRAPI}/api/${path}`, {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Strapi ${res.status}`);
  return res.json();
}
```
> Dynamic Zones + relations + media need deep populate. Use the `populate=deep` plugin or explicit populate per block.

---

## 6. SDK integration — `src/lib/sdk.ts` (package data)

> Placeholder shape — replace with the real Travories SDK API once we have its docs.

```ts
import { Travories } from '@travories/sdk'; // TBD

export const travories = new Travories({
  apiKey: process.env.TRAVORIES_API_KEY!,
  baseUrl: process.env.TRAVORIES_BASE_URL,
});

export async function listPackages(params?: Record<string, unknown>) {
  return travories.packages.list(params);        // shape TBD
}
export async function getPackage(id: string) {
  return travories.packages.get(id);             // shape TBD
}
```

**Package listing** (`app/packages/page.tsx`):
```tsx
import { listPackages } from '@/lib/sdk';
import PackageCard from '@/components/PackageCard';

export default async function Packages() {
  const packages = await listPackages();
  return (
    <div className="grid grid-cols-3 gap-6">
      {packages.map((p) => <PackageCard key={p.id} pkg={p} />)}
    </div>
  );
}
```

**Package detail** (`app/packages/[id]/page.tsx`):
```tsx
import { getPackage } from '@/lib/sdk';

export default async function PackageDetail({ params }) {
  const pkg = await getPackage(params.id);
  // render hero, itinerary, pricing, gallery, booking CTA from SDK data
}
```

**PackageGrid block** bridges the two worlds: the CMS block stores which package ids/filters to feature; the block fetches real data from the SDK.
```tsx
// src/blocks/PackageGrid.tsx
import { listPackages } from '@/lib/sdk';

export default async function PackageGrid({ title, packageIds }) {
  const packages = await listPackages({ ids: packageIds });
  return (/* title + grid of PackageCard */);
}
```

---

## 7. Pages / routes

| Route | Source | Purpose |
|-------|--------|---------|
| `/` | CMS page `home` | blocks-composed homepage |
| `/[slug]` | CMS page | about, landing pages, etc. |
| `/packages` | **SDK** | package listing/search |
| `/packages/[id]` | **SDK** | package detail (itinerary, pricing, booking) |

Navbar/Footer: static or from a CMS "global" single type.

---

## 8. Build order (frontend)

- [ ] Scaffold Next.js + Tailwind, run dev server
- [ ] `strapi.ts` + `types.ts` + `.env.local`
- [ ] `BlockRenderer` + `block-registry` with 2–3 blocks (Hero, RichText, CTA)
- [ ] Render a CMS page end-to-end (`/[slug]`)
- [ ] Build out the full block library (match Strapi components)
- [ ] `sdk.ts` — init the company SDK
- [ ] `/packages` listing + `/packages/[id]` detail from SDK
- [ ] `PackageGrid` block bridging CMS ids → SDK data
- [ ] Navbar/Footer, loading/error states, responsive
- [ ] SEO metadata, image optimization
- [ ] Deploy to Vercel; wire Strapi + SDK env

---

## 9. Gotchas

- Keep **Strapi components and the block registry in sync** — a registered CMS block with no React counterpart renders as nothing.
- Dynamic Zones need **deep populate** or nested block data/media is missing.
- Package data is the **SDK's** responsibility — don't duplicate it in the CMS; reference by id.
- Never expose write/secret tokens client-side; call CMS + SDK from **server components** where possible.
- Confirm the SDK's real API (init, list, get, types) before finalizing `sdk.ts`.
