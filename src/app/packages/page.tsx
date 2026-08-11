import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PackagesHero from "@/components/sections/PackagesHero";
import PopularPackagesGrid from "@/components/sections/PopularPackagesGrid";
import IntroStats from "@/components/sections/IntroStats";
import CulturalDayTours from "@/components/sections/CulturalDayTours";
import { selectPackages, CULTURAL_TOURS } from "@/features/packages/packagesData";

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string; date?: string }>;
}) {
  const { location } = await searchParams;

  // Initial data for SSR — must match PopularPackagesGrid's initial state
  // (default category "Trekking", page 1).
  const initialGrid = selectPackages({
    category: location ? undefined : "Trekking",
    location,
    page: 1,
    pageSize: 6,
  });

  return (
    <>
      <main className="flex-1">
        <Navbar />
        <PackagesHero />
        <PopularPackagesGrid searchLocation={location} initialData={initialGrid} />
        <IntroStats />
        <CulturalDayTours initialItems={CULTURAL_TOURS} />
      </main>
      <Footer />
    </>
  );
}
