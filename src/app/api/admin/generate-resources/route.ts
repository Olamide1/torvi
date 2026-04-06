import { NextResponse } from "next/server";
import OpenAI from "openai";
import { connectDB } from "@/lib/db/mongodb";
import { Resource } from "@/lib/db/models/Resource";
import { verifySession } from "@/lib/auth/session"; // used in non-dev environments
import {
  ROLES,
  promptPackPrompt,
  toolBriefPrompt,
  weekOneWorksheetPrompt,
} from "@/lib/generate/resources";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
}

async function generate(prompt: string): Promise<string> {
  const openai = getOpenAI();
  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 2000,
    temperature: 0.4,
  });
  return res.choices[0]?.message?.content ?? "";
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    const session = await verifySession();
    if (!session?.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const { force = false } = await req.json().catch(() => ({}));

  await connectDB();

  const results: { slug: string; status: "created" | "skipped" | "error"; error?: string }[] = [];

  // Helper — upsert one resource
  async function upsert(
    slug: string,
    title: string,
    type: "prompt_pack" | "template" | "worksheet",
    roleSlug: string | null,
    prompt: string
  ) {
    try {
      const existing = await Resource.findOne({ slug });
      if (existing && !force) {
        results.push({ slug, status: "skipped" });
        return;
      }
      const contentMarkdown = await generate(prompt);
      await Resource.findOneAndUpdate(
        { slug },
        { slug, title, type, roleSlug, contentMarkdown, generatedAt: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      results.push({ slug, status: "created" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      results.push({ slug, status: "error", error: msg });
    }
  }

  // Universal resources
  await upsert("tool-brief-template", "Tool Brief Template", "template", null, toolBriefPrompt);
  await upsert("week-1-worksheet", "Week 1 Worksheet", "worksheet", null, weekOneWorksheetPrompt);

  // Per-role prompt packs
  for (const role of ROLES) {
    await upsert(
      `prompt-pack-${role.slug}`,
      `${role.label} Prompt Pack`,
      "prompt_pack",
      role.slug,
      promptPackPrompt(role)
    );
  }

  return NextResponse.json({ generated: results });
}
