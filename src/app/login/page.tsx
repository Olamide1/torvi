import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in — Torvi" };

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FCFCFD] flex items-center justify-center">
          <p className="text-sm text-[#7B8391]">Loading…</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
