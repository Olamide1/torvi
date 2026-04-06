export function WhyTorvi() {
  return (
    <section id="how-it-works" className="py-[120px] border-t border-[#E7E5E4] bg-[#F7F6F3]">
      <div className="max-w-page mx-auto px-6 sm:px-10">
        <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-12">
          THE PROBLEM
        </p>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: numbered problems */}
          <div>
            <div className="space-y-0">
              {[
                {
                  n: "01",
                  title: "You do not have time to piece it together.",
                  body: "Scattered tools, no path, no clear next step. You spend the first two weeks setting up. Then you stall.",
                },
                {
                  n: "02",
                  title: "You consume content. You do not ship.",
                  body: "Most courses end with nothing tangible. You finish a module and ask what to do next. Without a clear answer, you slow down, then stop.",
                },
                {
                  n: "03",
                  title: "When you stall, nothing catches you.",
                  body: "Drift is the silent killer. No one notices. No one intervenes. You just quietly go cold.",
                },
              ].map((item, i, arr) => (
                <div key={item.n}>
                  <div className="py-9">
                    <div className="text-[clamp(2.5rem,5vw,4rem)] font-semibold text-[#D6D3D1] leading-none tracking-[-0.04em] mb-3">{item.n}</div>
                    <h3 className="text-[1.25rem] font-semibold text-[#1C1917] tracking-[-0.02em] leading-snug mb-2">{item.title}</h3>
                    <p className="text-[#78716C] leading-[1.75] max-w-sm">{item.body}</p>
                  </div>
                  {i < arr.length - 1 && <hr className="border-[#E7E5E4]" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right: how Torvi works */}
          <div className="lg:pt-9">
            <h2 className="text-[2.25rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15] mb-8">
              How Torvi works
            </h2>

            <div className="space-y-0">
              {[
                {
                  title: "The app gives you one build task per week.",
                  body: "Not a list of resources. A single, specific thing to do. Based on your role and where you are.",
                },
                {
                  title: "You build with Claude and Cursor, guided by the path.",
                  body: "No prior technical experience needed. The prompt guides and templates are built in.",
                },
                {
                  title: "Office hours each week to unblock your build.",
                  body: "Bring your actual build. Get a specific answer. Not a lecture — a conversation.",
                },
                {
                  title: "You submit a deliverable. It gets reviewed.",
                  body: "Every week ends with something real. Week 4 ends with a shipped tool and a certificate.",
                },
              ].map((item, i, arr) => (
                <div key={item.title}>
                  <div className="py-6">
                    <p className="font-semibold text-[#1C1917] mb-1">{item.title}</p>
                    <p className="text-[#78716C] text-sm leading-[1.75]">{item.body}</p>
                  </div>
                  {i < arr.length - 1 && <hr className="border-[#E7E5E4]" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
