import { apiSlice } from "@/store/api/apiSlice";
import type { DestinationCardData } from "@/types";

/**
 * Destination endpoints. Dummy data for now — the seam for the Travories /
 * destinations API. Swap each `queryFn` for a real query later, no component
 * changes needed.
 */

const DESTINATIONS: DestinationCardData[] = [
  { id: "poon-hills", title: "Poon Hills", image: "/images/dl-poonhills.png", price: "400" },
  { id: "chandragiri-hills", title: "Chandragiri Hills", image: "/images/dl-chandragiri.png", price: "400" },
  { id: "kathmandu-valley", title: "Kathmandu Valley", image: "/images/dl-kathmandu.png", price: "400" },
];

export const destinationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDestinations: builder.query<DestinationCardData[], { category?: string } | void>({
      queryFn: () => ({ data: DESTINATIONS }),
      providesTags: ["Destination"],
    }),
  }),
});

export const { useGetDestinationsQuery } = destinationsApi;
