import { NextResponse } from "next/server";
import Stripe from "stripe";
import { verifySession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(session.userId).lean();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.upsellStatus !== "eligible") {
    return NextResponse.json({ error: "Not eligible for membership" }, { status: 403 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const checkoutSession = await getStripe().checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: process.env.STRIPE_MEMBERSHIP_PRICE_ID!,
        quantity: 1,
      },
    ],
    customer: user.stripeCustomerId ?? undefined,
    customer_email: user.stripeCustomerId ? undefined : user.email,
    metadata: { userId: String(user._id) },
    success_url: `${appUrl}/hub?membership=success`,
    cancel_url: `${appUrl}/hub`,
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
