"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

type EmblaCarouselProps = {
  children: React.ReactNode[];
};

export default function EmblaCarousel({ children }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {children.map((child, index) => (
            <div key={index} className="min-w-0">
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={clsx(
                "h-2 rounded-full transition-all",
                index === selectedIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-border hover:bg-primary-accent"
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-primary transition-colors hover:bg-primary hover:text-secondary disabled:opacity-30"
          >
            <Icon icon="iconoir:arrow-left" className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-secondary transition-colors hover:bg-primary-hover disabled:opacity-30"
          >
            <Icon icon="iconoir:arrow-right" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
