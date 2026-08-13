"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useCallback, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default function JoinExperience({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter();
  const { status } = useAuth();

  const continueToSite = useCallback(() => {
    router.replace(callbackUrl);
    router.refresh();
  }, [callbackUrl, router]);

  useEffect(() => {
    if (status === "authenticated") continueToSite();
  }, [continueToSite, status]);

  return (
    <section className="mx-auto w-full max-w-[1360px] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
      <div className="grid min-h-[620px] overflow-hidden rounded-[32px] border border-border bg-surface shadow-[0_24px_80px_rgba(30,30,30,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
          <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-[#ebffe8]">
            <Icon icon="ph:path" className="size-7 text-primary-active" />
          </div>
          <p className="font-body-alt text-xs font-bold uppercase tracking-[0.16em] text-primary-active">
            Join Lumora
          </p>
          <h1 className="mt-4 max-w-lg text-[clamp(2.6rem,5vw,4.7rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-foreground">
            Your trail, shaped around you.
          </h1>
          <p className="mt-6 max-w-md font-body-alt text-base leading-relaxed tracking-[-0.02em] text-text-secondary sm:text-lg">
            Sign in once, tell us what you love, and keep your future reviews and travel ideas in one place.
          </p>

          <div className="mt-9">
            {status === "loading" || status === "authenticated" ? (
              <div className="flex h-11 w-full max-w-[340px] items-center justify-center rounded-full border border-border bg-background font-body-alt text-sm font-semibold text-text-secondary">
                <Icon icon="svg-spinners:ring-resize" className="mr-2 size-5" />
                Checking your account…
              </div>
            ) : (
              <GoogleSignInButton />
            )}
          </div>

          <p className="mt-5 max-w-sm font-body-alt text-xs leading-relaxed text-text-muted">
            No new password to remember. Lumora only receives the basic profile details Google
            shares for sign-in.
          </p>

          <div className="mt-10 border-t border-border pt-5 font-body-alt text-sm text-text-secondary">
            Just want to ask about a trip?{" "}
            <Link href="/enquiry" className="font-bold text-foreground underline underline-offset-4">
              Send an enquiry without signing in.
            </Link>
          </div>
        </div>

        <div className="relative hidden min-h-[620px] overflow-hidden lg:block">
          <Image
            src="/images/region-everest.png"
            alt="Mountain trail in the Everest region"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 0px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />

          <div className="absolute bottom-10 left-10 right-10 rounded-[24px] border border-white/20 bg-white/10 p-6 text-white backdrop-blur-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-body-alt text-xs font-bold uppercase tracking-[0.14em] text-primary-accent">
                  One small profile
                </p>
                <p className="mt-2 max-w-sm text-2xl font-semibold leading-tight tracking-[-0.045em]">
                  Better recommendations now. Trusted reviews next.
                </p>
              </div>
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-accent text-foreground">
                <Icon icon="iconoir:arrow-up-right" className="size-7" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
