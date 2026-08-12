"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@iconify/react";
import StarRating from "@/components/ui/StarRating";
import ReviewCard, { type Review } from "@/components/ui/ReviewCard";

/** Package detail — Figma node 150:10819 ("Main Content"). Distinct from the
 * destination detail: overview + key facts, gallery, things included, booking
 * card, itinerary (+ map), reviews. Content dummy; the seam for Travories. */

const GALLERY_LARGE = ["/images/kds-1.png", "/images/kds-2.png"];
const GALLERY_SMALL = ["/images/kds-3.png", "/images/kds-4.png", "/images/kds-5.png"];

const KEY_FACTS = [
  { icon: "bi:suitcase", label: "Trip Style", value: "Sightseeing" },
  { icon: "lets-icons:speed", label: "Difficulty", value: "Easy" },
  { icon: "lucide:calendar", label: "Number of days", value: "4 Days & 3 Nights" },
];

const DAYS = ["Day 1", "Day 2", "Day 3"];

const BREAKDOWN = [
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
  },
  {
    name: "Prajwol Ghimire",
    avatar: "/images/avatar-1.png",
    timeAgo: "1 hour ago",
    rating: 2,
    text: '"I\'ve been impressed with the quality of service provided by this. They have exceeded my expectations and delivered exceptional results. Highly recommended!"',
    reply: "yes",
  },
];

const sectionHeading =
  "text-2xl font-semibold tracking-[-0.04em] text-foreground";

