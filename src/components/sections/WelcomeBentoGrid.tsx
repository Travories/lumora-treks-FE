"use client";

import { motion } from "framer-motion";
import DestinationCard from "@/components/ui/DestinationCard";
import { useGetRegionHighlightsQuery } from "@/features/gallery/galleryApi";

export default function WelcomeBentoGrid() {
  const { data: regions = [] } = useGetRegionHighlightsQuery();

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <span className="font-script text-2xl text-primary sm:text-3xl">
          Curated Travel Experiences
        </span>
        <h2 className="mt-2 text-3xl font-extrabold text-text-primary sm:text-4xl">
          Explore the Heart of Nepal
        </h2>
        <p className="mt-4 text-base text-text-muted">
          From ancient temples to towering peaks, discover the regions that make
          Nepal an unforgettable destination.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:grid-rows-2"
      >
        {regions.map((region, index) => (
          <div
            key={region.id}
            className={
              index === 0
                ? "col-span-2 row-span-2 h-[280px] sm:h-full"
                : "h-[180px] sm:h-full"
            }
          >
            <DestinationCard
              title={region.title}
              image={region.image}
              variant={index === 0 ? "big-package" : "default"}
              className="h-full"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
