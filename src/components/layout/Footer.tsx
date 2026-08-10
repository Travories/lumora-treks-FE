import Link from "next/link";
import { Icon } from "@iconify/react";
import Button from "@/components/ui/Button";

const EXPLORE_LINKS = ["Home", "Packages", "Destinations", "About Us"];
const SUPPORT_LINKS = ["Contact Us", "FAQs", "Privacy Policy", "Terms of Service"];

const SOCIALS = [
  { icon: "mdi:facebook", href: "#" },
  { icon: "mdi:instagram", href: "#" },
  { icon: "mdi:twitter", href: "#" },
  { icon: "mdi:youtube", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-secondary text-text-inverse">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white">
              <Icon icon="ph:mountains-fill" className="h-7 w-7 text-primary" />
              Lumora Treks
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Discover expertly crafted itineraries, local experiences, and seamless
              bookings that turn every journey into a story worth telling.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {SOCIALS.map((social) => (
                <Link
                  key={social.icon}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary hover:text-secondary"
                >
                  <Icon icon={social.icon} className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wide text-white/40">
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-white/70 hover:text-primary">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wide text-white/40">
              Support
            </h4>
            <ul className="flex flex-col gap-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-white/70 hover:text-primary">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wide text-white/40">
              Newsletter
            </h4>
            <p className="text-sm text-white/70">
              Subscribe to get the latest travel deals and stories.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
              />
              <Button variant="primary" size="sm" className="shrink-0">
                Join
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} Lumora Treks. All rights reserved.</p>
          <p>Designed & built with care for travelers everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
