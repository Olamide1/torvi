import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-4">404</p>
      <h1 className="text-[2rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15] mb-3">
        Page not found
      </h1>
      <p className="text-[#78716C] text-sm leading-[1.75] max-w-sm mb-8">
        This page doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium rounded bg-[#1C1917] text-white hover:bg-black transition-colors tracking-[-0.01em]"
      >
        Back to home
      </Link>
    </div>
  );
}
