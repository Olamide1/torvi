import { mockCertificates } from "@/lib/mock/certificates";
import { ShareActions } from "@/components/certificate/ShareActions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";

export async function generateStaticParams() {
  return mockCertificates.map((cert) => ({ id: cert.id }));
}

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cert = mockCertificates.find((c) => c.id === id);
  if (!cert) notFound();

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
      <header className="bg-white border-b border-[#DDE1E7] px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-[#16181D]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="8" height="8" rx="2" fill="#2F5BFF" />
            <rect x="13" y="3" width="8" height="8" rx="2" fill="#2F5BFF" opacity="0.3" />
            <rect x="3" y="13" width="8" height="8" rx="2" fill="#2F5BFF" opacity="0.3" />
            <rect x="13" y="13" width="8" height="8" rx="2" fill="#0F766E" />
          </svg>
          Torvi
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl space-y-4">
          <div className="bg-white rounded-2xl border-2 border-[#DDE1E7] overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-[#2F5BFF] to-[#0F766E]" />

            <div className="px-10 py-10 text-center space-y-6">
              <div className="flex justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="8" height="8" rx="2" fill="#2F5BFF" />
                  <rect x="13" y="3" width="8" height="8" rx="2" fill="#2F5BFF" opacity="0.3" />
                  <rect x="3" y="13" width="8" height="8" rx="2" fill="#2F5BFF" opacity="0.3" />
                  <rect x="13" y="13" width="8" height="8" rx="2" fill="#0F766E" />
                </svg>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-medium text-[#7B8391] uppercase tracking-widest">Certificate of Completion</div>
                <div className="text-xs text-[#7B8391]">This certifies that</div>
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl font-semibold text-[#16181D] tracking-tight">{cert.learnerName}</h1>
                <div className="text-sm text-[#4A4F59]">
                  {cert.roleTrack} · {cert.cohortName}
                </div>
              </div>

              <div className="w-16 h-px bg-[#DDE1E7] mx-auto" />

              <p className="text-sm text-[#4A4F59] leading-relaxed max-w-xs mx-auto">
                has successfully completed the Torvi cohort programme and shipped the following work:
              </p>

              <ul className="text-left space-y-2.5 max-w-sm mx-auto">
                {cert.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-sm text-[#16181D]">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E2F6EA] flex items-center justify-center mt-0.5">
                      <Check size={10} className="text-[#157347]" />
                    </div>
                    {outcome}
                  </li>
                ))}
              </ul>

              <div className="w-16 h-px bg-[#DDE1E7] mx-auto" />

              <div className="space-y-1">
                <div className="text-sm font-medium text-[#16181D]">
                  Completed{" "}
                  {new Date(cert.completionDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="text-xs text-[#7B8391] font-mono">{cert.registryId}</div>
              </div>
            </div>
          </div>

          <ShareActions certId={cert.id} registryId={cert.registryId} />
        </div>
      </main>
    </div>
  );
}
