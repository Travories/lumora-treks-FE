"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DestinationCard from "@/components/ui/DestinationCard";
import CarouselNav from "@/components/ui/CarouselNav";
import FilterTabs from "@/components/ui/FilterTabs";
import CardSkeleton from "@/components/ui/CardSkeleton";
import QueryError from "@/components/ui/QueryError";
import { useCarousel } from "@/hooks/useCarousel";
import { useDestinationsQuery } from "@/features/destinations/destinationQueries";
import type { DestinationCardData } from "@/types";

/** Our Destinations — Figma node 84:1575. Filter tabs + Embla carousel of
 * destination cards. Until the backend exposes a real destination activity
 * taxonomy, tabs switch across stable client-side groups so the UI behaves
 * like the packages page instead of being inert. */

const CATEGORIES = ["Trekking", "Sightseeing", "Paragliding"] as const;

function groupDestinationsByCategory(destinations: DestinationCardData[]) {
  return CATEGORIES.reduce<Record<string, DestinationCardData[]>>((groups, category, index) => {
    groups[category] = destinations.filter((_, itemIndex) => itemIndex % CATEGORIES.length === index);
    return groups;
  }, {});
}

export default function DestinationsGrid({
  initialItems,
}: {
  initialItems?: DestinationCardData[];
}) {
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const { data, isLoading, isError, refetch } = useDestinationsQuery();
  const destinations = data && data.length > 0 ? data : initialItems ?? [];
  const groupedDestinations = groupDestinationsByCategory(destinations);
  const visibleDestinations = groupedDestinations[category]?.length
    ? groupedDestinations[category]
    : destinations;
  const loading = isLoading && !initialItems && !data;
  const errored = isError && !initialItems && !data;

  const { emblaRef, scrollPrev, scrollNext, canPrev, canNext } = useCarousel({
    loop: true,
  });

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
      <div className="mb-10 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[clamp(1.75rem,3vw,32px)] font-bold tracking-[-0.04em] text-foreground">
            Our Destinations
          </h2>
          <CarouselNav
            className="shrink-0"
            onPrev={scrollPrev}
            onNext={scrollNext}
            prevDisabled={!canPrev}
            nextDisabled={!canNext}
          />
        </div>
        <FilterTabs
          tabs={[...CATEGORIES]}
          defaultTab={category}
          onChange={setCategory}
        />
      </div>

      {errored ? (
        <QueryError message="Couldn't load destinations." onRetry={refetch} />
      ) : loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {visibleDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="h-[397px] min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                >
                  <DestinationCard
                    image={dest.image}
                    title={dest.title}
                    price={dest.price}
                    href={dest.href || `/destinations/${dest.slug || dest.id}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
