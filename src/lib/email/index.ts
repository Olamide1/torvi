import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM = process.env.RESEND_FROM_EMAIL ?? "Torvi <hello@torvi.co>";

export async function sendMagicLink(to: string, link: string) {
  await getResend().emails.send({
    from: FROM,
    to,
    subject: "Your Torvi sign-in link",
    html: `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;color:#16181D">
        <p style="font-size:14px;color:#7B8391;margin:0 0 32px">Torvi</p>
        <h1 style="font-size:22px;font-weight:600;margin:0 0 12px;letter-spacing:-0.02em">Sign in to Torvi</h1>
        <p style="font-size:15px;color:#4A4F59;line-height:1.6;margin:0 0 28px">
          Click the button below to sign in. This link expires in 15 minutes.
        </p>
        <a href="${link}" style="display:inline-block;background:#2F5BFF;color:#fff;font-size:14px;font-weight:500;padding:12px 24px;border-radius:8px;text-decoration:none;letter-spacing:-0.01em">
          Sign in to Torvi
        </a>
        <p style="font-size:13px;color:#7B8391;margin:28px 0 0;line-height:1.5">
          If you didn't request this, you can safely ignore this email.
        </p>
        <hr style="border:none;border-top:1px solid #EEF1F4;margin:32px 0" />
        <p style="font-size:12px;color:#C8CDD5;margin:0">
          Or copy this link: <span style="color:#7B8391">${link}</span>
        </p>
      </div>
    `,
  });
}

const ROLE_TO_SLUG: Record<string, string> = {
  "Product Manager": "product-manager",
  "Ops Leader": "ops-leader",
  "Consultant": "consultant",
  "Founder": "founder",
  "Team Lead": "team-lead",
};

export async function sendKitEmail(to: string, roleLabel: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const roleSlug = ROLE_TO_SLUG[roleLabel] ?? "product-manager";

  const promptPackUrl = `${appUrl}/kit/prompt-pack-${roleSlug}`;
  const toolBriefUrl = `${appUrl}/kit/tool-brief-template`;
  const worksheetUrl = `${appUrl}/kit/week-1-worksheet`;

  await getResend().emails.send({
    from: FROM,
    to,
    subject: `Your ${roleLabel} starter kit`,
    html: `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;color:#16181D">
        <p style="font-size:14px;color:#7B8391;margin:0 0 32px">Torvi</p>
        <h1 style="font-size:22px;font-weight:600;margin:0 0 12px;letter-spacing:-0.02em">Your ${roleLabel} starter kit</h1>
        <p style="font-size:15px;color:#4A4F59;line-height:1.6;margin:0 0 24px">
          Three resources matched to your role. Use them before you start building.
        </p>

        <table style="width:100%;border-collapse:collapse;margin:0 0 28px">
          <tr>
            <td style="padding:12px 0;border-top:1px solid #EEF1F4;vertical-align:top">
              <p style="font-size:14px;font-weight:600;color:#16181D;margin:0 0 2px">${roleLabel} prompt pack</p>
              <p style="font-size:13px;color:#7B8391;margin:0 0 8px">5 Claude prompts for the work you do every week.</p>
              <a href="${promptPackUrl}" style="font-size:13px;font-weight:500;color:#2F5BFF;text-decoration:none">Open prompt pack →</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-top:1px solid #EEF1F4;vertical-align:top">
              <p style="font-size:14px;font-weight:600;color:#16181D;margin:0 0 2px">Tool brief template</p>
              <p style="font-size:13px;color:#7B8391;margin:0 0 8px">Define what you're building before you touch any tools.</p>
              <a href="${toolBriefUrl}" style="font-size:13px;font-weight:500;color:#2F5BFF;text-decoration:none">Open template →</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-top:1px solid #EEF1F4;vertical-align:top">
              <p style="font-size:14px;font-weight:600;color:#16181D;margin:0 0 2px">Week 1 worksheet</p>
              <p style="font-size:13px;color:#7B8391;margin:0 0 8px">Answer these before opening Cursor. Saves hours of wrong building.</p>
              <a href="${worksheetUrl}" style="font-size:13px;font-weight:500;color:#2F5BFF;text-decoration:none">Open worksheet →</a>
            </td>
          </tr>
        </table>

        <a href="${appUrl}/quiz?intent=enrol" style="display:inline-block;background:#2F5BFF;color:#fff;font-size:14px;font-weight:500;padding:12px 24px;border-radius:8px;text-decoration:none;letter-spacing:-0.01em">
          Enrol now — €200 founding rate
        </a>
        <p style="font-size:13px;color:#7B8391;margin:20px 0 0;line-height:1.5">— The Torvi team</p>
      </div>
    `,
  });
}

export async function sendStallEmail(to: string, name: string) {
  const firstName = name?.split(" ")[0] ?? "there";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  await getResend().emails.send({
    from: FROM,
    to,
    subject: "Still building?",
    html: `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;color:#16181D">
        <p style="font-size:14px;color:#7B8391;margin:0 0 32px">Torvi</p>
        <h1 style="font-size:22px;font-weight:600;margin:0 0 12px;letter-spacing:-0.02em">Still building, ${firstName}?</h1>
        <p style="font-size:15px;color:#4A4F59;line-height:1.6;margin:0 0 16px">
          You haven't logged any progress in a week. That's usually a sign of a blocker, not a lack of motivation.
        </p>
        <p style="font-size:14px;color:#4A4F59;line-height:1.6;margin:0 0 28px">
          If something is in the way — technical, scope, time — bring it to office hours or drop a message in Slack. Most blockers take 10 minutes to unblock.
        </p>
        <a href="${appUrl}/hub" style="display:inline-block;background:#2F5BFF;color:#fff;font-size:14px;font-weight:500;padding:12px 24px;border-radius:8px;text-decoration:none;letter-spacing:-0.01em;margin-bottom:16px">
          Go to your hub
        </a>
        <p style="font-size:13px;color:#7B8391;margin:0">— The Torvi team</p>
      </div>
    `,
  });
}

