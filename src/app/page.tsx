import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import IntroStats from "@/components/sections/IntroStats";
import PopularPackages from "@/components/sections/PopularPackages";
import ExperienceSection from "@/components/sections/ExperienceSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import WelcomeBentoGrid from "@/components/sections/WelcomeBentoGrid";
import FeaturesList from "@/components/sections/FeaturesList";
import Testimonial from "@/components/sections/Testimonial";
import FAQSection from "@/components/sections/FAQSection";
import StatsSection from "@/components/sections/StatsSection";
import SeasonalDestinationsBentoGrid from "@/components/sections/SeasonalDestinationsBentoGrid";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <IntroStats />
        <PopularPackages />
        <ExperienceSection />
        <WhyChooseUs />
        <WelcomeBentoGrid />
        <FeaturesList />
        <Testimonial />
        <FAQSection />
        <StatsSection />
        <SeasonalDestinationsBentoGrid />
      </main>
      <Footer />
    </>
  );
}
