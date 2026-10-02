import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Section } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Torvi",
  description: "The terms that apply when you use torvilearning.online and enrol in a Torvi cohort or membership.",
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="LEGAL" title="Terms of service" updated="2 October 2026">
      <Section title="Agreement">
        <p>
          Torvi is a product of Placeholder LLC (placeholderllc.name.ng). By using torvilearning.online or enrolling in a Torvi programme you agree to these terms and our <Link href="/privacy" className="text-[#1D4ED8] hover:underline">Privacy policy</Link>. If you do not agree, please do not use the service.
        </p>
      </Section>

      <Section title="What Torvi provides">
        <p>
          Torvi is a guided, self-paced and cohort-based programme in which you build a work tool for your own role, with in-app guidance, an AI coach and scheduled office hours. Free resources and templates on the site are provided as-is for general information.
        </p>
      </Section>

      <Section title="Accounts">
        <p>
          You sign in with a magic link sent to your email. You are responsible for keeping access to that mailbox secure and for activity under your account. Provide accurate information and do not share your account.
        </p>
      </Section>

      <Section title="Payments, refunds and membership">
        <p>
          Prices are shown at checkout and payments are processed by Stripe. Refunds, transfers and cancellation are governed by our <Link href="/refund" className="text-[#1D4ED8] hover:underline">Refund policy</Link>. Membership renews monthly until you cancel through the Stripe billing portal.
        </p>
      </Section>

      <Section title="Your work and our content">
        <p>
          You own the tools, documents and other work you create. You grant us permission to host and process them solely to run the service for you. Torvi&rsquo;s curriculum, guides, templates, design and branding remain ours; you may use them for your own work but may not resell, republish or redistribute them.
        </p>
      </Section>

      <Section title="Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>attempt to access other users&rsquo; accounts or data, or probe or disrupt the service;</li>
          <li>scrape the platform at scale or use it to build a competing product;</li>
          <li>enter unlawful content, or confidential third-party data you have no right to share, into the AI coach.</li>
        </ul>
      </Section>

      <Section title="AI-generated output">
        <p>
          The AI coach and generated resources can be wrong or incomplete. Review everything before relying on it, and do not treat it as legal, financial or professional advice. You are responsible for how you use any tool you build, including compliance with your employer&rsquo;s policies.
        </p>
      </Section>

      <Section title="Certificates">
        <p>
          A certificate confirms you completed the programme requirements. It is not an accredited qualification. We may revoke a certificate issued in error or obtained through misuse.
        </p>
      </Section>

      <Section title="Availability and liability">
        <p>
          We aim for reliable service but do not guarantee uninterrupted access. To the extent the law allows, the service is provided &ldquo;as is&rdquo;, and our total liability to you for any claim is limited to the amount you paid us in the 12 months before it arose. Nothing in these terms limits liability that cannot be limited by law, or your statutory consumer rights.
        </p>
      </Section>

      <Section title="Suspension and termination">
        <p>
          We may suspend or close accounts that breach these terms. You can stop using Torvi at any time and ask us to delete your account.
        </p>
      </Section>

      <Section title="Changes and contact">
        <p>
          We may update these terms; the date above shows the latest version, and continued use means you accept the update. Questions? Use our <Link href="/contact" className="text-[#1D4ED8] hover:underline">contact page</Link>.
        </p>
      </Section>
    </LegalPage>
  );
}
