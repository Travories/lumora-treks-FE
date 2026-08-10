"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const FEATURES = [
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

export default function FeaturesList() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto aspect-square w-full max-w-[420px]"
        >
          <Image
            src="/images/features-decorative.png"
            alt="Nepal travel collage"
            fill
            className="object-contain"
            sizes="420px"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-7"
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-extrabold leading-tight text-text-primary sm:text-4xl">
              Discover Nepal Through Authentic Experiences with Us
            </h2>
            <p className="text-base text-text-muted sm:text-lg">
              From the majestic Himalayas and ancient heritage sites to
              serene lakes and vibrant local cultures,{" "}
              <span className="italic text-text-secondary">
                Journeyfinder helps you experience Nepal beyond the ordinary.
              </span>
            </p>
          </div>

          <div className="flex flex-col divide-y divide-border">
            {FEATURES.map((feature) => (
              <div key={feature.number} className="flex gap-4 py-5 first:pt-0">
                <span className="text-2xl font-bold text-text-primary">
                  {feature.number}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-base text-text-muted">
                    {feature.description}
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
