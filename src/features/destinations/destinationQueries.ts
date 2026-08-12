import { queryOptions, useQuery } from "@tanstack/react-query";
import type { CmsImage } from "@/lib/blocks";
import type { DestinationCardData } from "@/types";


const WAGTAIL_URL = process.env.NEXT_PUBLIC_WAGTAIL_URL || "http://localhost:8000";

type CmsDestination = {
  id: number | string;
  slug: string;
  title: string;
  subtitle?: string;
  image?: CmsImage;
  href?: string;
};

export async function fetchDestinations(): Promise<DestinationCardData[]> {
  try {
    const res = await fetch(`${WAGTAIL_URL}/api/v2/destinations/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data: { items?: CmsDestination[] } = await res.json();
    if (data.items && data.items.length > 0) {
      return data.items.map((item) => ({
        id: String(item.id),
        slug: item.slug,
        title: item.title,
        subtitle: item.subtitle ?? "",
        image: item.image?.src ?? item.image?.url ?? "/images/destination-card-default.png",
        href: item.href ?? `/destinations/${item.slug}`,
      }));
    }
    return [];
  } catch (err) {
    console.error("Failed to fetch destinations:", err);
    return [];
  }
}


export const destinationsQueryOptions = () =>
  queryOptions({
    queryKey: ["destinations"],
    queryFn: fetchDestinations,
  });

export function useDestinationsQuery() {
  return useQuery(destinationsQueryOptions());
}
