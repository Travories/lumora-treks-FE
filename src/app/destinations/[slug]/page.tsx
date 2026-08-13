import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DestinationDetail from "@/components/sections/DestinationDetail";
import CulturalDayTours from "@/components/sections/CulturalDayTours";
import { getDestinationBySlug } from "@/lib/catalog";
import { notFound } from "next/navigation";

type Params = { params: Promise<{ slug: string }> };

async function loadDestination(slug: string) {
  return getDestinationBySlug(slug);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const destination = await loadDestination(slug);
  if (!destination) {
    return { title: "Destination not found | Lumora Treks", robots: { index: false } };
  }

  const image = destination.image?.src || destination.image?.url;
  return {
    title: `${destination.title} | Lumora Treks`,
    description: destination.subtitle || destination.description || undefined,
    alternates: { canonical: `/destinations/${destination.slug}` },
    openGraph: {
      title: destination.title,
      description: destination.subtitle || destination.description || undefined,
      ...(image ? { images: [{ url: image, alt: destination.title }] } : {}),
    },
  };
}

/** Destination detail page (`/destinations/[slug]`) backed by the catalog CMS. */
export default async function DestinationDetailPage({
  params,
}: Params) {
  const { slug } = await params;
  const destination = await loadDestination(slug);
  if (!destination) notFound();

  return (
    <>
      <main className="flex-1">
        <Navbar />
        <DestinationDetail destination={destination} />
        <CulturalDayTours />
      </main>
      <Footer />
    </>
  );
}
