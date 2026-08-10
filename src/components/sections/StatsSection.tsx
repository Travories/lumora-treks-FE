"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const STATS = [
  { value: "24%", label: "Repeated Business" },
  { value: "180K", label: "Guest satisfied" },
  { value: "10+", label: "Month of Working" },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[2.5rem]">
          <div className="relative min-h-[320px] w-full">
            <Image
              src="/images/stats-bg.png"
              alt="Nepal landscape statistics"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-secondary/75" />
          </div>

          <div className="absolute inset-0 grid grid-cols-1 items-center gap-10 px-6 py-16 sm:grid-cols-3 sm:px-16">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span className="text-4xl font-extrabold text-primary-accent sm:text-5xl">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-white/80 sm:text-base">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
