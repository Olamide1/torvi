import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  trigger: string;
  action: string;
  target: string;
  status: "success" | "failed" | "pending" | "retrying";
}

const MOCK_LOG: LogEntry[] = [
  { id: "l1", timestamp: "2026-04-17T09:00:00Z", trigger: "payment_confirmed", action: "LMS enrollment created", target: "Priya Sharma", status: "success" },
  { id: "l2", timestamp: "2026-04-17T09:00:10Z", trigger: "payment_confirmed", action: "Slack invite sent", target: "Priya Sharma", status: "success" },
  { id: "l3", timestamp: "2026-04-17T09:00:20Z", trigger: "payment_confirmed", action: "Welcome email sent", target: "Priya Sharma", status: "success" },
  { id: "l4", timestamp: "2026-04-16T14:00:00Z", trigger: "stall_detected", action: "Reminder email sent", target: "James Okonkwo", status: "success" },
  { id: "l5", timestamp: "2026-04-15T11:30:00Z", trigger: "invoice_failed", action: "Grace state set", target: "Sara Lindqvist", status: "success" },
  { id: "l6", timestamp: "2026-04-15T11:30:05Z", trigger: "invoice_failed", action: "Billing email sent", target: "Sara Lindqvist", status: "failed" },
  { id: "l7", timestamp: "2026-04-14T16:00:00Z", trigger: "stall_detected", action: "Admin notification", target: "Marcus Bell", status: "pending" },
];

const STATUS_ICONS = {
  success: <CheckCircle size={14} className="text-[#157347]" />,
  failed: <XCircle size={14} className="text-[#B42318]" />,
  pending: <Clock size={14} className="text-[#7B8391]" />,
  retrying: <AlertCircle size={14} className="text-[#A15C00]" />,
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export function AutomationLog() {
  return (
    <div className="bg-white rounded-xl border border-[#DDE1E7] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#EEF1F4]">
        <div className="text-sm font-semibold text-[#16181D]">Automation log</div>
        <div className="text-xs text-[#7B8391] mt-0.5">Recent trigger → action events</div>
      </div>

      <div className="divide-y divide-[#EEF1F4]">
        {MOCK_LOG.map((entry) => (
          <div key={entry.id} className="flex items-start gap-4 px-5 py-3.5">
            <div className="mt-0.5 flex-shrink-0">{STATUS_ICONS[entry.status]}</div>
            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <code className="text-xs bg-[#F7F8FA] border border-[#EEF1F4] px-1.5 py-0.5 rounded text-[#4A4F59]">
                  {entry.trigger}
                </code>
                <span className="text-xs text-[#7B8391]">→</span>
                <span className="text-sm text-[#16181D]">{entry.action}</span>
              </div>
              <div className="text-xs text-[#7B8391]">{entry.target} · {formatTime(entry.timestamp)}</div>
            </div>
            <div className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full ${
              entry.status === "success" ? "bg-[#E2F6EA] text-[#157347]" :
              entry.status === "failed" ? "bg-[#FEE4E2] text-[#B42318]" :
              entry.status === "retrying" ? "bg-[#FFF1D6] text-[#A15C00]" :
              "bg-[#F7F8FA] text-[#7B8391] border border-[#DDE1E7]"
            }`}>
              {entry.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
