"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  getGuides,
  getUserArtifacts,
  getResources,
  type Guide,
  type Artifact,
  type DBResource,
} from "@/lib/api/client";
import { NextAction } from "@/components/hub/NextAction";
import { WeekProgress } from "@/components/hub/WeekProgress";
import { SchedulePanel } from "@/components/hub/SchedulePanel";
import { ResourceSearch } from "@/components/hub/ResourceSearch";
import { CommunityShortcuts } from "@/components/hub/CommunityShortcuts";
import { OutputTracker } from "@/components/hub/OutputTracker";
import { MemberView } from "@/components/hub/MemberView";
import { mockCurrentLearner } from "@/lib/mock/learners";
import { mockCurriculum, mockResources } from "@/lib/mock/curriculum";
import type { Learner } from "@/lib/types/cohort";
import type { Resource } from "@/lib/types/curriculum";

// Maps week number to the artifact type that completes it
const WEEK_TO_ARTIFACT_TYPE: Record<number, string> = {
  1: "prototype_draft",
  2: "usable_version",
  3: "reviewed_version",
  4: "final_shipped_tool",
};

function artifactSubmitted(artifacts: Artifact[], artifactType: string): boolean {
  return artifacts.some(
    (a) =>
      a.artifactType === artifactType &&
      (a.status === "submitted" || a.reviewStatus === "approved")
  );
}

// Map a seeded track name to the roleSlug stored on Resource documents
function trackNameToRoleSlug(trackName: string | null): string | undefined {
  if (!trackName) return undefined;
  const map: Record<string, string> = {
    "Product / PM": "product-manager",
    "Ops / Workflow": "ops-leader",
    "Consultant / Client Tooling": "consultant",
  };
  return map[trackName] ?? undefined;
}

