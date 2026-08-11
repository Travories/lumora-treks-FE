"use client";

import { motion } from "framer-motion";
import DestinationCard from "@/components/ui/DestinationCard";

/** Explore famous destinations — Figma node 34:1417. Bento grid:
 * left column (2), tall center (1), right column (2). Staggered scroll-reveal. */

const CARDS = [
  {
    image: "/images/dest-dhorpatan.png",
    title: "Dhorpatan Region",
    place: "lg:col-start-1 lg:row-start-1",
  },
  {
    image: "/images/dest-poonhills.png",
    title: "Poon Hills",
    place: "lg:col-start-2 lg:row-start-1 lg:row-span-2",
  },
  {
    image: "/images/dest-annapurna.png",
    title: "Annapurna Base Camp",
    place: "lg:col-start-3 lg:row-start-1",
  },
  {
    image: "/images/dest-chitwan.png",
    title: "Chitwan",
    place: "lg:col-start-1 lg:row-start-2",
  },
  {
    image: "/images/dest-kathmandu.png",
    title: "Kathmandu Valley",
    place: "lg:col-start-3 lg:row-start-2",
  },
];

export default function DestinationsBento() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
      <div className="mb-14 flex flex-col gap-4">
        <h2 className="text-[clamp(1.75rem,3vw,32px)] font-bold tracking-[-0.04em] text-foreground">
          Explore famous destinations
        </h2>
        <p className="font-body-alt text-[clamp(1.05rem,2vw,24px)] tracking-[-0.04em] text-text-secondary">
          Whether you&apos;re seeking mountain adventures, wildlife encounters.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:h-[570px] lg:grid-cols-3 lg:grid-rows-2">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
            className={`h-[275px] lg:h-auto ${card.place}`}
          >
            <DestinationCard image={card.image} title={card.title} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
