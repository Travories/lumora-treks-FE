"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";

const SERVICE_BLOCKS = [
  {
    id: "curated-destinations",
    theme: "light" as const,
    heading: "Curated Destinations",
    description:
      "Every destination is handpicked to showcase the best of nature, culture, and adventure, ensuring every trip is truly unforgettable.",
    image: "/images/why-circle-1.png",
  },
  {
    id: "seamless-planning",
    theme: "dark" as const,
    heading: "Seamless Travel Planning",
    description:
      "From personalized itineraries and accommodations to transportation and local experiences, we handle every detail so you can simply enjoy the journey.",
    image: "/images/why-circle-2.png",
  },
  {
    id: "trusted-expertise",
    theme: "light" as const,
    heading: "Trusted Local Expertise",
    description:
      "Travel with confidence through experienced local guides, reliable partners, and insider recommendations that help you discover destinations like never before.",
    image: "/images/why-circle-3.png",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-14 max-w-3xl text-center"
      >
        <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
          Why Lumora Treks?
        </h2>
        <p className="mt-4 text-base text-text-muted sm:text-lg">
          We make every journey effortless, memorable, and uniquely yours.
          From carefully curated destinations to trusted local expertise,{" "}
          <span className="italic text-text-secondary">
            we&apos;re committed to delivering travel experiences that go
            beyond expectations.
          </span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {SERVICE_BLOCKS.map((block, index) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={clsx(
              "relative flex h-[360px] flex-col items-center justify-center gap-8 overflow-hidden rounded-3xl px-8 py-14 text-center",
              block.theme === "dark" ? "bg-secondary" : "bg-surface"
            )}
          >
            <div className="absolute -top-24 left-1/2 h-[266px] w-[264px] -translate-x-1/2 rotate-[39deg]">
              <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 shadow-[-4px_4px_12px_0px_rgba(18,136,67,0.12)]">
                <Image src={block.image} alt="" fill className="object-cover" sizes="264px" />
              </div>
            </div>

            <h3
              className={clsx(
                "text-2xl font-bold",
                block.theme === "dark" ? "text-white" : "text-text-primary"
              )}
            >
              {block.heading.split(" ").map((word, i) =>
                i === block.heading.split(" ").length - 1 ? (
                  <span key={i} className="italic text-primary">
                    {word}
                  </span>
                ) : (
                  `${word} `
                )
              )}
            </h3>
            <p
              className={clsx(
                "text-sm leading-relaxed",
                block.theme === "dark" ? "text-white/70" : "text-text-muted"
              )}
            >
              {block.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
