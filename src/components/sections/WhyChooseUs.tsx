"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";

/** Why Lumora Treks? — Figma node 83:919 (named "Stats Section"). Three service
 * blocks, the middle one dark, each with a rotated rounded image peeking out. */

type Block = {
  blob: string;
  dark?: boolean;
  title: ReactNode;
  desc: ReactNode;
};

const BLOCKS: Block[] = [
  {
    blob: "/images/why-blob-1.png",
    title: (
      <>
        Curated <span className="italic text-primary-accent">Destinations</span>
      </>
    ),
    desc: (
      <>
        Every destination is handpicked to showcase the best of{" "}
        <span className="italic text-[#909dad]">
          nature, culture, and adventure, ensuring every trip is truly
          unforgettable.
        </span>
      </>
    ),
  },
  {
    blob: "/images/why-blob-2.png",
    dark: true,
    title: (
      <>
        Seamless <span className="italic text-primary-accent">Travel</span>{" "}
        Planning
      </>
    ),
    desc: (
      <>
        From personalized itineraries and accommodations to transportation and
        local experiences,{" "}
        <span className="text-[#c2ffb6]">
          we handle every detail so you can simply enjoy the journey.
        </span>
      </>
    ),
  },
  {
    blob: "/images/why-blob-3.png",
    title: (
      <>
        Trusted Local{" "}
        <span className="italic text-primary-accent">Expertise</span>
      </>
    ),
    desc: (
      <>
        Travel with confidence through experienced local guides, reliable
        partners, and{" "}
        <span className="text-[#909dad]">
          insider recommendations that help you discover destinations like never
          before.
        </span>
      </>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="px-6 py-16 lg:py-24">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-10">
        <div className="flex max-w-[1000px] flex-col items-center gap-5 text-center">
          <h2 className="text-[clamp(1.75rem,3vw,32px)] font-bold tracking-[-0.04em] text-foreground">
            Why Lumora Treks?
          </h2>
          <p className="font-body-alt text-[clamp(1.05rem,2vw,24px)] font-medium tracking-[-0.04em] text-text-secondary">
            We make every journey effortless, memorable, and uniquely yours.
            From carefully curated destinations to trusted local expertise,{" "}
            <span className="italic text-[#909dad]">
              we&apos;re committed to delivering travel experiences that go
              beyond expectations.
            </span>
          </p>
        </div>

        <div className="grid w-full gap-8 md:grid-cols-3">
          {BLOCKS.map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              className={clsx(
                "relative flex h-[362px] flex-col justify-center gap-10 overflow-hidden rounded-2xl px-10 py-14",
                block.dark ? "bg-foreground" : "bg-background"
              )}
            >
              <div className="absolute -right-10 -top-16 size-52 rotate-[39deg] overflow-hidden rounded-[95px] shadow-[-4px_4px_12px_0_rgba(18,136,67,0.12)]">
                <Image src={block.blob} alt="" fill className="object-cover" />
              </div>
              <p
                className={clsx(
                  "relative text-2xl font-bold tracking-[-0.04em]",
                  block.dark ? "text-background" : "text-foreground"
                )}
              >
                {block.title}
              </p>
              <p
                className={clsx(
                  "relative font-body-alt text-base font-medium tracking-[-0.04em]",
                  block.dark ? "text-[#ebffe8]" : "text-text-secondary"
                )}
              >
                {block.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
