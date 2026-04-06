export function FourWeekPath() {
  const weeks = [
    {
      n: "0",
      theme: "Define your problem and path",
      deliverable: "One-page tool brief — problem, scope, success criteria, first build step",
    },
    {
      n: "1",
      theme: "Build the first version",
      deliverable: "Working prototype — something you can click through",
    },
    {
      n: "2",
      theme: "Make it usable",
      deliverable: "Usable tool — a colleague could use it without your help",
    },
    {
      n: "3",
      theme: "Review and polish",
      deliverable: "Reviewed version — documented improvements, ready to share",
    },
    {
      n: "4",
      theme: "Ship it",
      deliverable: "Shipped tool — live link, real user, recorded demo",
    },
  ];

  return (
    <section id="curriculum" className="py-[120px] border-t border-[#E7E5E4] bg-white">
      <div className="max-w-page mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-[1fr_340px] gap-16">
          {/* Left: 4 weeks */}
          <div>
            <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-10">
              THE BUILD PATH · WEEK 0 TO WEEK 4
            </p>

            <div className="space-y-0">
              {weeks.map((week, i) => (
                <div key={week.n}>
                  <div className="py-8 grid sm:grid-cols-[80px_1fr] gap-4 items-start">
                    <div
                      className="font-semibold text-[#D6D3D1] leading-none tracking-[-0.04em] select-none"
                      style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
                    >
                      {week.n}
                    </div>
                    <div>
                      <h3 className="text-[1.25rem] font-semibold text-[#1C1917] tracking-[-0.02em] leading-snug mb-2">
                        {week.theme}
                      </h3>
                      <p className="text-sm text-[#78716C] leading-[1.75]">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D6D3D1] block mb-1">Deliverable</span>
                        {week.deliverable}
                      </p>
                    </div>
                  </div>
                  {i < weeks.length - 1 && <hr className="border-[#E7E5E4]" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right: rules panel */}
          <div className="lg:pt-[72px]">
            <div className="border border-[#E7E5E4] rounded-lg p-7">
              <h3 className="text-[1.25rem] font-semibold text-[#1C1917] tracking-[-0.02em] mb-6">
                The rules
              </h3>

              <div className="space-y-0">
                {[
                  "Every week ends with a deliverable.",
                  "The app tells you what to build.",
                  "Office hours answers your questions.",
                ].map((rule, i, arr) => (
                  <div key={rule}>
                    <p className="py-3.5 text-sm text-[#78716C] leading-[1.75]">{rule}</p>
                    {i < arr.length - 1 && <hr className="border-[#E7E5E4]" />}
                  </div>
                ))}
              </div>

              <hr className="border-[#E7E5E4] mt-2 mb-6" />

              <h4 className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-4">
                WHAT YOU NEED
              </h4>
              <ul className="space-y-2 text-sm text-[#78716C]">
                <li>Claude account (free or Pro)</li>
                <li>Cursor (free tier works)</li>
                <li>4 to 6 hours per week</li>
                <li>One work problem worth solving</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
