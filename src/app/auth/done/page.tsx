"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { storeUserId } from "@/lib/api/client";

function AuthDone() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const uid = searchParams.get("uid");
    const next = searchParams.get("next") ?? "/hub";

    if (uid) {
      storeUserId(uid);
    }

    router.replace(next);
  }, [router, searchParams]);

  return null;
}

export default function AuthDonePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FCFCFD]">
      <p className="text-sm text-[#7B8391]">Signing you in…</p>
      <Suspense>
        <AuthDone />
      </Suspense>
    </div>
  );
}
