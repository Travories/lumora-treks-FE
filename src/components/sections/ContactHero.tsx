"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/** Contact Hero — Figma node 75:646. Puzzle image + editorial typographic block
 * ("Create Memories" / "Travel is more than a destination." / "beyond maps"). */
export default function ContactHero() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10 lg:py-16">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative aspect-[523/455] w-full max-w-[523px] shrink-0"
        >
          <Image
            src="/images/contact-hero.png"
            alt="Nepal landscapes"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 523px"
            className="object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex w-full flex-col gap-8 lg:max-w-[691px]"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <h1 className="text-[clamp(2rem,4vw,40px)] font-bold tracking-[-0.04em] text-foreground">
              Create Memories
            </h1>
            <p className="text-xl font-medium tracking-[-0.06em] text-text-secondary sm:max-w-[358px]">
              Mountains, forests, heritage sites, and hidden gems are{" "}
              <span className="italic text-[#909dad]">
                just the beginning of your next adventure.
              </span>
            </p>
          </div>

          <p className="text-[clamp(2rem,4vw,40px)] font-extrabold tracking-[-0.04em] text-foreground">
            <span className="italic text-primary-accent">Travel</span> is more
            than a destination.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
            <p className="text-xl font-medium tracking-[-0.04em] text-[#3d4c5e] sm:max-w-[370px]">
              We design meaningful travel experiences that connect you with
              nature, culture,{" "}
              <span className="italic text-[#909dad]">
                and unforgettable journey at a time.
              </span>
            </p>
            <h2 className="whitespace-nowrap text-[clamp(2rem,4vw,40px)] font-bold tracking-[-0.04em] text-foreground">
              beyond maps
              <span className="ml-2 inline-block size-2 rounded-full bg-primary-accent align-top" />
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
