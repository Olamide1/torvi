import { NextResponse } from "next/server";
import OpenAI from "openai";
import { connectDB } from "@/lib/db/mongodb";
import { AIHelpThread } from "@/lib/db/models/AIHelpThread";
import { User } from "@/lib/db/models/User";
import { Guide } from "@/lib/db/models/Guide";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });
    const threads = await AIHelpThread.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();
    return NextResponse.json({ threads });
  } catch {
    return NextResponse.json({ error: "Failed to fetch AI threads" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, message, threadId } = body;

    if (!userId || !message) {
      return NextResponse.json({ error: "userId and message required" }, { status: 400 });
    }

    // Load user context
    const user = await User.findById(userId)
      .populate("trackId", "name slug")
      .populate("archetypeId", "name slug")
      .lean();

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const trackName =
      user.trackId && typeof user.trackId === "object" && "name" in user.trackId
        ? (user.trackId as { name: string }).name
        : "your track";
    const archetypeName =
      user.archetypeId && typeof user.archetypeId === "object" && "name" in user.archetypeId
        ? (user.archetypeId as { name: string }).name
        : "your build type";

    // Path-aware guide retrieval — week + track + archetype priority
    const contextQuery: Record<string, unknown> = {
      weekId: user.currentWeek,
      $or: [{ trackId: user.trackId }, { trackId: null }],
    };
    if (user.archetypeId) {
      contextQuery.$or = [
        { archetypeId: user.archetypeId },
        { archetypeId: null, trackId: user.trackId },
        { trackId: null },
      ];
    }
    const relevantGuides = await Guide.find(contextQuery)
      .select("title purpose expectedOutput commonMistakes doneChecklist")
      .limit(5)
      .lean();

    // Get or create thread
    let thread;
    if (threadId) {
      thread = await AIHelpThread.findById(threadId);
    }
    if (!thread) {
      thread = new AIHelpThread({
        userId,
        currentWeek: user.currentWeek,
        trackId: user.trackId,
        archetypeId: user.archetypeId,
        currentGuideId: user.currentGuideId,
        currentGuideStep: user.currentGuideStep,
        blockerCategory: body.blockerCategory ?? "general",
        messages: [],
      });
    }

    thread.messages.push({ role: "user", content: message, timestamp: new Date() });

    let aiResponse: string;

    if (openai) {
      // System prompt is path-aware and scoped — not a general coding assistant
      const systemPrompt = [
        `You are the Torvi AI coach. You are calm, direct, and exact.`,
        `You help learners ship one useful work tool. You do not give generic advice.`,
        ``,
        `Current learner context:`,
        `- Week: ${user.currentWeek} of 4`,
        `- Track: ${trackName}`,
        `- Build type: ${archetypeName}`,
        `- Learning state: ${user.learningStatus}`,
        relevantGuides.length > 0
          ? [
              ``,
              `Relevant guides for this learner's current stage:`,
              ...relevantGuides.map(
                (g) =>
                  `- ${g.title}: ${g.purpose}. Expected output: ${g.expectedOutput}.`
              ),
            ].join("\n")
          : "",
        ``,
        `Rules:`,
        `- Ask what they are trying to do if unclear`,
        `- Ask what went wrong and what they already tried`,
        `- Point to the exact guide or step if relevant`,
        `- Give hints in stages, not full solutions`,
        `- Stay within the scope of their current week and build type`,
        `- Suggest escalation to office hours if the blocker needs human judgement`,
        `- Do not act like a general chatbot`,
        `- Keep responses short and direct`,
      ]
        .filter((l) => l !== "")
        .join("\n");

      const previousMessages = (thread.messages as Array<{ role: string; content: string }>)
        .slice(-10) // keep last 10 messages for context
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: systemPrompt }, ...previousMessages],
        max_tokens: 600,
        temperature: 0.4,
      });

      aiResponse = completion.choices[0]?.message?.content ?? "I was unable to generate a response. Try again.";
    } else {
      // No API key — return a clear placeholder
      aiResponse =
        `AI coach is not configured yet.\n\n` +
        `Add your OPENAI_API_KEY to .env.local to enable it.\n\n` +
        `Your context: Week ${user.currentWeek} · ${trackName} · ${archetypeName}.`;
    }

    thread.messages.push({ role: "assistant", content: aiResponse, timestamp: new Date() });
    await thread.save();

    return NextResponse.json({ threadId: thread._id, response: aiResponse });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "AI coach error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
