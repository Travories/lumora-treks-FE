"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import clsx from "clsx";

type DestinationCardVariant = "default" | "big-package" | "package-card";

type DestinationCardProps = {
  title: string;
  image: string;
  variant?: DestinationCardVariant;
  description?: string;
  className?: string;
};

export default function DestinationCard({
  title,
  image,
  variant = "default",
  description,
  className,
}: DestinationCardProps) {
  const isBig = variant === "big-package";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={clsx(
        "relative w-full overflow-hidden rounded-3xl",
        isBig ? "h-full min-h-[280px]" : "h-full min-h-[180px]",
        className
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {isBig ? (
        <div className="absolute inset-x-4 bottom-4 flex flex-col gap-4 rounded-2xl bg-background/95 p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold text-text-primary">{title}</h3>
            <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-secondary transition-colors hover:bg-primary-hover">
              <Icon icon="iconoir:arrow-up-right" className="h-4 w-4" />
            </button>
          </div>
          {description && (
            <p className="text-sm leading-relaxed text-text-muted">{description}</p>
          )}
        </div>
      ) : (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
          <h3 className="text-lg font-bold text-white drop-shadow-sm">{title}</h3>
          {variant === "package-card" && (
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-secondary transition-colors hover:bg-primary-hover">
              <Icon icon="iconoir:arrow-up-right" className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
