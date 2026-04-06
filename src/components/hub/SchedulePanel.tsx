import { ExternalLink } from "lucide-react";

const OFFICE_HOURS_URL = "https://cal.com/torvi/office-hours";

export function SchedulePanel() {
  return (
    <div className="bg-white rounded-lg border border-[#E7E5E4] p-5">
      <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-5">OFFICE HOURS</p>
      <p className="text-xs text-[#78716C] mb-4">Bring your build. Get unblocked. No prep required.</p>
      <p className="text-sm text-[#1C1917] mb-4">Run weekly. Book a 20-min slot when you need it.</p>
      <a
        href={OFFICE_HOURS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between w-full h-9 px-4 rounded border border-[#E7E5E4] text-sm font-medium text-[#1C1917] hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors"
      >
        Book a slot
        <ExternalLink size={13} className="text-[#D6D3D1] group-hover:text-[#1D4ED8] transition-colors" />
      </a>
    </div>
  );
}
