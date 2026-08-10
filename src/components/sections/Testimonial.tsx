"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export default function Testimonial() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[2.5rem]">
          <div className="relative min-h-[420px] w-full">
            <Image
              src="/images/testimonial-bg.png"
              alt="Traveler in Nepal"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-secondary/70" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-16 text-center sm:px-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4 }}
              className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-secondary"
            >
              <Icon icon="mdi:format-quote-close" className="h-7 w-7" />
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-3xl text-2xl font-semibold leading-snug text-white sm:text-3xl"
            >
              Traveling with{" "}
              <span className="text-primary-accent">Lumora Treks</span> was the
              best decision we made this year — every trail, every sunrise, and
              every local story felt like it was{" "}
              <span className="text-primary-accent">made just for us</span>.
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-8 flex flex-col items-center gap-1"
            >
              <span className="text-base font-bold text-white">Sarah Whitman</span>
              <span className="text-sm text-white/60">Everest Base Camp Trekker</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
