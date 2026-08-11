import { apiSlice } from "@/store/api/apiSlice";
import type { DestinationCardData } from "@/types";
import { DESTINATIONS } from "./destinationsData";

/** Destination endpoints. Dummy data via `destinationsData` — the seam for the
 * Travories / destinations API. Swap each `queryFn` for a real query later. */
export const destinationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDestinations: builder.query<
      DestinationCardData[],
      { category?: string } | void
    >({
      queryFn: () => ({ data: DESTINATIONS }),
      providesTags: ["Destination"],
    }),
  }),
});

export const { useGetDestinationsQuery } = destinationsApi;
