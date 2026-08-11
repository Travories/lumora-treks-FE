import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PackagesHero from "@/components/sections/PackagesHero";
import PopularPackagesGrid from "@/components/sections/PopularPackagesGrid";
import IntroStats from "@/components/sections/IntroStats";
import CulturalDayTours from "@/components/sections/CulturalDayTours";

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string; date?: string }>;
}) {
  const { location } = await searchParams;

  return (
    <>
      <main className="flex-1">
        <Navbar />
        <PackagesHero />
        <PopularPackagesGrid searchLocation={location} />
        <IntroStats />
        <CulturalDayTours />
      </main>
      <Footer />
    </>
  );
}
