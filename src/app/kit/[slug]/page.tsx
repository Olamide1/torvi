import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db/mongodb";
import { Resource } from "@/lib/db/models/Resource";
import { MarkdownBody } from "@/components/ui/MarkdownBody";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const resource = await Resource.findOne({ slug }).lean();
  if (!resource) return { title: "Resource — Torvi" };
  return { title: `${resource.title} — Torvi` };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const resource = await Resource.findOne({ slug }).lean();

  if (!resource) notFound();

  const typeLabel: Record<string, string> = {
    prompt_pack: "Prompt Pack",
    template: "Template",
    worksheet: "Worksheet",
  };

  return (
    <>
      <main className="bg-[#F7F6F3] min-h-screen">
        {/* Header */}
        <div className="border-b border-[#E7E5E4] bg-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-10">
            <Link
              href="/"
              className="text-xs text-[#78716C] hover:text-[#1C1917] transition-colors mb-6 inline-block"
            >
              ← Torvi
            </Link>
            <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-3">
              {typeLabel[resource.type] ?? resource.type}
            </p>
            <h1 className="text-[2rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15]">
              {resource.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
          <div className="bg-white rounded-lg border border-[#E7E5E4] p-8 sm:p-12">
            <MarkdownBody content={resource.contentMarkdown} />
          </div>

          {/* CTA */}
          <div className="mt-10 border border-[#E7E5E4] rounded-lg bg-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#1C1917]">Ready to build?</p>
              <p className="text-xs text-[#78716C] mt-0.5">
                The full 4-week cohort is open at the founding rate.
              </p>
            </div>
            <Link
              href="/quiz?intent=enrol"
              className="shrink-0 inline-flex items-center h-10 px-5 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors"
            >
              Enrol — €200
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
