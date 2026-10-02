import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Section } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "About Torvi",
  description: "Torvi is a 4-week guided build programme that helps senior professionals ship a real work tool with AI.",
};

export default function AboutPage() {
  return (
    <LegalPage eyebrow="ABOUT" title="About Torvi">
      <Section title="What Torvi is">
        <p>
          Torvi is a 4-week guided build programme for senior professionals: product managers, ops leaders, consultants, founders and team leads. You don&rsquo;t watch lectures. You build one real tool for your own job, such as a meeting-notes pipeline, an intake router or a reporting automation, and finish with something you actually use.
        </p>
      </Section>

      <Section title="How it works">
        <ul className="list-disc pl-5 space-y-1">
          <li>Take the short <Link href="/quiz" className="text-[#1D4ED8] hover:underline">role quiz</Link> to get a path matched to your role and working style.</li>
          <li>Work through weekly guides in the app, with an AI coach to unblock you.</li>
          <li>Join office hours when you are stuck on something specific.</li>
          <li>Ship your tool and earn a verifiable certificate.</li>
        </ul>
      </Section>

      <Section title="Why we built it">
        <p>
          Most AI training for professionals ends with a certificate and nothing in daily use. Torvi is built around the opposite outcome: a working tool, shipped, in four weeks, without needing to become an engineer.
        </p>
      </Section>

      <Section title="Who is behind it">
        <p>
          Torvi is built and operated by a small team at{" "}
          <a href="https://placeholderllc.name.ng" rel="noopener noreferrer" target="_blank" className="text-[#1D4ED8] hover:underline">
            Placeholder LLC
          </a>
          , a four-person studio that experiments with AI and builds practical products fast. We focus on helping professionals build working solutions faster, and we use Torvi the way we teach it: ship something small, learn, improve.
        </p>
      </Section>

      <Section title="Pricing and payments">
        <p>
          Pricing is shown openly on the <Link href="/enroll" className="text-[#1D4ED8] hover:underline">enrol page</Link>. Payments are handled by Stripe, and we offer a 7-day <Link href="/refund" className="text-[#1D4ED8] hover:underline">refund policy</Link> before a cohort starts.
        </p>
      </Section>

      <Section title="Get in touch">
        <p>
          Questions before you enrol, or need help with your account? <Link href="/contact" className="text-[#1D4ED8] hover:underline">Contact us</Link>. Your data is handled as described in our <Link href="/privacy" className="text-[#1D4ED8] hover:underline">Privacy policy</Link>.
        </p>
      </Section>
    </LegalPage>
  );
}
