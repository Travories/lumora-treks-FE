"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import StarRating from "@/components/ui/StarRating";

/** Checkout / payment — Figma node 118:4743 ("Confirm and Pay"). Left: stepped
 * payment flow (Your Information form + collapsed Payment Method / Amount +
 * agreement + Next). Right: order summary. Presentational (no backend). */

const inputBase =
  "w-full rounded-lg border border-border p-3 font-body-alt text-base tracking-[-0.04em] text-foreground placeholder:text-[#b2bbc6] focus:outline-none";

function StepHeader({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3 pb-2">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground font-body-alt text-sm text-white">
        {n}
      </span>
      <span className="font-body-alt text-xl font-medium tracking-[-0.04em] text-foreground">
        {title}
      </span>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="py-1 font-body-alt text-base font-medium tracking-[-0.02em] text-[#3d4c5e]">
        {label} <span className="text-[#c62222]">*</span>
      </span>
      {children}
    </div>
  );
}

export default function Checkout() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-[1440px] px-6 py-8 lg:px-20"
    >
      {/* Header */}
      <div className="mb-10 flex flex-col gap-5">
        <nav className="flex flex-wrap items-center gap-2 font-body-alt text-base tracking-[-0.02em] text-text-secondary">
          <Link href="/packages">Packages</Link>
          <Icon icon="iconoir:nav-arrow-right" className="size-4" />
          <span>Package Description</span>
          <Icon icon="iconoir:nav-arrow-right" className="size-4" />
          <span className="font-medium text-[#2bbf0f] underline">Payment</span>
        </nav>
        <h1 className="text-[28px] font-semibold tracking-[-0.04em] text-foreground">
          Confirm and Pay
        </h1>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Left — payment flow */}
        <div className="flex flex-col gap-6 lg:w-[758px]">
          <div className="rounded-lg border border-border p-6">
            <StepHeader n={1} title="Your Information" />
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-2 flex flex-col gap-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className={inputBase}
                  />
                </Field>
                <Field label="Date of Birth">
                  <input
                    type="text"
                    placeholder="Enter your dob"
                    className={inputBase}
                  />
                </Field>
                <Field label="Email Address">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className={inputBase}
                  />
                </Field>
                <Field label="Phone Number">
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className={inputBase}
                  />
                </Field>
              </div>
              <button
                type="submit"
                className="self-end rounded-lg bg-foreground px-5 py-3 font-body-alt text-base font-medium tracking-[-0.04em] text-background transition-transform hover:scale-[1.02] active:scale-95"
              >
                Done
              </button>
            </form>
          </div>

          <div className="rounded-lg border border-border p-6">
            <StepHeader n={2} title="Payment Method" />
          </div>
          <div className="rounded-lg border border-border p-6">
            <StepHeader n={3} title="Payment Amount" />
          </div>

          <label className="flex items-center gap-5">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="size-6 shrink-0 rounded border border-[#b2bbc6] accent-foreground"
            />
            <span className="font-body-alt text-lg tracking-[-0.04em] text-[#3d4c5e]">
              I agree to terms &amp; conditions of{" "}
              <span className="underline">booking policy</span>.
            </span>
          </label>

          <button
            type="button"
            disabled={!agreed}
            onClick={() => router.push("/checkout/success")}
            className={
              agreed
                ? "w-full rounded-lg bg-foreground px-5 py-3 font-body-alt text-lg font-medium tracking-[-0.04em] text-background transition-transform hover:scale-[1.01] active:scale-95"
                : "w-full cursor-not-allowed rounded-lg bg-border px-5 py-3 font-body-alt text-lg font-medium tracking-[-0.04em] text-[#909dad]"
            }
          >
            Next
          </button>
        </div>

        {/* Right — order summary */}
        <div className="flex-1 rounded-lg border border-border px-6 pb-7 pt-6">
          {/* Package */}
          <div className="flex items-center gap-4 border-b border-border pb-4">
            <div className="relative size-[100px] shrink-0 overflow-hidden rounded-lg">
              <Image
                src="/images/checkout-thumb.png"
                alt="UNESCO Heritage Site & Lumbini Sightseeing"
                fill
                sizes="100px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <p className="font-body-alt text-lg font-medium tracking-[-0.04em] text-foreground">
                UNESCO Heritage Site &amp; Lumbini Sightseeing
              </p>
              <div className="flex items-center gap-2">
                <span className="font-body-alt text-base tracking-[-0.04em] text-text-secondary">
                  4 Days
                </span>
                <span className="size-1 rounded-full bg-text-secondary" />
                <StarRating rating={4} starSize={20} />
              </div>
            </div>
          </div>

          {/* Booking info */}
          <div className="flex items-center justify-between gap-2 border-b border-border py-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2">
                <Icon icon="iconoir:calendar" className="size-4 text-text-secondary" />
                <span className="font-body-alt text-lg tracking-[-0.04em] text-text-secondary">
                  Tuesday, May 24
                </span>
              </span>
              <span className="size-1 rounded-full bg-text-secondary" />
              <span className="flex items-center gap-2">
                <Icon icon="ion:people-outline" className="size-4 text-text-secondary" />
                <span className="font-body-alt text-lg tracking-[-0.04em] text-text-secondary">
                  2 Adults, 1 Child
                </span>
              </span>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-lg border border-border bg-background px-3 py-2 font-body-alt text-base tracking-[-0.03em] text-text-secondary"
            >
              Change
            </button>
          </div>

          {/* Price details */}
          <div className="flex flex-col gap-3 border-b border-border py-4">
            <p className="font-body-alt text-lg font-medium tracking-[-0.04em] text-foreground">
              Price Details
            </p>
            <div className="flex items-center justify-between gap-2">
              <span className="font-body-alt text-base tracking-[-0.04em] text-text-secondary">
                2 Adult X $140 + 1 Child X $88
              </span>
              <span className="font-body-alt text-lg font-medium tracking-[-0.04em] text-foreground">
                $380
              </span>
            </div>
          </div>

          {/* Subtotal + promo applied */}
          <div className="flex flex-col gap-3 py-4">
            <div className="flex items-center justify-between">
              <span className="font-body-alt text-base tracking-[-0.04em] text-text-secondary">
                Subtotal
              </span>
              <span className="font-body-alt text-lg font-medium tracking-[-0.04em] text-foreground">
                $380
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body-alt text-base tracking-[-0.04em] text-text-secondary">
                Promo code (PromocoX)
              </span>
              <span className="font-body-alt text-lg tracking-[-0.04em] text-[#44a33c]">
                -$40
              </span>
            </div>
          </div>

          {/* Promo input */}
          <div className="flex flex-col gap-3 border-b border-border pb-4">
            <p className="font-body-alt text-lg font-medium tracking-[-0.04em] text-foreground">
              Promo code
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter promo code"
                className="flex-1 rounded-lg border border-foreground p-3 font-body-alt text-base tracking-[-0.04em] text-foreground placeholder:text-[#a3adbb] focus:outline-none"
              />
              <button
                type="button"
                className="shrink-0 rounded-lg border border-foreground px-4 py-3 font-body-alt text-base font-medium tracking-[-0.03em] text-foreground"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="mt-5 flex items-center justify-between rounded border border-[#2bbf0f] bg-background px-4 py-3">
            <span className="font-body-alt text-lg font-medium tracking-[-0.04em] text-foreground">
              Total Price
            </span>
            <span className="font-body-alt text-xl font-medium tracking-[-0.04em] text-[#2ecc10]">
              $428
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