export default function PackageDetail({
  reserveHref = "/checkout",
}: {
  reserveHref?: string;
} = {}) {
  const [day, setDay] = useState(0);
  const maxCount = Math.max(...BREAKDOWN.map((b) => b.count), 1);

  return (
    <section className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-8 lg:px-20">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <nav className="flex flex-wrap items-center gap-2 font-body-alt text-base tracking-[-0.02em] text-text-secondary">
          <Link href="/destinations">Destinations</Link>
          <Icon icon="iconoir:nav-arrow-right" className="size-4" />
          <span className="font-medium text-[#2bbf0f] underline">
            Kathmandu Durbar Square
          </span>
        </nav>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[28px] font-bold tracking-[-0.04em] text-foreground">
            Kathmandu Durbar Square
          </h1>
          <button type="button" aria-label="Share" className="text-foreground">
            <Icon icon="iconoir:share-android" className="size-7" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium text-text-secondary">4.0</span>
          <StarRating rating={4} starSize={20} />
          <span className="size-1 rounded-full bg-text-secondary" />
          <button type="button" className="text-lg text-text-secondary underline">
            (13 Reviews)
          </button>
        </div>
      </div>

      {/* Overview + Key Facts | Gallery */}
      <div className="flex flex-col gap-10 border-b border-border pb-6 lg:flex-row lg:gap-10">
        <div className="flex flex-col gap-6 lg:w-[644px]">
          <div className="flex flex-col gap-5 border-b border-border pb-6">
            <h2 className={sectionHeading}>Overview</h2>
            <p className="font-body-alt text-lg leading-[1.6] tracking-[-0.02em] text-text-secondary">
              Lumbini, located in Nepal, holds profound significance as a UNESCO
              World Heritage Site. It is revered worldwide as the birthplace of
              Siddhartha Gautama, the historical Buddha. This sacred pilgrimage
              site attracts Buddhists and visitors from around the globe, drawn
              by its tranquil ambiance and historical resonance.
            </p>
            <button type="button" className="w-fit font-semibold tracking-[-0.03em] text-foreground underline">
              See More
            </button>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className={sectionHeading}>Key Facts</h2>
            <div className="flex gap-12">
              <div className="flex flex-col gap-4">
                {KEY_FACTS.map((f) => (
                  <div key={f.label} className="flex items-center gap-2">
                    <Icon icon={f.icon} className="size-5 text-text-secondary" />
                    <span className="font-body-alt text-lg capitalize tracking-[-0.02em] text-text-secondary">
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {KEY_FACTS.map((f) => (
                  <span
                    key={f.label}
                    className="font-body-alt text-lg capitalize tracking-[-0.04em] text-foreground"
                  >
                    {f.value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="grid h-[335px] grid-cols-2 gap-2">
            {GALLERY_LARGE.map((src, i) => (
              <div key={src} className="relative overflow-hidden rounded-lg">
                <Image src={src} alt="" fill sizes="320px" className="object-cover" priority={i === 0} />
              </div>
            ))}
          </div>
          <div className="grid h-[125px] grid-cols-3 gap-4">
            {GALLERY_SMALL.map((src, i) => (
              <div key={src} className="relative overflow-hidden rounded-lg">
                <Image src={src} alt="" fill sizes="200px" className="object-cover" />
                {i === GALLERY_SMALL.length - 1 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="font-body-alt text-2xl tracking-[-0.02em] text-white">
                      + 10 Photos
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Things Included | Booking card */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-1 flex-col gap-6">
          <h2 className={sectionHeading}>Things Included</h2>
          <div className="flex gap-3">
            <Icon icon="ix:support" className="size-6 shrink-0 text-foreground" />
            <div className="flex flex-col gap-3">
              <p className="font-semibold tracking-[-0.04em] text-foreground">Support Team</p>
              <ul className="list-disc pl-5 font-body-alt text-base leading-[1.9] tracking-[-0.02em] text-text-secondary">
                <li>2 Travel Guide who have fluency in English, French &amp; Chinese</li>
                <li>4 Potters</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-3">
            <Icon icon="hugeicons:first-aid-kit" className="size-7 shrink-0 text-foreground" />
            <div className="flex flex-col gap-2">
              <p className="font-semibold tracking-[-0.04em] text-foreground">First Aid Services</p>
              <ul className="list-disc pl-5 font-body-alt text-base leading-[1.9] tracking-[-0.02em] text-text-secondary">
                <li>Basic Medical Kit</li>
                <li>Trained Personnel</li>
                <li>Emergency Response Support</li>
                <li>Rescue Support</li>
              </ul>
            </div>
          </div>
          <button type="button" className="w-fit font-semibold tracking-[-0.03em] text-foreground underline">
            See More
          </button>
        </div>

        {/* Booking card */}
        <aside className="flex w-full flex-col gap-6 rounded-lg border border-border bg-surface p-6 lg:w-[494px] lg:shrink-0">
          <div className="flex items-start justify-between border-b border-border pb-2">
            <span className="font-body-alt text-base tracking-[-0.03em] text-text-secondary">
              Price per adult
            </span>
            <span className="font-body-alt text-xl tracking-[-0.03em] text-foreground">$400</span>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-2">
              <div className="flex flex-1 flex-col gap-1">
                <span className="py-1 font-body-alt text-base tracking-[-0.02em] text-text-secondary">Date</span>
                <div className="flex items-center justify-between gap-2 rounded-lg border border-border p-3">
                  <span className="font-body-alt text-base tracking-[-0.04em] text-foreground">23 Apr - 1 May</span>
                  <Icon icon="iconoir:calendar" className="size-4 shrink-0 text-foreground" />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="py-1 font-body-alt text-base tracking-[-0.02em] text-text-secondary">Guests</span>
                <div className="flex items-center justify-between gap-2 rounded-lg border border-border p-3">
                  <span className="font-body-alt text-base tracking-[-0.04em] text-foreground">2 adults</span>
                  <Icon icon="ion:people-outline" className="size-4 shrink-0 text-foreground" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 rounded-lg border border-[#2bbf0f] p-4">
              <span className="flex items-center gap-2 text-foreground">
                <span className="font-body-alt text-sm tracking-[-0.04em]">Total</span>
                <span className="text-lg font-semibold tracking-[-0.04em]">$500</span>
              </span>
              <span className="font-body-alt text-sm tracking-[-0.04em] text-text-secondary">2 adults X $250</span>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href={reserveHref}
                className="flex w-full items-center justify-center rounded-lg bg-foreground p-3 font-body-alt text-base font-medium tracking-[-0.03em] text-background transition-transform hover:scale-[1.02] active:scale-95"
              >
                Reserve Now
              </Link>
              <p className="text-center font-body-alt text-sm tracking-[-0.04em] text-text-secondary">
                *Only a deposit is due today. Pay the rest before departure.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Itinerary + Map */}
      <div className="flex flex-col gap-8 border-y border-border py-8 lg:flex-row lg:items-stretch lg:gap-8">
        <div className="flex flex-1 flex-col gap-6">
          <h2 className={sectionHeading}>Itinerary</h2>
          <div className="flex gap-2">
            {DAYS.map((d, i) => (
              <button
                key={d}
                type="button"
                onClick={() => setDay(i)}
                className={
                  i === day
                    ? "rounded bg-foreground p-3 font-body-alt text-base text-background"
                    : "rounded bg-background p-3 font-body-alt text-base text-foreground"
                }
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-5 rounded-lg border border-border p-6">
            <div className="flex items-start justify-between gap-4">
              <p className="font-body-alt text-xl tracking-[-0.04em] text-foreground">
                Tribhuvan N. Airport - Swayobhunath Temple at Kathmandu
              </p>
              <span className="shrink-0 rounded bg-background p-3 text-base font-semibold tracking-[-0.04em] text-foreground">
                8 hours
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <Icon icon="material-symbols-light:bed-outline-rounded" className="size-6 text-text-secondary" />
                <span className="font-body-alt text-base tracking-[-0.02em] text-text-secondary">Hotel</span>
              </span>
              <span className="size-1 rounded-full bg-text-secondary" />
              <span className="flex items-center gap-1.5">
                <Icon icon="fluent:vehicle-bus-20-regular" className="size-6 text-text-secondary" />
                <span className="font-body-alt text-base tracking-[-0.02em] text-text-secondary">Jeep / Car / Bus</span>
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-body-alt text-lg tracking-[-0.04em] text-foreground">Description</p>
              <p className="font-body-alt text-base leading-[1.6] tracking-[-0.02em] text-text-secondary">
                Join our expert local guide for unforgettable sightseeing and
                trekking adventures across Nepal&apos;s majestic mountains,
                ancient temples, and hidden valleys.
              </p>
            </div>
          </div>
        </div>
        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl lg:h-auto lg:w-[517px] lg:shrink-0">
          <Image src="/images/pkgd-map.png" alt="Map" fill sizes="517px" className="object-cover" />
        </div>
      </div>

      {/* Reviews & Ratings */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className={sectionHeading}>Reviews &amp; Ratings</h2>
          <button
            type="button"
            className="rounded-lg border border-border bg-background p-3 text-base font-semibold tracking-[-0.03em] text-text-secondary"
          >
            Write a review
          </button>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Sidebar */}
          <aside className="flex w-full flex-col gap-5 lg:w-[440px]">
            <div className="flex h-[45px] items-center gap-2 rounded-lg border border-border bg-surface px-4">
              <Icon icon="iconoir:search" className="size-[18px] text-[#a3adbb]" />
              <span className="font-body-alt text-base tracking-[-0.04em] text-[#a3adbb]">Search Here</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-text-secondary">4.0</span>
              <StarRating rating={4} starSize={24} />
              <span className="text-lg font-semibold text-text-secondary">(13)</span>
            </div>
            <div className="flex flex-col gap-4">
              {BREAKDOWN.map((b) => (
                <div key={b.label} className="flex items-center justify-between gap-3">
                  <span className="w-20 shrink-0 text-base font-semibold tracking-[-0.02em] text-text-secondary">
                    {b.label}
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(b.count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-4 shrink-0 text-right text-base font-semibold text-text-secondary">
                    {b.count}
                  </span>
                </div>
              ))}
            </div>
          </aside>

          {/* Reviews list */}
          <div className="flex flex-1 flex-col gap-4">
            {REVIEWS.map((r) => (
              <ReviewCard key={r.name} {...r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
