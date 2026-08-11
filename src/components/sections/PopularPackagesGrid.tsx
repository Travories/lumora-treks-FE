"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PackageCard from "@/components/ui/PackageCard";
import CarouselNav from "@/components/ui/CarouselNav";
import FilterTabs from "@/components/ui/FilterTabs";
import Pagination from "@/components/ui/Pagination";
import CardSkeleton from "@/components/ui/CardSkeleton";
import QueryError from "@/components/ui/QueryError";
import { useGetPackagesQuery } from "@/features/packages/packagesApi";

/** Popular Packages — Figma node 83:656. Header + filter tabs + card grid +
 * pagination. Tabs filter by category; a `searchLocation` (from the SearchBar,
 * read off the URL) overrides the tabs and filters by title. Dummy data. */

const CATEGORIES = ["Trekking", "Sightseeing", "Paragliding"];
const PAGE_SIZE = 6;

export default function PopularPackagesGrid({
  searchLocation,
}: {
  searchLocation?: string;
}) {
  const router = useRouter();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [page, setPage] = useState(1);

  // Reset to page 1 when a new search arrives.
  useEffect(() => setPage(1), [searchLocation]);

  const { data, isLoading, isError, refetch } = useGetPackagesQuery({
    category: searchLocation ? undefined : category,
    location: searchLocation,
    page,
    pageSize: PAGE_SIZE,
  });
  const packages = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleCategory = (next: string) => {
    setCategory(next);
    setPage(1);
    if (searchLocation) router.push("/packages"); // leave search mode
  };

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
      <div className="mb-10 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[clamp(1.75rem,3vw,32px)] font-bold tracking-[-0.04em] text-foreground">
            Popular Packages
          </h2>
          <CarouselNav
            className="shrink-0"
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
            prevDisabled={page === 1}
            nextDisabled={page >= totalPages}
          />
        </div>
        <FilterTabs
          tabs={CATEGORIES}
          defaultTab={category}
          onChange={handleCategory}
        />
        {searchLocation && (
          <p className="font-body-alt text-base text-text-secondary">
            Showing results for{" "}
            <span className="font-semibold text-foreground">
              “{searchLocation}”
            </span>{" "}
            <button
              type="button"
              onClick={() => router.push("/packages")}
              className="text-primary underline"
            >
              clear
            </button>
          </p>
        )}
      </div>

      {isError ? (
        <QueryError message="Couldn't load packages." onRetry={refetch} />
      ) : isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : packages.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: (i % 3) * 0.1 }}
            >
              <PackageCard {...pkg} href={`/packages/${pkg.id}`} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="py-16 text-center font-body-alt text-lg text-text-secondary">
          No packages found
          {searchLocation ? ` for “${searchLocation}”` : ""}.
        </p>
      )}

      <Pagination
        className="mt-12"
        page={page}
        pages={totalPages}
        onChange={setPage}
      />
    </section>
  );
}