export async function sendCertificateEmail(
  to: string,
  name: string,
  certNumber: string,
  toolTitle: string
) {
  const firstName = name?.split(" ")[0] ?? "there";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  await getResend().emails.send({
    from: FROM,
    to,
    subject: "Your Torvi certificate is ready",
    html: `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;color:#16181D">
        <p style="font-size:14px;color:#7B8391;margin:0 0 32px">Torvi</p>
        <h1 style="font-size:22px;font-weight:600;margin:0 0 12px;letter-spacing:-0.02em">You shipped it, ${firstName}.</h1>
        <p style="font-size:15px;color:#4A4F59;line-height:1.6;margin:0 0 16px">
          Your certificate for <strong>${toolTitle}</strong> has been issued.
        </p>
        <p style="font-size:13px;color:#7B8391;margin:0 0 28px">Certificate number: ${certNumber}</p>
        <a href="${appUrl}/certificate" style="display:inline-block;background:#2F5BFF;color:#fff;font-size:14px;font-weight:500;padding:12px 24px;border-radius:8px;text-decoration:none;letter-spacing:-0.01em;margin-bottom:16px">
          View your certificate
        </a>
        <p style="font-size:13px;color:#7B8391;margin:0">— The Torvi team</p>
      </div>
    `,
  });
}

export async function sendUpsellEmail(to: string, name: string) {
  const firstName = name?.split(" ")[0] ?? "there";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  await getResend().emails.send({
    from: FROM,
    to,
    subject: "Keep the momentum going",
    html: `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;color:#16181D">
        <p style="font-size:14px;color:#7B8391;margin:0 0 32px">Torvi</p>
        <h1 style="font-size:22px;font-weight:600;margin:0 0 12px;letter-spacing:-0.02em">What's next, ${firstName}?</h1>
        <p style="font-size:15px;color:#4A4F59;line-height:1.6;margin:0 0 16px">
          You shipped one tool. Most people stop here. You don't have to.
        </p>
        <p style="font-size:14px;color:#4A4F59;line-height:1.6;margin:0 0 16px">
          Torvi membership gives you access to future cohort runs, the growing template library, and monthly office hours — so you can keep building without starting from scratch each time.
        </p>
        <a href="${appUrl}/hub" style="display:inline-block;background:#2F5BFF;color:#fff;font-size:14px;font-weight:500;padding:12px 24px;border-radius:8px;text-decoration:none;letter-spacing:-0.01em;margin-bottom:16px">
          See membership options
        </a>
        <p style="font-size:13px;color:#7B8391;margin:0">— The Torvi team</p>
      </div>
    `,
  });
}

export async function sendMembershipWelcomeEmail(to: string, name: string) {
  const firstName = name?.split(" ")[0] ?? "there";
  await getResend().emails.send({
    from: FROM,
    to,
    subject: "Welcome to Torvi membership",
    html: `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;color:#16181D">
        <p style="font-size:14px;color:#7B8391;margin:0 0 32px">Torvi</p>
        <h1 style="font-size:22px;font-weight:600;margin:0 0 12px;letter-spacing:-0.02em">Welcome to membership, ${firstName}.</h1>
        <p style="font-size:15px;color:#4A4F59;line-height:1.6;margin:0 0 16px">
          Your membership is now active. Here's what you now have access to:
        </p>
        <ul style="font-size:14px;color:#4A4F59;line-height:1.8;padding-left:20px;margin:0 0 28px">
          <li>Ongoing template library and future cohort runs</li>
          <li>Monthly member office hours</li>
          <li>Alumni community access</li>
        </ul>
        <p style="font-size:13px;color:#7B8391;margin:0">— The Torvi team</p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(to: string, name: string, track: string) {
  const firstName = name?.split(" ")[0] ?? "there";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  await getResend().emails.send({
    from: FROM,
    to,
    subject: "You're in — here's what happens next",
    html: `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;color:#16181D">
        <p style="font-size:14px;color:#7B8391;margin:0 0 32px">Torvi</p>
        <h1 style="font-size:22px;font-weight:600;margin:0 0 12px;letter-spacing:-0.02em">You're in, ${firstName}.</h1>
        <p style="font-size:15px;color:#4A4F59;line-height:1.6;margin:0 0 16px">
          Your place in the ${track} cohort is confirmed. Here's what happens next:
        </p>
        <ol style="font-size:14px;color:#4A4F59;line-height:1.8;padding-left:20px;margin:0 0 28px">
          <li>Go to your hub at the link below — you're already signed in</li>
          <li>Complete your learner profile</li>
          <li><a href="https://join.slack.com/t/torvilearning-9lm2359/shared_invite/zt-3um21hbfl-kgECyHcpdKR1DYl6_mJf2Q" style="color:#2F5BFF">Join the cohort Slack workspace</a></li>
          <li>Add office hours to your calendar</li>
        </ol>
        <p style="font-size:14px;color:#4A4F59;line-height:1.6;margin:0 0 28px">
          You will ship a working tool in four weeks. One step at a time.
        </p>
        <a href="${appUrl}/hub" style="display:inline-block;background:#2F5BFF;color:#fff;font-size:14px;font-weight:500;padding:12px 24px;border-radius:8px;text-decoration:none;letter-spacing:-0.01em;margin-bottom:20px">
          Go to your hub →
        </a>
        <p style="font-size:13px;color:#7B8391;margin:0">— The Torvi team</p>
      </div>
    `,
  });
}
