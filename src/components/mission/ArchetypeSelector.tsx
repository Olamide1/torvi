"use client";

import { useEffect, useState } from "react";
import { getArchetypes, updateUser, type Archetype } from "@/lib/api/client";
import { trackEvent } from "@/lib/analytics";
import { Check } from "lucide-react";

interface ArchetypeSelectorProps {
  userId: string;
  trackId: string;
  onSelected: () => void;
}

export function ArchetypeSelector({ userId, trackId, onSelected }: ArchetypeSelectorProps) {
  const [archetypes, setArchetypes] = useState<Archetype[]>([]);
  const [selecting, setSelecting] = useState<string | null>(null);

  useEffect(() => {
    getArchetypes(trackId).then(setArchetypes).catch(() => {});
  }, [trackId]);

  async function choose(archetypeId: string) {
    setSelecting(archetypeId);
    try {
      await updateUser(userId, { archetypeId });
      trackEvent("archetype_selected", { archetypeId });
      onSelected();
    } finally {
      setSelecting(null);
    }
  }

  if (archetypes.length === 0) return null;

  return (
    <div className="bg-white rounded-lg border border-[#E7E5E4] p-6">
      <p className="text-[11px] font-semibold text-[#1D4ED8] uppercase tracking-[0.1em] mb-1">BEFORE YOU START</p>
      <p className="text-sm font-semibold text-[#1C1917] mb-1">What are you building?</p>
      <p className="text-xs text-[#78716C] mb-4">
        Pick the closest match. Your weekly guides and examples will be tailored to it.
      </p>
      <div className="grid sm:grid-cols-3 gap-3">
        {archetypes.map((a) => (
          <button
            key={a._id}
            onClick={() => choose(a._id)}
            disabled={selecting !== null}
            className="text-left p-4 rounded-lg border border-[#E7E5E4] hover:border-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors disabled:opacity-60 min-h-[44px]"
          >
            <p className="text-sm font-medium text-[#1C1917] mb-1">{a.name}</p>
            <p className="text-xs text-[#78716C] leading-relaxed">{a.description}</p>
            {selecting === a._id && <p className="text-xs text-[#1D4ED8] mt-2">Setting up…</p>}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ArchetypeConfirmed({ archetypeName }: { archetypeName: string }) {
  return (
    <div className="bg-white rounded-lg border border-[#E7E5E4] p-4 flex items-center gap-3">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E2F6EA] flex items-center justify-center">
        <Check size={12} className="text-[#157347]" />
      </div>
      <p className="text-sm text-[#1C1917]">
        You are building a <strong>{archetypeName}</strong>.
      </p>
    </div>
  );
}
