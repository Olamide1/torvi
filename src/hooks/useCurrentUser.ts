"use client";

import { useState, useEffect, useCallback } from "react";
import { getUser, getStoredUserId, type TorviUser } from "@/lib/api/client";

type Status = "loading" | "authenticated" | "unauthenticated" | "error";

interface UseCurrentUserReturn {
  user: TorviUser | null;
  status: Status;
  userId: string | null;
  reload: () => Promise<void>;
}

export function useCurrentUser(): UseCurrentUserReturn {
  const [user, setUser] = useState<TorviUser | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [userId, setUserId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const id = getStoredUserId();
    if (!id) {
      setStatus("unauthenticated");
      setUserId(null);
      return;
    }
    setUserId(id);
    try {
      const u = await getUser(id);
      setUser(u);
      setStatus("authenticated");
    } catch {
      // userId in localStorage but not found in DB — clear it
      setStatus("unauthenticated");
      setUserId(null);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { user, status, userId, reload: load };
}
