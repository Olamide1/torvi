"use client";

import { useEffect } from "react";
import { trackConversion } from "@/lib/analytics";

export function LpViewTracker({ role }: { role: string }) {
  useEffect(() => {
    trackConversion("view_content", { role, content_name: `lp_${role}` });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
