"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import Button from "@/components/ui/Button";
import { useUIStore } from "@/store/useUIStore";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "#packages" },
  { label: "Destinations", href: "#destinations" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const { isMobileNavOpen, toggleMobileNav, closeMobileNav } = useUIStore();
  const [activeLink, setActiveLink] = useState("Home");

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-secondary">
          <Icon icon="ph:mountains-fill" className="h-7 w-7 text-primary" />
          Lumora Treks
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setActiveLink(link.label)}
              className={clsx(
                "relative flex items-center gap-2 text-sm transition-colors",
                activeLink === link.label
                  ? "font-bold text-secondary"
                  : "font-medium text-text-secondary hover:text-secondary"
              )}
            >
              {activeLink === link.label && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button variant="secondary" size="sm" className="rounded-full!">
            Reserve Now
          </Button>
        </div>

        <button
          onClick={toggleMobileNav}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-secondary lg:hidden"
        >
          <Icon icon={isMobileNavOpen ? "iconoir:xmark" : "iconoir:menu"} className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-surface lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.label);
                    closeMobileNav();
                  }}
                  className={clsx(
                    "rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                    activeLink === link.label
                      ? "bg-primary text-secondary"
                      : "text-text-secondary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="secondary" size="sm" className="mt-2 w-full rounded-full!">
                Reserve Now
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
