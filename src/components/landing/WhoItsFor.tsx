export function WhoItsFor() {
  return (
    <section id="who" className="py-[120px] border-t border-[#E7E5E4] bg-white">
      <div className="max-w-page mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16">

          {/* WHO */}
          <div>
            <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-8">WHO</p>
            <h2 className="text-[2.25rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15] mb-8">
              Senior professionals who own outcomes
            </h2>

            <table className="w-full text-sm border-collapse">
              <tbody>
                {[
                  { role: "Product managers", note: "who are waiting on engineering to ship internal tools" },
                  { role: "Ops leaders", note: "who have repeat manual work that has never been automated" },
                  { role: "Consultants", note: "who want to ship client-facing tools faster" },
                  { role: "Founders", note: "who cannot get tooling prioritised by engineers" },
                  { role: "Team leads", note: "who own outcomes but not the dev backlog" },
                ].map((item) => (
                  <tr key={item.role} className="border-b border-[#E7E5E4]">
                    <td className="py-3.5 pr-6 font-semibold text-[#1C1917] whitespace-nowrap">
                      <span className="text-[#1D4ED8] mr-2 text-xs">&#8594;</span>{item.role}
                    </td>
                    <td className="py-3.5 text-[#78716C]">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 space-y-1 text-sm text-[#78716C]">
              <p>Outcome-led, not process-curious.</p>
              <p>Will commit 4 to 6 hours a week if the path is clear.</p>
              <p>Want something shipped, not something learned.</p>
            </div>
          </div>

          {/* WHO NOT */}
          <div>
            <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-8">WHO NOT</p>
            <h2 className="text-[2.25rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15] mb-8">
              Not a general AI course
            </h2>

            <table className="w-full text-sm border-collapse">
              <tbody>
                {[
                  "Developers who want to learn to code",
                  "People who want to explore AI tools with no goal",
                  "Beginners looking for an intro to tech",
                  "People not ready to commit to a real build",
                ].map((item) => (
                  <tr key={item} className="border-b border-[#E7E5E4]">
                    <td className="py-3.5 text-[#78716C]">
                      <span className="text-[#D6D3D1] mr-3 font-semibold text-sm">&#8212;</span>{item}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 pt-6 border-t border-[#E7E5E4]">
              <p className="text-sm text-[#78716C] mb-3">Not sure if it is right for you?</p>
              <a href="/quiz" className="text-sm font-medium text-[#1D4ED8] hover:text-[#1e40af] transition-colors">
                Take the 2-minute path selector &#8594;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
