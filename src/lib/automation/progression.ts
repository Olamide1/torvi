/**
 * Core automation logic for week progression, certificate issuance,
 * upsell eligibility, and stall detection.
 */

import mongoose from "mongoose";
import { User } from "@/lib/db/models/User";
import { Certificate } from "@/lib/db/models/Certificate";
import type { ArtifactType } from "@/lib/db/models/Artifact";
import {
  sendCertificateEmail,
  sendStallEmail,
  sendUpsellEmail,
} from "@/lib/email";

// Maps the artifact submitted to the week it completes
const ARTIFACT_TO_WEEK: Partial<Record<ArtifactType, number>> = {
  tool_brief: 0,
  prototype_draft: 1,
  usable_version: 2,
  reviewed_version: 3,
  final_shipped_tool: 4,
};

// Maps completed week to the next learningStatus
const WEEK_TO_NEXT_STATUS: Record<number, string> = {
  0: "active_week_1",
  1: "active_week_2",
  2: "active_week_3",
  3: "active_week_4",
  4: "assessment_submitted",
};

/**
 * Called when an artifact status changes to "submitted".
 * Advances currentWeek and learningStatus automatically.
 */
export async function handleArtifactSubmitted(
  userId: string,
  artifactType: ArtifactType
) {
  const completedWeek = ARTIFACT_TO_WEEK[artifactType];
  if (completedWeek === undefined) return;

  const nextStatus = WEEK_TO_NEXT_STATUS[completedWeek];
  if (!nextStatus) return;

  const nextWeek = completedWeek < 4 ? completedWeek + 1 : 4;

  await User.findByIdAndUpdate(userId, {
    currentWeek: nextWeek,
    learningStatus: nextStatus,
  });
}

/**
 * Called when an artifact's reviewStatus changes to "approved"
 * and it's the final week 4 artifact.
 * Issues a certificate and sets upsell eligibility.
 */
export async function handleFinalArtifactApproved(
  userId: string,
  artifactId: string,
  artifactType: ArtifactType,
  submissionUrl: string,
  toolTitle: string,
  toolDescription: string
) {
  if (artifactType !== "final_shipped_tool") return;

  const user = await User.findById(userId).lean();
  if (!user || !user.trackId || !user.archetypeId || !user.runId) return;
  if (user.certificateStatus === "issued") return; // already issued

  // Generate certificate number: TORVI-YYYY-XXXX
  const year = new Date().getFullYear();
  const count = await Certificate.countDocuments();
  const certNumber = `TORVI-${year}-${String(count + 1).padStart(4, "0")}`;

  await Certificate.create({
    userId: new mongoose.Types.ObjectId(userId),
    runId: user.runId,
    trackId: user.trackId,
    archetypeId: user.archetypeId,
    certificateNumber: certNumber,
    issuedAt: new Date(),
    toolTitle,
    toolDescription,
    submissionUrl,
    status: "active",
  });

  await User.findByIdAndUpdate(userId, {
    certificateStatus: "issued",
    learningStatus: "certified",
    upsellStatus: "eligible",
  });

  await sendCertificateEmail(user.email, user.fullName ?? "", certNumber, toolTitle);
  await sendUpsellEmail(user.email, user.fullName ?? "");
}

/**
 * Checks all active learners for inactivity (7+ days without an update).
 * Sets them to "stalled" and sends a check-in email.
 * Called by the /api/cron/check-stalls endpoint.
 */
export async function runStallCheck(): Promise<{ stalled: number; emails: number }> {
  const STALL_DAYS = 7;
  const cutoff = new Date(Date.now() - STALL_DAYS * 24 * 60 * 60 * 1000);

  const activeStatuses = [
    "enrolled",
    "onboarding_started",
    "onboarding_completed",
    "week_0_started",
    "week_0_completed",
    "active_week_1",
    "active_week_2",
    "active_week_3",
    "active_week_4",
    "assessment_submitted",
  ];

  const stalledUsers = await User.find({
    learningStatus: { $in: activeStatuses },
    updatedAt: { $lt: cutoff },
  }).lean();

  let emailsSent = 0;

  for (const user of stalledUsers) {
    await User.findByIdAndUpdate(user._id, { learningStatus: "stalled" });
    try {
      await sendStallEmail(user.email, user.fullName ?? "");
      emailsSent++;
    } catch {
      // Non-blocking — log but don't fail
      console.error("Failed to send stall email to:", user.email);
    }
  }

  return { stalled: stalledUsers.length, emails: emailsSent };
}
