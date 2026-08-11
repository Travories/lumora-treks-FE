"use client";

import { Icon } from "@iconify/react";
import clsx from "clsx";

/** Prev / next circular arrows (Figma: gray prev, neon-green next). Wire
 * onPrev/onNext to a carousel (or pagination); pass disabled states to grey the
 * arrows at the ends. */
type CarouselNavProps = {
  onPrev?: () => void;
  onNext?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  className?: string;
};

export default function CarouselNav({
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
  className,
}: CarouselNavProps) {
  return (
    <div className={clsx("flex items-center gap-4", className)}>
      <button
        type="button"
        onClick={onPrev}
        disabled={prevDisabled}
        aria-label="Previous"
        className="flex size-[50px] items-center justify-center rounded-full bg-background text-foreground transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
      >
        <Icon icon="iconoir:arrow-left" className="size-6" />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        aria-label="Next"
        className="flex size-[50px] items-center justify-center rounded-full bg-primary-accent text-foreground transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
      >
        <Icon icon="iconoir:arrow-right" className="size-6" />
      </button>
    </div>
  );
}
