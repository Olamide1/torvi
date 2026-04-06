import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { LeadCapture } from "@/components/pseo/LeadCapture";
import { howToGuidePages } from "@/lib/pseo/clusters/how-to-guides";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return howToGuidePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = howToGuidePages.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      type: "article",
    },
  };
}

export default async function HowToPage({ params }: Props) {
  const { slug } = await params;
  const page = howToGuidePages.find((p) => p.slug === slug);
  if (!page) notFound();

  const { body } = page;

  return (
    <>
      <Navbar />
      <main className="bg-[#F7F6F3] min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b border-[#E7E5E4] bg-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-10 h-9 flex items-center gap-2 text-xs text-[#78716C]">
            <Link href="/" className="hover:text-[#1C1917] transition-colors">Torvi</Link>
            <span className="text-[#D6D3D1]">/</span>
            <Link href="/resources" className="hover:text-[#1C1917] transition-colors">How-to guides</Link>
            <span className="text-[#D6D3D1]">/</span>
            <span className="text-[#1C1917] truncate">{page.h1}</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
          <div className="space-y-10">
            {/* Header */}
            <div>
              <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.06em] bg-[#EFF6FF] text-[#1D4ED8] px-2 py-0.5 rounded-sm mb-4">
                Free guide
              </span>
              <h1 className="text-[2rem] sm:text-[2.5rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15] mb-4 capitalize">
                {page.h1}
              </h1>
              <p className="text-[#78716C] leading-[1.75] text-[1.0625rem]">
                {body.intro}
              </p>
            </div>

            {/* Inline lead capture */}
            <LeadCapture
              resourceName={page.h1}
              ctaNote={body.ctaNote}
              variant="inline"
            />

            {/* What's covered */}
            <div>
              <h2 className="text-sm font-semibold text-[#1C1917] uppercase tracking-[0.08em] mb-4">
                What&apos;s covered
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

            {/* Who it's for */}
            <div className="bg-white border border-[#E7E5E4] rounded-lg p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#78716C] mb-2">
                Who this is for
              </p>
              <p className="text-sm text-[#1C1917] leading-[1.75]">{body.whoItsFor}</p>
            </div>

            {/* Banner lead capture */}
            <LeadCapture
              resourceName={page.h1}
              ctaNote={body.ctaNote}
              variant="banner"
            />

            {/* Related templates nudge */}
            <div className="border-t border-[#E7E5E4] pt-8">
              <p className="text-xs text-[#78716C] uppercase tracking-[0.08em] font-semibold mb-3">
                Free templates
              </p>
              <p className="text-sm text-[#78716C] leading-[1.75] mb-4">
                Guides explain the approach. Templates give you the starting point. Browse the free library.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/templates"
                  className="inline-flex items-center justify-center h-10 px-5 text-sm font-medium rounded border border-[#E7E5E4] bg-white text-[#1C1917] hover:border-[#D6D3D1] transition-colors"
                >
                  Browse templates
                </Link>
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center h-10 px-5 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors"
                >
                  Get your free role kit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
