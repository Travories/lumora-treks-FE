"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import clsx from "clsx";

/** SearchBar — Location + Date fields with a neon-green search button. Submits to
 * `/packages?location=&date=`. Shared by the landing hero and page heroes. */
type SearchBarProps = {
  className?: string;
};

export default function SearchBar({ className }: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (date.trim()) params.set("date", date.trim());
    const qs = params.toString();
    router.push(qs ? `/packages?${qs}` : "/packages");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "flex flex-col gap-3 rounded-lg bg-background p-3 sm:flex-row sm:items-center",
        className
      )}
    >
      <label className="flex h-[50px] flex-1 items-center justify-between rounded-lg border border-border bg-white px-4">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-transparent font-body-alt text-lg font-medium tracking-[-0.04em] text-foreground placeholder:text-foreground/70 focus:outline-none"
        />
        <Icon icon="proicons:location" className="size-5 shrink-0 text-foreground" />
      </label>

      <label className="flex h-[50px] flex-1 items-center justify-between rounded-lg border border-border bg-white px-4">
        <input
          type="text"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-transparent font-body-alt text-lg font-medium tracking-[-0.04em] text-foreground placeholder:text-foreground/70 focus:outline-none"
        />
        <Icon icon="iconoir:calendar" className="size-5 shrink-0 text-foreground" />
      </label>

      <button
        type="submit"
        aria-label="Search"
        className="flex items-center justify-center rounded-lg bg-primary-accent p-[13px] text-foreground transition-transform hover:scale-105 active:scale-95"
      >
        <Icon icon="mingcute:search-line" className="size-6" />
      </button>
    </form>
  );
}
