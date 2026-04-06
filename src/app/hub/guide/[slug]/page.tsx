import { notFound } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/db/mongodb";
import { Guide } from "@/lib/db/models/Guide";
import { GuideStep } from "@/lib/db/models/GuideStep";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { MarkdownBody } from "@/components/ui/MarkdownBody";
import { CheckSquare, Clock, ArrowLeft, ChevronRight } from "lucide-react";

const GUIDE_TYPE_LABELS: Record<string, string> = {
  setup: "Setup",
  build: "Build task",
  review: "Review",
  submit: "Submit",
  concept: "Concept",
  troubleshoot: "Troubleshoot",
};

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  await connectDB();

  const guide = await Guide.findOne({ slug }).lean();
  if (!guide) notFound();

  const steps = await GuideStep.find({ guideId: guide._id })
    .sort({ order: 1 })
    .lean();

  return (
    <>
      <AppNavbar />
      <main className="bg-[#F7F8FA] min-h-screen">
        {/* Top bar */}
        <div className="bg-white border-b border-[#EEF1F4]">
          <div className="max-w-3xl mx-auto px-6 sm:px-10 h-11 flex items-center gap-3">
            <Link
              href="/hub"
              className="flex items-center gap-1.5 text-xs text-[#7B8391] hover:text-[#16181D] transition-colors"
            >
              <ArrowLeft size={13} />
              Hub
            </Link>
            <ChevronRight size={12} className="text-[#C8CDD5]" />
            <span className="text-xs text-[#7B8391]">Week {guide.weekId}</span>
            <ChevronRight size={12} className="text-[#C8CDD5]" />
            <span className="text-xs text-[#16181D] font-medium truncate">{guide.title}</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-10 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#7B8391]">
                Week {guide.weekId}
              </span>
              <span className="text-[#DDE1E7]">·</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#2F5BFF]">
                {GUIDE_TYPE_LABELS[guide.guideType] ?? guide.guideType}
              </span>
            </div>

            <h1 className="text-[1.75rem] font-semibold text-[#16181D] tracking-[-0.03em] leading-[1.2] mb-3">
              {guide.title}
            </h1>

            <p className="text-sm text-[#4A4F59] leading-[1.75] max-w-2xl mb-5">
              {guide.purpose}
            </p>

            <div className="flex items-center gap-4 text-xs text-[#7B8391]">
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {guide.estimatedTimeMinutes} min
              </span>
              <span className="flex items-center gap-1.5">
                <CheckSquare size={13} />
                {steps.length} steps
              </span>
            </div>
          </div>

          {/* Expected output */}
          <div className="bg-[#E6EDFF] border border-[#C7D7FF] rounded-xl px-5 py-4">
            <p className="text-[10px] font-semibold text-[#2F5BFF] uppercase tracking-widest mb-1">
              Deliverable
            </p>
            <p className="text-sm text-[#16181D] leading-relaxed">{guide.expectedOutput}</p>
          </div>

          {/* Steps */}
          {steps.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-[#16181D] mb-4">Steps</h2>
              <div className="space-y-3">
                {steps.map((step, idx) => (
                  <div
                    key={String(step._id)}
                    className="bg-white border border-[#EEF1F4] rounded-xl p-5"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#EEF1F4] flex items-center justify-center text-[11px] font-semibold text-[#7B8391]">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0 space-y-3">
                        <p className="text-sm text-[#16181D] leading-relaxed font-medium">
                          {step.instruction}
                        </p>

                        {step.expectedResult && (
                          <div>
                            <p className="text-[10px] font-semibold text-[#7B8391] uppercase tracking-widest mb-1">
                              Done when
                            </p>
                            <p className="text-xs text-[#4A4F59] leading-relaxed">
                              {step.expectedResult}
                            </p>
                          </div>
                        )}

                        {step.commonErrorNote && (
                          <div className="bg-[#FFF1D6] border border-[#FFD98E] rounded-lg px-3 py-2">
                            <p className="text-[10px] font-semibold text-[#A15C00] uppercase tracking-widest mb-0.5">
                              Common mistake
                            </p>
                            <p className="text-xs text-[#78502A] leading-relaxed">
                              {step.commonErrorNote}
                            </p>
                          </div>
                        )}

                        {step.aiHintRef && (
                          <div className="bg-[#E6EDFF] border border-[#C7D7FF] rounded-lg px-3 py-2">
                            <p className="text-[10px] font-semibold text-[#2F5BFF] uppercase tracking-widest mb-0.5">
                              Claude prompt
                            </p>
                            <p className="text-xs text-[#23262D] leading-relaxed italic">
                              {step.aiHintRef}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content body */}
          {guide.contentBody && (
            <div className="bg-white border border-[#EEF1F4] rounded-xl px-6 py-7">
              <MarkdownBody content={guide.contentBody} />
            </div>
          )}

          {/* Done checklist */}
          {guide.doneChecklist && guide.doneChecklist.length > 0 && (
            <div className="bg-white border border-[#EEF1F4] rounded-xl px-6 py-6">
              <h2 className="text-sm font-semibold text-[#16181D] mb-4">
                Done checklist
              </h2>
              <ul className="space-y-3">
                {guide.doneChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-4 h-4 mt-0.5 rounded border-2 border-[#DDE1E7]" />
                    <span className="text-sm text-[#4A4F59] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Common mistakes */}
          {guide.commonMistakes && guide.commonMistakes.length > 0 && (
            <div className="border border-[#EEF1F4] rounded-xl px-6 py-6">
              <h2 className="text-sm font-semibold text-[#16181D] mb-4">Common mistakes</h2>
              <ul className="space-y-2.5">
                {guide.commonMistakes.map((m, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#4A4F59] leading-relaxed">
                    <span className="flex-shrink-0 mt-[0.4em] w-1.5 h-1.5 rounded-full bg-[#F79009]" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Back to hub */}
          <div className="pt-4 pb-8">
            <Link
              href="/hub"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#2F5BFF] hover:underline"
            >
              <ArrowLeft size={14} />
              Back to hub
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
