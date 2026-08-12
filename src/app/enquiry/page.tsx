import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PackageEnquiry from "@/components/sections/PackageEnquiry";
import { getPackageBySlug } from "@/lib/catalog";

/** Enquiry page (`/enquiry`) — general enquiry form, reached from "Reserve Now".
 * Presentational; content dummy for now. */
export default async function EnquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const { package: packageSlug } = await searchParams;
  const packageData = packageSlug ? await getPackageBySlug(packageSlug) : null;

  return (
    <>
      <main className="flex-1">
        <Navbar />
        <PackageEnquiry packageData={packageData ?? undefined} />
      </main>
      <Footer />
    </>
  );
}
