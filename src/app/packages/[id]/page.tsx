import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PackageDetail from "@/components/sections/PackageDetail";
import CulturalDayTours from "@/components/sections/CulturalDayTours";
import { getPackageBySlug } from "@/lib/catalog";
import { notFound } from "next/navigation";

type Params = { params: Promise<{ id: string }> };

async function loadPackage(id: string) {
  return getPackageBySlug(id);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const packageData = await loadPackage(id);
  if (!packageData) {
    return { title: "Package not found | Lumora Treks", robots: { index: false } };
  }

  const image = packageData.image?.src || packageData.image?.url;
  return {
    title: `${packageData.title} | Lumora Treks`,
    description: packageData.summary || undefined,
    alternates: { canonical: `/packages/${packageData.slug}` },
    openGraph: {
      title: packageData.title,
      description: packageData.summary || undefined,
      ...(image ? { images: [{ url: image, alt: packageData.title }] } : {}),
    },
  };
}

/** Package detail page (`/packages/[id]`) — Figma node 150:10819. Its own
 * layout (overview, gallery, things included, booking card, itinerary + map,
 * reviews), distinct from the destination detail. Booking card "Reserve Now" →
 * checkout. */
export default async function PackageDetailPage({
  params,
}: Params) {
  const { id } = await params;
  const packageData = await loadPackage(id);
  if (!packageData) notFound();

  return (
    <>
      <main className="flex-1">
        <Navbar />
        <PackageDetail
          packageData={packageData}
          reserveHref={`/enquiry?package=${encodeURIComponent(packageData.slug)}`}
        />
        <CulturalDayTours />
      </main>
      <Footer />
    </>
  );
}
