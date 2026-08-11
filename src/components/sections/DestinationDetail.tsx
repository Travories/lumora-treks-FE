"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import StarRating from "@/components/ui/StarRating";
import ReviewCard, { type Review } from "@/components/ui/ReviewCard";

/** DestinationDetail — Figma node 141:3123 ("Main Content").
 * Breadcrumb → header → overview + gallery → hours + booking card → reviews.
 * Content is dummy (the seam for Wagtail / Travories); one destination shown. */

const GALLERY = [
  "/images/kds-1.png",
  "/images/kds-2.png",
  "/images/kds-3.png",
  "/images/kds-4.png",
  "/images/kds-5.png",
  "/images/kds-6.png",
  "/images/kds-7.png",
];

const HIGHLIGHTS = [
  "Ancient Hanuman Dhoka Royal Palace.",
  "Historic Kumari Ghar, home of the Living Goddess.",
  "Centuries-old temples with intricate wood carvings.",
];

const HOURS = [
  { day: "Sunday", time: "9:00 AM - 5:00AM" },
  { day: "Monday", time: "9:00 AM - 5:00AM" },
  { day: "Tuesday", time: "9:00 AM - 5:00AM" },
  { day: "Wednesday", time: "Closed" },
  { day: "Thursday", time: "9:00 AM - 5:00AM" },
  { day: "Friday", time: "9:00 AM - 5:00AM" },
  { day: "Saturday", time: "9:00 AM - 5:00AM" },
];

const AMENITIES = [
  "Free Parking",
  "Free entry",
  "Play area for children & pet friendly",
];

const RATING_BREAKDOWN = [
  { label: "Excellent", count: 6 },
  { label: "Very Good", count: 3 },
  { label: "Average", count: 2 },
  { label: "Poor", count: 2 },
  { label: "Terrible", count: 0 },
];

const REVIEWS: Review[] = [
  {
    name: "John Harris",
    avatar: "/images/avatar-1.png",
    timeAgo: "1 hour ago",
    rating: 2,
    text: "Good Experience",
    reply: null,
  },
  {
    name: "Prajwol Ghimire",
    avatar: "/images/avatar-1.png",
    timeAgo: "1 hour ago",
    rating: 2,
    text: '"I\'ve been impressed with the quality of service provided by this. They have exceeded my expectations and delivered exceptional results. Highly recommended!"',
    reply: "View reply",
  },
];

const REVIEW_SCALE = 8; // denominator for breakdown-bar fill widths

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

