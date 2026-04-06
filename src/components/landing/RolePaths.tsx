import Link from "next/link";

const ROLES = [
  {
    role: "Product Manager",
    problem: "You know what the team needs. You are waiting on engineering.",
    build: "Project intake tools, spec dashboards, release trackers, stakeholder portals",
  },
  {
    role: "Ops Leader",
    problem: "Your team does the same manual work every week. It has never been automated.",
    build: "SLA monitors, onboarding trackers, reporting tools, approval workflows",
  },
  {
    role: "Consultant",
    problem: "Your clients expect working tools, not decks. You need to ship faster.",
    build: "Client portals, diagnostic tools, deliverable trackers, data review apps",
  },
  {
    role: "Founder",
    problem: "You have an idea for an internal tool. You cannot wait for engineers.",
    build: "CRM lite, lead trackers, ops dashboards, internal workflow tools",
  },
  {
    role: "Team Lead",
    problem: "Your team needs a tool. It is not in the backlog. It will not be.",
    build: "Capacity planners, status dashboards, handoff tools, review trackers",
  },
];

export function RolePaths() {
  return (
    <section id="paths" className="py-[120px] border-t border-[#E7E5E4] bg-[#F7F6F3]">
      <div className="max-w-page mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-[280px_1fr] gap-16">
          <div>
            <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-6">ROLE PATHS</p>
            <h2 className="text-[2.25rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15]">
              Built for your role.
            </h2>
            <p className="mt-4 text-[#78716C] leading-[1.75]">
              The path, examples, and templates adapt to how you actually work.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-[#1D4ED8] hover:text-[#1e40af] transition-colors"
            >
              Find your path &#8594;
            </Link>
          </div>

          <div>
            {ROLES.map((item, i) => (
              <div key={item.role}>
                <div className="py-7 grid sm:grid-cols-[180px_1fr_1fr] gap-4 items-baseline">
                  <div className="font-semibold text-[#1C1917]">{item.role}</div>
                  <div className="text-[#78716C] text-sm leading-[1.75]">{item.problem}</div>
                  <div className="text-[#78716C] text-sm leading-[1.75]">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D6D3D1] block mb-1">Builds</span>
                    {item.build}
                  </div>
                </div>
                {i < ROLES.length - 1 && <hr className="border-[#E7E5E4]" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
