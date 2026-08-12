import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import DestinationsGrid from "@/components/sections/DestinationsGrid";
import IntroStats from "@/components/sections/IntroStats";
import ExperienceSection from "@/components/sections/ExperienceSection";
import { DESTINATIONS } from "@/features/destinations/destinationsData";
import BlockRenderer from "@/components/BlockRenderer";
import { getPageByPath } from "@/lib/cms";

/** Destinations listing page (`/destinations`) — Figma node 84:1535. New:
 * DestinationsGrid. Reuses PageHero, IntroStats, ExperienceSection. */
export default async function DestinationsPage() {
  const page = await getPageByPath("/destinations");

  return (
    <>
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
            <DestinationsGrid initialItems={DESTINATIONS} />
            <IntroStats />
            <ExperienceSection />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

