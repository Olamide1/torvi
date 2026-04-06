"use client";

import { useState } from "react";
import { ExternalLink, Link, Download } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ShareActionsProps {
  certId: string;
  registryId: string;
}

export function ShareActions({ certId, registryId }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = `${window.location.origin}/certificate/${certId}`;
    await navigator.clipboard.writeText(url);
    trackEvent("certificate_shared", { method: "copy_link" });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    typeof window !== "undefined" ? `${window.location.origin}/certificate/${certId}` : ""
  )}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <button
          onClick={() => trackEvent("certificate_shared", { method: "download" })}
          className="flex items-center gap-2 h-10 px-5 rounded-md border border-[#DDE1E7] bg-white text-sm font-medium text-[#16181D] hover:bg-[#F7F8FA] transition-colors"
        >
          <Download size={14} />
          Download PDF
        </button>

        <button
          onClick={copyLink}
          className="flex items-center gap-2 h-10 px-5 rounded-md border border-[#DDE1E7] bg-white text-sm font-medium text-[#16181D] hover:bg-[#F7F8FA] transition-colors"
        >
          <Link size={14} />
          {copied ? "Copied!" : "Copy link"}
        </button>

        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("certificate_shared", { method: "linkedin" })}
          className="flex items-center gap-2 h-10 px-5 rounded-md bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#0958AB] transition-colors"
        >
          <ExternalLink size={14} />
          Share on LinkedIn
        </a>
      </div>

      <p className="text-center text-xs text-[#7B8391]">
        Verify this certificate at torvilearning.online/verify/{registryId}
      </p>
    </div>
  );
}
