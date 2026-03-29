export type ContentType = "greeting" | "joke" | "whatsapp";
export type Language = "english" | "hindi" | "marathi" | "gujarati";

interface GenerateParams {
  festivalId: string;
  contentType: ContentType;
  language: Language;
  recipient?: string;
}

export class GenerationError extends Error {
  retryAfter: number | null;
  constructor(message: string, retryAfter: number | null = null) {
    super(message);
    this.retryAfter = retryAfter;
  }
}

export async function generateGreeting(params: GenerateParams): Promise<string> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new GenerationError(
      data.error || "Generation failed. Please try again.",
      data.retryAfter || null
    );
  }

  return data.message;
}
