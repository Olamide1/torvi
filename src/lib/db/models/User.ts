import mongoose, { Schema, Document, Model } from "mongoose";

export type BillingStatus = "free" | "paid" | "payment_issue" | "refunded" | "membership_active";
export type LearningStatus =
  | "lead" | "checkout_started" | "paid" | "enrolled"
  | "onboarding_started" | "onboarding_completed"
  | "week_0_started" | "week_0_completed"
  | "active_week_1" | "active_week_2" | "active_week_3" | "active_week_4"
  | "stalled" | "ai_support_active" | "needs_review" | "assessment_submitted"
  | "passed" | "certified" | "upsell_eligible" | "member_active" | "churned";
export type SlackStatus = "not_invited" | "invite_sent" | "joined" | "error";
export type CertificateStatus = "not_issued" | "issued" | "revoked";
export type UpsellStatus = "not_eligible" | "eligible" | "offered" | "converted" | "declined";
export type AiSupportStatus = "none" | "active" | "escalated" | "resolved";

export interface IUser extends Document {
  email: string;
  fullName: string;
  timezone: string;
  trackId: mongoose.Types.ObjectId | null;
  archetypeId: mongoose.Types.ObjectId | null;
  runId: mongoose.Types.ObjectId | null;
  currentWeek: number;
  currentGuideId: mongoose.Types.ObjectId | null;
  currentGuideStep: number;
  billingStatus: BillingStatus;
  learningStatus: LearningStatus;
  slackStatus: SlackStatus;
  certificateStatus: CertificateStatus;
  upsellStatus: UpsellStatus;
  aiSupportStatus: AiSupportStatus;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  quizRole: string | null;
  quizGoal: string | null;
  onboardingCompletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    fullName: { type: String, default: "" },
    timezone: { type: String, default: "UTC" },
    trackId: { type: Schema.Types.ObjectId, ref: "Track", default: null },
    archetypeId: { type: Schema.Types.ObjectId, ref: "Archetype", default: null },
    runId: { type: Schema.Types.ObjectId, ref: "Run", default: null },
    currentWeek: { type: Number, default: 0 },
    currentGuideId: { type: Schema.Types.ObjectId, ref: "Guide", default: null },
    currentGuideStep: { type: Number, default: 0 },
    billingStatus: {
      type: String,
      enum: ["free", "paid", "payment_issue", "refunded", "membership_active"],
      default: "free",
    },
    learningStatus: {
      type: String,
      enum: [
        "lead", "checkout_started", "paid", "enrolled",
        "onboarding_started", "onboarding_completed",
        "week_0_started", "week_0_completed",
        "active_week_1", "active_week_2", "active_week_3", "active_week_4",
        "stalled", "ai_support_active", "needs_review", "assessment_submitted",
        "passed", "certified", "upsell_eligible", "member_active", "churned",
      ],
      default: "lead",
    },
    slackStatus: {
      type: String,
      enum: ["not_invited", "invite_sent", "joined", "error"],
      default: "not_invited",
    },
    certificateStatus: {
      type: String,
      enum: ["not_issued", "issued", "revoked"],
      default: "not_issued",
    },
    upsellStatus: {
      type: String,
      enum: ["not_eligible", "eligible", "offered", "converted", "declined"],
      default: "not_eligible",
    },
    aiSupportStatus: {
      type: String,
      enum: ["none", "active", "escalated", "resolved"],
      default: "none",
    },
    stripeCustomerId: { type: String, default: null },
    stripeSubscriptionId: { type: String, default: null },
    quizRole: { type: String, default: null },
    quizGoal: { type: String, default: null },
    onboardingCompletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);
