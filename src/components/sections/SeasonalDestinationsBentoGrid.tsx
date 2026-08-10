"use client";

import { motion } from "framer-motion";
import DestinationCard from "@/components/ui/DestinationCard";
import { useGetSeasonalDestinationsQuery } from "@/features/gallery/galleryApi";

const GRID_POSITION_CLASSES = [
  "sm:col-span-1 sm:row-span-2",
  "sm:col-span-1 sm:row-span-2",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
];

export default function SeasonalDestinationsBentoGrid() {
  const { data: destinations = [] } = useGetSeasonalDestinationsQuery();

  return (
    <section id="destinations" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <span className="font-script text-2xl text-primary sm:text-3xl">
          Most Visit Destinations in Nepal
        </span>
        <h2 className="mt-2 text-3xl font-extrabold text-text-primary sm:text-4xl">
          Seasonal Special Destinations
        </h2>
        <p className="mt-4 text-base text-text-muted">
          Handpicked getaways that shine brightest depending on the season you
          choose to travel.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:grid-rows-2 sm:h-[440px]"
      >
        {destinations.map((destination, index) => (
          <div
            key={destination.id}
            className={`h-[180px] sm:h-full ${GRID_POSITION_CLASSES[index] ?? ""}`}
          >
            <DestinationCard
              title={destination.title}
              image={destination.image}
              variant="package-card"
              className="h-full"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
