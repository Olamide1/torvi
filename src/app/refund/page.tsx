import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy — Torvi",
  description: "Torvi's refund and transfer policy for cohort enrolments.",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      <header className="bg-white border-b border-[#E7E5E4]">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 h-14 flex items-center">
          <Link href="/" className="text-sm font-semibold text-[#1C1917] tracking-[-0.02em]">
            Torvi
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#78716C] mb-4">
          POLICY
        </p>
        <h1 className="text-[2rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15] mb-8">
          Refund policy
        </h1>

        <div className="space-y-8 text-sm text-[#1C1917] leading-[1.8]">

          <section>
            <h2 className="font-semibold mb-2">7-day refund window</h2>
            <p className="text-[#78716C]">
              If you purchased a cohort enrolment and the cohort has not yet started, you can request a full refund within 7 days of your purchase date. No questions asked.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">Once the cohort starts</h2>
            <p className="text-[#78716C]">
              Once your cohort run begins (Week 0 unlocked), refunds are no longer available. If you cannot continue for a documented reason, we will transfer your enrolment to a future cohort run at no additional cost. Transfer requests must be made before Week 2 begins.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">Membership</h2>
            <p className="text-[#78716C]">
              Membership is a month-to-month subscription. You can cancel at any time from your Stripe billing portal. Access continues until the end of your current billing period. No partial-month refunds.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">How to request a refund</h2>
            <p className="text-[#78716C]">
              Email{" "}
              <a href="mailto:hello@torvilearning.online" className="text-[#1D4ED8] hover:underline">
                hello@torvilearning.online
              </a>{" "}
              with your purchase email address. We process refunds within 2 business days. Stripe returns the amount to your original payment method within 5–10 business days depending on your bank.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">VAT invoices</h2>
            <p className="text-[#78716C]">
              Stripe issues compliant VAT invoices automatically. If you need additional documentation for employer reimbursement, email us and we will provide it.
            </p>
          </section>

        </div>

        <div className="mt-12 pt-6 border-t border-[#E7E5E4] flex gap-4 text-xs text-[#A8A29E]">
          <Link href="/" className="hover:text-[#78716C] transition-colors">Home</Link>
          <Link href="/enroll" className="hover:text-[#78716C] transition-colors">Enrol</Link>
          <Link href="/#faq" className="hover:text-[#78716C] transition-colors">FAQ</Link>
        </div>
      </main>
    </div>
  );
}
