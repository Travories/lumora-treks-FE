import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DestinationDetail from "@/components/sections/DestinationDetail";
import CulturalDayTours from "@/components/sections/CulturalDayTours";

/** Package detail page (`/packages/[id]`) — Figma node 141:3109. Reuses the
 * DestinationDetail section; its CTA leads to the package enquiry form. Content
 * dummy (Kathmandu Durbar Square); wires to Travories/Wagtail later. */
export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <main className="flex-1">
        <Navbar />
        <DestinationDetail enquiryHref={`/packages/${id}/enquiry`} />
        <CulturalDayTours />
      </main>
      <Footer />
    </>
  );
}
