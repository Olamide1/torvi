import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Section } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Torvi",
  description: "What personal data Torvi collects, why, who processes it, and how to access or delete it.",
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="LEGAL" title="Privacy policy" updated="2 October 2026">
      <Section title="Who we are">
        <p>
          Torvi (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a product of Placeholder LLC (placeholderllc.name.ng), which operates torvilearning.online, a guided 4-week programme for senior professionals to build a work tool with AI. This policy explains what personal data we collect and what we do with it. You can reach us through our <Link href="/contact" className="text-[#1D4ED8] hover:underline">contact page</Link>.
        </p>
      </Section>

      <Section title="What we collect">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-[#1C1917]">Account details:</strong> your name and email address when you sign in or enrol.</li>
          <li><strong className="text-[#1C1917]">Quiz and onboarding answers:</strong> your role, archetype and goals, used to recommend a path and send your starter kit.</li>
          <li><strong className="text-[#1C1917]">Programme activity:</strong> progress, artifacts you save, and messages you send to the AI coach.</li>
          <li><strong className="text-[#1C1917]">Payment information:</strong> handled entirely by Stripe. We never see or store your card number; we receive confirmation of payment and your billing email.</li>
          <li><strong className="text-[#1C1917]">Messages to us:</strong> anything you submit through the contact form.</li>
          <li><strong className="text-[#1C1917]">Usage data:</strong> pages visited, device and browser type, and approximate location, via analytics and advertising pixels described below.</li>
        </ul>
      </Section>

      <Section title="How we use it">
        <p>
          To provide and personalise the programme, sign you in with magic links, process payments and issue certificates, send transactional and starter-kit emails, respond to support requests, keep the service secure, and understand which pages and campaigns work. We do not sell your personal data.
        </p>
      </Section>

      <Section title="Who processes it for us">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-[#1C1917]">Stripe:</strong> payments and invoices.</li>
          <li><strong className="text-[#1C1917]">Resend:</strong> sending sign-in links and emails.</li>
          <li><strong className="text-[#1C1917]">MongoDB Atlas:</strong> database hosting for accounts and progress.</li>
          <li><strong className="text-[#1C1917]">Netlify:</strong> website hosting.</li>
          <li><strong className="text-[#1C1917]">OpenAI:</strong> the AI coach sends the text of your coach messages, and relevant programme context, to OpenAI to generate replies. Do not paste confidential or client-sensitive data into it.</li>
          <li><strong className="text-[#1C1917]">Google Analytics, Meta Pixel, TikTok Pixel:</strong> measurement and advertising. These set cookies or similar identifiers on public pages. They are not loaded in the admin area.</li>
        </ul>
      </Section>

      <Section title="Cookies">
        <p>
          We use a session cookie to keep you signed in. Analytics and advertising providers listed above may set their own cookies. You can block or delete cookies in your browser settings, or opt out of Google Analytics with Google&rsquo;s browser add-on. Signing in will not work with session cookies blocked.
        </p>
      </Section>

      <Section title="How long we keep it">
        <p>
          We keep account and programme data while your account is active and for a reasonable period afterwards so certificates remain verifiable. Payment records are kept as long as tax and accounting rules require. You can ask us to delete your account and data at any time.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          You can ask to access, correct, export or delete your personal data, to object to or restrict certain processing, and to withdraw consent for marketing emails (every marketing email includes an unsubscribe option). Send a request through our <Link href="/contact" className="text-[#1D4ED8] hover:underline">contact page</Link> and we will respond within 30 days. If you are in the UK or EU you may also complain to your local data protection authority.
        </p>
      </Section>

      <Section title="International transfers">
        <p>
          Our providers may process data outside your country, including in the United States. Where required, transfers rely on standard contractual clauses or equivalent safeguards offered by those providers.
        </p>
      </Section>

      <Section title="Children">
        <p>Torvi is intended for working professionals and is not directed at anyone under 18.</p>
      </Section>

      <Section title="Changes">
        <p>
          If we make material changes we will update the date above and, where appropriate, notify you by email.
        </p>
      </Section>
    </LegalPage>
  );
}
