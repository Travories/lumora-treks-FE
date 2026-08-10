import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Single base API slice for the app. Feature endpoints are injected into this
 * via `apiSlice.injectEndpoints` (see src/features/*\/*.ts) instead of creating
 * separate `createApi` instances, so everything shares one cache/tag space.
 *
 * `fakeBaseQuery` is used because this project runs on static/dummy data
 * (no backend yet) — each endpoint resolves data itself via `queryFn`. Swap
 * this for `fetchBaseQuery({ baseUrl: ... })` once a real API exists.
 */
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Package", "Destination", "GalleryItem"],
  endpoints: () => ({}),
});
