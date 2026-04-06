import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { LeadCapture } from "@/components/pseo/LeadCapture";
import { rolePages, vibeCodingPages, getPageBySlug } from "@/lib/pseo/pages";

interface Props {
  params: Promise<{ role: string }>;
}

export async function generateStaticParams() {
  return [...rolePages, ...vibeCodingPages].map((p) => ({ role: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  const page = getPageBySlug(role, "role_page");
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      type: "website",
    },
  };
}

export default async function RolePage({ params }: Props) {
  const { role } = await params;
  const page = getPageBySlug(role, "role_page") ?? getPageBySlug(role);
  if (!page) notFound();

  const { body } = page;

  const weeks = [
    {
      label: "Week 0",
      title: "Define your problem",
      desc: "Write a one-page tool brief. Scope it to something you can ship.",
    },
    {
      label: "Week 1",
      title: "Build the core",
      desc: "The logic that does the work. No UI yet — just the thing that runs.",
    },
    {
      label: "Week 2",
      title: "Make it usable",
      desc: "Add the interface. Make it something another person could use.",
    },
    {
      label: "Week 3",
      title: "Connect and test",
      desc: "Integrate with your stack. Test with a real user.",
    },
    {
      label: "Week 4",
      title: "Ship it",
      desc: "Deploy. Use it. Tell people about it.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-[#F7F6F3] min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b border-[#E7E5E4] bg-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-10 h-9 flex items-center gap-2 text-xs text-[#78716C]">
            <Link href="/" className="hover:text-[#1C1917] transition-colors">Torvi</Link>
            <span className="text-[#D6D3D1]">/</span>
            <span className="text-[#1C1917] truncate capitalize">{role.replace(/-/g, " ")}</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
          <div className="space-y-10">
            {/* Header */}
            <div>
              <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.06em] bg-[#F0FDF4] text-[#15803D] px-2 py-0.5 rounded-sm mb-4">
                Open enrolment · €200 founding rate
              </span>
              <h1 className="text-[2rem] sm:text-[2.5rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15] mb-4">
                {page.h1}
              </h1>
              <p className="text-[#78716C] leading-[1.75] text-[1.0625rem]">
                {body.intro}
              </p>
            </div>

            {/* What you get */}
            <div>
              <h2 className="text-sm font-semibold text-[#1C1917] uppercase tracking-[0.08em] mb-4">
                The path
              </h2>
              <ul className="space-y-3">
                {body.whatYouGet.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#1C1917] leading-[1.7]">
                    <span className="mt-[3px] w-4 h-4 shrink-0 rounded-sm bg-[#EFF6FF] flex items-center justify-center text-[#1D4ED8] text-[10px] font-bold">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Week-by-week strip */}
            <div className="bg-white border border-[#E7E5E4] rounded-lg overflow-hidden">
              <div className="p-5 border-b border-[#E7E5E4]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#78716C]">The build path · Week 0 to Week 4</p>
              </div>
              <div className="divide-y divide-[#E7E5E4]">
                {weeks.map((w) => (
                  <div key={w.label} className="px-5 py-4 flex gap-4">
                    <span className="text-[11px] font-semibold text-[#1D4ED8] uppercase tracking-[0.06em] mt-0.5 w-14 shrink-0">
                      {w.label}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#1C1917] mb-0.5">{w.title}</p>
                      <p className="text-xs text-[#78716C] leading-[1.6]">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who it's for */}
            <div className="bg-white border border-[#E7E5E4] rounded-lg p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#78716C] mb-2">
                Is this for you?
              </p>
              <p className="text-sm text-[#1C1917] leading-[1.75]">{body.whoItsFor}</p>
            </div>

            {/* Free kit capture */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#78716C] mb-3">
                Not ready to enrol yet?
              </p>
              <LeadCapture
                resourceName="your free role starter kit"
                ctaNote="Get the free role starter kit for your function — tool ideas, prompt templates, and a one-page build scope. No sign-up friction."
              />
            </div>

            {/* Primary CTA */}
            <div className="bg-[#1C1917] rounded-lg p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A8A29E] mb-3">
                Ready to build?
              </p>
              <p className="text-white font-semibold text-lg mb-1">
                {body.ctaNote}
              </p>
              <p className="text-[#A8A29E] text-sm mb-5">
                Four weeks. One tool. Open enrolment — start immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors"
                >
                  Get your free role kit first
                </Link>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium rounded border border-[#44403C] text-[#E7E5E4] hover:border-[#78716C] transition-colors"
                >
                  Enrol now — €200
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
