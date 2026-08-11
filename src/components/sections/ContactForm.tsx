"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Contact Form — Figma node 75:690. Contact info + social (left) and the
 * "Leave your message" form (right). Presentational submit (no backend yet). */

const SOCIALS = [
  { icon: "mdi:facebook", label: "Facebook" },
  { icon: "mdi:instagram", label: "Instagram" },
  { icon: "prime:twitter", label: "X" },
  { icon: "mdi:whatsapp", label: "WhatsApp" },
];

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <span className="py-1 text-lg font-semibold tracking-[-0.04em] text-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

const fieldBox =
  "flex items-center justify-between gap-2 rounded-lg border border-border bg-white p-3 text-base tracking-[-0.04em]";

export default function ContactForm() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-16">
        {/* Left — contact info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-1 flex-col justify-center gap-10"
        >
          <div className="flex flex-col gap-8">
            <h2 className="text-[clamp(1.75rem,3vw,32px)] font-bold tracking-[-0.04em] text-foreground">
              Don&apos;t Hesitate to{" "}
              <span className="italic text-primary-accent">Contact Us</span>
            </h2>
            <p className="font-body-alt text-[clamp(1.1rem,2vw,24px)] font-medium tracking-[-0.04em] text-text-secondary">
              Whether you have a quick question or want to book a full
              consultation — we&apos;re easy to reach.{" "}
              <span className="italic text-[#909dad]">
                Fill in the form and we&apos;ll respond within one business day
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
              Social Media :
            </p>
            <div className="flex items-center gap-5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="text-foreground transition-transform hover:scale-110"
                >
                  <Icon icon={social.icon} className="size-8" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full flex-col gap-12 rounded-2xl border border-border bg-background p-8 lg:w-[536px] lg:shrink-0"
        >
          <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
            Leave your <span className="italic text-primary-accent">message</span>
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 sm:flex-row">
              <Field label="Name">
                <label className={fieldBox}>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-transparent font-body-alt text-[#909dad] placeholder:text-[#909dad] focus:outline-none"
                  />
                  <Icon
                    icon="material-symbols:person-outline-rounded"
                    className="size-4 shrink-0 text-foreground"
                  />
                </label>
              </Field>
              <Field label="Email Address">
                <label className={fieldBox}>
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    className="w-full bg-transparent font-body-alt text-foreground placeholder:text-[#909dad] focus:outline-none"
                  />
                  <Icon
                    icon="mdi:email-open-outline"
                    className="size-4 shrink-0 text-foreground"
                  />
                </label>
              </Field>
            </div>

            <Field label="Destination">
              <label className={fieldBox}>
                <select
                  defaultValue=""
                  className="w-full appearance-none bg-transparent font-body-alt text-[#909dad] focus:outline-none"
                >
                  <option value="" disabled>
                    Select a Destination
                  </option>
                  <option>Kathmandu Valley</option>
                  <option>Pokhara</option>
                  <option>Annapurna Base Camp</option>
                  <option>Poon Hills</option>
                </select>
                <Icon
                  icon="iconoir:nav-arrow-down"
                  className="size-4 shrink-0 text-foreground"
                />
              </label>
            </Field>

            <Field label="Message">
              <textarea
                placeholder="Message"
                rows={3}
                className="h-[95px] resize-none rounded-lg border border-border bg-white p-3 font-body-alt text-base tracking-[-0.04em] text-foreground placeholder:text-[#909dad] focus:outline-none"
              />
            </Field>
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="size-6 shrink-0 rounded border border-border accent-foreground"
              />
              <span className="text-base font-semibold tracking-[-0.04em] text-foreground">
                I agree to the privacy policy
              </span>
            </label>
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-foreground px-5 py-3 font-body-alt text-lg font-medium tracking-[-0.04em] text-background transition-transform hover:scale-[1.03] active:scale-95"
            >
              Reserve Now
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
