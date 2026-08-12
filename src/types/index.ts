export type TravelPackage = {
  id: string;
  title: string;
  image: string;
  rating: number;
  duration: string;
  peopleCount: number;
  price: number;
};

/** Shape consumed by `PackageCard` (Our Packages / Popular / Cultural rows). */
export type PackageCardData = {
  id: string;
  title: string;
  image: string;
  description: string;
  price: string; // e.g. "$400 per person"
  duration: string; // e.g. "4 Days"
  rating: string; // e.g. "4.9"
  category?: string; // e.g. "Trekking" (for FilterTabs)
};

/** Paginated package list response. */
export type PackageListResult = {
  items: PackageCardData[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

/** Shape consumed by `DestinationCard`. */
export type DestinationCardData = {
  id: string;
  slug?: string;
  title: string;
  image: string;
  price?: string; // "starting from $X" amount, e.g. "400"
  href?: string;
};

export type RegionHighlight = {
  id: string;
  title: string;
  image: string;
};

export type SeasonalDestination = {
  id: string;
  title: string;
  image: string;
  layout: "tall" | "wide";
};
