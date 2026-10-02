import Link from "next/link";

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      <header className="bg-white border-b border-[#E7E5E4]">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 h-14 flex items-center">
          <Link href="/" className="text-sm font-semibold text-[#1C1917] tracking-[-0.02em]">
            Torvi
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#78716C] mb-4">{eyebrow}</p>
        <h1 className="text-[2rem] font-semibold text-[#1C1917] tracking-[-0.03em] leading-[1.15] mb-2">{title}</h1>
        {updated && <p className="text-xs text-[#A8A29E] mb-8">Last updated {updated}</p>}
        {!updated && <div className="mb-8" />}

        <div className="space-y-8 text-sm text-[#1C1917] leading-[1.8]">{children}</div>

        <div className="mt-12 pt-6 border-t border-[#E7E5E4] flex flex-wrap gap-4 text-xs text-[#A8A29E]">
          <Link href="/" className="hover:text-[#78716C] transition-colors">Home</Link>
          <Link href="/about" className="hover:text-[#78716C] transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[#78716C] transition-colors">Contact</Link>
          <Link href="/privacy" className="hover:text-[#78716C] transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-[#78716C] transition-colors">Terms</Link>
          <Link href="/refund" className="hover:text-[#78716C] transition-colors">Refunds</Link>
        </div>
      </main>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-semibold mb-2">{title}</h2>
      <div className="text-[#78716C] space-y-3">{children}</div>
    </section>
  );
}
