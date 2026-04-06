import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/session";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { MissionClient } from "./MissionClient";

export const metadata = { title: "You are in — Torvi" };

export default async function MissionPage() {
  const session = await verifySession();
  if (!session) redirect("/login?next=/mission");

  return (
    <>
      <AppNavbar />
      <main className="bg-[#F7F6F3] min-h-screen">
        <MissionClient />
      </main>
    </>
  );
}
