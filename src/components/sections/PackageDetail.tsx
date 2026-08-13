"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import StarRating from "@/components/ui/StarRating";
import ReviewCard, { type Review } from "@/components/ui/ReviewCard";
import type { CmsPackageDetail } from "@/lib/blocks";

/** Package detail — Figma node 150:10819 ("Main Content"). Distinct from the
 * destination detail: overview + key facts, gallery, things included, booking
 * card, itinerary (+ map), reviews. Content dummy; the seam for Travories. */

const GALLERY_LARGE = ["/images/kds-1.png", "/images/kds-2.png"];
const GALLERY_SMALL = ["/images/kds-3.png", "/images/kds-4.png", "/images/kds-5.png"];

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
  packageData,
}: {
  reserveHref?: string;
  packageData?: CmsPackageDetail;
} = {}) {
  const [day, setDay] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const title = packageData?.title || "Kathmandu Durbar Square";
  const rating = packageData?.rating ?? 4;
  const reviewCount = packageData?.review_count ?? 13;
  const overview = packageData?.summary || packageData?.description ||
    "Lumbini, located in Nepal, holds profound significance as a UNESCO World Heritage Site.";
  const keyFacts = [
    { icon: "bi:suitcase", label: "Trip Style", value: packageData?.category || "Sightseeing" },
    { icon: "lets-icons:speed", label: "Difficulty", value: packageData?.difficulty || "Easy" },
    { icon: "lucide:calendar", label: "Number of days", value: packageData?.duration || "4 Days & 3 Nights" },
  ];
  const galleryItems = packageData?.gallery?.length
    ? packageData.gallery
        .map((item, index) => {
          const src = item.image?.src || item.image?.url;
          if (!src) return null;

          return {
            src,
            caption: item.caption || `${title} photo ${index + 1}`,
          };
        })
        .filter(Boolean) as Array<{ src: string; caption: string }>
    : [...GALLERY_LARGE, ...GALLERY_SMALL].map((src, index) => ({
        src,
        caption: `${title} photo ${index + 1}`,
      }));
  const galleryLarge = galleryItems.slice(0, 2);
  const gallerySmall = galleryItems.slice(2, 5);
  const itinerary = packageData?.itinerary?.length ? packageData.itinerary : null;
  const dayLabels = itinerary?.map((item) => item.day_label) || DAYS;
  const reviews = packageData
    ? packageData.testimonials.map((item) => ({
        name: item.author_name,
        avatar: item.avatar?.src || item.avatar?.url || "/images/avatar-1.png",
        timeAgo: "",
        rating: item.rating,
        text: item.quote,
      }))
    : REVIEWS;
  const maxCount = Math.max(...BREAKDOWN.map((b) => b.count), 1);
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
      <section className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <nav className="flex flex-wrap items-center gap-2 font-body-alt text-base tracking-[-0.02em] text-text-secondary">
            <Link href="/destinations">Destinations</Link>
            <Icon icon="iconoir:nav-arrow-right" className="size-4" />
            <span className="font-medium text-[#2bbf0f] underline">
              {title}
            </span>
          </nav>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-[28px] font-bold tracking-[-0.04em] text-foreground">
              {title}
            </h1>
            <button type="button" aria-label="Share" className="text-foreground">
              <Icon icon="iconoir:share-android" className="size-7" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium text-text-secondary">{rating.toFixed(1)}</span>
            <StarRating rating={rating} starSize={20} />
            <span className="size-1 rounded-full bg-text-secondary" />
            <button type="button" className="text-lg text-text-secondary underline">
              ({reviewCount} Reviews)
            </button>
          </div>
        </div>

        {/* Overview + Key Facts | Gallery */}
        <div className="flex flex-col gap-10 border-b border-border pb-6 lg:flex-row lg:gap-10">
          <div className="flex flex-col gap-6 lg:w-[644px]">
            <div className="flex flex-col gap-5 border-b border-border pb-6">
              <h2 className={sectionHeading}>Overview</h2>
              <p className="font-body-alt text-lg leading-[1.6] tracking-[-0.02em] text-text-secondary">{overview}</p>
              <button type="button" className="w-fit font-semibold tracking-[-0.03em] text-foreground underline">
                See More
              </button>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className={sectionHeading}>Key Facts</h2>
              <div className="flex gap-12">
                <div className="flex flex-col gap-4">
                  {keyFacts.map((f) => (
                    <div key={f.label} className="flex items-center gap-2">
                      <Icon icon={f.icon} className="size-5 text-text-secondary" />
                      <span className="font-body-alt text-lg capitalize tracking-[-0.02em] text-text-secondary">
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  {keyFacts.map((f) => (
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
              {galleryLarge.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActiveGalleryIndex(i)}
                  className="group relative overflow-hidden rounded-lg text-left"
                  aria-label={`Open photo ${i + 1} of ${galleryItems.length}`}
                >
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    sizes="320px"
                    className="object-cover transition duration-300 group-hover:scale-105"
                    priority={i === 0}
                  />
                </button>
              ))}
            </div>
            <div className="grid h-[125px] grid-cols-3 gap-4">
              {gallerySmall.map((item, i) => {
                const itemIndex = i + 2;

                return (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => setActiveGalleryIndex(itemIndex)}
                    className="group relative overflow-hidden rounded-lg text-left"
                    aria-label={`Open photo ${itemIndex + 1} of ${galleryItems.length}`}
                  >
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      sizes="200px"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                    {i === gallerySmall.length - 1 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="font-body-alt text-2xl tracking-[-0.02em] text-white">
                          {galleryItems.length - itemIndex - 1 > 0
                            ? `+ ${galleryItems.length - itemIndex - 1} Photos`
                            : "View Photos"}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
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
              <span className="font-body-alt text-xl tracking-[-0.03em] text-foreground">{packageData ? `${packageData.currency} ${packageData.price}` : "$400"}</span>
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
                  <span className="text-lg font-semibold tracking-[-0.04em]">{packageData ? `${packageData.currency} ${packageData.price}` : "$500"}</span>
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
              {dayLabels.map((d, i) => (
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
                  {itinerary?.[day]?.title || "Tribhuvan N. Airport - Swayobhunath Temple at Kathmandu"}
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
                  {itinerary?.[day]?.description || "Join our expert local guide for unforgettable sightseeing and trekking adventures across Nepal&apos;s majestic mountains, ancient temples, and hidden valleys."}
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-[300px] w-full overflow-hidden rounded-2xl lg:h-auto lg:w-[517px] lg:shrink-0">
            <Image src="/images/pkgd-map.png" alt="Map" fill sizes="517px" className="object-cover" />
          </div>
        </div>

        {/* Reviews & Ratings */}
        {(!packageData || reviews.length > 0) && <div className="flex flex-col gap-6">
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
                <span className="text-xl font-semibold text-text-secondary">{rating.toFixed(1)}</span>
                <StarRating rating={rating} starSize={24} />
                <span className="text-lg font-semibold text-text-secondary">({reviewCount})</span>
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
              {reviews.map((r) => (
                <ReviewCard key={r.name} {...r} />
              ))}
            </div>
          </div>
        </div>}
      </section>

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
                  <p className="mt-1 text-sm text-white/60">Browse all package photos</p>
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