export default function DestinationDetail({
  enquiryHref,
}: {
  enquiryHref?: string;
} = {}) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 pt-6 sm:px-12 lg:px-20">
      {/* Breadcrumb + Header */}
      <header className="flex flex-col gap-2">
        <nav className="flex items-center gap-2 text-base" aria-label="Breadcrumb">
          <Link
            href="/destinations"
            className="font-body-alt tracking-[-0.02em] text-text-secondary hover:text-foreground"
          >
            Destinations
          </Link>
          <Icon icon="iconoir:nav-arrow-right" className="size-4 text-text-secondary" />
          <span className="font-body-alt tracking-[-0.02em] text-[#2bbf0f] underline">
            Kathmandu Durbar Square
          </span>
        </nav>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="text-[28px] font-bold tracking-[-0.04em] text-foreground">
              Kathmandu Durbar Square
            </h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="font-medium tracking-[-0.02em] text-text-secondary">
                  4.0
                </span>
                <StarRating rating={4} starSize={20} />
              </div>
              <span className="size-1 shrink-0 rounded-full bg-text-secondary" />
              <button
                type="button"
                className="font-medium tracking-[-0.02em] text-text-secondary underline"
              >
                (13 Reviews)
              </button>
            </div>
            <button
              type="button"
              aria-label="Share"
              className="text-foreground transition-transform hover:scale-110"
            >
              <Icon icon="iconoir:share-android" className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Overview + Highlights (left) · Gallery (right) */}
      <motion.section
        {...fadeUp}
        className="flex flex-col gap-10 border-b border-border pb-6 lg:flex-row"
      >
        <div className="flex w-full flex-col gap-6 lg:max-w-[644px]">
          <div className="flex flex-col gap-5 border-b border-border pb-6">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
              Overview
            </h2>
            <div className="flex flex-col gap-3 text-lg">
              <p className="font-body-alt leading-[26px] tracking-[-0.02em] text-text-secondary">
                Lumbini, located in Nepal, holds profound significance as a
                UNESCO World Heritage Site. It is revered worldwide as the
                birthplace of Siddhartha Gautama, the historical Buddha. This
                sacred pilgrimage site attracts Buddhists and visitors from
                around the globe, drawn by its tranquil ambiance and historical
                resonance.
              </p>
              <button
                type="button"
                className="w-fit font-semibold tracking-[-0.04em] text-foreground underline"
              >
                See More
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5 pb-6">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
              Highlights
            </h2>
            <ul className="list-disc space-y-0 pl-7 font-body-alt text-lg tracking-[-0.02em] text-text-secondary">
              {HIGHLIGHTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex h-[335px] gap-2">
            <GalleryImg src={GALLERY[0]} className="flex-1" priority />
            <div className="flex flex-1 flex-col gap-2">
              <GalleryImg src={GALLERY[1]} className="flex-1" />
              <GalleryImg src={GALLERY[2]} className="flex-1" />
            </div>
            <GalleryImg src={GALLERY[3]} className="flex-1" />
          </div>
          <div className="flex gap-4">
            <GalleryImg src={GALLERY[4]} className="h-[125px] flex-1" />
            <GalleryImg src={GALLERY[5]} className="h-[125px] flex-1" />
            <div className="relative h-[125px] flex-1 overflow-hidden rounded-lg">
              <Image
                src={GALLERY[6]}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
              />
              <div className="absolute inset-0 grid place-items-center bg-black/50">
                <span className="font-body-alt text-2xl tracking-[-0.02em] text-white">
                  + 10 Photos
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Hours (left) · Booking Card (right) */}
      <section className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <motion.div {...fadeUp} className="flex flex-1 flex-col gap-4 pb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
              Hours
            </h2>
            <span className="rounded bg-background px-2.5 py-2 font-body-alt text-sm font-medium tracking-[-0.02em] text-[#44a33c]">
              Open Now
            </span>
          </div>
          <dl className="flex gap-[60px] font-body-alt text-lg capitalize tracking-[-0.04em] text-text-secondary">
            <div className="flex flex-col gap-4">
              {HOURS.map((h) => (
                <dt key={h.day}>{h.day}</dt>
              ))}
            </div>
            <div className="flex flex-col gap-4 italic">
              {HOURS.map((h) => (
                <dd key={h.day}>{h.time}</dd>
              ))}
            </div>
          </dl>
        </motion.div>

        {/* Booking card */}
        <motion.aside
          {...fadeUp}
          className="flex w-full flex-col gap-6 self-start rounded-lg border border-border bg-surface p-6 lg:sticky lg:top-6 lg:w-[443px]"
        >
          <div className="flex flex-col gap-5">
            <div className="border-b border-border pb-2">
              <h3 className="font-body-alt text-lg font-medium tracking-[-0.04em] text-foreground">
                Highlights
              </h3>
            </div>
            <div className="flex items-start justify-between border-b border-border pb-2 font-body-alt text-base tracking-[-0.03em] text-text-secondary">
              <span>Location</span>
              <span className="text-right">Basantpur, Kathmandu</span>
            </div>
            <div className="flex flex-col gap-1 border-b border-border pb-2">
              {AMENITIES.map((amenity) => (
                <div key={amenity} className="flex items-center gap-1.5">
                  <Icon
                    icon="charm:tick"
                    className="size-4 shrink-0 text-primary"
                  />
                  <span className="font-body-alt text-base tracking-[-0.03em] text-text-secondary">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href={enquiryHref ?? "/packages"}
            className="flex w-full items-center justify-center rounded-lg bg-foreground p-3 font-body-alt text-base font-medium tracking-[-0.02em] text-background transition-transform hover:scale-[1.02] active:scale-95"
          >
            {enquiryHref ? "Enquire Now" : "Explore Packages"}
          </Link>
        </motion.aside>
      </section>

      {/* Reviews & Ratings */}
      <section className="flex flex-col gap-6 pb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
            Reviews &amp; Ratings
          </h2>
          <button
            type="button"
            className="rounded-lg border border-border bg-background p-3 text-base font-semibold tracking-[-0.02em] text-text-secondary transition-colors hover:bg-border/40"
          >
            Write a review
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Sidebar: search + rating summary + breakdown */}
          <aside className="flex w-full flex-col gap-5 lg:w-[440px]">
            <div className="flex h-[45px] items-center gap-2 overflow-hidden rounded-lg border border-border bg-surface px-4">
              <Icon icon="iconoir:search" className="size-[18px] shrink-0 text-[#a3adbb]" />
              <input
                type="search"
                placeholder="Search Here"
                className="w-full bg-transparent text-base font-medium tracking-[-0.04em] text-foreground placeholder:text-[#a3adbb] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-text-secondary">4.0</span>
              <StarRating rating={4} starSize={24} />
              <span className="text-lg font-semibold text-text-secondary">(13)</span>
            </div>

            <div className="flex flex-col gap-4">
              {RATING_BREAKDOWN.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3">
                  <span className="w-[72px] shrink-0 text-base font-semibold tracking-[-0.02em] text-text-secondary">
                    {row.label}
                  </span>
                  <div className="flex flex-1 items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#eef0f2]">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.min(row.count / REVIEW_SCALE, 1) * 100}%` }}
                      />
                    </div>
                    <span className="w-3 shrink-0 text-right text-base font-semibold tracking-[-0.02em] text-text-secondary">
                      {row.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Review list */}
          <div className="flex flex-1 flex-col gap-4">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.1 }}
              >
                <ReviewCard {...review} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function GalleryImg({
  src,
  className,
  priority,
}: {
  src: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-[#909dad] ${className ?? ""}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 1024px) 50vw, 320px"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
