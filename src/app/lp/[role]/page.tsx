import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getRolePage, ROLE_LANDING_PAGES } from "@/lib/lp/roles";
import { RoleCapture } from "@/components/lp/RoleCapture";
import { LpViewTracker } from "@/components/lp/LpViewTracker";

interface Props {
  params: Promise<{ role: string }>;
}

export async function generateStaticParams() {
  return ROLE_LANDING_PAGES.map((r) => ({ role: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  const page = getRolePage(role);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      type: "website",
    },
    robots: { index: false }, // LP pages are for paid traffic — keep out of organic index
  };
}

export default async function RoleLandingPage({ params }: Props) {
  const { role } = await params;
  const page = getRolePage(role);
  if (!page) notFound();

  return (
    <div className="min-h-screen bg-[#F7F6F3]">

      {/* Minimal header — logo + enrol only */}
      <header className="bg-white border-b border-[#E7E5E4]">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-[#1C1917] tracking-[-0.02em]">
            Torvi
          </Link>
          <Link
            href={`/quiz?intent=enrol&role=${page.quizRole}`}
            className="inline-flex items-center h-8 px-4 text-xs font-semibold rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors"
          >
            Enrol — €200
          </Link>
        </div>
      </header>

      <LpViewTracker role={page.quizRole} />

      <main className="max-w-4xl mx-auto px-6 sm:px-10">

        {/* Hero */}
        <section className="pt-16 pb-14 border-b border-[#E7E5E4]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#78716C] mb-5">
            TORVI · FOR {page.roleLabel.toUpperCase()}S
          </p>
          <h1 className="text-[2.25rem] sm:text-[3rem] font-semibold text-[#1C1917] tracking-[-0.035em] leading-[1.1] mb-5 max-w-2xl">
            {page.headline}
          </h1>
          <p className="text-[1.0625rem] text-[#78716C] leading-[1.75] max-w-xl mb-8">
            {page.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a
              href="#kit"
              className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors min-h-[44px]"
            >
              Get the free {page.roleLabel} kit
            </a>
            <Link
              href={`/quiz?intent=enrol&role=${page.quizRole}`}
              className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium rounded border border-[#1C1917]/20 text-[#1C1917] hover:bg-white transition-colors min-h-[44px]"
            >
              Enrol now — €200
            </Link>
          </div>
          {/* Trust strip */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-[#A8A29E] mb-8">
            <span>€200 founding rate</span>
            <span>·</span>
            <span>Start immediately</span>
            <span>·</span>
            <Link href="/refund" className="underline underline-offset-2 hover:text-[#78716C] transition-colors">7-day refund policy</Link>
            <span>·</span>
            <span>One-time payment</span>
          </div>

          {/* Free kit contents — above the fold */}
          <div className="bg-white border border-[#E7E5E4] rounded-lg p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#78716C] mb-3">
              FREE {page.roleLabel.toUpperCase()} KIT — SENT TO YOUR INBOX
            </p>
            <ul className="space-y-2">
              {[
                `${page.roleLabel} prompt pack — 5 Claude prompts for the work you do every week`,
                "Tool brief template — define what you're building before you touch any tools",
                "Week 1 worksheet — answer these before opening Cursor. Saves hours of wrong building.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-[#1C1917]">
                  <span className="mt-0.5 w-4 h-4 shrink-0 rounded-sm bg-[#EFF6FF] flex items-center justify-center text-[10px] font-bold text-[#1D4ED8]">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#kit"
              className="mt-4 inline-flex items-center text-xs font-medium text-[#1D4ED8] hover:text-[#1e40af] transition-colors"
            >
              Get the kit free →
            </a>
          </div>
        </section>

        {/* Problem */}
        <section className="py-14 border-b border-[#E7E5E4]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#78716C] mb-6">
            THE PROBLEM
          </p>
          <p className="text-lg font-semibold text-[#1C1917] mb-6">
            If any of these sound familiar:
          </p>
          <ul className="space-y-4">
            {page.painPoints.map((point, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-1 w-5 h-5 shrink-0 rounded-full bg-[#FEF2F2] flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 2v3l2 1" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="5" cy="5" r="4" stroke="#DC2626" strokeWidth="1.2"/>
                  </svg>
                </span>
                <p className="text-[#1C1917] leading-[1.75]">{point}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-[#78716C] leading-[1.75]">
            Torvi is a four-week guided build program. You define one problem, scope one tool, and ship it — with weekly office hours to keep you unblocked.
          </p>
        </section>

        {/* What you'll build */}
        <section className="py-14 border-b border-[#E7E5E4]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#78716C] mb-6">
            WHAT YOU&apos;LL BUILD
          </p>
          <p className="text-lg font-semibold text-[#1C1917] mb-2">
            In four weeks, you&apos;ll ship one of these:
          </p>
          <p className="text-sm text-[#78716C] mb-8">
            You pick the one that solves your most pressing problem.
          </p>
          <div className="grid sm:grid-cols-3 gap-px bg-[#E7E5E4] border border-[#E7E5E4] rounded-lg overflow-hidden">
            {page.toolExamples.map((tool) => (
              <div key={tool.title} className="bg-white p-5">
                <p className="font-semibold text-[#1C1917] text-sm mb-2">{tool.title}</p>
                <p className="text-xs text-[#78716C] leading-[1.65]">{tool.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-[#F7F6F3] border border-[#E7E5E4] rounded-lg px-5 py-4">
            <p className="text-sm text-[#1C1917]">
              <span className="font-semibold">You leave with: </span>
              {page.outcome}
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="py-14 border-b border-[#E7E5E4]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#78716C] mb-6">
            HOW IT WORKS
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                label: "Week 0",
                title: "Define your problem",
                desc: "Write a one-page tool brief. Scope it to something you can ship in four weeks.",
              },
              {
                label: "Weeks 1–2",
                title: "Build the core",
                desc: "The logic that does the work, then the interface that makes it usable.",
              },
              {
                label: "Weeks 3–4",
                title: "Review and ship",
                desc: "Test with a real user. Polish. Deploy. You have a working tool.",
              },
              {
                label: "Throughout",
                title: "Weekly office hours",
                desc: "Bring your build. Get unblocked in 10 minutes. No prep required.",
              },
            ].map((step) => (
              <div key={step.label} className="bg-white border border-[#E7E5E4] rounded-lg p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1D4ED8] mb-2">
                  {step.label}
                </p>
                <p className="font-semibold text-[#1C1917] text-sm mb-1">{step.title}</p>
                <p className="text-xs text-[#78716C] leading-[1.65]">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Free kit capture */}
        <section id="kit" className="py-14 border-b border-[#E7E5E4]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#78716C] mb-6">
            NOT READY TO ENROL YET?
          </p>
          <RoleCapture roleLabel={page.roleLabel} quizRole={page.quizRole} />
        </section>

        {/* Enrol CTA */}
        <section className="py-14">
          <div className="bg-[#1C1917] rounded-lg p-8 sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A8A29E] mb-4">
              READY TO BUILD?
            </p>
            <p className="text-white font-semibold text-xl sm:text-2xl tracking-[-0.02em] leading-[1.2] mb-2 max-w-md">
              {page.ctaNote}
            </p>
            <p className="text-[#A8A29E] text-sm mb-7">
              €200 founding rate. One-time. Start immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/quiz?intent=enrol&role=${page.quizRole}`}
                className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors min-h-[44px]"
              >
                Enrol now — €200
              </Link>
              <a
                href="#kit"
                className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium rounded border border-[#44403C] text-[#E7E5E4] hover:border-[#78716C] transition-colors min-h-[44px]"
              >
                Get the free kit first
              </a>
            </div>
            <p className="text-xs text-[#78716C] mt-5">
              7-day refund policy · Founding rate locks after cohort 3
            </p>
          </div>
        </section>

      </main>

      {/* Minimal footer */}
      <footer className="border-t border-[#E7E5E4] bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between text-xs text-[#A8A29E]">
          <span>Torvi</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-[#78716C] transition-colors">Home</Link>
            <Link href="/quiz" className="hover:text-[#78716C] transition-colors">Quiz</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
