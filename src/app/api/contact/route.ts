import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't retry
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 100);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 4000);

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Please complete all fields" }, { status: 400 });
  }

  const inbox =
    process.env.CONTACT_INBOX_EMAIL ??
    (process.env.ADMIN_EMAILS ?? "").split(",")[0]?.trim();

  if (!process.env.RESEND_API_KEY || !inbox) {
    return NextResponse.json({ error: "Contact is not configured" }, { status: 500 });
  }

  try {
    await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Torvi <hello@placeholderllc.name.ng>",
      to: inbox,
      replyTo: email,
      subject: `Torvi contact: ${name}`.replace(/[\r\n]+/g, " "),
      html: `<p><strong>${esc(name)}</strong> (${esc(email)})</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
