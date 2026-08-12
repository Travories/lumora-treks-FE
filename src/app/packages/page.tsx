import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PackagesHero from "@/components/sections/PackagesHero";
import PopularPackagesGrid from "@/components/sections/PopularPackagesGrid";
import IntroStats from "@/components/sections/IntroStats";
import CulturalDayTours from "@/components/sections/CulturalDayTours";
import BlockRenderer from "@/components/BlockRenderer";
import { getPageByPath } from "@/lib/cms";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import {
  packagesListQueryOptions,
  culturalToursQueryOptions,
} from "@/features/packages/packageQueries";

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string; date?: string }>;
}) {
  const { location } = await searchParams;
  const queryParams = {
    category: location ? undefined : "Trekking",
    location,
    page: 1,
    pageSize: 6,
  };

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(packagesListQueryOptions(queryParams)),
    queryClient.prefetchQuery(culturalToursQueryOptions()),
  ]);

  const page = await getPageByPath("/packages");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex-1">
        <Navbar />
        {page?.body && page.body.length > 0 ? (
          <BlockRenderer blocks={page.body} />
        ) : (
          <>
            <PackagesHero />
            <PopularPackagesGrid searchLocation={location} />
            <IntroStats />
            <CulturalDayTours />
          </>
        )}
      </main>
      <Footer />
    </HydrationBoundary>
  );
}
