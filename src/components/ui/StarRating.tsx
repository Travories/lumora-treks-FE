import { Icon } from "@iconify/react";
import clsx from "clsx";

/** StarRating — row of star glyphs, `rating` of `max` filled.
 * Reused by the destination header, reviews summary, and each ReviewCard. */
export type StarRatingProps = {
  rating: number;
  max?: number;
  /** star glyph size in px */
  starSize?: number;
  className?: string;
  filledClass?: string;
  emptyClass?: string;
};

export default function StarRating({
  rating,
  max = 5,
  starSize = 20,
  className,
  filledClass = "text-foreground",
  emptyClass = "text-[#d4d8de]",
}: StarRatingProps) {
  const filled = Math.round(rating);
  return (
    <div
      className={clsx("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Icon
          key={i}
          icon="ic:round-star"
          style={{ fontSize: starSize }}
          className={i < filled ? filledClass : emptyClass}
        />
      ))}
    </div>
  );
}
