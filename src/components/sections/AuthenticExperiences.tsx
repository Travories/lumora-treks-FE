"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/** Discover Nepal Through Authentic Experiences — Figma node 63:399.
 * Puzzle-masked image on the left, heading + numbered list on the right. */

const LIST = [
  {
    n: "01",
    title: "Authentic Experiences",
    desc: "Go beyond tourist attractions and immerse yourself in local cultures, traditions, and hidden gems.",
  },
  {
    n: "02",
    title: "Hassle-Free Planning",
    desc: "From accommodations to transportation, we handle every detail so you can focus on making memories.",
  },
  {
    n: "03",
    title: "Safe & Reliable Travel",
    desc: "Enjoy peace of mind with verified travel partners, expert guidance, and dedicated support throughout your journey.",
  },
];

export default function AuthenticExperiences({
  reversed = false,
}: {
  reversed?: boolean;
} = {}) {
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
            src="/images/authentic-nepal.png"
            alt="Ancient heritage temples in Nepal"
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
            Discover Nepal Through Authentic Experiences with Us
            <span className="ml-2 inline-block size-2 rounded-full bg-primary-accent align-middle" />
          </h2>
          <p className="font-body-alt text-[clamp(1.05rem,2vw,24px)] tracking-[-0.04em] text-text-secondary">
            From the majestic Himalayas and ancient heritage sites to serene
            lakes and vibrant local cultures,{" "}
            <span className="text-[#909dad]">
              Journeyfinder helps you experience Nepal beyond the ordinary.
            </span>
          </p>

          <div className="flex flex-col gap-6">
            {LIST.map((item) => (
              <div key={item.n} className="flex gap-4">
                <span className="text-2xl font-bold tracking-[-0.04em] text-foreground">
                  {item.n}
                </span>
                <div className="flex flex-1 flex-col gap-3">
                  <h3 className="text-2xl font-bold tracking-[-0.04em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="font-body-alt text-xl tracking-[-0.04em] text-text-secondary">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
