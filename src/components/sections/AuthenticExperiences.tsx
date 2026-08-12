"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { withHighlight } from "@/lib/highlightText";
import type { CmsImage } from "@/lib/blocks";

/** Discover Nepal Through Authentic Experiences — Figma node 63:399.
 * Puzzle-masked image on the left, heading + numbered list on the right.
 *
 * Props mirror the backend `AuthenticExperiencesBlock`
 * (apps/cms/blocks/sections.py) — defaults are the original Figma copy so
 * this renders unchanged when called directly (no CMS data). */

export type AuthenticExperienceItem = {
  number?: string;
  title: string;
  description?: string;
};

const DEFAULT_ITEMS: AuthenticExperienceItem[] = [
  {
    number: "01",
    title: "Authentic Experiences",
    description:
      "Go beyond tourist attractions and immerse yourself in local cultures, traditions, and hidden gems.",
  },
  {
    number: "02",
    title: "Hassle-Free Planning",
    description:
      "From accommodations to transportation, we handle every detail so you can focus on making memories.",
  },
  {
    number: "03",
    title: "Safe & Reliable Travel",
    description:
      "Enjoy peace of mind with verified travel partners, expert guidance, and dedicated support throughout your journey.",
  },
];

export default function AuthenticExperiences({
  heading = "Discover Nepal Through Authentic Experiences with Us",
  description = "From the majestic Himalayas and ancient heritage sites to serene lakes and vibrant local cultures, Journeyfinder helps you experience Nepal beyond the ordinary.",
  description_highlight = "Journeyfinder helps you experience Nepal beyond the ordinary.",
  image,
  items = DEFAULT_ITEMS,
  reversed = false,
}: {
  heading?: string;
  description?: string;
  description_highlight?: string;
  image?: CmsImage;
  items?: AuthenticExperienceItem[];
  reversed?: boolean;
} = {}) {
  const imageSrc = image?.url || "/images/authentic-nepal.png";
  const imageAlt = image?.alt || "Ancient heritage temples in Nepal";

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
      <div
        className={`flex flex-col items-center gap-10 lg:gap-16 ${
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative aspect-square w-full max-w-[523px] shrink-0"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 523px"
            className="object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-1 flex-col gap-7"
        >
          <h2 className="text-[clamp(1.75rem,3vw,32px)] font-bold leading-[1.4] tracking-[-0.04em] text-foreground">
            {heading}
            <span className="ml-2 inline-block size-2 rounded-full bg-primary-accent align-middle" />
          </h2>
          {description && (
            <p className="font-body-alt text-[clamp(1.05rem,2vw,24px)] tracking-[-0.04em] text-text-secondary">
              {withHighlight(description, description_highlight, "text-[#909dad]")}
            </p>
          )}

          <div className="flex flex-col gap-6">
            {items.map((item, index) => (
              <div key={item.title} className="flex gap-4">
                <span className="text-2xl font-bold tracking-[-0.04em] text-foreground">
                  {item.number || String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 flex-col gap-3">
                  <h3 className="text-2xl font-bold tracking-[-0.04em] text-foreground">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="font-body-alt text-xl tracking-[-0.04em] text-text-secondary">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
