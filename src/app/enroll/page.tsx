"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { trackConversion } from "@/lib/analytics";

const CURRICULUM = [
  {
    week: "Week 0",
    title: "Define your problem",
    outcome: "One-page tool brief — scope, inputs, outputs, and first build step.",
  },
  {
    week: "Week 1",
    title: "Build the core logic",
    outcome: "A working prototype — the thing that does the work, even if rough.",
  },
  {
    week: "Week 2",
    title: "Make it usable",
    outcome: "An interface another person could actually use without help.",
  },
  {
    week: "Week 3",
    title: "Connect and test",
    outcome: "Integrated with your stack. Tested with at least one real user.",
  },
  {
    week: "Week 4",
    title: "Ship it",
    outcome: "Live tool + certificate of completion.",
  },
];

const INCLUDED = [
  "Role-based build path (PM, Ops, Consultant, Founder, Team Lead)",
  "Weekly guided curriculum with office hours every week",
  "Role-specific prompt pack and tool brief template",
  "AI coach for technical blockers between sessions",
  "Certificate on completion (Week 4 deliverable)",
  "Cohort Slack — peer accountability and async support",
];

const FAQS = [
  {
    q: "When does it start?",
    a: "Immediately after purchase. Open enrolment — no waiting for a cohort date. You start Week 0 the same day.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. You build with Claude and Cursor using prompts. You need to be comfortable learning by doing, but no prior technical experience is required.",
  },
  {
    q: "How much time does it take?",
    a: "4–6 hours per week is the recommended pace. That's roughly two to three hours building and one weekly office hours session.",
  },
  {
    q: "What's the refund policy?",
    a: "7-day refund from the date of purchase, as long as the cohort hasn't started. Once it starts, we apply a transfer to a future cohort.",
  },
  {
    q: "Can I get a VAT invoice?",
    a: "Yes. Stripe issues compliant VAT invoices automatically.",
  },
];

export default function EnrollPage() {
  const [email, setEmail] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    trackConversion("view_content", { content_name: "enroll_page" });
    trackConversion("initiate_checkout", { value: 200, currency: "EUR" });
  }, []);

  async function handleEnrol(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setEnrolling(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      trackConversion("initiate_checkout", { value: 200, currency: "EUR" });
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setEnrolling(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3]">

      {/* Minimal header */}
      <header className="bg-white border-b border-[#E7E5E4]">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-[#1C1917] tracking-[-0.02em]">
            Torvi
          </Link>
          <span className="text-xs text-[#78716C]">€200 founding rate</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 sm:px-10 py-12 space-y-12">

        {/* Hero */}
        <div>
          <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.08em] bg-[#F0FDF4] text-[#15803D] px-2 py-0.5 rounded-sm mb-5">
            Open enrolment · Start immediately
          </span>
          <h1 className="text-[2.25rem] sm:text-[2.75rem] font-semibold text-[#1C1917] tracking-[-0.035em] leading-[1.1] mb-4">
            Four weeks.<br />One shipped tool.
          </h1>
          <p className="text-[1.0625rem] text-[#78716C] leading-[1.75] max-w-xl">
            A guided build program for senior professionals. The system tells you what to build each week. Office hours unblock you. You ship a real tool at the end.
          </p>
        </div>

        {/* Checkout form */}
        <div className="bg-white border border-[#E7E5E4] rounded-lg p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8] mb-1">
                FOUNDING COHORT · ONE-TIME
              </p>
              <p className="text-sm font-semibold text-[#1C1917]">4-week cohort — all included</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl font-semibold text-[#1C1917] tracking-[-0.03em] leading-none">€200</div>
              <div className="text-xs text-[#78716C] mt-0.5">+ VAT · one-time</div>
            </div>
          </div>
          <form onSubmit={handleEnrol} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Work email"
              required
              className="w-full h-11 px-4 text-sm rounded border border-[#E7E5E4] bg-[#F7F6F3] text-[#1C1917] placeholder-[#A8A29E] outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8]"
            />
            <button
              type="submit"
              disabled={enrolling}
              className="w-full h-11 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors disabled:opacity-60 min-h-[44px]"
            >
              {enrolling ? "Redirecting to checkout…" : "Enrol now — €200"}
            </button>
            {error && <p className="text-xs text-red-600">{error}</p>}
          </form>
          <div className="mt-4 pt-4 border-t border-[#E7E5E4] flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#A8A29E]">
            <span>Start immediately</span>
            <span>·</span>
            <Link href="/refund" className="hover:text-[#78716C] transition-colors">7-day refund policy</Link>
            <span>·</span>
            <span>VAT invoice included</span>
          </div>
        </div>

        {/* What's included */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#78716C] mb-5">
            WHAT&apos;S INCLUDED
          </p>
          <ul className="space-y-3">
            {INCLUDED.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-[#1C1917] leading-[1.7]">
                <span className="mt-1 w-4 h-4 shrink-0 rounded-sm bg-[#EFF6FF] flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4l2 2 4-4" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Curriculum */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#78716C] mb-5">
            THE BUILD PATH
          </p>
          <div className="bg-white border border-[#E7E5E4] rounded-lg overflow-hidden divide-y divide-[#E7E5E4]">
            {CURRICULUM.map((w) => (
              <div key={w.week} className="px-5 py-4 flex gap-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#1D4ED8] mt-0.5 w-14 shrink-0">
                  {w.week}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#1C1917] mb-0.5">{w.title}</p>
                  <p className="text-xs text-[#78716C] leading-[1.6]">Deliverable: {w.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#78716C] mb-5">FAQ</p>
          <div className="divide-y divide-[#E7E5E4]">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-start justify-between py-4 text-left gap-6"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-semibold text-[#1C1917]">{faq.q}</span>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className={`shrink-0 mt-0.5 text-[#78716C] transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  >
                    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <p className="pb-4 text-sm text-[#78716C] leading-[1.75]">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#1C1917] rounded-lg p-8">
          <p className="text-white font-semibold text-lg mb-1">Ready to ship?</p>
          <p className="text-[#A8A29E] text-sm mb-5">€200 founding rate. Starts immediately. Price increases after cohort 3.</p>
          <form onSubmit={handleEnrol} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Work email"
              required
              className="flex-1 h-11 px-4 text-sm rounded border border-[#44403C] bg-[#292524] text-white placeholder-[#78716C] outline-none focus:border-[#1D4ED8]"
            />
            <button
              type="submit"
              disabled={enrolling}
              className="h-11 px-6 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors disabled:opacity-60 whitespace-nowrap min-h-[44px]"
            >
              {enrolling ? "Redirecting…" : "Enrol — €200"}
            </button>
          </form>
          <p className="text-xs text-[#78716C] mt-3">
            <Link href="/refund" className="hover:text-[#A8A29E] transition-colors underline underline-offset-2">7-day refund policy</Link>
            {" "}· VAT invoice included · Founding rate locks after cohort 3
          </p>
        </div>

      </main>

      <footer className="border-t border-[#E7E5E4] bg-white mt-12">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between text-xs text-[#A8A29E]">
          <span>Torvi</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-[#78716C] transition-colors">Home</Link>
            <Link href="/refund" className="hover:text-[#78716C] transition-colors">Refund policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
