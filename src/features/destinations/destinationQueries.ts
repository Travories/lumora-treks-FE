import { queryOptions, useQuery } from "@tanstack/react-query";
import type { DestinationCardData } from "@/types";


const WAGTAIL_URL = process.env.NEXT_PUBLIC_WAGTAIL_URL || "http://localhost:8000";

export async function fetchDestinations(): Promise<DestinationCardData[]> {
  try {
    const res = await fetch(`${WAGTAIL_URL}/api/v2/destinations/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      return data.items.map((item: any) => ({
        id: String(item.id),
        slug: item.meta?.slug ?? "",
        title: item.title,
        subtitle: item.subtitle ?? "",
        image: item.image?.url ?? "",
        imageAlt: item.image?.alt_text ?? item.title,
        badge: item.badge ?? "",
        packagesCount: item.packages_count ?? 0,
        layout: item.layout ?? "small",
        featured: item.featured ?? false,
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
