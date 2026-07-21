import { connectDB } from "@/lib/db/mongodb";
import { Certificate } from "@/lib/db/models/Certificate";
import "@/lib/db/models/User";
import "@/lib/db/models/Track";
import "@/lib/db/models/Run";
import { ShareActions } from "@/components/certificate/ShareActions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

async function getCertificate(certificateNumber: string) {
  await connectDB();
  const cert = await Certificate.findOne({
    certificateNumber,
    status: "active",
  })
    .populate<{ userId: { fullName: string } }>("userId", "fullName")
    .populate<{ trackId: { name: string } }>("trackId", "name")
    .populate<{ runId: { name: string } }>("runId", "name")
    .lean();
  return cert;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const cert = await getCertificate(id);
  if (!cert) return { title: "Certificate — Torvi" };
  return { title: `${cert.userId?.fullName ?? "Certificate"} — Torvi` };
}

export default async function CertificatePage({ params }: Props) {
  const { id } = await params;
  const cert = await getCertificate(id);
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
                <h1 className="text-3xl font-semibold text-[#16181D] tracking-tight">{cert.userId?.fullName ?? "A Torvi learner"}</h1>
                <div className="text-sm text-[#4A4F59]">
                  {cert.trackId?.name} · {cert.runId?.name}
                </div>
              </div>

              <div className="w-16 h-px bg-[#DDE1E7] mx-auto" />

              <p className="text-sm text-[#4A4F59] leading-relaxed max-w-xs mx-auto">
                has successfully completed the Torvi cohort programme and shipped the following work:
              </p>

              <div className="text-left space-y-2.5 max-w-sm mx-auto">
                <div className="flex items-start gap-3 text-sm text-[#16181D]">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E2F6EA] flex items-center justify-center mt-0.5">
                    <Check size={10} className="text-[#157347]" />
                  </div>
                  <span className="font-medium">{cert.toolTitle}</span>
                </div>
                {cert.toolDescription && (
                  <p className="pl-8 text-sm text-[#4A4F59]">{cert.toolDescription}</p>
                )}
                {cert.submissionUrl && (
                  <a
                    href={cert.submissionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pl-8 block text-sm text-[#2F5BFF] hover:underline"
                  >
                    View the shipped tool ↗
                  </a>
                )}
              </div>

              <div className="w-16 h-px bg-[#DDE1E7] mx-auto" />

              <div className="space-y-1">
                <div className="text-sm font-medium text-[#16181D]">
                  Completed{" "}
                  {new Date(cert.issuedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="text-xs text-[#7B8391] font-mono">{cert.certificateNumber}</div>
              </div>
            </div>
          </div>

          <ShareActions certId={cert.certificateNumber} registryId={cert.certificateNumber} />
        </div>
      </main>
    </div>
  );
}
