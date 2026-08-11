import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactHero from "@/components/sections/ContactHero";
import ContactForm from "@/components/sections/ContactForm";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import AuthenticExperiences from "@/components/sections/AuthenticExperiences";
import FAQSection from "@/components/sections/FAQSection";

/** Contact Us page (`/contact`) — Figma node 75:144. New: ContactHero,
 * ContactForm. Reuses WhyChooseUs, AuthenticExperiences (mirrored), FAQSection. */
export default function ContactPage() {
  return (
    <>
      <main className="flex-1">
        <Navbar />
        <ContactHero />
        <ContactForm />
        <WhyChooseUs />
        <AuthenticExperiences reversed />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
