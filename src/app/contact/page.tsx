import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Torvi",
  description: "Contact Torvi for support, refunds, billing, privacy requests or questions before you enrol.",
};

export default function ContactPage() {
  return (
    <LegalPage eyebrow="SUPPORT" title="Contact us">
      <p className="text-[#78716C]">
        Use the form for support, billing, refunds, data requests or questions before you enrol. We reply within 2 business days. For refunds, include the email you purchased with; see the <Link href="/refund" className="text-[#1D4ED8] hover:underline">refund policy</Link>.
      </p>
      <ContactForm />
    </LegalPage>
  );
}
