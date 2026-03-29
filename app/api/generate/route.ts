import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getFestivalById } from "@/lib/festivals";

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GOOGLE_GEMINI_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  let body: {
    festivalId: string;
    contentType: "greeting" | "joke" | "whatsapp";
    language: "english" | "hindi" | "marathi";
    recipient?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { festivalId, contentType, language, recipient } = body;
  const festival = getFestivalById(festivalId);
  if (!festival) {
    return NextResponse.json({ error: "Unknown festival." }, { status: 400 });
  }

  const festivalName =
    language === "hindi"
      ? festival.nameHi
      : language === "marathi"
        ? festival.nameMr
        : festival.name;

  const contentTypeLabels: Record<string, string> = {
    greeting: "a heartfelt greeting/wish",
    joke: "a funny, family-friendly joke",
    whatsapp: "a casual WhatsApp-ready message with emojis",
  };

  const languageInstructions: Record<string, string> = {
    english: "Write in English.",
    hindi: "Write entirely in Hindi using Devanagari script (हिन्दी).",
    marathi: "Write entirely in Marathi using Devanagari script (मराठी).",
  };

  const toneInstructions: Record<string, string> = {
    greeting:
      "Make it warm, heartfelt, and beautifully written. 3-5 sentences. Around 100-120 words.",
    joke: "Make it a culturally relevant, family-friendly joke with a clear punchline. Can include a short setup. Around 60-80 words.",
    whatsapp:
      "Make it casual and fun with relevant emojis throughout. Ready to paste into WhatsApp. Around 80-100 words.",
  };

  const recipientLine = recipient
    ? `This message is specifically for: ${recipient}. Personalize it for them.`
    : "This is a general message for anyone.";

  const prompt = `Generate ${contentTypeLabels[contentType]} for the festival/occasion "${festivalName}" (${festival.description}).

${recipientLine}

Rules:
- ${languageInstructions[language]}
- ${toneInstructions[contentType]}
- Do NOT include any preamble, explanation, or meta-text like "Here's a message for you". Output ONLY the message itself.
- Be creative and original. Do not use generic or cliché phrases.
- IMPORTANT: Stay within 120 words maximum. Never end abruptly mid-sentence — always complete the thought.`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-2.0-flash-lite",
      systemInstruction:
        "You are ShubhSandesh, a warm and culturally authentic festive greeting generator. You create heartfelt, original, and beautiful messages for Indian and global festivals and life occasions. You respect cultural nuances and write naturally in English, Hindi, and Marathi.",
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.9,
        // @ts-expect-error -- thinkingConfig supported by gemini-2.5-flash
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const text = result.response.text().trim();

    if (!text) {
      return NextResponse.json(
        { error: "AI generated an empty response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: text });
  } catch (err: unknown) {
    const rawMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Gemini API error:", rawMessage);

    // Parse friendly error messages
    let userMessage: string;
    let retryAfter: number | null = null;

    if (rawMessage.includes("429") || rawMessage.includes("quota") || rawMessage.includes("Too Many Requests")) {
      const retryMatch = rawMessage.match(/retry in (\d+)/i);
      retryAfter = retryMatch ? parseInt(retryMatch[1]) : 30;
      userMessage = `Too many requests! The free AI tier has a rate limit. Please wait ${retryAfter} seconds and try again.`;
    } else if (rawMessage.includes("403") || rawMessage.includes("PERMISSION_DENIED")) {
      userMessage = "Invalid API key. Please check your GOOGLE_GEMINI_API_KEY in .env.local.";
    } else if (rawMessage.includes("404") || rawMessage.includes("not found")) {
      userMessage = "AI model not available. Please try again later.";
    } else if (rawMessage.includes("SAFETY")) {
      userMessage = "The AI couldn't generate this message due to safety filters. Try a different combination!";
    } else {
      userMessage = "Something went wrong with the AI. Please try again.";
    }

    return NextResponse.json(
      { error: userMessage, retryAfter },
      { status: rawMessage.includes("429") ? 429 : 500 }
    );
  }
}
