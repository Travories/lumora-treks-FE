import { apiSlice } from "@/store/api/apiSlice";
import type { RegionHighlight, SeasonalDestination } from "@/types";

const DUMMY_REGIONS: RegionHighlight[] = [
  { id: "annapurna-region", title: "Annapurna Region", image: "/images/region-annapurna.png" },
  { id: "bandipur", title: "Bandipur", image: "/images/region-bandipur.png" },
  { id: "kathmandu", title: "Kathmandu", image: "/images/region-kathmandu.png" },
  { id: "swayambhunath", title: "Swayubhunath", image: "/images/region-swayambhunath.png" },
  { id: "rara-lake", title: "Rara Lake", image: "/images/region-rara-lake.png" },
  { id: "everest-region", title: "Everest Region", image: "/images/region-everest.png" },
];

const DUMMY_SEASONAL_DESTINATIONS: SeasonalDestination[] = [
  { id: "seasonal-1", title: "Journey to fish lake", image: "/images/seasonal-1.png", layout: "tall" },
  { id: "seasonal-2", title: "Journey to fish lake", image: "/images/seasonal-2.png", layout: "tall" },
  { id: "seasonal-3", title: "Journey to fish lake", image: "/images/seasonal-3.png", layout: "wide" },
  { id: "seasonal-4", title: "Journey to fish lake", image: "/images/seasonal-4.png", layout: "tall" },
  { id: "seasonal-5", title: "Journey to fish lake", image: "/images/seasonal-5.png", layout: "tall" },
];

export const galleryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRegionHighlights: builder.query<RegionHighlight[], void>({
      queryFn: () => ({ data: DUMMY_REGIONS }),
      providesTags: ["GalleryItem"],
    }),
    getSeasonalDestinations: builder.query<SeasonalDestination[], void>({
      queryFn: () => ({ data: DUMMY_SEASONAL_DESTINATIONS }),
      providesTags: ["Destination"],
    }),
  }),
});

export const { useGetRegionHighlightsQuery, useGetSeasonalDestinationsQuery } = galleryApi;
