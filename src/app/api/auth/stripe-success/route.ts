import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";
import { createSession } from "@/lib/auth/session";
import { serverTrackPurchase } from "@/lib/conversions/server";

function getStripe() { return new Stripe(process.env.STRIPE_SECRET_KEY!); }

function isAdminEmail(email: string): boolean {
  const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase());
  return adminEmails.includes(email.toLowerCase());
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!sessionId) {
    return NextResponse.redirect(new URL("/", appUrl));
  }

  try {
    const stripeSession = await getStripe().checkout.sessions.retrieve(sessionId);

    if (stripeSession.payment_status !== "paid") {
      return NextResponse.redirect(new URL("/quiz", appUrl));
    }

    const email =
      (stripeSession.metadata?.email ?? stripeSession.customer_details?.email ?? "").toLowerCase();

    if (!email) {
      return NextResponse.redirect(new URL("/login", appUrl));
    }

    await connectDB();
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return NextResponse.redirect(new URL("/login", appUrl));
    }

    await createSession(String(user._id), isAdminEmail(email));

    // Server-side purchase conversion (200 EUR cohort)
    const amountTotal = stripeSession.amount_total ? stripeSession.amount_total / 100 : 200;
    serverTrackPurchase(email, amountTotal, stripeSession.id, `${appUrl}/mission`).catch(() => {});

    const doneUrl = new URL("/auth/done", appUrl);
    doneUrl.searchParams.set("uid", String(user._id));
    doneUrl.searchParams.set("next", "/mission");

    return NextResponse.redirect(doneUrl);
  } catch {
    return NextResponse.redirect(new URL("/login", appUrl));
  }
}
