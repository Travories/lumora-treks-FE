/** Wagtail StreamField shapes. A page's `body` is an ordered list of blocks,
 * each `{ type, value, id }` (Wagtail API v2). */
export type CmsBlock = {
  type: string;
  value: Record<string, unknown>;
  id: string;
};

export type CmsPage = {
  id: number;
  title: string;
  slug: string;
  body: CmsBlock[];
  seo?: {
    title?: string;
    description?: string;
  };
};
