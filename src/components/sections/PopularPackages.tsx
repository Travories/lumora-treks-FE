"use client";

import { motion } from "framer-motion";
import EmblaCarousel from "@/components/ui/EmblaCarousel";
import PackageCard from "@/components/ui/PackageCard";
import { useGetPopularPackagesQuery } from "@/features/packages/packagesApi";

export default function PopularPackages() {
  const { data: packages = [] } = useGetPopularPackagesQuery();

  return (
    <section id="packages" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <span className="font-script text-2xl text-primary sm:text-3xl">
          Handpicked For You
        </span>
        <h2 className="mt-2 text-3xl font-extrabold text-text-primary sm:text-4xl">
          Popular Packages
        </h2>
        <p className="mt-4 text-base text-text-muted">
          Explore our most loved travel packages, crafted for adventurers who want
          more than just a trip.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <EmblaCarousel>
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </EmblaCarousel>
      </motion.div>
    </section>
  );
}
