"use client";

import { motion } from "framer-motion";

/** Intro + stats — Figma node 49:561 ("Content Section"). Static in Figma; a
 * subtle scroll-reveal is added here for polish. */

const STATS = [
  { value: "24K+", label: "Happy Travelers" },
  { value: "120", label: "Cured Destinations" },
  { value: "4.9", label: "Overall Ratings" },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
};

export default function IntroStats() {
  return (
    <section className="px-6 py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-10 text-center">
        <motion.div
          {...reveal}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-5"
        >
          <h2 className="text-[clamp(1.75rem,4vw,40px)] font-bold leading-tight tracking-[-0.04em] text-foreground">
            We&apos;ve helped thousands of travelers
            <br className="hidden md:block" />{" "}
            discover{" "}
            <span className="italic text-primary-accent">
              unforgettable journeys
            </span>{" "}
            across the world
          </h2>

          <p className="max-w-[840px] font-body-alt text-[clamp(1.05rem,2.2vw,24px)] font-medium leading-snug tracking-[-0.04em] text-text-secondary">
            From iconic landmarks to hidden gems, we curate authentic travel
            experiences that inspire exploration, create lasting memories,{" "}
            <span className="italic text-[#909dad]">
              and make every journey seamless from start to finish.
            </span>
          </p>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="flex flex-wrap items-start justify-center gap-x-20 gap-y-8"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-[40px] font-bold leading-tight tracking-[-0.04em] text-foreground">
                {stat.value}
              </span>
              <span className="text-xl font-medium italic tracking-[-0.04em] text-text-secondary">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
