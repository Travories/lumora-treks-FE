import { apiSlice } from "@/store/api/apiSlice";
import type { TravelPackage } from "@/types";

const DUMMY_PACKAGES: TravelPackage[] = [
  {
    id: "journey-to-fish-lake",
    title: "Journey to fish lake",
    image: "/images/package-card1.png",
    rating: 4.5,
    duration: "4 days & 3 nights",
    peopleCount: 30,
    price: 400.23,
  },
  {
    id: "pokhara-kathmandu-tours",
    title: "Pokhara & Kathmandu Tours",
    image: "/images/package-card2.png",
    rating: 4.5,
    duration: "4 days & 3 nights",
    peopleCount: 30,
    price: 400.23,
  },
  {
    id: "abc-base-camp-trek",
    title: "ABC Base Camp Trek",
    image: "/images/package-card3.png",
    rating: 4.5,
    duration: "4 days & 3 nights",
    peopleCount: 30,
    price: 400.23,
  },
];

export const packagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPopularPackages: builder.query<TravelPackage[], void>({
      queryFn: () => ({ data: DUMMY_PACKAGES }),
      providesTags: ["Package"],
    }),
  }),
});

export const { useGetPopularPackagesQuery } = packagesApi;
