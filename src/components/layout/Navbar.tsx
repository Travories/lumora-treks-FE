"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useUIStore } from "@/store/useUIStore";

/** Navbar — Figma node 69:873. */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Destinations", href: "/destinations" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isMobileNavOpen = useUIStore((s) => s.isMobileNavOpen);
  const toggleMobileNav = useUIStore((s) => s.toggleMobileNav);
  const closeMobileNav = useUIStore((s) => s.closeMobileNav);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="w-full px-8 py-4 sm:px-12 lg:px-16">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-end gap-[5px]">
          <Image src="/logo.svg" alt="Lumora Treks" width={34} height={30} priority />
          <span className="text-2xl font-extrabold leading-none tracking-[-0.06em] text-foreground">
            Lumora Treks
          </span>
        </Link>

        {/* Desktop nav pill */}
        <nav className="hidden items-center gap-8 rounded-full bg-background px-6 py-3 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link key={link.href} href={link.href} className="flex items-center gap-1">
                {active && (
                  <span className="size-1.5 shrink-0 rounded-full bg-primary-accent" />
                )}
                <span
                  className={clsx(
                    "text-base text-foreground",
                    active
                      ? "font-extrabold tracking-[-0.04em]"
                      : "font-semibold tracking-[-0.06em]"
                  )}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Reserve (desktop) */}
        <Link
          href="/checkout"
          className="hidden shrink-0 items-center justify-center rounded-full bg-foreground px-5 py-2.5 font-body-alt text-base font-semibold tracking-[-0.04em] text-background transition-transform hover:scale-[1.03] active:scale-95 lg:inline-flex"
        >
          Reserve Now
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={toggleMobileNav}
          aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileNavOpen}
          className="flex size-11 items-center justify-center rounded-full bg-background text-foreground lg:hidden"
        >
          <Icon icon={isMobileNavOpen ? "iconoir:xmark" : "iconoir:menu"} className="size-6" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mx-auto mt-3 flex max-w-[1440px] flex-col gap-1 rounded-2xl bg-background p-4 lg:hidden"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileNav}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                >
                  {active && (
                    <span className="size-1.5 shrink-0 rounded-full bg-primary-accent" />
                  )}
                  <span
                    className={clsx(
                      "text-lg text-foreground",
                      active ? "font-extrabold" : "font-semibold"
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
            <Link
              href="/checkout"
              onClick={closeMobileNav}
              className="mt-2 inline-flex items-center justify-center rounded-[34px] bg-foreground px-6 py-3.5 font-body-alt text-lg font-semibold text-background"
            >
              Reserve Now
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
