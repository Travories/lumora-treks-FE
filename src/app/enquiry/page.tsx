import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PackageEnquiry from "@/components/sections/PackageEnquiry";

/** Enquiry page (`/enquiry`) — general enquiry form, reached from "Reserve Now".
 * Presentational; content dummy for now. */
export default function EnquiryPage() {
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
