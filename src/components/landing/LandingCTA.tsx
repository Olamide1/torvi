import Link from "next/link";

export function LandingCTA() {
  return (
    <section className="py-[120px] bg-[#1C1917]">
      <div className="max-w-page mx-auto px-6 sm:px-10">
        <p className="text-[11px] font-semibold text-[#57534E] uppercase tracking-[0.1em] mb-8">
          OPEN ENROLMENT
        </p>
        <h2
          className="font-semibold text-white leading-[0.97] tracking-[-0.04em] mb-8 max-w-2xl"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Buy now. Start immediately.
        </h2>
        <p className="text-[#78716C] text-base mb-10">
          No waiting for the next cohort. €200 founding rate. Weekly guided runs.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-start">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors tracking-[-0.01em] min-h-[44px]"
          >
            Get your free role kit
          </Link>
          <Link
            href="/quiz?intent=enrol"
            className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded border border-white/20 text-white hover:bg-white/5 transition-colors tracking-[-0.01em] min-h-[44px]"
          >
            Enrol now — €200
          </Link>
        </div>
        <p className="mt-6 text-xs text-[#57534E]">
          7-day refund policy &middot; VAT invoices available &middot; Membership available after completion
        </p>
      </div>
    </section>
  );
}
