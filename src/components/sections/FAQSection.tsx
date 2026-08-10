"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";

const FAQS = [
  {
    question: "Is this secure?",
    answer:
      "Every destination is handpicked to showcase the best of nature, culture, and adventure, ensuring every trip is truly unforgettable.",
  },
  { question: "How can we reach out to you?" },
  { question: "Address of your place" },
  { question: "How to contact with agency?" },
  { question: "How to book appointment to your place?" },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-14 flex flex-col items-center gap-3 text-center"
      >
        <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="text-base text-text-muted sm:text-lg">
          These are the questions we hear more often.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_420px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="border-b border-border py-7 first:pt-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span
                    className={
                      isOpen
                        ? "text-xl text-text-primary"
                        : "text-xl font-semibold text-text-primary"
                    }
                  >
                    {faq.question}
                  </span>
                  <Icon
                    icon={isOpen ? "charm:cross" : "tabler:plus-filled"}
                    className="h-8 w-8 shrink-0 text-text-primary"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && faq.answer && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-lg text-text-muted">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center justify-center gap-8 self-stretch rounded-2xl bg-surface px-8 py-10 text-center"
        >
          <p className="text-2xl font-semibold text-text-primary">
            Don&apos;t see the <span className="text-primary">answer</span> you
            need?
          </p>
          <p className="text-lg text-text-muted">
            That&apos;s ok. Just drop a message and we will get back to you{" "}
            <span className="uppercase text-primary">asap</span>.
          </p>
          <Button variant="secondary" size="md">
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
