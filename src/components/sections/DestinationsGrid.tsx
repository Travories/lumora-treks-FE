"use client";

import { motion } from "framer-motion";
import DestinationCard from "@/components/ui/DestinationCard";
import CarouselNav from "@/components/ui/CarouselNav";
import CardSkeleton from "@/components/ui/CardSkeleton";
import QueryError from "@/components/ui/QueryError";
import { useCarousel } from "@/hooks/useCarousel";
import { useDestinationsQuery } from "@/features/destinations/destinationQueries";
import type { DestinationCardData } from "@/types";

/** CMS destination carousel. Destinations are places, not package categories. */

export default function DestinationsGrid({
  initialItems,
}: {
  initialItems?: DestinationCardData[];
}) {
  const { data, isLoading, isError, refetch } = useDestinationsQuery();
  const destinations = data ?? initialItems ?? [];
  const loading = isLoading && !data && !initialItems;
  const errored = isError && !data && !initialItems;

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
      </div>

      {errored ? (
        <QueryError message="Couldn't load destinations." onRetry={refetch} />
      ) : loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : destinations.length === 0 ? (
        <p className="py-16 text-center font-body-alt text-lg text-text-secondary">
          No destinations are available yet.
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {destinations.map((dest) => (
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