export function HubClient() {
  const { user, status } = useCurrentUser();
  const router = useRouter();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [dbResources, setDbResources] = useState<DBResource[] | null>(null);
  const [membershipLoading, setMembershipLoading] = useState(false);

  async function handleMembershipUpgrade() {
    setMembershipLoading(true);
    try {
      const res = await fetch("/api/checkout/membership", { method: "POST" });
      const data = await res.json();
      if (data.url) router.push(data.url);
    } finally {
      setMembershipLoading(false);
    }
  }

  const trackId =
    user?.trackId && typeof user.trackId === "object" && "_id" in user.trackId
      ? (user.trackId as { _id: string })._id
      : typeof user?.trackId === "string"
      ? user.trackId
      : undefined;

  const trackLabel =
    user?.trackId && typeof user.trackId === "object" && "name" in user.trackId
      ? (user.trackId as { name: string }).name
      : null;

  const roleSlug = trackNameToRoleSlug(trackLabel);

  const isMember = user?.learningStatus === "member_active";

  useEffect(() => {
    if (!user) return;
    const week = user.currentWeek ?? 1;
    // Members get all resources; active learners get their track's resources
    getResources(isMember ? undefined : roleSlug).then(setDbResources).catch(() => {});
    if (isMember) return; // members don't need guides/artifacts
    getGuides({ weekId: week, trackId }).then(setGuides).catch(() => {});
    getUserArtifacts(user._id).then(setArtifacts).catch(() => {});
  }, [user, trackId, roleSlug, isMember]);

  // --- Current week ---
  const currentWeekNum = user
    ? (user.currentWeek ?? 1)
    : parseInt(mockCurrentLearner.learningStatus.replace("active_week_", "")) || 1;

  const currentWeekData = mockCurriculum.find((w) => w.week === currentWeekNum);

  // --- Real week progress derived from artifacts ---
  const realWeekProgress = [1, 2, 3, 4].map((week) => {
    const artType = WEEK_TO_ARTIFACT_TYPE[week];
    const submitted = artifactSubmitted(artifacts, artType);
    return {
      week,
      lessonsCompleted: submitted ? 4 : 0,
      totalLessons: 4,
      assignmentSubmitted: submitted,
      quizPassed: submitted,
    };
  });

  // Synthetic Learner built from real user data (falls back to mock for demo/unauthenticated)
  const learner: Learner = user
    ? {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        timezone: user.timezone ?? "UTC",
        roleTrack: "product_manager", // display-only; not used by WeekProgress/OutputTracker
        outcomeTrack: "",
        cohortId: typeof user.runId === "string" ? user.runId : "",
        billingStatus: (user.billingStatus as Learner["billingStatus"]) ?? "active",
        learningStatus: (user.learningStatus as Learner["learningStatus"]) ?? "active_week_1",
        slackStatus: (user.slackStatus as Learner["slackStatus"]) ?? "not_invited",
        certificateStatus: (user.certificateStatus as Learner["certificateStatus"]) ?? "not_started",
        upsellStatus: (user.upsellStatus as Learner["upsellStatus"]) ?? "not_eligible",
        lastActiveAt: user.updatedAt ?? new Date().toISOString(),
        weekProgress: realWeekProgress,
      }
    : mockCurrentLearner;

  // --- Deliverable submitted for current week ---
  const deliverableSubmitted = user
    ? artifactSubmitted(artifacts, WEEK_TO_ARTIFACT_TYPE[currentWeekNum] ?? "")
    : (mockCurrentLearner.weekProgress.find((w) => w.week === currentWeekNum)?.assignmentSubmitted ?? false);

  // --- NextAction card content ---
  const nextActionTitle =
    guides.length > 0
      ? guides[0].title
      : deliverableSubmitted
      ? `Week ${currentWeekNum} deliverable submitted`
      : currentWeekData?.assignment.title ?? `Week ${currentWeekNum} build task`;

  const nextActionDescription =
    guides.length > 0
      ? guides[0].purpose
      : deliverableSubmitted
      ? `Your Week ${currentWeekNum} deliverable is in. Office hours this week if you need to unblock anything before Week ${currentWeekNum + 1}.`
      : `${currentWeekData?.assignment.description ?? ""} Deliverable: ${currentWeekData?.assignment.deliverable ?? ""}.`;

  // --- Resources: real DB resources mapped to the Resource type, or mock fallback ---
  const resources: Resource[] =
    dbResources && dbResources.length > 0
      ? dbResources.map((r) => ({
          id: r.slug,
          title: r.title,
          type: r.type === "prompt_pack" ? "template" : (r.type as Resource["type"]),
          tags: [r.type, r.roleSlug ?? "universal"].filter(Boolean),
          url: `/kit/${r.slug}`,
        }))
      : mockResources;

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-[#78716C]">
        Loading your hub…
      </div>
    );
  }

  // Members get a dedicated view — not the week-progress learner hub
  if (isMember) {
    return <MemberView name={user?.fullName ?? ""} resources={resources} />;
  }

  return (
    <>
      {/* Membership upsell banner */}
      {user?.upsellStatus === "eligible" && (
        <div className="bg-[#EFF6FF] border-b border-[#BFDBFE]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3 flex items-center justify-between gap-4">
            <p className="text-sm text-[#1D4ED8]">
              <span className="font-semibold">You've completed the cohort.</span> Keep access to the template library, future runs, and monthly office hours.
            </p>
            <button
              onClick={handleMembershipUpgrade}
              disabled={membershipLoading}
              className="shrink-0 inline-flex items-center h-8 px-4 text-xs font-semibold rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors disabled:opacity-60"
            >
              {membershipLoading ? "Loading…" : "Join membership →"}
            </button>
          </div>
        </div>
      )}

      {/* Payment issue banner */}
      {user?.billingStatus === "payment_issue" && (
        <div className="bg-[#FEF2F2] border-b border-[#FECACA]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3">
            <p className="text-sm text-[#DC2626]">
              <span className="font-semibold">Payment issue on your membership.</span> Please update your payment method in Stripe to keep access.
            </p>
          </div>
        </div>
      )}

      {/* Week indicator bar */}
      <div className="bg-white border-b border-[#E7E5E4]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-11 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-[#1C1917]">Week {currentWeekNum}</span>
            <span className="text-[#D6D3D1]">·</span>
            <span className="text-[#78716C]">{currentWeekData?.theme ?? "Build"}</span>
            <span className="ml-1 text-[10px] font-semibold uppercase tracking-[0.06em] bg-[#EFF6FF] text-[#1D4ED8] px-2 py-0.5 rounded-sm">
              Active
            </span>
          </div>
          <p className="hidden sm:block text-xs text-[#78716C]">{trackLabel ?? "Open enrolment"}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8">
        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Left column */}
          <div className="space-y-5">
            <NextAction
              week={currentWeekNum}
              title={nextActionTitle}
              description={nextActionDescription}
              type={deliverableSubmitted ? "build" : "assignment"}
              resourceLinks={
                guides.length > 0
                  ? guides.slice(0, 2).map((g) => ({
                      label: g.title,
                      href: `/hub/guide/${g.slug ?? ""}`,
                    }))
                  : [
                      { label: "Prompt pack", href: resources.find((r) => r.type === "template")?.url ?? "#" },
                      { label: `Week ${currentWeekNum} template`, href: "#" },
                    ]
              }
              ctaLabel={
                guides.length > 0
                  ? `Open Week ${currentWeekNum} guide`
                  : deliverableSubmitted
                  ? "View deliverable"
                  : "Submit deliverable"
              }
              ctaHref={
                guides.length > 0 ? `/hub/guide/${guides[0].slug ?? ""}` : "#"
              }
            />
            <OutputTracker learner={learner} curriculum={mockCurriculum} />
            <ResourceSearch resources={resources} />
          </div>

          {/* Right column */}
          <div className="space-y-5">
            <WeekProgress learner={learner} />
            <SchedulePanel />
            <CommunityShortcuts />
          </div>
        </div>
      </div>
    </>
  );
}
