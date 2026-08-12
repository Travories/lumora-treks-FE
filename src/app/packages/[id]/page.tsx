import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PackageDetail from "@/components/sections/PackageDetail";
import CulturalDayTours from "@/components/sections/CulturalDayTours";
import { CULTURAL_TOURS } from "@/features/packages/packagesData";

/** Package detail page (`/packages/[id]`) — Figma node 150:10819. Its own
 * layout (overview, gallery, things included, booking card, itinerary + map,
 * reviews), distinct from the destination detail. Booking card "Reserve Now" →
 * checkout. Content dummy; wires to Travories later. */
export default function PackageDetailPage() {
  return (
    <>
      <main className="flex-1">
        <Navbar />
        <PackageDetail reserveHref="/checkout" />
        <CulturalDayTours initialItems={CULTURAL_TOURS} />
      </main>
      <Footer />
    </>
  );
}
