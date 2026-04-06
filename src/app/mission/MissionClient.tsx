"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { SetupChecklist } from "@/components/mission/SetupChecklist";
import { mockCurriculum, mockSessions } from "@/lib/mock/curriculum";
import Link from "next/link";

export function MissionClient() {
  const { user, status } = useCurrentUser();

  const officeHours = mockSessions.filter((s) => s.type === "office_hours");
  const week0 = mockCurriculum.find((w) => w.week === 0) ?? mockCurriculum[0];

  const displayName = user?.fullName ?? "there";
  const trackLabel =
    user?.trackId && typeof user.trackId === "object" && "name" in user.trackId
      ? (user.trackId as { name: string }).name
      : null;

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-[#78716C]">
        Loading…
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12 space-y-8">

      {/* Header */}
      <div>
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.06em] bg-[#F0FDF4] text-[#15803D] px-2 py-0.5 rounded-sm mb-4">
          {user ? "Enrolled" : "Preview"}
        </span>
        <h1 className="text-[2.25rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15] mb-3">
          {user ? `You are in, ${displayName.split(" ")[0]}.` : "You are in."}
        </h1>
        <p className="text-[#78716C] leading-[1.75]">
          {trackLabel ? (
            <>You are on the <strong className="text-[#1C1917]">{trackLabel}</strong> track.</>
          ) : (
            "Open enrolment."
          )}{" "}
          Access starts immediately. Complete the setup below and begin Week 0.
        </p>
      </div>

      {/* Two columns: status + first task */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Left: run state */}
        <div className="bg-white rounded-lg border border-[#E7E5E4] p-6">
          <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-4">STATUS</p>
          <div className="text-[3rem] font-semibold text-[#1C1917] tracking-[-0.04em] leading-none mb-1">
            Week 0
          </div>
          <p className="text-sm text-[#78716C] mb-4">Define your problem and write your tool brief</p>
          <hr className="border-[#E7E5E4] mb-4" />
          <p className="text-xs text-[#78716C]">Access is live. Start now.</p>
        </div>

        {/* Right: first action */}
        <div className="bg-white rounded-lg border border-[#E7E5E4] p-6" style={{ borderLeft: "3px solid #1D4ED8" }}>
          <p className="text-[11px] font-semibold text-[#1D4ED8] uppercase tracking-[0.1em] mb-3">WEEK 0 · FIRST TASK</p>
          <p className="font-semibold text-[#1C1917] mb-2">
            {week0?.outcome ?? "Write your one-page tool brief"}
          </p>
          <p className="text-sm text-[#78716C] leading-[1.75]">
            {week0?.theme ?? "Define your problem, scope, and first build step."} You will have a clear build plan by the end of Week 0.
          </p>
          <p className="text-xs text-[#78716C] mt-3">
            Deliverable: {week0?.assignment?.deliverable ?? "One-page tool brief"}
          </p>
        </div>
      </div>

      {/* Setup checklist */}
      <SetupChecklist />

      {/* Office hours */}
      <div className="bg-white rounded-lg border border-[#E7E5E4] p-6">
        <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-4">OFFICE HOURS</p>
        <p className="text-sm text-[#78716C] mb-4">Bring your build. Get unblocked. No prep required. Run weekly.</p>
        <a
          href="https://cal.com/torvi/office-hours"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[#1D4ED8] hover:text-[#1e40af] transition-colors"
        >
          Book a slot &#8594;
        </a>
      </div>

      {/* Go to hub */}
      <div className="flex flex-col gap-3">
        <Link
          href="/hub"
          className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors tracking-[-0.01em] min-h-[44px]"
        >
          Go to your hub
        </Link>
        <p className="text-xs text-[#78716C]">
          Week 0 is unlocked now. Week 1 unlocks when you submit your tool brief.
        </p>
      </div>
    </div>
  );
}
