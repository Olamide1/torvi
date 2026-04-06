export function WhatYouLeaveWith() {
  const outcomes = [
    {
      title: "A shipped tool",
      description: "Working, tested, handed off to at least one real user.",
    },
    {
      title: "A reusable workflow",
      description: "A documented prompt and build process you can repeat.",
    },
    {
      title: "A template pack",
      description: "Everything you built during the cohort, ready to adapt.",
    },
    {
      title: "A certificate",
      description: "Issued on completion. Backed by an output, not a quiz.",
    },
  ];

  const testimonials = [
    {
      quote: "I built a project intake tool that replaced a 47-field spreadsheet my team had been using for 2 years. Week 4 I handed it off. Week 5 three other teams asked for access.",
      name: "Elena M.",
      role: "Head of Product, fintech",
      output: "Project intake tool, used by 28 people",
    },
    {
      quote: "I had been meaning to automate our SLA tracking for eight months. I shipped a working version in week 2 of the cohort. Nothing else changed. Just the path.",
      name: "David K.",
      role: "Senior Ops Manager, logistics",
      output: "SLA monitoring tool, 3hr/week saved",
    },
    {
      quote: "The Consultant track gave me a specific build goal. I shipped a client diagnostic tool I have now used on three separate engagements.",
      name: "Nia T.",
      role: "Independent consultant",
      output: "Client diagnostic tool, now in production",
    },
  ];

  return (
    <section className="py-[120px] bg-[#1C1917]">
      <div className="max-w-page mx-auto px-6 sm:px-10">
        <p className="text-[11px] font-semibold text-[#57534E] uppercase tracking-[0.1em] mb-10">
          ON COMPLETION
        </p>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Outcomes grid */}
          <div>
            <h2 className="text-[2.25rem] font-semibold text-white tracking-[-0.03em] leading-[1.15] mb-10">
              What you leave with
            </h2>

            <div className="grid grid-cols-2 gap-6">
              {outcomes.map((item) => (
                <div key={item.title} className="border-t border-[#292524] pt-5">
                  <h3 className="text-base font-semibold text-white mb-1.5">{item.title}</h3>
                  <p className="text-sm text-[#78716C] leading-[1.75]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <p className="text-[11px] font-semibold text-[#57534E] uppercase tracking-[0.1em] mb-8">
              FROM THE JANUARY COHORT
            </p>

            <div className="space-y-0">
              {testimonials.map((t, i, arr) => (
                <div key={t.name}>
                  <div className="py-7">
                    <p className="text-sm text-[#A8A29E] leading-[1.75] mb-4">&ldquo;{t.quote}&rdquo;</p>
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <div className="text-sm font-semibold text-white">{t.name}</div>
                        <div className="text-xs text-[#57534E]">{t.role}</div>
                      </div>
                      <span className="text-xs font-medium text-[#57534E] border border-[#292524] px-2.5 py-1 rounded-sm">
                        {t.output}
                      </span>
                    </div>
                  </div>
                  {i < arr.length - 1 && <hr className="border-[#292524]" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
