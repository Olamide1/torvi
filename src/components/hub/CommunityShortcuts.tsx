import { ExternalLink } from "lucide-react";

const SLACK_CHANNELS = [
  { name: "#april-2026-cohort", description: "Your cohort. Questions, updates, check-ins.", href: "#" },
  { name: "#help", description: "Stuck on the build. Get an answer fast.", href: "#" },
  { name: "#wins", description: "Ship something. Post it here.", href: "#" },
];

export function CommunityShortcuts() {
  return (
    <div className="bg-white rounded-xl border border-[#DDE1E7] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-[#16181D]">Community</div>
        <a href="#" className="text-xs text-[#2F5BFF] hover:text-[#2347E0] transition-colors">Open Slack</a>
      </div>

      <div className="space-y-2">
        {SLACK_CHANNELS.map((channel) => (
          <a
            key={channel.name}
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#F7F8FA] hover:bg-[#EEF1F4] transition-colors"
          >
            <div>
              <div className="text-xs font-semibold text-[#16181D] font-mono group-hover:text-[#2F5BFF] transition-colors">
                {channel.name}
              </div>
              <div className="text-xs text-[#7B8391] mt-0.5">{channel.description}</div>
            </div>
            <ExternalLink size={12} className="text-[#C8CDD5] group-hover:text-[#2F5BFF] flex-shrink-0 transition-colors" />
          </a>
        ))}
      </div>

      <div className="border-t border-[#EEF1F4] pt-4">
        <a
          href="#"
          className="flex items-center justify-between w-full px-3 py-3 rounded-lg border border-[#DDE1E7] hover:border-[#2F5BFF] hover:bg-[#E6EDFF] transition-all group"
        >
          <div>
            <div className="text-sm font-medium text-[#16181D] group-hover:text-[#2F5BFF] transition-colors">
              Book office hours
            </div>
            <div className="text-xs text-[#7B8391] mt-0.5">20-min slot. Bring your build.</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#7B8391] group-hover:text-[#2F5BFF] transition-colors">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
