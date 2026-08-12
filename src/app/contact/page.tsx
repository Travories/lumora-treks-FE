import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactHero from "@/components/sections/ContactHero";
import ContactForm from "@/components/sections/ContactForm";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import AuthenticExperiences from "@/components/sections/AuthenticExperiences";
import FAQSection from "@/components/sections/FAQSection";
import BlockRenderer from "@/components/BlockRenderer";
import { getPageByPath } from "@/lib/cms";

/** Contact Us page (`/contact`) — Figma node 75:144. New: ContactHero,
 * ContactForm. Reuses WhyChooseUs, AuthenticExperiences (mirrored), FAQSection. */
export default async function ContactPage() {
  const page = await getPageByPath("/contact");

  return (
    <>
      <main className="flex-1">
        <Navbar />
        {page?.body && page.body.length > 0 ? (
          <BlockRenderer blocks={page.body} />
        ) : (
          <>
            <ContactHero />
            <ContactForm />
            <WhyChooseUs />
            <AuthenticExperiences reversed />
            <FAQSection />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

