import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PaymentSuccess from "@/components/sections/PaymentSuccess";

/** Booking confirmed / payment success page (`/checkout/success`) — Figma node
 * 118:4814. Reached after checkout. Content dummy; wires to real booking later. */
export default function PaymentSuccessPage() {
  return (
    <>
      <main className="flex-1">
        <Navbar />
        <PaymentSuccess />
      </main>
      <Footer />
    </>
  );
}
