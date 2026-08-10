"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import DestinationCard from "@/components/ui/DestinationCard";

const SMALL_CARDS = [
  { id: "dhorpatan", title: "Dhorpatan Region", image: "/images/experience-dhorpatan.png" },
  { id: "patan", title: "Patan", image: "/images/experience-patan.png" },
  { id: "pokhara", title: "Pokhara", image: "/images/experience-pokhara.png" },
];

export default function ExperienceSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_480px]"
      >
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <div className="relative inline-block">
              <h2 className="text-3xl font-extrabold leading-tight text-text-primary sm:text-4xl">
                Discover the soul of Nepal with major hospitality of Lumora
                Treks
              </h2>
            </div>
            <p className="max-w-2xl text-base text-text-muted sm:text-lg">
              From the snow-capped Himalayas to ancient heritage cities and
              lush wildlife reserves, every destination is carefully selected
              to{" "}
              <span className="italic text-text-secondary">
                offer authentic experiences, breathtaking scenery, and
                unforgettable memories.
              </span>
            </p>
            <div className="flex items-center gap-3">
              <button
                aria-label="Previous"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-text-primary transition-colors hover:bg-primary hover:text-secondary"
              >
                <Icon icon="iconoir:arrow-left" className="h-5 w-5" />
              </button>
              <button
                aria-label="Next"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-secondary transition-colors hover:bg-primary-hover"
              >
                <Icon icon="iconoir:arrow-right" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {SMALL_CARDS.map((card) => (
              <div key={card.id} className="h-[220px]">
                <DestinationCard title={card.title} image={card.image} className="h-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="h-[420px] lg:h-full">
          <DestinationCard
            title="Rara Lake"
            image="/images/destination-card-default.png"
            variant="big-package"
            description="Escape into Nepal's only hunting reserve, where rolling alpine meadows, peaceful villages, and panoramic mountain views create the perfect off-the-beaten-path adventure."
            className="h-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
