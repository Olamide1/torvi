import Link from "next/link";

const COHORT_INCLUDED = [
  "4-week cohort with weekly office hours",
  "Role-based path and build templates",
  "Prompt pack for your tool type",
  "Certificate on completion",
  "Cohort Slack channel",
];

const MEMBERSHIP_EXTRA = [
  "Ongoing template library and future runs",
  "Monthly member office hours",
  "Alumni community access",
];

export function Pricing() {
  return (
    <section id="pricing" className="py-[120px] border-t border-[#E7E5E4] bg-[#F7F6F3]">
      <div className="max-w-page mx-auto px-6 sm:px-10">
        <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-6">PRICING</p>
        <h2 className="text-[2.25rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15] mb-4 max-w-xl">
          Simple pricing. Price goes up once we have proof.
        </h2>
        <p className="text-[#78716C] leading-[1.75] max-w-lg mb-14">
          Founding cohort rate is €200. This covers cohorts one through three. After that, price increases as outcomes accumulate.
        </p>

        <div className="grid lg:grid-cols-3 gap-px bg-[#E7E5E4] border border-[#E7E5E4] rounded-lg overflow-hidden">

          {/* Tier 1: Free lead magnet */}
          <div className="bg-[#F7F6F3] p-8 flex flex-col">
            <div className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-4">FREE</div>
            <div className="text-[2rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-none mb-1">€0</div>
            <div className="text-xs text-[#78716C] mb-6">No card required</div>
            <div className="text-sm font-semibold text-[#1C1917] mb-3">Role starter kit</div>
            <ul className="space-y-2 text-sm text-[#78716C] mb-8 flex-1">
              <li>— Role-based prompt pack</li>
              <li>— First internal tool worksheet</li>
              <li>— Tool brief template</li>
            </ul>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center h-10 px-5 text-sm font-medium rounded border border-[#1C1917]/20 text-[#1C1917] hover:bg-white transition-colors min-h-[44px] tracking-[-0.01em]"
            >
              Get your free role kit
            </Link>
          </div>

          {/* Tier 2: Founding cohort */}
          <div className="bg-white p-8 flex flex-col">
            <div className="text-[11px] font-semibold text-[#1D4ED8] uppercase tracking-[0.1em] mb-4">OPEN ENROLMENT · FOUNDING RATE</div>
            <div className="text-[2rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-none mb-1">€200</div>
            <div className="text-xs text-[#78716C] mb-6">+ VAT · one-time</div>
            <div className="text-sm font-semibold text-[#1C1917] mb-3">4-week cohort</div>
            <ul className="space-y-2 text-sm text-[#78716C] mb-8 flex-1">
              {COHORT_INCLUDED.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
            <Link
              href="/quiz?intent=enrol"
              className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors min-h-[44px] tracking-[-0.01em]"
            >
              Enrol now — €200
            </Link>
            <p className="text-xs text-[#78716C] mt-3 text-center">Start immediately · 7-day refund policy</p>
          </div>

          {/* Tier 3: Membership upsell */}
          <div className="bg-[#F7F6F3] p-8 flex flex-col">
            <div className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-4">POST-COHORT UPSELL</div>
            <div className="text-[2rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-none mb-1">€79</div>
            <div className="text-xs text-[#78716C] mb-6">/ month · after cohort ends</div>
            <div className="text-sm font-semibold text-[#1C1917] mb-3">Membership</div>
            <ul className="space-y-2 text-sm text-[#78716C] mb-8 flex-1">
              {COHORT_INCLUDED.map((item) => (
                <li key={item}>— {item}</li>
              ))}
              {MEMBERSHIP_EXTRA.map((item) => (
                <li key={item} className="text-[#1C1917]">— {item}</li>
              ))}
            </ul>
            <div className="text-xs text-[#78716C] border border-[#E7E5E4] rounded px-4 py-3 leading-relaxed">
              Available to cohort graduates only. Not sold as a front-door product.
            </div>
          </div>
        </div>

        {/* Price increase note */}
        <div className="mt-8 border-t border-[#E7E5E4] pt-6">
          <p className="text-xs text-[#78716C] max-w-2xl leading-relaxed">
            Price increases to €300 after cohort 3, and to €450 once completion rates are strong and we have clear proof of shipped tools. Founding rate is locked for the first three cohorts only.
          </p>
        </div>
      </div>
    </section>
  );
}
