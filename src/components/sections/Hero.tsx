"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";

const SLIDES = [
  { image: "/images/hero.png", alt: "Nepal mountain landscape" },
  { image: "/images/region-everest.png", alt: "Everest region peaks" },
  { image: "/images/region-annapurna.png", alt: "Annapurna region trail" },
];

// Stylized jagged skyline used to mask the heading behind a mountain cutout.
// Reuses each slide's own image for the cutout layer, so the texture always
// matches — no separate transparent asset is needed.
const MOUNTAIN_CLIP =
  "polygon(0% 100%, 0% 78%, 8% 65%, 16% 72%, 24% 50%, 30% 68%, 38% 42%, 46% 60%, 54% 38%, 62% 58%, 70% 46%, 78% 64%, 86% 52%, 94% 70%, 100% 60%, 100% 100%)";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = (direction: 1 | -1) => {
    setActiveSlide((prev) => (prev + direction + SLIDES.length) % SLIDES.length);
  };

  return (
    <section className="relative">
      <div className="relative h-140 w-full overflow-hidden rounded-b-[2.5rem] sm:h-160 lg:h-180">
        {/* Background layer */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`bg-${activeSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={SLIDES[activeSlide].image}
              alt={SLIDES[activeSlide].alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Heading — sits between the background and the mountain cutout above it */}
        <motion.h1
          initial={{ opacity: 0, y: 140 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-6 top-8 z-10 max-w-3xl text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground sm:top-10 sm:text-7xl lg:left-12 lg:top-12 lg:text-8xl"
        >
          Travel beyond destinations
        </motion.h1>

        {/* Foreground mountain cutout — same photo, clipped to a skyline shape,
            so the peaks visually sit in front of the heading text */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`fg-${activeSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 z-20"
            style={{ clipPath: MOUNTAIN_CLIP }}
          >
            <Image
              src={SLIDES[activeSlide].image}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => goToSlide(-1)}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-secondary shadow-lg transition-transform hover:scale-105 sm:left-6"
        >
          <Icon icon="iconoir:nav-arrow-left" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => goToSlide(1)}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-secondary shadow-lg transition-transform hover:scale-105 sm:right-6"
        >
          <Icon icon="iconoir:nav-arrow-right" className="h-5 w-5" />
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute inset-x-0 bottom-6 z-30 flex justify-center px-6"
        >
          <div className="flex w-full max-w-3xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-xl sm:flex-row sm:items-center sm:rounded-full">
            <div className="flex flex-1 items-center gap-3 px-4 py-2">
              <Icon icon="proicons:location" className="h-5 w-5 shrink-0 text-primary" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-text-muted">Location</span>
                <input
                  type="text"
                  placeholder="Where to go?"
                  className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                />
              </div>
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />

            <div className="flex flex-1 items-center gap-3 px-4 py-2">
              <Icon icon="iconoir:calendar" className="h-5 w-5 shrink-0 text-primary" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-text-muted">Date</span>
                <input
                  type="text"
                  placeholder="Add dates"
                  className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                />
              </div>
            </div>

            <Button variant="primary" size="md" className="w-full sm:w-auto">
              <Icon icon="mingcute:search-line" className="h-5 w-5" />
              Search
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
