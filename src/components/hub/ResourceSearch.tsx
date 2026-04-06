"use client";

import { useState } from "react";
import { Search, FileText, Video, BookOpen, HelpCircle, LayoutTemplate } from "lucide-react";
import type { Resource } from "@/lib/types/curriculum";
import { cn } from "@/lib/utils/cn";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  template: <LayoutTemplate size={13} className="text-[#0F766E]" />,
  worksheet: <FileText size={13} className="text-[#2F5BFF]" />,
  recording: <Video size={13} className="text-[#A15C00]" />,
  faq: <HelpCircle size={13} className="text-[#7B8391]" />,
  example: <BookOpen size={13} className="text-[#4A4F59]" />,
};

const TYPE_LABELS: Record<string, string> = {
  template: "Template",
  worksheet: "Worksheet",
  recording: "Recording",
  faq: "FAQ",
  example: "Example",
};

export function ResourceSearch({ resources }: { resources: Resource[] }) {
  const [query, setQuery] = useState("");

  const filtered = query.trim().length > 0
    ? resources.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          r.type.toLowerCase().includes(query.toLowerCase())
      )
    : resources.slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-[#DDE1E7] p-5 space-y-3">
      <div className="text-sm font-semibold text-[#16181D]">Resources</div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7B8391]" />
        <input
          type="text"
          placeholder="Search templates, worksheets, replays…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-9 pl-9 pr-4 rounded-md border border-[#DDE1E7] bg-[#F7F8FA] text-sm text-[#16181D] placeholder:text-[#7B8391] focus:outline-none focus:border-[#2F5BFF] focus:ring-2 focus:ring-[#2F5BFF]/20 focus:bg-white transition-all"
        />
      </div>

      <div className="space-y-1">
        {filtered.length === 0 ? (
          <div className="text-sm text-[#7B8391] py-3 text-center">No resources match that search.</div>
        ) : (
          filtered.map((resource) => (
            <a
              key={resource.id}
              href={resource.url}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F7F8FA] transition-colors group"
            >
              <span>{TYPE_ICONS[resource.type]}</span>
              <span className="flex-1 text-sm text-[#16181D] group-hover:text-[#2F5BFF] transition-colors truncate">
                {resource.title}
              </span>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                resource.type === "template" ? "bg-[#D9F3EF] text-[#0F766E]" :
                resource.type === "worksheet" ? "bg-[#E6EDFF] text-[#2F5BFF]" :
                resource.type === "recording" ? "bg-[#FFF1D6] text-[#A15C00]" :
                "bg-[#F7F8FA] text-[#7B8391] border border-[#DDE1E7]"
              )}>
                {TYPE_LABELS[resource.type]}
              </span>
            </a>
          ))
        )}
      </div>

      {!query && resources.length > 5 && (
        <button className="w-full text-xs text-[#2F5BFF] hover:text-[#2347E0] font-medium py-1 transition-colors">
          View all {resources.length} resources
        </button>
      )}
    </div>
  );
}
