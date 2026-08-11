import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Checkout from "@/components/sections/Checkout";

/** Checkout / payment page (`/checkout`) — Figma node 118:4743. Reached from a
 * package's Reserve Now. Content dummy; wires to Travories/payment later. */
export default function CheckoutPage() {
  return (
    <>
      <main className="flex-1">
        <Navbar />
        <Checkout />
      </main>
      <Footer />
    </>
  );
}
