"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  variant?: "public" | "app";
  learnerName?: string;
}

export function Navbar({ variant = "public", learnerName }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E7E5E4]">
      <div className={cn("mx-auto px-6 sm:px-10", variant === "public" ? "max-w-page" : "max-w-7xl")}>
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="font-semibold text-[#1C1917] text-base tracking-tight">
            Torvi
          </Link>

          {variant === "public" ? (
            <>
              <nav className="hidden md:flex items-center gap-7">
                <Link href="#how-it-works" className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors">How it works</Link>
                <Link href="#paths" className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors">Role paths</Link>
                <Link href="#pricing" className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors">Pricing</Link>
                <Link href="#faq" className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors">FAQ</Link>
              </nav>

              <div className="hidden md:flex items-center gap-4">
                <Link href="/hub" className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors">Sign in</Link>
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors tracking-[-0.01em]"
                >
                  Get your free kit
                </Link>
              </div>

              <button
                className="md:hidden p-2 text-[#78716C] hover:text-[#1C1917] min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#78716C] hidden sm:block">{learnerName}</span>
              <div className="w-8 h-8 rounded-full bg-[#EFF6FF] flex items-center justify-center text-sm font-semibold text-[#1D4ED8]">
                {learnerName?.charAt(0) ?? "A"}
              </div>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="text-xs text-[#78716C] hover:text-[#1C1917] transition-colors px-2 py-1"
                >
                  Sign out
                </button>
              </form>
            </div>
          )}
        </div>

        {mobileOpen && variant === "public" && (
          <div className="md:hidden pb-4 border-t border-[#E7E5E4] pt-3 space-y-0.5 animate-slide-up">
            {[
              { href: "#how-it-works", label: "How it works" },
              { href: "#paths", label: "Role paths" },
              { href: "#pricing", label: "Pricing" },
              { href: "#faq", label: "FAQ" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block px-2 py-2.5 text-sm text-[#78716C] hover:text-[#1C1917] transition-colors"
              >
                {label}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                href="/quiz"
                className="flex items-center justify-center h-10 px-5 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors"
              >
                Get your free kit
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
