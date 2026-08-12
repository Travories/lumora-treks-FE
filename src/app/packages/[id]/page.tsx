import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DestinationDetail from "@/components/sections/DestinationDetail";
import CulturalDayTours from "@/components/sections/CulturalDayTours";
import { CULTURAL_TOURS } from "@/features/packages/packagesData";

/** Package detail page (`/packages/[id]`) — Figma node 141:3109. Reuses the
 * DestinationDetail section; its CTA ("Reserve Now") leads to the checkout /
 * Confirm-and-Pay flow. Content dummy; wires to Travories/Wagtail later. */
export default function PackageDetailPage() {
  return (
    <>
      <main className="flex-1">
        <Navbar />
        <DestinationDetail ctaHref="/checkout" ctaLabel="Reserve Now" />
        <CulturalDayTours initialItems={CULTURAL_TOURS} />
      </main>
      <Footer />
    </>
  );
}
