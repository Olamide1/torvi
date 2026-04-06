"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase());

export function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const next = searchParams.get("next") ?? "/hub";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [apiError, setApiError] = useState<string | null>(null);

  const isAdmin = ADMIN_EMAILS.includes(email.trim().toLowerCase());

  const errorMessages: Record<string, string> = {
    missing_token: "Sign-in link is missing. Please request a new one.",
    invalid_token: "Sign-in link has expired or is invalid. Please request a new one.",
    no_account: "No account found for that email.",
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setApiError(null);

    if (isAdmin) {
      // Admin: password login — no email needed
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.error ?? "Something went wrong.");
        setStatus("idle");
        return;
      }
      router.push("/admin");
      return;
    }

    // Learner: magic link
    const res = await fetch("/api/auth/magic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, next }),
    });
    const data = await res.json();
    if (!res.ok) {
      setApiError(data.error ?? "Something went wrong.");
      setStatus("idle");
      return;
    }
    setStatus("sent");
  }

  return (
    <div className="min-h-screen bg-[#FCFCFD] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-sm font-semibold text-[#16181D] mb-10 tracking-tight">
          Torvi
        </Link>

        {status === "sent" ? (
          <div>
            <h1 className="text-xl font-semibold text-[#16181D] mb-2 tracking-tight">Check your inbox</h1>
            <p className="text-sm text-[#7B8391] leading-relaxed">
              We sent a sign-in link to <span className="text-[#16181D] font-medium">{email}</span>.
              It expires in 15 minutes.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-xl font-semibold text-[#16181D] mb-1 tracking-tight">Sign in to Torvi</h1>
            <p className="text-sm text-[#7B8391] mb-8">
              {isAdmin ? "Admin sign-in." : "We'll send you a sign-in link — no password needed."}
            </p>

            {(error || apiError) && (
              <p className="text-sm text-[#B42318] bg-[#FEE4E2] px-4 py-3 rounded-lg mb-5">
                {apiError ?? errorMessages[error!] ?? "Something went wrong."}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-[#4A4F59] mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setApiError(null); }}
                  placeholder="you@example.com"
                  className="w-full h-11 px-4 rounded-lg border border-[#DDE1E7] bg-white text-sm text-[#16181D] placeholder:text-[#C8CDD5] focus:outline-none focus:ring-2 focus:ring-[#2F5BFF] focus:border-transparent transition-shadow"
                />
              </div>

              {isAdmin && (
                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-[#4A4F59] mb-1.5">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Admin password"
                    className="w-full h-11 px-4 rounded-lg border border-[#DDE1E7] bg-white text-sm text-[#16181D] placeholder:text-[#C8CDD5] focus:outline-none focus:ring-2 focus:ring-[#2F5BFF] focus:border-transparent transition-shadow"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-11 rounded-lg bg-[#2F5BFF] text-white text-sm font-medium hover:bg-[#4C72FF] disabled:opacity-60 transition-colors tracking-tight min-h-[44px]"
              >
                {status === "loading"
                  ? "Signing in…"
                  : isAdmin
                  ? "Sign in"
                  : "Send sign-in link"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
