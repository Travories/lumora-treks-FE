"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "24K+", label: "Happy Travelers" },
  { value: "120", label: "Cured Destinations" },
  { value: "4.9", label: "Overall Ratings" },
];

export default function IntroStats() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold leading-tight text-text-primary sm:text-4xl lg:text-5xl"
      >
        We&apos;ve helped thousands of travelers discover{" "}
        <span className="italic text-primary">unforgettable journeys</span> across
        the world
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto mt-6 max-w-3xl text-base text-text-secondary sm:text-lg"
      >
        From iconic landmarks to hidden gems, we curate authentic travel
        experiences that inspire exploration, create lasting memories,{" "}
        <span className="italic text-text-muted">
          and make every journey seamless from start to finish.
        </span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-14 flex flex-wrap items-center justify-center gap-x-16 gap-y-8"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1">
            <span className="text-4xl font-extrabold text-text-primary sm:text-5xl">
              {stat.value}
            </span>
            <span className="text-sm italic text-text-secondary sm:text-base">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
