import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DestinationDetail from "@/components/sections/DestinationDetail";
import CulturalDayTours from "@/components/sections/CulturalDayTours";

/** Destination detail page (`/destinations/[slug]`) — Figma node 141:3109.
 * Content is dummy for now (Kathmandu Durbar Square); wires to Wagtail later. */
export default function DestinationDetailPage() {
  return (
    <>
      <main className="flex-1">
        <Navbar />
        <DestinationDetail />
        <CulturalDayTours />
      </main>
      <Footer />
    </>
  );
}
