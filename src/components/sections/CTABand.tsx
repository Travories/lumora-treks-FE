"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/** "Create memories" CTA band — Figma node 59:2049. Forest bg + dark overlay,
 * heading that rises from BEHIND the foreground tree layer (Figma motion), and a
 * Reserve Now pill. Mirrors the hero's bg/foreground layering trick. */
export default function CTABand() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-8">
      <div className="relative aspect-[1390/753] min-h-[420px] overflow-hidden rounded-[28px]">
        <Image
          src="/images/cta-bg.png"
          alt="Misty forest"
          fill
          sizes="(max-width: 1440px) 100vw, 1390px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Heading — behind the foreground trees, rises into place */}
        <motion.h2
          initial={{ y: 64, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 top-[28%] z-10 px-6 text-center text-[clamp(1.75rem,5vw,50px)] font-bold leading-[1.1] tracking-[-0.04em] text-foreground"
        >
          Create memories that stay with you
          <br className="hidden sm:block" /> long after the{" "}
          <span className="italic text-primary-accent">Journey</span> Ends
        </motion.h2>

        {/* Foreground tree cutout — in front of the heading */}
        <Image
          src="/images/cta-foreground.png"
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 1440px) 100vw, 1390px"
          className="pointer-events-none z-20 object-cover"
        />

        {/* Reserve Now — on top of everything */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
          className="absolute inset-x-0 top-[52%] z-30 flex justify-center px-6"
        >
          <Link
            href="/enquiry"
            className="inline-flex items-center justify-center rounded-full bg-background px-6 py-4 font-body-alt text-lg font-semibold tracking-[-0.04em] text-foreground transition-transform hover:scale-[1.03] active:scale-95"
          >
            Reserve Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
