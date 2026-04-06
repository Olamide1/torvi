import Link from "next/link";

export const metadata = { title: "Access denied — Torvi" };

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-[#FCFCFD] flex items-center justify-center px-4">
      <div className="max-w-sm text-center">
        <p className="text-xs font-semibold text-[#7B8391] uppercase tracking-widest mb-4">403</p>
        <h1 className="text-xl font-semibold text-[#16181D] mb-2 tracking-tight">Access denied</h1>
        <p className="text-sm text-[#7B8391] leading-relaxed mb-8">
          You don't have permission to view this page.
        </p>
        <Link
          href="/"
          className="inline-block text-sm font-medium text-[#2F5BFF] hover:underline"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
