"use client";

import { useState } from "react";
import { mockCurriculum } from "@/lib/mock/curriculum";
import { ChevronDown, ChevronRight } from "lucide-react";

export function CurriculumByOutput() {
  const [openWeek, setOpenWeek] = useState<number | null>(1);

  return (
    <section id="curriculum" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="text-xs font-semibold text-[#7B8391] uppercase tracking-widest mb-4">Curriculum</div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#16181D] tracking-tight leading-tight mb-4">
              Every week ends with a deliverable. Not a quiz score.
            </h2>
            <p className="text-base text-[#4A4F59] mb-8 leading-relaxed">
              The curriculum is structured around output, not topic. Each week, you build something. That thing is your proof of progress.
            </p>

            <div className="space-y-3">
              {mockCurriculum.slice(1).map((week) => (
                <div
                  key={week.week}
                  className={`rounded-xl border transition-all duration-150 ${
                    openWeek === week.week
                      ? "border-[#2F5BFF] bg-white shadow-[0_4px_6px_-1px_rgb(0,0,0,0.06)]"
                      : "border-[#DDE1E7] bg-[#F7F8FA] hover:border-[#C8CDD5]"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() => setOpenWeek(openWeek === week.week ? null : week.week)}
                    aria-expanded={openWeek === week.week}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          openWeek === week.week ? "bg-[#2F5BFF] text-white" : "bg-[#DDE1E7] text-[#4A4F59]"
                        }`}
                      >
                        {week.week}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#16181D]">{week.theme}</div>
                        <div className="text-xs text-[#7B8391] mt-0.5">
                          Output: <span className="font-medium text-[#4A4F59]">{week.outcome}</span>
                        </div>
                      </div>
                    </div>
                    {openWeek === week.week ? (
                      <ChevronDown size={14} className="text-[#7B8391] flex-shrink-0" />
                    ) : (
                      <ChevronRight size={14} className="text-[#7B8391] flex-shrink-0" />
                    )}
                  </button>

                  {openWeek === week.week && (
                    <div className="px-5 pb-5 border-t border-[#EEF1F4]">
                      <div className="pt-4 space-y-2.5">
                        {week.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex items-center gap-3 text-sm">
                            <LessonTypeIcon type={lesson.type} />
                            <span className="text-[#4A4F59] flex-1">{lesson.title}</span>
                            <span className="text-xs text-[#C8CDD5]">{lesson.duration}</span>
                          </div>
                        ))}
                        <div className="mt-4 p-3.5 rounded-lg bg-[#E6EDFF] border border-[#2F5BFF]/20">
                          <div className="text-xs font-semibold text-[#2F5BFF] mb-1.5">Week {week.week} deliverable</div>
                          <div className="text-sm text-[#16181D]">{week.assignment.deliverable}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-5">
            <div className="bg-[#F7F8FA] rounded-xl border border-[#EEF1F4] p-6 space-y-5">
              <h3 className="text-base font-semibold text-[#16181D]">The rule behind the curriculum</h3>
              <div className="space-y-4 text-sm text-[#4A4F59] leading-relaxed">
                <p>No week ends with "watched content" as the only result. Every week has an output that something that exists after the week is done.</p>
                <p>Week 1 output is a working draft. Week 4 output is a shipped tool. The four weeks in between are the path between those two states.</p>
                <p>The certificate is issued after the Week 4 review. Not after the last video. After the build review.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#DDE1E7] p-6 space-y-4">
              <h3 className="text-sm font-semibold text-[#16181D]">Live sessions each week</h3>
              <div className="space-y-3">
                {[
                  { name: "Workshop", time: "90 min", note: "Every week. Replay within hours if you miss it." },
                  { name: "Office hours", time: "60 min", note: "Optional. Bring your build." },
                  { name: "Peer review", time: "60 min", note: "Weeks 3 and 4. Structured review with your cohort." },
                ].map((s) => (
                  <div key={s.name} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2F5BFF] mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-[#16181D]">{s.name} · {s.time}</div>
                      <div className="text-xs text-[#7B8391] mt-0.5">{s.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#E2F6EA] rounded-xl border border-[#157347]/20 p-5 text-sm text-[#4A4F59]">
              <span className="font-semibold text-[#157347]">On stalls:</span> If you go seven days without progress, the system flags it. You will get a direct check-in and an offer to book office hours. No one drifts off silently.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LessonTypeIcon({ type }: { type: string }) {
  const map: Record<string, React.ReactNode> = {
    video: (
      <svg className="w-4 h-4 text-[#2F5BFF] flex-shrink-0" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 6l4-2v8l-4-2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    reading: (
      <svg className="w-4 h-4 text-[#7B8391] flex-shrink-0" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    template: (
      <svg className="w-4 h-4 text-[#0F766E] flex-shrink-0" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 6h12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 6v8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    workshop: (
      <svg className="w-4 h-4 text-[#A15C00] flex-shrink-0" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  };
  return <>{map[type] ?? null}</>;
}
