import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import IntroStats from "@/components/sections/IntroStats";
import PopularPackages from "@/components/sections/PopularPackages";
import ExperienceSection from "@/components/sections/ExperienceSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import DestinationsBento from "@/components/sections/DestinationsBento";
import AuthenticExperiences from "@/components/sections/AuthenticExperiences";
import CTABand from "@/components/sections/CTABand";
import FAQSection from "@/components/sections/FAQSection";
import { POPULAR_PACKAGES } from "@/features/packages/packagesData";
import BlockRenderer from "@/components/BlockRenderer";
import { getPageByPath } from "@/lib/cms";

export default async function Home() {
  const page = await getPageByPath("/");

  return (
    <>
      <main className="flex-1">
        {page?.body && page.body.length > 0 ? (
          <>
            <div className="relative">
              <div className="absolute inset-x-0 top-3 z-50 sm:top-6">
                <Navbar />
              </div>
            </div>
            <BlockRenderer blocks={page.body} />
          </>
        ) : (
          <>
            {/* Navbar floats over the hero */}
            <div className="relative">
              <div className="absolute inset-x-0 top-3 z-50 sm:top-6">
                <Navbar />
              </div>
              <Hero />
            </div>
            <IntroStats />
            <PopularPackages initialItems={POPULAR_PACKAGES} />
            <ExperienceSection />
            <WhyChooseUs />
            <DestinationsBento />
            <AuthenticExperiences />
            <CTABand />
            <FAQSection />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

