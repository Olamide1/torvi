import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/session";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { HubClient } from "./HubClient";

export const metadata = { title: "Hub — Torvi" };

export default async function HubPage() {
  const session = await verifySession();
  if (!session) redirect("/login?next=/hub");

  return (
    <>
      <AppNavbar />
      <main className="bg-[#F7F6F3] min-h-screen">
        <HubClient />
      </main>
    </>
  );
}
