"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Navbar } from "./Navbar";

export function AppNavbar() {
  const { user } = useCurrentUser();
  return <Navbar variant="app" learnerName={user?.fullName ?? undefined} />;
}
