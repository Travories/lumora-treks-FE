import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  isSameOrigin,
  requestAccountsApi,
} from "@/lib/auth/server";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ detail: "Invalid request origin." }, { status: 403 });
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (token) {
    try {
      await requestAccountsApi("logout/", {
        method: "POST",
        headers: { Authorization: `Token ${token}` },
      });
    } catch {
      // Local sign-out still succeeds if the backend is temporarily unavailable.
    }
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.delete(AUTH_COOKIE_NAME);
  return response;
}

