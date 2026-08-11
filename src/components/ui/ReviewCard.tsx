import Image from "next/image";
import { Icon } from "@iconify/react";
import StarRating from "./StarRating";

/** ReviewCard — a single review inside the Reviews & Ratings list.
 * Figma nodes 102:8609 / 79:6473. */
export type Review = {
  name: string;
  avatar: string;
  timeAgo: string;
  rating: number;
  text: string;
  /** null / undefined → "No reply yet"; a string → "View reply" */
  reply?: string | null;
};

export default function ReviewCard({
  name,
  avatar,
  timeAgo,
  rating,
  text,
  reply,
}: Review) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border p-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={avatar}
              alt={name}
              width={32}
              height={32}
              className="size-8 shrink-0 rounded-full object-cover"
            />
            <div className="flex items-center gap-2">
              <span className="font-body-alt text-lg font-medium tracking-[-0.04em] text-foreground">
                {name}
              </span>
              <span className="size-1 shrink-0 rounded-full bg-text-muted" />
              <span className="font-body-alt text-sm tracking-[-0.04em] text-text-muted">
                {timeAgo}
              </span>
            </div>
          </div>
          <button
            type="button"
            aria-label="Review options"
            className="shrink-0 text-text-secondary transition-colors hover:text-foreground"
          >
            <Icon icon="iconoir:more-vert" className="size-6" />
          </button>
        </div>
        <StarRating rating={rating} starSize={20} />
      </div>

      <p className="font-body-alt text-base leading-[1.36] tracking-[-0.02em] text-text-secondary">
        {text}
      </p>

      {reply ? (
        <button
          type="button"
          className="w-fit font-body-alt text-base tracking-[-0.04em] text-foreground underline"
        >
          View reply
        </button>
      ) : (
        <span className="font-body-alt text-base tracking-[-0.04em] text-[#909dad] underline">
          No reply yet
        </span>
      )}
    </div>
  );
}
