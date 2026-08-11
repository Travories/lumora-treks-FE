import { apiSlice } from "@/store/api/apiSlice";
import type { PackageCardData, PackageListResult } from "@/types";
import {
  POPULAR_PACKAGES,
  CULTURAL_TOURS,
  selectPackages,
  type SelectPackagesParams,
} from "./packagesData";

/**
 * Package endpoints. Dummy data via `packagesData` for now (see apiSlice's
 * `fakeBaseQuery`) — the seam for the Travories API. Swapping each `queryFn` for
 * a real query later requires NO component changes.
 */
export const packagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPopularPackages: builder.query<PackageCardData[], void>({
      queryFn: () => ({ data: POPULAR_PACKAGES }),
      providesTags: ["Package"],
    }),
    getPackages: builder.query<PackageListResult, SelectPackagesParams | void>({
      queryFn: (arg) => ({ data: selectPackages(arg ?? {}) }),
      providesTags: ["Package"],
    }),
    getCulturalTours: builder.query<PackageCardData[], void>({
      queryFn: () => ({ data: CULTURAL_TOURS }),
      providesTags: ["Package"],
    }),
  }),
});

export const {
  useGetPopularPackagesQuery,
  useGetPackagesQuery,
  useGetCulturalToursQuery,
} = packagesApi;
