import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PackageEnquiry from "@/components/sections/PackageEnquiry";

/** Package enquiry page (`/packages/[id]/enquiry`) — reached from a package
 * detail's "Enquire Now". Presentational form; content dummy for now. */
export default function PackageEnquiryPage() {
  return (
    <>
      <main className="flex-1">
        <Navbar />
        <PackageEnquiry />
      </main>
      <Footer />
    </>
  );
}
