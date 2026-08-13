import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PackageDetail from "@/components/sections/PackageDetail";
import CulturalDayTours from "@/components/sections/CulturalDayTours";
import { getPackageBySlug } from "@/lib/catalog";

type Params = { params: Promise<{ slug: string; code: string }> };

async function loadPackage(slug: string, code: string) {
  const packageData = await getPackageBySlug(slug);
  return packageData?.public_code === code ? packageData : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, code } = await params;
  const packageData = await loadPackage(slug, code);
  if (!packageData) return { title: "Package not found | Lumora Treks", robots: { index: false } };
  const image = packageData.image?.src || packageData.image?.url;
  return {
    title: `${packageData.title} | Lumora Treks`,
    description: packageData.summary || undefined,
    alternates: { canonical: `/packages/${packageData.slug}/${packageData.public_code}` },
    openGraph: { title: packageData.title, description: packageData.summary || undefined, ...(image ? { images: [{ url: image, alt: packageData.title }] } : {}) },
  };
}

export default async function CanonicalPackageDetailPage({ params }: Params) {
  const { slug, code } = await params;
  const packageData = await loadPackage(slug, code);
  if (!packageData) notFound();
  return <><main className="flex-1"><Navbar /><PackageDetail packageData={packageData} reserveHref={`/enquiry?package=${encodeURIComponent(packageData.slug)}`} /><CulturalDayTours /></main><Footer /></>;
}
