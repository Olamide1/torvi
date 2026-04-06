import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Artifact } from "@/lib/db/models/Artifact";
import {
  handleArtifactSubmitted,
  handleFinalArtifactApproved,
} from "@/lib/automation/progression";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const before = await Artifact.findById(id).lean();
    const artifact = await Artifact.findByIdAndUpdate(id, { $set: body }, { new: true }).lean();
    if (!artifact) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const userId = String(artifact.userId);

    // Artifact submitted → advance week
    if (body.status === "submitted" && before?.status !== "submitted") {
      handleArtifactSubmitted(userId, artifact.artifactType).catch(console.error);
    }

    // Final artifact approved → issue certificate
    if (body.reviewStatus === "approved" && before?.reviewStatus !== "approved") {
      handleFinalArtifactApproved(
        userId,
        id,
        artifact.artifactType,
        artifact.submissionUrl,
        artifact.title,
        artifact.description
      ).catch(console.error);
    }

    return NextResponse.json({ artifact });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update artifact" }, { status: 500 });
  }
}
