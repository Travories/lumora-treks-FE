# Lumora Treks — Frontend Plan (Next.js)

The public travel-agency website. It has **one data source**:
1. **Wagtail CMS** → editorial pages assembled from **blocks** (rendered by `<BlockRenderer>`).

← Back to [`PLAN.md`](./PLAN.md) · Backend: [`BACKEND_PLAN.md`](./BACKEND_PLAN.md)

---

## 1. Stack

| Concern | Choice |
|---------|--------|
| Framework | **Next.js (App Router) + TypeScript** |
| Styling | **Tailwind CSS** |
| CMS data | Native `fetch` (server components) |
| Images | `next/image` |
| Lint/format | ESLint + Prettier |

---

## 2. Setup steps

1. **Create the app**
   ```bash
   npx create-next-app@latest frontend --typescript --tailwind --eslint --app
   ```
2. **Env** — `frontend/.env.local`
   ```
   NEXT_PUBLIC_WAGTAIL_URL=http://localhost:8000
   WAGTAIL_API_TOKEN=<read-only token>
   ```
3. **Allow remote images** (Wagtail image hosts) in `next.config.js`.
4. **Run:** `npm run dev` → http://localhost:3000

---

## 3. Folder structure (proposed)

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # home (CMS page, by slug "home")
│   │   ├── [slug]/page.tsx          # any CMS page (about, landing, …)
│   ├── blocks/                      # one React component per CMS block
│   │   ├── Hero.tsx
│   │   ├── HeaderCard.tsx
│   │   ├── PackageGrid.tsx          # package grid block
│   │   ├── Testimonials.tsx
│   │   ├── Gallery.tsx
│   │   ├── FAQ.tsx
│   │   ├── CTABanner.tsx
│   │   └── ...
│   ├── components/                  # shared UI (Navbar, Footer, PackageCard)
│   ├── lib/
│   │   ├── wagtail.ts               # CMS API client
│   │   ├── block-registry.ts        # maps block __component → React block
│   │   └── types.ts
│   └── styles/
└── .env.local
```

---

## 4. The Block Renderer (core of the CMS side)

Wagtail returns a page as an ordered array of blocks, each tagged with `__component` (e.g. `"blocks.hero"`). The renderer maps that string to a React component.

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
  // ...one entry per Wagtail component
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
import { fetchAPI } from '@/lib/wagtail';
import BlockRenderer from '@/components/BlockRenderer';

export default async function Page({ params }: { params: { slug: string } }) {
  const { data } = await fetchAPI(
    `pages?filters[slug][$eq]=${params.slug}&populate=deep`
  );
  const page = data[0];
  return <BlockRenderer blocks={page.blocks} />;
}
```

> **Rule:** every new Wagtail component must get (a) a React block in `src/blocks/` and (b) an entry in `block-registry.ts`. If they drift, unknown blocks are skipped.

---

## 5. CMS API client — `src/lib/wagtail.ts`
```ts
const WAGTAIL = process.env.NEXT_PUBLIC_WAGTAIL_URL;
export async function fetchAPI(path: string) {
  const res = await fetch(`${WAGTAIL}/api/${path}`, {
    headers: { Authorization: `Bearer ${process.env.WAGTAIL_API_TOKEN}` },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Wagtail ${res.status}`);
  return res.json();
}
```
> Dynamic Zones + relations + media need deep populate. Use the `populate=deep` plugin or explicit populate per block.

---

## 6. Pages / routes

| Route | Source | Purpose |
|-------|--------|---------|
| `/` | CMS page `home` | blocks-composed homepage |
| `/[slug]` | CMS page | about, landing pages, etc. |

Navbar/Footer: static or from a CMS "global" single type.

---

## 7. Build order (frontend)

- [ ] Scaffold Next.js + Tailwind, run dev server
- [ ] `wagtail.ts` + `types.ts` + `.env.local`
- [ ] `BlockRenderer` + `block-registry` with 2–3 blocks (Hero, RichText, CTA)
- [ ] Render a CMS page end-to-end (`/[slug]`)
- [ ] Build out the full block library (match Wagtail components)
- [ ] Navbar/Footer, loading/error states, responsive
- [ ] SEO metadata, image optimization
- [ ] Deploy to Vercel; wire Wagtail env

---

## 8. Gotchas

- Keep **Wagtail components and the block registry in sync** — a registered CMS block with no React counterpart renders as nothing.
- Dynamic Zones need **deep populate** or nested block data/media is missing.
- Never expose write/secret tokens client-side; call CMS from **server components** where possible.
