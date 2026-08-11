import type { CmsPage } from "./blocks";

/**
 * CMS data access (SERVER-ONLY by convention — import only from server
 * components. Hybrid strategy: Wagtail content is fetched in
 * server components for SEO). Mock now; swap `getPage` for the Wagtail API v2:
 *
 *   const res = await fetch(
 *     `${process.env.NEXT_PUBLIC_WAGTAIL_URL}/api/v2/pages/?slug=${slug}&fields=*`,
 *     { headers: { Authorization: `Bearer ${process.env.WAGTAIL_API_TOKEN}` },
 *       next: { revalidate: 60 } }
 *   );
 *   const { items } = await res.json();
 *   return items[0] ?? null;
 *
 * The block `type`s below must stay in sync with `src/lib/block-registry.ts` and
 * the StreamField block names in the Wagtail (backend) repo.
 */

const MOCK_HOME: CmsPage = {
  id: 1,
  title: "Home",
  slug: "home",
  seo: {
    title: "Lumora Treks — Travel beyond destinations",
    description:
      "Authentic Nepal travel experiences: curated packages, destinations, and unforgettable journeys.",
  },
  body: [
    { type: "hero", value: {}, id: "b-hero" },
    { type: "intro_stats", value: {}, id: "b-intro" },
    { type: "package_grid", value: {}, id: "b-packages" },
    { type: "why_choose_us", value: {}, id: "b-why" },
    { type: "authentic_experiences", value: {}, id: "b-authentic" },
    { type: "cta_band", value: {}, id: "b-cta" },
    { type: "faq", value: {}, id: "b-faq" },
  ],
};

const PAGES: Record<string, CmsPage> = {
  home: MOCK_HOME,
};

/** Fetch a CMS page by slug. Returns null if not found. */
export async function getPage(slug: string): Promise<CmsPage | null> {
  return PAGES[slug] ?? null;
}
