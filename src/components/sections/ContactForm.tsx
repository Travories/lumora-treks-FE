"use client";

import type { FormEvent, ReactNode } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useSubmitLeadMutation } from "@/features/leads/leadsApi";

/** Contact Form — Figma node 75:690. Contact info + social (left) and the
 * "Leave your message" form (right). Submits to `/api/v2/leads/`
 * (`form_key: "contact"`) — `destination` has no dedicated backend field, it
 * rides along in `LeadSubmission.data` like any other extra form field. */

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
  const [submitLead, { isLoading, isSuccess, isError }] = useSubmitLeadMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    submitLead({
      form_key: "contact",
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
      destination: String(data.get("destination") || ""),
      source_url: window.location.href,
    })
      .unwrap()
      .then(() => form.reset())
      .catch(() => {});
  };

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
          onSubmit={handleSubmit}
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
                    name="name"
                    required
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
                    name="email"
                    required
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
                  name="destination"
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
                name="message"
                required
                placeholder="Message"
                rows={3}
                className="h-[95px] resize-none rounded-lg border border-border bg-white p-3 font-body-alt text-base tracking-[-0.04em] text-foreground placeholder:text-[#909dad] focus:outline-none"
              />
            </Field>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  required
                  className="size-6 shrink-0 rounded border border-border accent-foreground"
                />
                <span className="text-base font-semibold tracking-[-0.04em] text-foreground">
                  I agree to the privacy policy
                </span>
              </label>
              <button
                type="submit"
                disabled={isLoading}
                className="shrink-0 rounded-lg bg-foreground px-5 py-3 font-body-alt text-lg font-medium tracking-[-0.04em] text-background transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-60"
              >
                {isLoading ? "Sending…" : "Reserve Now"}
              </button>
            </div>
            {isSuccess && (
              <p className="font-body-alt text-base font-medium text-primary">
                Thanks — we&apos;ll get back to you within one business day.
              </p>
            )}
            {isError && (
              <p className="font-body-alt text-base font-medium text-red-600">
                Something went wrong — please try again.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
