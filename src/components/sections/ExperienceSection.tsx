"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import CarouselNav from "@/components/ui/CarouselNav";
import { withHighlight } from "@/lib/highlightText";
import type { CmsImage } from "@/lib/blocks";

/** Experience Section — Figma node 49:449.
 *
 * Props mirror the backend `ExperienceShowcaseBlock`
 * (apps/cms/blocks/sections.py) — `small_cards`/`feature_card` mirror
 * `DestinationCardBlock` (title/image/href, destination-snippet fallback
 * already resolved server-side). Defaults are the original Figma copy. */

export type ExperienceCard = {
  title: string;
  image?: CmsImage;
  href?: string;
  description?: string;
};

const DEFAULT_SMALL_CARDS: ExperienceCard[] = [
  { image: { url: "/images/exp-dhorpatan.png" }, title: "Dhorpatan Region" },
  { image: { url: "/images/exp-patan.png" }, title: "Patan" },
  { image: { url: "/images/exp-pokhara.png" }, title: "Pokhara" },
];

const DEFAULT_FEATURE_CARD: ExperienceCard = {
  image: { url: "/images/exp-big.png" },
  title: "Dhorpatan Region",
  description:
    "Escape into Nepal's only hunting reserve, where rolling alpine meadows, peaceful villages, and panoramic mountain views create the perfect off-the-beaten-path adventure.",
};

export default function ExperienceSection({
  heading = "Discover the soul of Nepal with with major hospitality of Lumora Treks",
  description = "From the snow-capped Himalayas to ancient heritage cities and lush wildlife reserves, every destination is carefully selected to offer authentic experiences, breathtaking scenery, and unforgettable memories.",
  description_highlight = "offer authentic experiences, breathtaking scenery, and unforgettable memories.",
  show_arrows = true,
  small_cards = DEFAULT_SMALL_CARDS,
  feature_card = DEFAULT_FEATURE_CARD,
}: {
  heading?: string;
  description?: string;
  description_highlight?: string;
  show_arrows?: boolean;
  small_cards?: ExperienceCard[];
  feature_card?: ExperienceCard;
} = {}) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-6">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-1 flex-col gap-10 lg:gap-16"
        >
          <div className="flex flex-col gap-6">
            <h2 className="text-[clamp(1.75rem,3vw,32px)] font-bold leading-[1.35] tracking-[-0.04em] text-foreground">
              {heading}
              <span className="ml-2 inline-block size-2 rounded-full bg-primary-accent align-middle" />
            </h2>
            {description && (
              <p className="font-body-alt text-[clamp(1.05rem,2vw,24px)] leading-snug tracking-[-0.04em] text-text-secondary">
                {withHighlight(description, description_highlight, "italic text-[#909dad]")}
              </p>
            )}
            {show_arrows && <CarouselNav />}
          </div>

          {/* Small destination cards */}
          <div className="grid flex-1 grid-cols-3 gap-4">
            {small_cards.map((card) => (
              <div
                key={card.title}
                className="relative flex min-h-[200px] items-end justify-center overflow-hidden rounded-2xl p-5"
              >
                <Image
                  src={card.image?.url || "/images/destination-card-default.png"}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 33vw, 220px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />
                <span className="relative truncate text-center text-lg font-semibold tracking-[-0.04em] text-text-inverse">
                  {card.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — big feature card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative flex h-[420px] flex-col justify-end overflow-hidden rounded-2xl p-6 lg:h-auto lg:w-[622px] lg:shrink-0"
        >
          <Image
            src={feature_card.image?.url || "/images/destination-card-default.png"}
            alt={feature_card.title}
            fill
            sizes="(max-width: 1024px) 100vw, 622px"
            className="object-cover"
          />
          <div className="relative flex flex-col gap-6 rounded-lg bg-background p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="truncate text-xl font-bold tracking-[-0.04em] text-foreground">
                  {feature_card.title}
                </h3>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground">
                  <Icon icon="iconoir:arrow-up-right" className="size-4 text-background" />
                </span>
              </div>
              {feature_card.description && (
                <p className="font-body-alt text-base tracking-[-0.04em] text-text-secondary">
                  {feature_card.description}
                </p>
              )}
            </div>
            {/* progress dots — decorative, not CMS data */}
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-6 rounded-full bg-primary-accent" />
              <span className="h-1 w-4 rounded-full bg-border" />
              <span className="h-1 w-4 rounded-full bg-border" />
              <span className="h-1 w-4 rounded-full bg-border" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
