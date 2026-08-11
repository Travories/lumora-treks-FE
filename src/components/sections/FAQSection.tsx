"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

/** FAQ + contact — Figma node 49:654 ("Page Container"). Interactive accordion;
 * only Q1 has answer copy in Figma, the rest reuse it as placeholder. */

const FAQS = [
  {
    q: "Is this secure?",
    a: "Every destination is handpicked to showcase the best of nature, culture, and adventure, ensuring every trip is truly unforgettable.",
  },
  {
    q: "How can we reach out to you?",
    a: "Every destination is handpicked to showcase the best of nature, culture, and adventure, ensuring every trip is truly unforgettable.",
  },
  {
    q: "Address of your place",
    a: "Every destination is handpicked to showcase the best of nature, culture, and adventure, ensuring every trip is truly unforgettable.",
  },
  {
    q: "How to contact with agency?",
    a: "Every destination is handpicked to showcase the best of nature, culture, and adventure, ensuring every trip is truly unforgettable.",
  },
  {
    q: "How to book appointment to your place?",
    a: "Every destination is handpicked to showcase the best of nature, culture, and adventure, ensuring every trip is truly unforgettable.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <h2 className="text-[clamp(1.75rem,3vw,32px)] font-bold tracking-[-0.06em] text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="font-body-alt text-[clamp(1.05rem,2vw,24px)] font-medium tracking-[-0.04em] text-text-secondary">
          These are the questions we hear more often.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-[60px]">
        {/* Accordion */}
        <div className="flex flex-1 flex-col gap-7">
          {FAQS.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.q} className="border-b border-border pb-7">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-xl font-semibold tracking-[-0.04em] text-foreground">
                    {faq.q}
                  </span>
                  <Icon
                    icon={open ? "charm:cross" : "tabler:plus-filled"}
                    className="size-8 shrink-0 text-foreground"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden font-body-alt text-lg tracking-[-0.04em] text-text-secondary"
                    >
                      <span className="mt-3 block">{faq.a}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Contact card */}
        <div className="flex flex-col items-center justify-center gap-8 rounded-2xl bg-background px-8 py-10 text-center lg:w-[490px] lg:shrink-0">
          <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
            Don&apos;t see the{" "}
            <span className="text-primary-accent">answer</span> you need?
          </p>
          <p className="font-body-alt text-lg font-medium tracking-[-0.04em] text-text-secondary">
            That&apos;s ok. Just drop a message and we will get back to you{" "}
            <span className="uppercase text-primary-accent">asap</span>.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-foreground px-5 py-3 font-body-alt text-lg font-medium tracking-[-0.04em] text-background transition-transform hover:scale-[1.03] active:scale-95"
          >
            Reserve Now
          </a>
        </div>
      </div>
    </section>
  );
}
