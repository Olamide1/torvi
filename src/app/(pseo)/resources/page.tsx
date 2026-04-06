import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { allPSEOPages } from "@/lib/pseo/pages";
const resourcePages = allPSEOPages.filter((p) => ["guide_page", "resource_page"].includes(p.pageType));

export const metadata: Metadata = {
  title: "Free Guides and Resources | Torvi",
  description:
    "Practical guides for PMs, ops managers, and consultants on AI tools, automation, and building internal work tools.",
};

export default function ResourcesIndex() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F7F6F3] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
          <div className="space-y-8">
            <div>
              <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.06em] bg-[#EFF6FF] text-[#1D4ED8] px-2 py-0.5 rounded-sm mb-4">
                Free
              </span>
              <h1 className="text-[2rem] sm:text-[2.5rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15] mb-3">
                Guides
              </h1>
              <p className="text-[#78716C] leading-[1.75]">
                Practical guides on AI tools, automation, and building internal tools — written for senior professionals, not developers.
              </p>
            </div>

            <div className="space-y-px">
              {resourcePages
                .sort((a, b) => b.priorityScore - a.priorityScore)
                .map((page) => (
                  <Link
                    key={page.slug}
                    href={`/resources/${page.slug}`}
                    className="flex items-start justify-between gap-4 bg-white border border-[#E7E5E4] rounded-lg p-5 hover:border-[#D6D3D1] transition-colors group"
                  >
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#78716C] mb-1">
                        {page.cluster.replace(/_/g, " ")}
                      </p>
                      <p className="text-sm font-semibold text-[#1C1917] capitalize leading-snug mb-1.5 group-hover:text-[#1D4ED8] transition-colors">
                        {page.h1}
                      </p>
                      <p className="text-xs text-[#78716C] leading-[1.6] line-clamp-2">
                        {page.body.intro.slice(0, 120)}…
                      </p>
                    </div>
                    <span className="text-[#1D4ED8] text-sm shrink-0 mt-0.5">→</span>
                  </Link>
                ))}
            </div>

            <div className="border-t border-[#E7E5E4] pt-8 text-center">
              <p className="text-sm text-[#78716C] mb-4">
                Guides tell you how. The Torvi run helps you ship it.
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center h-10 px-5 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors"
              >
                Get your free role kit
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
