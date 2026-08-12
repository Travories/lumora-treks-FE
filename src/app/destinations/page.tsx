import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import DestinationsGrid from "@/components/sections/DestinationsGrid";
import IntroStats from "@/components/sections/IntroStats";
import ExperienceSection from "@/components/sections/ExperienceSection";
import BlockRenderer from "@/components/BlockRenderer";
import { getPageByPath } from "@/lib/cms";

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { destinationsQueryOptions } from "@/features/destinations/destinationQueries";

/** Destinations listing page (`/destinations`) — Figma node 84:1535. New:
 * DestinationsGrid. Reuses PageHero, IntroStats, ExperienceSection. */
export default async function DestinationsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(destinationsQueryOptions());
  const page = await getPageByPath("/destinations");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex-1">
        <Navbar />
        {page?.body && page.body.length > 0 ? (
          <BlockRenderer blocks={page.body} />
        ) : (
          <>
            <PageHero
              title="Our Destinations"
              image="/images/destinations-hero.png"
              imageAlt="Nepal mountain landscape"
              imageWidth={499}
              imageHeight={457}
            />
            <DestinationsGrid />
            <IntroStats />
            <ExperienceSection />
          </>
        )}
      </main>
      <Footer />
    </HydrationBoundary>
  );
}



