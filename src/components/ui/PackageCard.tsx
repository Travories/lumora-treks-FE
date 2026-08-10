"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import type { TravelPackage } from "@/types";

type PackageCardProps = {
  pkg: TravelPackage;
};

export default function PackageCard({ pkg }: PackageCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex w-[300px] shrink-0 flex-col overflow-hidden rounded-3xl bg-surface shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="relative h-[220px] w-full">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover"
          sizes="300px"
        />
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-text-primary">
          <Icon icon="ic:round-star" className="h-3.5 w-3.5 text-primary" />
          {pkg.rating}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <h3 className="text-lg font-bold text-text-primary">{pkg.title}</h3>

        <div className="flex items-center gap-4 text-sm text-text-muted">
          <span className="flex items-center gap-1.5">
            <Icon icon="iconoir:calendar" className="h-4 w-4 text-primary" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon icon="mdi:account-group-outline" className="h-4 w-4 text-primary" />
            {pkg.peopleCount} people
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between border-t border-border pt-3">
          <div>
            <span className="text-xl font-extrabold text-secondary">
              ${pkg.price.toFixed(2)}
            </span>
            <span className="text-sm text-text-muted">/person</span>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-secondary transition-colors hover:bg-primary-hover">
            <Icon icon="iconoir:arrow-up-right" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
