import type { ComponentType } from "react";
import Hero from "@/components/sections/Hero";
import IntroStats from "@/components/sections/IntroStats";
import PopularPackages from "@/components/sections/PopularPackages";
import PackageGrid from "@/components/sections/PackageGrid";
import ExperienceSection from "@/components/sections/ExperienceSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import DestinationsBento from "@/components/sections/DestinationsBento";
import AuthenticExperiences from "@/components/sections/AuthenticExperiences";
import CTABand from "@/components/sections/CTABand";
import FAQSection from "@/components/sections/FAQSection";

/**
 * Maps a Wagtail block's `component` (`block.value.component` — PascalCase,
 * set by every `SectionBlock` in the backend's `apps/cms/blocks/sections.py`)
 * to its React section component. `<BlockRenderer>` looks up this map and
 * spreads the rest of `block.value` as props.
 *
 * NOT every backend block has a frontend match yet — these still need a
 * component built (unregistered here; BlockRenderer skips them with a dev
 * warning rather than crashing): HeaderCard, FeaturesList, Testimonial,
 * TestimonialsCarousel, StatsSection, RichTextSection, Gallery, VideoSection,
 * LeadForm, Spacer, EmbedSection.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const blockRegistry: Record<string, ComponentType<any>> = {
  Hero: Hero,
  IntroStats: IntroStats,
  PopularPackages: PopularPackages,
  PackageGrid: PackageGrid,
  ExperienceSection: ExperienceSection,
  WhyChooseUs: WhyChooseUs,
  BentoGrid: DestinationsBento,
  AuthenticExperiences: AuthenticExperiences,
  CTABanner: CTABand,
  FAQSection: FAQSection,
};
