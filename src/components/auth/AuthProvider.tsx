"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AuthUserResponse,
  OnboardingInput,
  TravelerProfile,
} from "@/features/account/types";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  status: AuthStatus;
  user: TravelerProfile | null;
  isOnboardingOpen: boolean;
  signInWithGoogle: (credential: string) => Promise<TravelerProfile>;
  completeOnboarding: (input: OnboardingInput) => Promise<TravelerProfile>;
  dismissOnboarding: () => void;
  openOnboarding: () => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function responseMessage(response: Response) {
  const data: unknown = await response.json().catch(() => null);
  if (data && typeof data === "object") {
    if ("detail" in data && typeof data.detail === "string") return data.detail;
    if ("errors" in data && data.errors && typeof data.errors === "object") {
      const first = Object.values(data.errors as Record<string, unknown>)[0];
      if (typeof first === "string") return first;
      if (Array.isArray(first) && typeof first[0] === "string") return first[0];
    }
  }
  return "Something went wrong. Please try again.";
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<TravelerProfile | null>(null);
  const [dismissedUserId, setDismissedUserId] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/auth/me", { cache: "no-store" })
      .then(async (response) => {
        if (!active) return;
        if (!response.ok) {
          setUser(null);
          setStatus("unauthenticated");
          return;
        }
        const data = (await response.json()) as AuthUserResponse;
        setUser(data.user);
        setStatus("authenticated");
      })
      .catch(() => {
        if (!active) return;
        setUser(null);
        setStatus("unauthenticated");
      });

    return () => {
      active = false;
    };
  }, []);

  const signInWithGoogle = useCallback(async (credential: string) => {
    const response = await fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential }),
    });

    if (!response.ok) throw new Error(await responseMessage(response));
    const data = (await response.json()) as AuthUserResponse;
    setDismissedUserId(null);
    setUser(data.user);
    setStatus("authenticated");
    return data.user;
  }, []);

  const completeOnboarding = useCallback(async (input: OnboardingInput) => {
    const response = await fetch("/api/auth/onboarding", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!response.ok) throw new Error(await responseMessage(response));
    const data = (await response.json()) as AuthUserResponse;
    setUser(data.user);
    setDismissedUserId(null);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    setUser(null);
    setDismissedUserId(null);
    setStatus("unauthenticated");
  }, []);

  const dismissOnboarding = useCallback(() => {
    setDismissedUserId(user?.id ?? null);
  }, [user?.id]);

  const openOnboarding = useCallback(() => setDismissedUserId(null), []);
  const isOnboardingOpen = Boolean(
    status === "authenticated" &&
      user &&
      !user.onboarding_complete &&
      dismissedUserId !== user.id,
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      isOnboardingOpen,
      signInWithGoogle,
      completeOnboarding,
      dismissOnboarding,
      openOnboarding,
      logout,
    }),
    [
      status,
      user,
      isOnboardingOpen,
      signInWithGoogle,
      completeOnboarding,
      dismissOnboarding,
      openOnboarding,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}

