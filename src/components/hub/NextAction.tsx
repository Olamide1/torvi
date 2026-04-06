import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface NextActionProps {
  week: number;
  title: string;
  description: string;
  resourceLinks?: { label: string; href: string }[];
  ctaLabel?: string;
  ctaHref?: string;
  type?: "build" | "assignment" | "review";
}

const TYPE_LABELS: Record<string, string> = {
  build: "BUILD TASK",
  assignment: "DELIVERABLE DUE",
  review: "REVIEW REQUIRED",
};

export function NextAction({
  week,
  title,
  description,
  resourceLinks,
  ctaLabel = "Open task",
  ctaHref = "#",
  type = "build",
}: NextActionProps) {
  return (
    <div
      className="bg-white rounded-lg border border-[#E7E5E4] p-6 sm:p-7"
      style={{ borderLeft: "3px solid #1D4ED8" }}
    >
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="flex-1 min-w-0">
          {/* Context label */}
          <p className="text-[11px] font-semibold text-[#1D4ED8] uppercase tracking-[0.1em] mb-4">
            WEEK {week} &middot; {TYPE_LABELS[type]}
          </p>

          {/* The one action — large */}
          <h2 className="text-[1.5rem] font-semibold text-[#1C1917] tracking-[-0.02em] leading-snug mb-3">
            {title}
          </h2>
          <p className="text-sm text-[#78716C] leading-[1.75] max-w-2xl mb-5">
            {description}
          </p>

          {/* Resource pills */}
          {resourceLinks && resourceLinks.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {resourceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#E7E5E4] bg-[#F5F4F2] text-xs font-medium text-[#78716C] hover:bg-white hover:text-[#1C1917] hover:border-[#D6D3D1] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <Link
          href={ctaHref}
          className="flex-shrink-0 inline-flex items-center gap-2 h-11 px-5 rounded bg-[#1D4ED8] text-white text-sm font-medium hover:bg-[#1e40af] transition-colors min-h-[44px] tracking-[-0.01em]"
        >
          {ctaLabel}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
