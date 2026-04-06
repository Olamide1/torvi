import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1C1917] border-t border-[#292524]">
      <div className="max-w-page mx-auto px-6 sm:px-10 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="space-y-3 md:col-span-1">
            <div className="font-semibold text-white text-sm tracking-tight">Torvi</div>
            <p className="text-xs text-[#78716C] leading-relaxed max-w-xs">
              A 4-week guided build system for senior professionals. Ship a work tool. Earn a certificate. Move on.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-semibold text-[#44403C] uppercase tracking-[0.1em]">Product</div>
            <nav className="space-y-2">
              {[
                { label: "How it works", href: "#how-it-works" },
                { label: "Role paths", href: "#paths" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <div key={item.label}>
                  <Link href={item.href} className="text-sm text-[#78716C] hover:text-white transition-colors">{item.label}</Link>
                </div>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-semibold text-[#44403C] uppercase tracking-[0.1em]">Support</div>
            <nav className="space-y-2">
              {["Contact", "Refund policy", "Terms", "Privacy"].map((item) => (
                <div key={item}>
                  <Link href="#" className="text-sm text-[#78716C] hover:text-white transition-colors">{item}</Link>
                </div>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <div className="text-[11px] font-semibold text-[#44403C] uppercase tracking-[0.1em]">Open enrolment</div>
            <div className="text-sm text-[#78716C]">Start immediately. Founding rate — €200.</div>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors"
            >
              Enrol now
            </Link>
          </div>
        </div>

        <div className="border-t border-[#292524] mt-12 pt-6 flex items-center justify-between text-xs text-[#57534E]">
          <div>© {new Date().getFullYear()} Torvi. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
