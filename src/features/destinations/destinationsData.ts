import type { DestinationCardData } from "@/types";

/** Destination dummy data — shared by the RTK Query endpoint (client) and the
 * server components that pass initial data for SSR. Swap for the Travories /
 * destinations API later. */
export const DESTINATIONS: DestinationCardData[] = [
  { id: "poon-hills", title: "Poon Hills", image: "/images/dl-poonhills.png", price: "400" },
  { id: "chandragiri-hills", title: "Chandragiri Hills", image: "/images/dl-chandragiri.png", price: "400" },
  { id: "kathmandu-valley", title: "Kathmandu Valley", image: "/images/dl-kathmandu.png", price: "400" },
];
