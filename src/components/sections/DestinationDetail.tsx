"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import StarRating from "@/components/ui/StarRating";
import ReviewCard, { type Review } from "@/components/ui/ReviewCard";
import type { CmsDestinationDetail } from "@/lib/blocks";

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
  ctaHref = "/packages",
  ctaLabel = "Explore Packages",
  destination,
}: {
  ctaHref?: string;
  ctaLabel?: string;
  destination?: CmsDestinationDetail;
} = {}) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const title = destination?.title || "Kathmandu Durbar Square";
  const overview = destination?.description || destination?.subtitle ||
    "Lumbini, located in Nepal, holds profound significance as a UNESCO World Heritage Site.";
  const destinationImage = destination?.image?.src || destination?.image?.url;
  const galleryItems = [
    destinationImage || GALLERY[0],
    ...GALLERY.slice(1),
  ].map((src, index) => ({
    src,
    caption: `${title} photo ${index + 1}`,
  }));
  const currentGalleryIndex = activeGalleryIndex ?? 0;
  const activeGalleryItem = activeGalleryIndex === null ? null : galleryItems[activeGalleryIndex];

  useEffect(() => {
    if (activeGalleryIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveGalleryIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveGalleryIndex((current) => {
          if (current === null) return current;
          return (current + 1) % galleryItems.length;
        });
      }

      if (event.key === "ArrowLeft") {
        setActiveGalleryIndex((current) => {
          if (current === null) return current;
          return (current - 1 + galleryItems.length) % galleryItems.length;
        });
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeGalleryIndex, galleryItems.length]);

  return (
    <>
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
            {title}
          </span>
        </nav>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="text-[28px] font-bold tracking-[-0.04em] text-foreground">
              {title}
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
                {overview}
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
            <GalleryButton
              src={galleryItems[0].src}
              alt={galleryItems[0].caption}
              className="flex-1"
              priority
              onClick={() => setActiveGalleryIndex(0)}
            />
            <div className="flex flex-1 flex-col gap-2">
              <GalleryButton
                src={galleryItems[1].src}
                alt={galleryItems[1].caption}
                className="flex-1"
                onClick={() => setActiveGalleryIndex(1)}
              />
              <GalleryButton
                src={galleryItems[2].src}
                alt={galleryItems[2].caption}
                className="flex-1"
                onClick={() => setActiveGalleryIndex(2)}
              />
            </div>
            <GalleryButton
              src={galleryItems[3].src}
              alt={galleryItems[3].caption}
              className="flex-1"
              onClick={() => setActiveGalleryIndex(3)}
            />
          </div>
          <div className="flex gap-4">
            <GalleryButton
              src={galleryItems[4].src}
              alt={galleryItems[4].caption}
              className="h-[125px] flex-1"
              onClick={() => setActiveGalleryIndex(4)}
            />
            <GalleryButton
              src={galleryItems[5].src}
              alt={galleryItems[5].caption}
              className="h-[125px] flex-1"
              onClick={() => setActiveGalleryIndex(5)}
            />
            <button
              type="button"
              onClick={() => setActiveGalleryIndex(6)}
              className="group relative h-[125px] flex-1 overflow-hidden rounded-lg text-left"
              aria-label={`Open photo 7 of ${galleryItems.length}`}
            >
              <Image
                src={galleryItems[6].src}
                alt={galleryItems[6].caption}
                fill
                sizes="200px"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 grid place-items-center bg-black/50">
                <span className="font-body-alt text-2xl tracking-[-0.02em] text-white">
                  View Photos
                </span>
              </div>
            </button>
          </div>
        </div>
      </motion.section>

      {/* Hours (left) · Booking Card (right) */}
      <section className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <motion.div {...fadeUp} className="flex flex-1 flex-col gap-4 pb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
              {destination ? "Travel details" : "Hours"}
            </h2>
            {!destination && <span className="rounded bg-background px-2.5 py-2 font-body-alt text-sm font-medium tracking-[-0.02em] text-[#44a33c]">Open Now</span>}
          </div>
          {destination ? (
            <div className="grid gap-3 font-body-alt text-lg tracking-[-0.04em] text-text-secondary">
              <p><strong className="text-foreground">Region:</strong> {destination.region || "—"}</p>
              <p><strong className="text-foreground">Best season:</strong> {destination.best_season || "Contact us for seasonal advice."}</p>
              <p><strong className="text-foreground">Packages:</strong> {destination.packages.length}</p>
            </div>
          ) : <dl className="flex gap-[60px] font-body-alt text-lg capitalize tracking-[-0.04em] text-text-secondary">
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
          </dl>}
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
              <span className="text-right">{destination?.region || "Basantpur, Kathmandu"}</span>
            </div>
            <div className="flex flex-col gap-1 border-b border-border pb-2">
              {(destination ? [`${destination.packages.length} active package${destination.packages.length === 1 ? "" : "s"} available`] : AMENITIES).map((amenity) => (
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
            href={ctaHref}
            className="flex w-full items-center justify-center rounded-lg bg-foreground p-3 font-body-alt text-base font-medium tracking-[-0.02em] text-background transition-transform hover:scale-[1.02] active:scale-95"
          >
            {ctaLabel}
          </Link>
        </motion.aside>
      </section>

      {/* Reviews & Ratings (demo-only fallback until destination reviews exist in the API) */}
      {!destination && <section className="flex flex-col gap-6 pb-6">
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
      </section>}
      </div>

      {activeGalleryItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white sm:px-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium tracking-[0.02em] text-white/70">
                  {currentGalleryIndex + 1} / {galleryItems.length}
                </span>
                <span className="line-clamp-1 text-sm font-medium">{title}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveGalleryIndex(null)}
                className="rounded-full p-2 text-white transition hover:bg-white/10"
                aria-label="Close gallery"
              >
                <Icon icon="iconoir:xmark" className="size-6" />
              </button>
            </div>

            <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="relative flex min-h-0 items-center justify-center px-4 py-4 sm:px-6 lg:px-10">
                <button
                  type="button"
                  onClick={() => setActiveGalleryIndex((currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length)}
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-3 text-white transition hover:bg-black/65"
                  aria-label="Previous photo"
                >
                  <Icon icon="iconoir:nav-arrow-left" className="size-6" />
                </button>

                <div className="relative h-full max-h-[78vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-black">
                  <Image
                    src={activeGalleryItem.src}
                    alt={activeGalleryItem.caption}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setActiveGalleryIndex((currentGalleryIndex + 1) % galleryItems.length)}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-3 text-white transition hover:bg-black/65"
                  aria-label="Next photo"
                >
                  <Icon icon="iconoir:nav-arrow-right" className="size-6" />
                </button>
              </div>

              <aside className="flex min-h-0 flex-col border-t border-white/10 bg-[#111111] text-white lg:border-l lg:border-t-0">
                <div className="border-b border-white/10 px-5 py-4">
                  <p className="text-base font-semibold">{activeGalleryItem.caption}</p>
                  <p className="mt-1 text-sm text-white/60">Browse all destination photos</p>
                </div>
                <div className="grid min-h-0 grid-cols-3 gap-2 overflow-y-auto p-4 sm:grid-cols-4 lg:grid-cols-3">
                  {galleryItems.map((item, index) => (
                    <button
                      key={`${item.src}-${index}`}
                      type="button"
                      onClick={() => setActiveGalleryIndex(index)}
                      className={
                        index === activeGalleryIndex
                          ? "relative aspect-square overflow-hidden rounded-xl ring-2 ring-white"
                          : "relative aspect-square overflow-hidden rounded-xl opacity-70 transition hover:opacity-100"
                      }
                      aria-label={`View photo ${index + 1}`}
                    >
                      <Image
                        src={item.src}
                        alt={item.caption}
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function GalleryButton({
  src,
  alt,
  className,
  priority,
  onClick,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg bg-[#909dad] text-left ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 50vw, 320px"
        className="object-cover transition duration-300 group-hover:scale-105"
        priority={priority}
      />
    </button>
  );
}
