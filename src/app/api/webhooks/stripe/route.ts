import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";
import { Track } from "@/lib/db/models/Track";
import { sendWelcomeEmail, sendMembershipWelcomeEmail } from "@/lib/email";

// Maps quiz role IDs to track slugs seeded in the DB
const ROLE_TO_TRACK: Record<string, string> = {
  product_manager: "product-pm",
  ops_leader: "ops-workflow",
  consultant: "consultant-client",
  founder: "product-pm",
  team_lead: "ops-workflow",
};

function getStripe() { return new Stripe(process.env.STRIPE_SECRET_KEY!); }

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  await connectDB();

  // --- One-time cohort payment ---
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== "paid") {
      return NextResponse.json({ ok: true });
    }

    // Only handle one-time payments here; subscriptions are handled below
    if (session.mode !== "payment") {
      return NextResponse.json({ ok: true });
    }

    const email = (
      session.metadata?.email ?? session.customer_details?.email ?? ""
    ).toLowerCase();

    if (!email) return NextResponse.json({ ok: true });

    try {
      // Resolve track from quiz role if present
      const quizRole = session.metadata?.role ?? "";
      const trackSlug = ROLE_TO_TRACK[quizRole] ?? null;
      let trackId = null;
      if (trackSlug) {
        const track = await Track.findOne({ slug: trackSlug }).lean();
        if (track) trackId = track._id;
      }

      const updateFields: Record<string, unknown> = {
        billingStatus: "paid",
        learningStatus: "enrolled",
        stripeCustomerId: session.customer as string,
      };
      if (trackId) updateFields.trackId = trackId;

      const user = await User.findOneAndUpdate(
        { email },
        updateFields,
        { new: true }
      );

      if (user) {
        const trackLabel = trackSlug?.replace("-", " / ") ?? "cohort";
        await sendWelcomeEmail(email, user.fullName ?? "", trackLabel);
      }
    } catch {
      console.error("Failed to update user after payment:", email);
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }
  }

  // --- Membership subscription created ---
  if (event.type === "customer.subscription.created") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    try {
      const user = await User.findOneAndUpdate(
        { stripeCustomerId: customerId },
        {
          billingStatus: "membership_active",
          learningStatus: "member_active",
          upsellStatus: "converted",
          stripeSubscriptionId: subscription.id,
        },
        { new: true }
      );

      if (user) {
        await sendMembershipWelcomeEmail(user.email, user.fullName ?? "");
      }
    } catch {
      console.error("Failed to activate membership:", customerId);
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }
  }

  // --- Membership subscription cancelled ---
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    try {
      await User.findOneAndUpdate(
        { stripeCustomerId: customerId },
        {
          billingStatus: "paid",
          learningStatus: "churned",
          stripeSubscriptionId: null,
        }
      );
    } catch {
      console.error("Failed to cancel membership:", customerId);
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }
  }

  // --- Payment failed on subscription ---
  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice;
    const customerId = invoice.customer as string;

    try {
      await User.findOneAndUpdate(
        { stripeCustomerId: customerId },
        { billingStatus: "payment_issue" }
      );
    } catch {
      console.error("Failed to flag payment issue:", customerId);
    }
  }

  return NextResponse.json({ ok: true });
}
