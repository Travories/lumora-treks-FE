import type { ComponentType } from "react";
import Hero from "@/components/sections/Hero";
import IntroStats from "@/components/sections/IntroStats";
import PopularPackages from "@/components/sections/PopularPackages";
import ExperienceSection from "@/components/sections/ExperienceSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import DestinationsBento from "@/components/sections/DestinationsBento";
import AuthenticExperiences from "@/components/sections/AuthenticExperiences";
import CTABand from "@/components/sections/CTABand";
import FAQSection from "@/components/sections/FAQSection";

/**
 * Maps a Wagtail StreamField block `type` → its React section component.
 * `<BlockRenderer>` renders `registry[block.type]` and spreads `block.value` as
 * props. Keep these keys in sync with the StreamField block names in the Wagtail
 * (backend) repo and the mock in `src/lib/cms.ts`.
 *
 * Editorial (CMS-driven) blocks and data blocks (which fetch their own data via
 * RTK Query) both register here.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const blockRegistry: Record<string, ComponentType<any>> = {
  hero: Hero,
  intro_stats: IntroStats,
  package_grid: PopularPackages,
  experience: ExperienceSection,
  why_choose_us: WhyChooseUs,
  destinations_bento: DestinationsBento,
  authentic_experiences: AuthenticExperiences,
  cta_band: CTABand,
  faq: FAQSection,
};
