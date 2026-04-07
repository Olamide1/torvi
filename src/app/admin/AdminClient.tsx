"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Users, TrendingUp, AlertTriangle, Award, CheckCircle, Clock, Mail, RefreshCw } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/Progress";

const ROLE_LABELS: Record<string, string> = {
  product_manager: "PM",
  ops_leader: "Ops",
  consultant: "Consultant",
  founder: "Founder",
  team_lead: "Team Lead",
};

export interface AdminUser {
  _id: string;
  fullName: string;
  email: string;
  learningStatus: string;
  billingStatus: string;
  certificateStatus: string;
  quizRole: string | null;
  currentWeek: number;
  runId: string | null;
  updatedAt: string;
  onboardingCompletedAt: string | null;
  trackName: string | null;
}

export interface AdminRun {
  _id: string;
  name: string;
  slug: string;
  status: string;
  enrolledCount: number;
  maxLearners: number;
  weekStartDate: string | null;
}

export interface AdminEvent {
  _id: string;
  eventName: string;
  source: string;
  target: string;
  processed: boolean;
  createdAt: string;
}

interface Props {
  users: AdminUser[];
  runs: AdminRun[];
  events: AdminEvent[];
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

function StatCard({ label, value, sub, icon, color }: {
  label: string; value: string | number; sub?: string;
  icon: React.ReactNode; color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#DDE1E7] p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-[#7B8391] font-medium mb-2">{label}</div>
          <div className="text-3xl font-semibold text-[#16181D] tracking-tight">{value}</div>
          {sub && <div className="text-xs text-[#7B8391] mt-1">{sub}</div>}
        </div>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function RunSwitcher({ runs, activeId, onSelect }: { runs: AdminRun[]; activeId: string; onSelect: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const active = runs.find((r) => r._id === activeId) ?? runs[0];

  if (runs.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#DDE1E7] bg-white hover:bg-[#F7F8FA] text-sm font-medium text-[#16181D] transition-colors"
      >
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
          active?.status === "active" ? "bg-[#157347]" :
          active?.status === "upcoming" ? "bg-[#2F5BFF]" : "bg-[#C8CDD5]"
        }`} />
        {active?.name ?? "Select run"}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`text-[#7B8391] transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 w-[min(16rem,calc(100vw-2rem))] bg-white border border-[#DDE1E7] rounded-xl shadow-[0_10px_15px_-3px_rgb(0,0,0,0.07)] z-30 py-1">
          {runs.map((run) => (
            <button
              key={run._id}
              onClick={() => { onSelect(run._id); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#F7F8FA] transition-colors"
            >
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                run.status === "active" ? "bg-[#157347]" :
                run.status === "upcoming" ? "bg-[#2F5BFF]" : "bg-[#C8CDD5]"
              }`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#16181D] truncate">{run.name}</div>
                <div className="text-xs text-[#7B8391]">{run.enrolledCount} learners</div>
              </div>
              {run._id === activeId && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="#2F5BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StalledTable({ users }: { users: AdminUser[] }) {
  const stalled = users.filter((u) => u.learningStatus === "stalled" || u.billingStatus === "payment_issue");
  const [sending, setSending] = useState<string | null>(null);
  const [sent, setSent] = useState<Set<string>>(new Set());

  async function remind(userId: string) {
    setSending(userId);
    await fetch(`/api/admin/users/${userId}/remind`, { method: "POST" });
    setSending(null);
    setSent((prev) => new Set(prev).add(userId));
  }

  if (stalled.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#DDE1E7] p-10 text-center">
        <div className="w-10 h-10 rounded-full bg-[#E2F6EA] flex items-center justify-center mx-auto mb-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3 3 7-7" stroke="#157347" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="text-sm font-medium text-[#16181D]">No stalled learners</div>
        <div className="text-xs text-[#7B8391] mt-1">Everyone is on track.</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#DDE1E7] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#EEF1F4] flex items-center gap-2">
        <AlertTriangle size={15} className="text-[#A15C00]" />
        <span className="text-sm font-semibold text-[#16181D]">Needs attention</span>
        <span className="text-xs font-medium text-[#A15C00] bg-[#FFF1D6] px-2 py-0.5 rounded-full">{stalled.length}</span>
      </div>
      <div className="divide-y divide-[#EEF1F4]">
        {stalled.map((u) => (
          <div key={u._id} className="flex items-start gap-3 px-4 sm:px-5 py-4">
            <div className="w-8 h-8 rounded-full bg-[#EEF1F4] flex items-center justify-center text-sm font-medium text-[#4A4F59] flex-shrink-0">
              {u.fullName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[#16181D]">{u.fullName}</div>
              <div className="text-xs text-[#7B8391] flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                {u.quizRole && <span>{ROLE_LABELS[u.quizRole] ?? u.quizRole}</span>}
                <span>·</span>
                <span>Last active {timeAgo(u.updatedAt)}</span>
                {!u.onboardingCompletedAt && <span className="text-[#B42318] font-medium">· Onboarding incomplete</span>}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <StatusBadge status={u.learningStatus} />
                <button
                  onClick={() => remind(u._id)}
                  disabled={sending === u._id || sent.has(u._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-[#DDE1E7] text-[#4A4F59] hover:bg-[#F7F8FA] disabled:opacity-50 transition-all min-h-[36px]"
                >
                  <Mail size={12} />
                  {sent.has(u._id) ? "Sent" : sending === u._id ? "Sending…" : "Remind"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompletionStats({ users }: { users: AdminUser[] }) {
  const total = users.length;

  if (total === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#DDE1E7] p-10 text-center">
        <div className="text-sm font-medium text-[#16181D]">No learners yet</div>
        <div className="text-xs text-[#7B8391] mt-1">Completion stats will appear once learners enrol.</div>
      </div>
    );
  }

  // A user has "completed" week N if their currentWeek > N
  const weekStats = [1, 2, 3, 4].map((week) => {
    const completed = users.filter((u) => u.currentWeek > week || u.learningStatus === "certified" || u.learningStatus === "passed").length;
    return { week, completed, pct: Math.round((completed / total) * 100) };
  });

  const statusCounts = {
    active: users.filter((u) => u.learningStatus.startsWith("active_")).length,
    stalled: users.filter((u) => u.learningStatus === "stalled").length,
    payment: users.filter((u) => u.billingStatus === "payment_issue").length,
    onboarding: users.filter((u) => ["enrolled", "onboarding_started", "onboarding_completed"].includes(u.learningStatus)).length,
  };

  return (
    <div className="bg-white rounded-xl border border-[#DDE1E7] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#EEF1F4]">
        <div className="text-sm font-semibold text-[#16181D]">Weekly completion</div>
        <div className="text-xs text-[#7B8391] mt-0.5">{total} learner{total !== 1 ? "s" : ""} total</div>
      </div>
      <div className="divide-y divide-[#EEF1F4]">
        {weekStats.map(({ week, completed, pct }) => (
          <div key={week} className="px-5 py-4 flex items-center gap-4">
            <div className="w-12 text-xs font-medium text-[#4A4F59]">Week {week}</div>
            <div className="flex-1">
              <ProgressBar value={pct} color="blue" size="sm" />
            </div>
            <div className="text-xs text-[#7B8391] w-16 text-right">{completed}/{total} done</div>
            <div className="text-xs font-semibold text-[#4A4F59] w-10 text-right">{pct}%</div>
          </div>
        ))}
      </div>
      <div className="px-5 py-4 border-t border-[#EEF1F4] flex items-center gap-6 flex-wrap">
        {[
          { label: "Active", count: statusCounts.active, cls: "bg-[#D9F3EF] text-[#0F766E]" },
          { label: "Stalled", count: statusCounts.stalled, cls: "bg-[#FFF1D6] text-[#A15C00]" },
          { label: "Payment issue", count: statusCounts.payment, cls: "bg-[#FEE4E2] text-[#B42318]" },
          { label: "Onboarding", count: statusCounts.onboarding, cls: "bg-[#E6EDFF] text-[#2F5BFF]" },
        ].map(({ label, count, cls }) => (
          <div key={label} className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>{count}</span>
            <span className="text-xs text-[#7B8391]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomationLog({ events }: { events: AdminEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#DDE1E7] p-10 text-center">
        <div className="text-sm font-medium text-[#16181D]">No automation events yet</div>
        <div className="text-xs text-[#7B8391] mt-1">Events will appear here as learners enrol and progress.</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#DDE1E7] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#EEF1F4]">
        <div className="text-sm font-semibold text-[#16181D]">Automation log</div>
        <div className="text-xs text-[#7B8391] mt-0.5">Recent trigger → action events</div>
      </div>
      <div className="divide-y divide-[#EEF1F4]">
        {events.map((e) => (
          <div key={e._id} className="flex items-start gap-4 px-5 py-3.5">
            <div className="mt-0.5 flex-shrink-0">
              {e.processed
                ? <CheckCircle size={14} className="text-[#157347]" />
                : <Clock size={14} className="text-[#7B8391]" />}
            </div>
            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <code className="text-xs bg-[#F7F8FA] border border-[#EEF1F4] px-1.5 py-0.5 rounded text-[#4A4F59]">
                  {e.eventName}
                </code>
                <span className="text-xs text-[#7B8391]">via {e.source}</span>
              </div>
              <div className="text-xs text-[#7B8391]">
                {e.target} · {new Date(e.createdAt).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
            <div className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full ${
              e.processed ? "bg-[#E2F6EA] text-[#157347]" : "bg-[#F7F8FA] text-[#7B8391] border border-[#DDE1E7]"
            }`}>
              {e.processed ? "done" : "pending"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenerateResourcesButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [results, setResults] = useState<{ slug: string; status: string }[]>([]);

  async function generate() {
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/generate-resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force: false }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setResults(data.generated ?? []);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const created = results.filter((r) => r.status === "created").length;
  const skipped = results.filter((r) => r.status === "skipped").length;

  return (
    <div className="bg-white rounded-xl border border-[#DDE1E7] p-5 flex items-center justify-between gap-4 flex-wrap">
      <div>
        <div className="text-sm font-semibold text-[#16181D]">Kit resources</div>
        <div className="text-xs text-[#7B8391] mt-0.5">
          {status === "done"
            ? `${created} generated, ${skipped} already existed`
            : "Prompt packs, tool brief, and worksheet — required for kit email links"}
        </div>
      </div>
      <button
        onClick={generate}
        disabled={status === "loading" || status === "done"}
        className="shrink-0 inline-flex items-center h-8 px-4 text-xs font-semibold rounded bg-[#16181D] text-white hover:bg-[#2a2a2a] transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Generating…" : status === "done" ? "Done" : status === "error" ? "Retry" : "Generate resources"}
      </button>
    </div>
  );
}

export function AdminClient({ users, runs, events }: Props) {
  const [activeRunId, setActiveRunId] = useState(runs[0]?._id ?? "");
  const router = useRouter();
  const [refreshing, startRefresh] = useTransition();
  const activeRun = runs.find((r) => r._id === activeRunId);

  // Filter learners by selected run, fall back to all if run has no runId tracking yet
  const filteredUsers = activeRun
    ? users.filter((u) => u.runId === activeRunId || u.runId === null)
    : users;

  const enrolled = filteredUsers.length;
  const active = filteredUsers.filter((u) => u.learningStatus.startsWith("active_")).length;
  const stalled = filteredUsers.filter((u) => u.learningStatus === "stalled").length;
  const certified = filteredUsers.filter((u) => u.certificateStatus === "issued").length;

  return (
    <>
      <Navbar variant="app" learnerName="Admin" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5 sm:space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-lg font-semibold text-[#16181D]">Cohort dashboard</h1>
            <p className="text-sm text-[#7B8391] mt-0.5">
              {enrolled} learner{enrolled !== 1 ? "s" : ""}
              {activeRun?.weekStartDate
                ? ` · Started ${new Date(activeRun.weekStartDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`
                : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => startRefresh(() => router.refresh())}
              disabled={refreshing}
              className="flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded border border-[#DDE1E7] bg-white text-[#4A4F59] hover:bg-[#F7F8FA] disabled:opacity-50 transition-colors"
            >
              <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
              {refreshing ? "Refreshing…" : "Refresh"}
            </button>
            {runs.length > 0 && (
              <RunSwitcher runs={runs} activeId={activeRunId} onSelect={setActiveRunId} />
            )}
          </div>
        </div>

        {/* Empty state — no learners at all */}
        {users.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#DDE1E7] p-16 text-center">
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center mx-auto mb-4">
              <Users size={20} className="text-[#2F5BFF]" />
            </div>
            <div className="text-sm font-semibold text-[#16181D] mb-1">No learners yet</div>
            <div className="text-xs text-[#7B8391]">
              Learners will appear here after they enrol and pay.
            </div>
          </div>
        ) : (
          <>
            {/* Stat row */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Enrolled" value={enrolled} sub={activeRun ? `of ${activeRun.maxLearners} seats` : "total"} icon={<Users size={16} className="text-[#2F5BFF]" />} color="bg-[#E6EDFF]" />
              <StatCard label="Active" value={active} sub="on track this week" icon={<TrendingUp size={16} className="text-[#0F766E]" />} color="bg-[#D9F3EF]" />
              <StatCard label="Stalled" value={stalled} sub="7+ days inactive" icon={<AlertTriangle size={16} className="text-[#A15C00]" />} color="bg-[#FFF1D6]" />
              <StatCard label="Certified" value={certified} sub="completed the cohort" icon={<Award size={16} className="text-[#157347]" />} color="bg-[#E2F6EA]" />
            </div>

            {/* Needs attention */}
            <StalledTable users={filteredUsers} />

            {/* 2-column: completion + all learners */}
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-5">
              <CompletionStats users={filteredUsers} />

              <div className="bg-white rounded-xl border border-[#DDE1E7] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#EEF1F4]">
                  <div className="text-sm font-semibold text-[#16181D]">All learners</div>
                </div>
                <div className="divide-y divide-[#EEF1F4]">
                  {filteredUsers.map((u) => (
                    <div key={u._id} className="flex items-center gap-3 px-4 sm:px-5 py-3.5">
                      <div className="w-7 h-7 rounded-full bg-[#EEF1F4] flex items-center justify-center text-xs font-medium text-[#4A4F59] flex-shrink-0">
                        {u.fullName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#16181D] truncate">{u.fullName}</div>
                        <div className="text-xs text-[#7B8391]">
                          {u.quizRole ? (ROLE_LABELS[u.quizRole] ?? u.quizRole) : u.trackName ?? "—"}
                        </div>
                      </div>
                      <StatusBadge status={u.learningStatus} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Automation log — always shown */}
        <AutomationLog events={events} />

        {/* Resource generation */}
        <GenerateResourcesButton />

      </main>
    </>
  );
}
