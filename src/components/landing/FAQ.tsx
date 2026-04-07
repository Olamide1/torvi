"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const FAQS = [
  {
    q: "What exactly happens after I pay?",
    a: "You land on a mission screen immediately. It shows your cohort start date, your first task, a setup checklist, your Slack invite, and the office hours schedule. The system tells you what to do next.",
  },
  {
    q: "How much time does this take?",
    a: "Four to six hours a week is the recommended pace. That is roughly two to three hours building and one weekly office hours session. The path is designed for people with jobs, not students.",
  },
  {
    q: "What counts as passing and getting the certificate?",
    a: "Submitting a deliverable every week and completing a final build review in week 4. The certificate reflects a shipped output, not a task completion count.",
  },
  {
    q: "What if I fall behind?",
    a: "Torvi watches for it. If you go seven days without progress, the system flags you and sends a check-in. You will get a direct offer to book office hours. Nobody drops off silently.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. You build with Claude and Cursor using prompts. You will need to be comfortable learning by doing, but no prior technical experience is required.",
  },
  {
    q: "Can I get a VAT invoice?",
    a: "Yes. Stripe issues compliant VAT invoices automatically. If you need additional documentation for employer reimbursement, we provide it.",
  },
  {
    q: "What is the difference between Cohort and Cohort + Membership?",
    a: "Both include the full 4-week experience. Membership adds ongoing access after the cohort ends: future cohort runs, extended resources, monthly office hours, and the alumni community.",
  },
  {
    q: "What if the cohort is not the right fit?",
    a: "7-day refund policy from the date of purchase, as long as the cohort has not started. Once it starts, we apply a transfer policy to a future cohort.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-[120px] border-t border-[#E7E5E4] bg-[#F7F6F3]">
      <div className="max-w-page mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-[280px_1fr] gap-16">
          <div>
            <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-6">FAQ</p>
            <h2 className="text-[2.25rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15] mb-4">
              Common questions
            </h2>
            <p className="text-sm text-[#78716C] leading-[1.75]">
              Anything else? Email{" "}
              <a href="mailto:hello@placeholderllc.name.ng" className="text-[#1D4ED8] hover:underline">
                hello@placeholderllc.name.ng
              </a>
            </p>
          </div>

          <div className="divide-y divide-[#E7E5E4]">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-0">
                <button
                  className="w-full flex items-start justify-between py-5 text-left gap-8"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-sm font-semibold text-[#1C1917] leading-snug">{faq.q}</span>
                  <ChevronDown
                    size={14}
                    className={cn("text-[#78716C] flex-shrink-0 mt-0.5 transition-transform duration-200", open === i && "rotate-180")}
                  />
                </button>
                {open === i && (
                  <p className="pb-5 text-sm text-[#78716C] leading-[1.75]">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
